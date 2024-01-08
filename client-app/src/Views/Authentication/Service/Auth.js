import axios from 'axios';


const LOGIN_URL = 'https://localhost:5000/api/Account/Login';
const REGISTER_URL = 'https://localhost:5000/api/Account/Register';
const PROFILE_API_URL = 'https://localhost:5000/api/Profile';
const WALLET_API_URL = 'https://localhost:5000/api/Transaction/UserWallet';
const ADD_MONEY_URL = 'https://localhost:5000/api/Transaction/Add';
const SUB_MONEY_URL = 'https://localhost:5000/api/Transaction/Subtract';

const authService = {
  login: async (loginData) => {
    try {
      const response = await axios.post(LOGIN_URL, loginData);

      console.log('Login response:', response);

      if (!response) {
        throw new Error('Login failed.');
      }
      const token = response.data; 
      //const UserType = 'Free Lancer'; //edit here 'client' or 'Free Lancer' edit later in Backend
  
      return  token;
    } catch (error) {
      console.error('Login error:', error.message);
      throw error;
    }
  },




  register: async (registrationData) => {
    try {
      const response = await axios.post(REGISTER_URL, registrationData);

      console.log('Registration response:', response);

      if (!response) {
        throw new Error('Registration failed.');
      }

      const token = response.data;
      return token;
    } catch (error) {
      console.error('Registration error:', error.message);
      throw error;
    }
  },





  getPublicProfile: async (token) => {
    try {
      console.log("token:",token);
      const response = await axios.get(`${PROFILE_API_URL}/PublicInfo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("token:",token);
     
      return response.data;
    } catch (error) {
      console.error('Error fetching public profile:', error.message);
      throw error;
    }
  },





  getUserWallet: async (token) => {
    try {
      const response = await axios.get(WALLET_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('User Wallet response:', response);

      if (!response) {
        throw new Error('Failed to retrieve user wallet.');
      }

      return response.data;
    } catch (error) {
      console.error('Error fetching user wallet:', error.message);
      throw error;
    }
  },





  addMoneyToWallet: async (token, amount) => {
    try {
      const response = await axios.post(
        `${ADD_MONEY_URL}?amount=${amount}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

      console.log('Add Money response:', response);

      if (!response) {
        throw new Error('Failed to add money to wallet.');
      }

      return response.data;
    } catch (error) {
      console.error('Error adding money to wallet:', error.message);
      throw error;
    }
  },



  subMoneyFromWallet: async (token, amount) => {
    try {
      const response = await axios.post(
        `${SUB_MONEY_URL}?amount=${amount}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Subtract Money response:', response);

      if (!response) {
        throw new Error('Failed to subtract money from wallet.');
      }

      return response.data;
    } catch (error) {
      console.error('Error subtracting money from wallet:', error.message);
      throw error;
    }
  },




};

export default authService;
