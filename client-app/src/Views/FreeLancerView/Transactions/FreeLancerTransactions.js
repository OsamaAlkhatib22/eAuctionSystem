import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Components/Context';
import { Box, Card, CardContent, Divider, Typography, CircularProgress, Paper, styled } from '@mui/material';

import FreeLancerHomeHeader from "../Home/FreeLancerHomeHeader";
import { fetchTransactions } from './Service/Auth';


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
}));

function FreeLancerTransactions() {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div><FreeLancerHomeHeader />
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
                      <TransactionBox key={transaction.transactionId}>
                        <Typography variant="body1">
                          Transaction Number: {transaction.transactionId}{'\n'}
                          Amount: {transaction.amount}{'\n'}
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
export default FreeLancerTransactions