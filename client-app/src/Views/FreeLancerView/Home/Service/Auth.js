import axios from 'axios';



export const fetchTasks = async () => {
  try {
    const response = await axios.get("https://localhost:5000/api/Task/TaskList");

    if (!response.data) {
      throw new Error("Failed to fetch tasks");
    }

    const data = response.data;
    console.log("Fetched tasks:", data);

    const undefinedServiceIdTasks = data.filter(task => task.ServiceId === undefined);
    console.log("Tasks with undefined ServiceId:", undefinedServiceIdTasks);

    return data;
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
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


export const addBid = async (ServiceId, bidAmount, token) => {
  

  try {
    const response = await axios.post(
      `https://localhost:5000/api/Bidding/AddBid/${ServiceId}`,
      { Bid_Amount: bidAmount },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data) {
      throw new Error('Failed to add bid');
    }

    const newBid = response.data;
    console.log('Added bid:', newBid);

    return newBid;
  } catch (error) {
    console.error(`Error adding bid for task with ServiceId ${ServiceId}:`, error.message);
    throw error;
  }
};

export const addBidAcceptance = async (ServiceId, bidAmount, bidId, token) => {
  try {
    const response = await axios.post(
      `https://localhost:5000/api/Bidding/AcceptBid/${ServiceId}`,
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