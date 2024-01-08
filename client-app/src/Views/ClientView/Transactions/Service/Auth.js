import axios from 'axios';

export const fetchTransactions = async (token) => {
  try {
    const response = await axios.get('https://localhost:5000/api/Transaction/Tran', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const fetchTransactionsDetails = async (TransactionId) =>{
  try {
    const response = await axios.get(`https://localhost:5000/api/Transaction/TransactionDetails/${TransactionId}`);
    console.log("API Response:", response.data);

    if (!response.data) {
      throw new Error(`Failed to fetch Transactions Details with TransactionId ${TransactionId}`);
    }

    const TransactionsDetails = response.data;
    console.log("Fetched Transactions Details:", TransactionsDetails);

    return TransactionsDetails;
  } catch (error) {
    console.error(`Error fetching Transactions Details with TransactionId ${TransactionId}:`, error.message);
    throw error;
  }
}
