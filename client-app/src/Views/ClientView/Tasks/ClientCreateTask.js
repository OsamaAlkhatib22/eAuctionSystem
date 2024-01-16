import React, { useState } from 'react';
import HomeHeader from '../Home/HomeHeader';
import { useAuth } from '../../../Components/Context';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

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
    TaskSubmissionTime: '',
    media_ref: '',

  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  //snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState('');
  

  //bid duration 
  const [bidHours, setBidHours] = useState(0);
  const [bidMinutes, setBidMinutes] = useState(0);
  const [bidSeconds, setBidSeconds] = useState(0);

  //deadline 
  const [submissionYear, setSubmissionYear] = useState('');
  const [submissionMonth, setSubmissionMonth] = useState('');
  const [submissionDay, setSubmissionDay] = useState('');
  const [submissionHours, setSubmissionHours] = useState('00');
  const [submissionMinutes, setSubmissionMinutes] = useState('00');
  const [submissionSeconds, setSubmissionSeconds] = useState('00');




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
  const handleSkillSelection = (event, values) => {
    setSelectedSkills(values);
  };
//bid duration 
  const handleBidDurationChange = (name, value) => {
    switch (name) {
      case 'bidHours':
        setBidHours(value);
        break;
      case 'bidMinutes':
        setBidMinutes(value);
        break;
      case 'bidSeconds':
        setBidSeconds(value);
        break;
      default:
        break;
    }
  };

  //deadline

  const handleSubmissionTimeChange = (name, value) => {
    switch (name) {
      case 'submissionYear':
        setSubmissionYear(value);
        break;
      case 'submissionMonth':
        setSubmissionMonth(value);
        break;
      case 'submissionDay':
        setSubmissionDay(value);
        break;
      case 'submissionHours':
        setSubmissionHours(value);
        break;
      case 'submissionMinutes':
        setSubmissionMinutes(value);
        break;
      case 'submissionSeconds':
        setSubmissionSeconds(value);
        break;
      default:
        break;
    }
  };
  
  

  const handleCreateTask = async () => {
    try {
      const formData = new FormData();

      const uniqueSelectedSkills = Array.from(new Set(selectedSkills.map(skill => skill.id)))
      .map(id => TaskskillsOptions.find(skill => skill.id === id));

      const bidDuration = `${bidHours}:${bidMinutes}:${bidSeconds}`;
    formData.append('bid_duration', bidDuration);

    const taskSubmissionTime = `${submissionYear}-${submissionMonth}-${submissionDay}T${submissionHours}:${submissionMinutes}:${submissionSeconds}Z`;
    formData.append('TaskSubmissionTime', taskSubmissionTime);


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
      uniqueSelectedSkills.forEach((skill, index) => {
        formData.append(`skillId[${index}]`, skill.id);
      });

      // validate title
      const titleRegex = /[a-zA-Z].*[a-zA-Z].*[a-zA-Z].*[a-zA-Z]/;
    if (!titleRegex.test(taskData.Title)) {
      setSnackbarMessage("Title must contain at least 4 alphabetical characters.");
      setSnackbarOpen(true);
      return;
    }

      // validate skills
      if (selectedSkills.length === 0) {
        setSnackbarMessage("Please select at least one skill.");
        setSnackbarOpen(true);
        return;
      }
      
    

      const response = await fetch('https://localhost:5000/api/Task/CreateTask', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setSnackbarMessage('Task created successfully');
        setSnackbarOpen(true);
        console.log('Task created successfully');

        setTimeout(() => {
          navigate('/MyTasks');
        }, 1000);
      } else {
        console.error('Failed to create task:', await response.text());
        setErrorSnackbarMessage('Failed to create task');
      setErrorSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error creating task:', error.message);
    }
  };
  
  

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setErrorSnackbarOpen(false);
  };

  const handleGoBack = () => {
    navigate('/ClientHome');
  };

  const padWithZero = (number) => {
    return number < 10 ? `0${number}` : `${number}`;
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

          {/* Grid container for two-column layout */}
          <Grid container spacing={3}>
            {/* Left Side */}
            <Grid item xs={12} md={6}>
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
                  label="Budget"
                  name="starting_bid"
                  value={taskData.starting_bid}
                  onChange={handleInputChange}
                />
              </Box>

              <Box mt={2} mb={2}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select name="CategoryId" value={taskData.CategoryId} onChange={handleInputChange}>
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
                  <input type="file" name="lstMedia[0].fileMedia" onChange={handleInputChange} accept="image/*" multiple />
                </label>
              </Box>
            </Grid>

            {/* Right Side */}
            <Grid item xs={12} md={6}>
              <Box mt={2} mb={2}>
                <Typography variant="h6">Bid Duration</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <TextField
                      type="number"
                      label="Hours"
                      name="bidHours"
                      value={bidHours}
                      onChange={(e) => handleBidDurationChange(e.target.name, e.target.value)}
                      inputProps={{ min: 0, max: 23 }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography>:</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      type="number"
                      label="Minutes"
                      name="bidMinutes"
                      value={bidMinutes}
                      onChange={(e) => handleBidDurationChange(e.target.name, e.target.value)}
                      inputProps={{ min: 0, max: 59 }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography>:</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      type="number"
                      label="Seconds"
                      name="bidSeconds"
                      value={bidSeconds}
                      onChange={(e) => handleBidDurationChange(e.target.name, e.target.value)}
                      inputProps={{ min: 0, max: 59 }}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box mt={2} mb={2}>
                <Typography variant="h6">Task DeadLine</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <TextField
                      type="number"
                      label="Year"
                      name="submissionYear"
                      value={submissionYear}
                      onChange={(e) => handleSubmissionTimeChange(e.target.name, e.target.value)}
                      inputProps={{ min: 2024, max: 2030 }} // You can adjust the range as needed
                    />
                  </Grid>
                  <Grid item>
                    <Typography>-</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      type="number"
                      label="Month"
                      name="submissionMonth"
                      value={submissionMonth}
                      onChange={(e) => handleSubmissionTimeChange(e.target.name, padWithZero(e.target.value))}
                      inputProps={{ min: 1, max: 12 }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography>-</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      type="number"
                      label="Day"
                      name="submissionDay"
                      value={submissionDay}
                      onChange={(e) => handleSubmissionTimeChange(e.target.name, padWithZero(e.target.value))}
                      inputProps={{ min: 1, max: 31 }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography></Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      type="number"
                      label="Hours"
                      name="submissionHours"
                      value={submissionHours}
                      onChange={(e) => handleSubmissionTimeChange(e.target.name, padWithZero(e.target.value))}
                      inputProps={{ min: 0, max: 23 }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography>:</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      type="number"
                      label="Minutes"
                      name="submissionMinutes"
                      value={submissionMinutes}
                      onChange={(e) => handleSubmissionTimeChange(e.target.name, padWithZero(e.target.value))}
                      inputProps={{ min: 0, max: 59 }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography>:</Typography>
                  </Grid>
                  <Grid item>
                    <TextField
                      type="number"
                      label="Seconds"
                      name="submissionSeconds"
                      value={submissionSeconds}
                      onChange={(e) => handleSubmissionTimeChange(e.target.name, padWithZero(e.target.value))}
                      inputProps={{ min: 0, max: 59 }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>

          {/* Create Task button */}
          <Box mt={2} mb={2}>
            <Button variant="contained" color="primary" onClick={handleCreateTask} style={{ backgroundColor: '#8b0000', color: 'white' }}>
              Create Task
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Snackbar notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={errorSnackbarMessage}
      />
    </div>
  );
}

export default ClientCreateTask;