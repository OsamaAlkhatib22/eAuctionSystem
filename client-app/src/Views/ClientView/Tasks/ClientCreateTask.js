import React, { useState } from 'react';
import HomeHeader from '../Home/HomeHeader';
import { useAuth } from '../../../Components/Context';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

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
  IconButton,
  Autocomplete,
  Grid,
} from '@mui/material';

function ClientCreateTask() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    Title: '',
    Description: '',
    bid_duration: '',
    starting_bid: 0,
    CategoryId: 1,
    media_ref: '',

  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);


  const TaskskillsOptions = [
    { id: 1, name: 'HTML' },
    { id: 2, name: 'CSS' },
    { id: 3, name: 'JavaScript' },
    { id: 4, name: 'React.js' },
    { id: 5, name: 'Angular' },
    { id: 6, name: 'Vue.js' },
    { id: 7, name: 'Node.js' },
    { id: 8, name: 'Express.js' },
    { id: 9, name: 'Python' },
    { id: 10, name: 'Django' },
    { id: 11, name: 'Flask' },
    { id: 12, name: 'Java' },
    { id: 13, name: 'Spring Framework' },
    { id: 14, name: 'OOP' },
    { id: 15, name: '.NET' },
    { id: 16, name: 'SQL' },
    { id: 17, name: 'MySQL' },
    { id: 18, name: 'PostgreSQL' },
    { id: 19, name: 'MongoDB' },
    { id: 20, name: 'Git' },
    { id: 21, name: 'DevOps' },
    { id: 22, name: 'Mobile App Development' },
    { id: 23, name: 'iOS Development' },
    { id: 24, name: 'Android Development' },
    { id: 25, name: 'Unity' },
    { id: 26, name: 'Data Science' },
    { id: 27, name: 'Machine Learning' },
    { id: 28, name: 'TensorFlow' },
    { id: 29, name: 'PyTorch' },
    { id: 30, name: 'Game Development' },
    { id: 31, name: 'C++' },
    {id: 32, name: 'c#'},
    { id: 33, name: 'Unity3D' },
    
];
  

  const handleInputChange = (e) => {
    const { type, name } = e.target;

    if (type === 'file') {
      const files = e.target.files;
      const attachments = Array.from(files).map((file) => ({
        fileMedia: file,
        blnIsVideo: false,
      }));

      setSelectedFiles(attachments);

      setTaskData((prevData) => ({
        ...prevData,
        lstMedia: attachments,
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

      // Use selectedFiles array
      selectedFiles.forEach((attachment, index) => {
        formData.append(`lstMedia[${index}].fileMedia`, attachment.fileMedia);
        formData.append(`lstMedia[${index}].blnIsVideo`, attachment.blnIsVideo);
      });

      Object.entries(taskData).forEach(([key, value]) => {
        // Exclude lstMedia from re-appending
        if (key !== 'lstMedia') {
          formData.append(key, value);
        }
      });
      selectedSkills.forEach((skill, index) => {
        // Ensure that SkillId is present before appending to form data
        if (skill && skill.id) {
          formData.append(`SkillId[${index}]`, skill.id);
        }
      });

      const response = await fetch('https://localhost:5000/api/Task/CreateTask', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setSnackbarOpen(true);
        console.log('Task created successfully');
      } else {
        console.error('Failed to create task:', await response.text());
      }
    } catch (error) {
      console.error('Error creating task:', error.message);
    }
  };
  const handleSkillSelection = (event, values) => {
    // Filter the selected values to ensure they are present in the skillsOptions array
    const validSelectedSkills = values.filter((selectedSkill) =>
    TaskskillsOptions.some((option) => option.id === selectedSkill.id)
    );
  
    setSelectedSkills(validSelectedSkills);
  };
  
  

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleGoBack = () => {
    navigate('/ClientHome');
  };

  return (
    <div>
      <HomeHeader />
      <Card>
        <IconButton onClick={handleGoBack} color="primary">
          <ArrowBackIcon />
        </IconButton>
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
              <InputLabel>Category ID</InputLabel>
              <Select
                name="CategoryId"
                value={taskData.CategoryId}
                onChange={handleInputChange}
              >
                 <MenuItem value={1}>Web Development</MenuItem>
                <MenuItem value={2}>Frontend Development</MenuItem>
                <MenuItem value={3}>Backend Development</MenuItem>
                <MenuItem value={4}>Database Administration</MenuItem>
                <MenuItem value={5}>DevOps</MenuItem>
                <MenuItem value={6}>Mobile App Development</MenuItem>
                <MenuItem value={7}>Game Development</MenuItem>
                <MenuItem value={8}>Data Science</MenuItem>
                <MenuItem value={9}>Machine Learning</MenuItem>
                <MenuItem value={10}>Other Programming Services</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box mt={2} mb={2}>
              <Autocomplete
                multiple
                id="skills"
                options={TaskskillsOptions}
                getOptionLabel={(option) => option.name}
                onChange={handleSkillSelection}
                value={selectedSkills}
                renderInput={(params) => (
                  <TextField {...params} label="Skills Requirements For This Task" fullWidth />
                )}
              />
          </Box>
          <Box mt={2} mb={2}>
            <label>
              Add Image
              <input type="file" name="lstMedia[0].fileMedia" onChange={handleInputChange} multiple />
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

export default ClientCreateTask;
