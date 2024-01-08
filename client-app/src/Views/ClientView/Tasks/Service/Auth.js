import axios from 'axios';

export const fetchTasksProcess = async (token) => {
  try {
    const response = await axios.get('https://localhost:5000/api/Task/TaskListProcess', {
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


export const fetchTasksCompleted = async (token) => {
    try {
      const response = await axios.get('https://localhost:5000/api/Task/CompletedTaskList', {
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


  export const fetchTaskDetails = async (ServiceId) => {
    try {
      const response = await axios.get(`https://localhost:5000/api/Task/TaskDetails/${ServiceId}`);
      console.log("API Response:", response.data);
  
      if (!response.data) {
        throw new Error(`Failed to fetch details for task with ServiceId ${ServiceId}`);
      }
  
      const taskDetails = response.data;
      console.log("Fetched task details:", taskDetails);
  
       // Fetch bids for the task
       const bidsResponse = await axios.get(`https://localhost:5000/api/Bidding/BidList/${ServiceId}`);
       console.log("API Response (Bids):", bidsResponse.data);
   
       if (!bidsResponse.data) {
         throw new Error(`Failed to fetch bids for task with ServiceId ${ServiceId}`);
       }
   
       const bids = bidsResponse.data;
       console.log("Fetched bids:", bids);
  
       taskDetails.bids = bids;
  
      return taskDetails;
    } catch (error) {
      console.error(`Error fetching details for task with ServiceId ${ServiceId}:`, error.message);
      throw error;
    }
  };

  export const fetchTaskProcessDetails = async (ServiceId) => {
    try {
      const response = await axios.get(`https://localhost:5000/api/Task/TaskInProcessDetails/${ServiceId}`);
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

  export const fetchTaskCompletedDetails = async (ServiceId) => {
    try {
      const response = await axios.get(`https://localhost:5000/api/Task/TaskCompletedDetails/${ServiceId}`);
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
  
  
export const addBidAcceptance = async (ServiceId, bidAmount, bidId, token) => {
  try {
    const response = await axios.post(
      `https://localhost:5000/api/Bidding/AcceptBid/${bidId}`,
      { Amount: bidAmount, bID: bidId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data) {
      throw new Error('Failed to accept bid');
    }

    const acceptedBid = response.data;
    console.log('Accepted bid:', acceptedBid);

    return acceptedBid;
  } catch (error) {
    console.error(`Error accepting bid for task with ServiceId ${ServiceId}:`, error.message);
    throw error;
  }
};