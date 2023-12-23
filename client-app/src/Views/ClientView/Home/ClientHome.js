import React, { useState } from 'react';
import HomeHeader from './HomeHeader';
import { useAuth } from '../../../Components/Context';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
} from '@mui/material';

function ClientHome() {
  const { token } = useAuth();
  console.log('Token:', token);

  const [taskData, setTaskData] = useState({
    Title: '',
    Description: '',
    bid_duration: '',
    starting_bid: '',
    CategoryId: 1,
    fileMedia: '',
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, type } = e.target;

    if (type === 'file') {
      const file = e.target.files[0]; // Get the first selected file
      setTaskData((prevData) => ({
        ...prevData,
        [name]: file,
      }));
    } else {
      const { value } = e.target;
      setTaskData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCreateTask = async () => {
    try {
      const formData = new FormData();

      Object.entries(taskData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch('https://localhost:5000/api/Task/CreateTask', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setSnackbarOpen(true); // Display success message
        console.log('Task created successfully');
      } else {
        console.error('Failed to create task:', await response.text());
      }
    } catch (error) {
      console.error('Error creating task:', error.message);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <HomeHeader />
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Create Task
          </Typography>
          <Divider />
          <Box mt={2} mb={2}>
            <TextField
              fullWidth
              label="Title"
              name="Title"
              value={taskData.Title}
              onChange={handleInputChange}
            />
          </Box>
          <Box mt={2} mb={2}>
            <TextField
              fullWidth
              label="Description"
              name="Description"
              multiline
              value={taskData.Description}
              onChange={handleInputChange}
            />
          </Box>
          <Box mt={2} mb={2}>
            <TextField
              fullWidth
              label="Bid Duration"
              name="bid_duration"
              value={taskData.bid_duration}
              onChange={handleInputChange}
            />
          </Box>
          <Box mt={2} mb={2}>
            <TextField
              fullWidth
              label="Starting Bid"
              name="starting_bid"
              value={taskData.starting_bid}
              onChange={handleInputChange}
            />
          </Box>
          <Box mt={2} mb={2}>
            <FormControl fullWidth>
              <InputLabel>Category </InputLabel>
              <Select
                name="CategoryId"
                value={taskData.CategoryId}
                onChange={handleInputChange}
              >
               <MenuItem value={1}>Graphic Design</MenuItem>
                <MenuItem value={2}>Writing & Translation</MenuItem>
                <MenuItem value={3}>Digital Marketing</MenuItem>
                <MenuItem value={4}>Networking</MenuItem>
                <MenuItem value={5}>Music & Audio</MenuItem>
                <MenuItem value={6}>General Tasks</MenuItem>
                <MenuItem value={7}>Web Development</MenuItem>
                <MenuItem value={8}>Frontend Development</MenuItem>
                <MenuItem value={9}>Database Administration</MenuItem>
                <MenuItem value={10}>Other Services</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mt={2} mb={2}>
            <label>
              Add Image
              <input type="file" name="fileMedia" onChange={handleInputChange} />
            </label>
          </Box>
          <Box mt={2} mb={2}>
            <Button variant="contained" color="primary" onClick={handleCreateTask}>
              Create Task
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Task created successfully!"
      />
    </div>
  );
}

export default ClientHome;
