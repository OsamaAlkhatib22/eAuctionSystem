import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import HomeHeader from '../Home/HomeHeader';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  CircularProgress,
  Paper,
  styled,
} from '@mui/material';
import { fetchTransactions } from './Service/Auth';
import { useAuth } from '../../../Components/Context';


const StyledDiv = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '80vh',
});

const TransactionBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2, 0),
  whiteSpace: 'pre-wrap', // This will break lines according to content
  cursor: 'pointer', // Add cursor pointer for clickable effect
  '&:hover': {
    backgroundColor: theme.palette.action.hover, // Add background color on hover
  },
}));

function ClientTransactions() {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const data = await fetchTransactions(token);
          setTransactions(data);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  // Function to handle click on Transfer transaction
  const handleTransferTransactionClick = (transactionId) => {
    navigate(`/TransferTransaction/${transactionId}`);
  };

  return (
    <div>
      <HomeHeader />

      <Box m={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Your Transactions
            </Typography>
            <Divider />

            {loading ? (
              <StyledDiv>
                <CircularProgress />
              </StyledDiv>
            ) : (
              <div>
                {transactions.length === 0 ? (
                  <Typography variant="body1">No transactions available.</Typography>
                ) : (
                  <div>
                    {transactions.map((transaction) => (
                      <TransactionBox
                        key={transaction.transactionId}
                        onClick={
                          transaction.transaction_Type === 'Transfer'
                            ? () => handleTransferTransactionClick(transaction.transactionId)
                            : null
                        }
                      >
                        <Typography variant="body1">
                          Transaction Number: {transaction.transactionId}{'\n'}
                          Amount: {transaction.amount} ${'\n'} 
                          Date: {new Date(transaction.transactionDate).toLocaleDateString()}{'\n'}
                          Type: {transaction.transaction_Type}
                        </Typography>
                      </TransactionBox>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default ClientTransactions;
