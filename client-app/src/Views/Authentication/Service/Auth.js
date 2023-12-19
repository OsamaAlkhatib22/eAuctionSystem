import axios from 'axios';


const LOGIN_URL = 'https://localhost:5000/api/Account/Login';
const REGISTER_URL = 'https://localhost:5000/api/Account/Register';
const PROFILE_API_URL = 'https://localhost:5000/api/Profile';

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
/* 
  getPrivateProfile: async () => {
    try {
      const response = await axios.get(`${PROFILE_API_URL}/PrivateInfo`);
      return response.data;
    } catch (error) {
      console.error('Error fetching private profile:', error.message);
      throw error;
    }
  },
  */
};

export default authService;
