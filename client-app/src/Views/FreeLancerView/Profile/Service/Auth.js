import axios from 'axios';

const PROFILE_API_URL = 'https://localhost:5000/api/Profile';

const authService = {
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
