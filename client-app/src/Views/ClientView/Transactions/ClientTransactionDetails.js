import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link   } from 'react-router-dom';
import HomeHeader from '../Home/HomeHeader';
import { Card, CardContent, Typography, Grid, Paper, CircularProgress,  IconButton   } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { fetchTransactionsDetails } from './Service/Auth';
import { useAuth } from '../../../Components/Context';

function ClientTransactionDetails() {
  const { token } = useAuth();
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  // Get TransactionId from the route params using react-router-dom
  const { TransactionId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await fetchTransactionsDetails(TransactionId, token);
        setTransactionDetails(data);
      } catch (error) {
        console.error('Error fetching transaction details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [TransactionId, token]);

  const handleGoBack = () => {
    navigate(-1); // Navigate back one step
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!transactionDetails) {
    return <Typography variant="body1">Transaction details not found.</Typography>;
  }
  

  return (
    <div>
      <HomeHeader />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
            <IconButton onClick={handleGoBack} style={{ marginBottom: '16px' }}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h5" gutterBottom>
                Transaction Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="subtitle1">Transaction Number: {transactionDetails.transactionId}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="subtitle1">Amount: {transactionDetails.amount}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="subtitle1">
                  Transaction Date: {new Date(transactionDetails.transactionDate).toLocaleString()}
                </Typography>
              </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="subtitle1">Transaction Type: {transactionDetails.transaction_Type}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="subtitle1">Client Sender User Name:  <Link to={`/SelectedProfileUserNameInfo/${transactionDetails.clientUserName}`}>{transactionDetails.clientUserName}</Link></Typography>
                    
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="subtitle1">Freelancer Receiver User Name:  <Link to={`/SelectedProfileUserNameInfo/${transactionDetails.freeLancerUserName}`}>{transactionDetails.freeLancerUserName}</Link></Typography>
                    
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default ClientTransactionDetails;
