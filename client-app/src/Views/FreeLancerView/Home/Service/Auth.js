// auth.js
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

    return taskDetails;
  } catch (error) {
    console.error(`Error fetching details for task with ServiceId ${ServiceId}:`, error.message);
    throw error;
  }
};
