import axios from 'axios';

export const fetchFreeLancerTaskList = async (token) => {
  try {
    const response = await axios.get('https://localhost:5000/api/Task/FreeLancerTaskList', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;

    console.log("Fetched tasks:", data);


    return data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};


export const fetchFreeLancerCompletedTaskList = async (token) => {
    try {
      const response = await axios.get('https://localhost:5000/api/Task/FreeLancerCompletedTaskList', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = response.data;
  
      console.log("Fetched tasks:", data);
  
  
      return data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  };


  export const fetchFreeLancerTaskProcessDetails = async (ServiceId) => {
    try {
      const response = await axios.get(`https://localhost:5000/api/Task/FreeLancerTaskInProcessDetails/${ServiceId}`);
      console.log("API Response:", response.data);
  
      if (!response.data) {
        throw new Error(`Failed to fetch details for Process type tasks with ServiceId ${ServiceId}`);
      }
  
      const taskProcessDetails = response.data;
      console.log("Fetched Process task details:", taskProcessDetails);

      return taskProcessDetails;
    } catch (error) {
      console.error(`Error fetching details for task with ServiceId ${ServiceId}:`, error.message);
      throw error;
    }
  };

  export const fetchFreeLancerTaskCompletedDetails = async (ServiceId) => {
    try {
      const response = await axios.get(`https://localhost:5000/api/Task/FreeLancerTaskCompletedDetails/${ServiceId}`);
      console.log("API Response:", response.data);
  
      if (!response.data) {
        throw new Error(`Failed to fetch details for Completed tasks with ServiceId ${ServiceId}`);
      }
  
      const taskCompletedDetails = response.data;
      console.log("Fetched Process task details:", taskCompletedDetails);

      return taskCompletedDetails;
    } catch (error) {
      console.error(`Error fetching details for Completed task with ServiceId ${ServiceId}:`, error.message);
      throw error;
    }
  };