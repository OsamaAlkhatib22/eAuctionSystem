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
