import axios from "axios";

export const fetchSelectedProfileInfo = async (UserName) => {
    try {
      const response = await axios.get(`https://localhost:5000/api/Profile/SelectedProfileInfo/${UserName}`);
      console.log("API Response:", response.data);
  
      if (!response.data) {
        throw new Error(`Failed to fetch Info of ${UserName}`);
      }
  
      const SelectedProfileInfo = response.data;
      console.log("Fetched Info:", SelectedProfileInfo);

      return SelectedProfileInfo;
    } catch (error) {
      console.error(`Error fetching Profile info of ${UserName}:`, error.message);
      throw error;
    }
  };