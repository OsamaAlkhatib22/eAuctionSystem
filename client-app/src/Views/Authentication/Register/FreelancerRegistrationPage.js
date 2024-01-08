import React, { useState } from 'react';
import Header from '../../../Components/Header';
import Auth from '../Service/Auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Components/Context';

import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Box,
  Snackbar,
  MenuItem,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

const FreelancerRegistrationPage = () => {
  const navigate = useNavigate();
  const { setAuthToken } = useAuth();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [loading, setLoading] = useState(false);


  const [selectedSkills, setSelectedSkills] = useState([]);
  

  const skillsOptions = [
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
    { id: 32, name: 'C#' },
    { id: 33, name: 'Unity3D' },
    
];


  const [registrationData, setRegistrationData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    bio: '',
    password: '',
    confirmPassword: '',
    jobTitle: '',
    fieldOfWork: '',
    Skills:[]
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    bio: '',
    password: '',
    confirmPassword: '',
    jobTitle: '',
    fieldOfWork: '',
  });

  const handleInputChange = (e) => {
    setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };


  const handleRegistration = async (e) => {
    e.preventDefault();

    for (const key in registrationData) {
      if (registrationData[key] === '') {
        setErrors((prevErrors) => ({ ...prevErrors, [key]: 'This field is required.' }));
      }
    }

    try {

      if (Object.values(errors).some((error) => error !== '')) {
        setSnackbarMessage('Please fill in all the required fields.');
        setSnackbarOpen(true);
        return;
      }

      setErrors({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        bio: '',
        password: '',
        confirmPassword: '',
        jobTitle: '',
        fieldOfWork: '',

      });

      if (!/^[a-zA-Z ]{2,}$/.test(registrationData.firstName)) {
        let errorText = 'First name must contain at least 2 characters. ';

        if (/\d/.test(registrationData.firstName)) {
          errorText += 'First name must not contain any numbers. ';
        }

        if (/[^a-zA-Z\d\s]/.test(registrationData.firstName)) {
          errorText += 'First name must not contain any special characters. ';
        }

        setErrors((prevErrors) => ({ ...prevErrors, firstName: errorText }));
      }

      if (!/^[a-zA-Z ]{2,}$/.test(registrationData.lastName)) {
        let errorText = 'Last name must contain at least 2 characters. ';

        if (/\d/.test(registrationData.lastName)) {
          errorText += 'Last name must not contain any numbers. ';
        }

        if (/[^a-zA-Z\d\s]/.test(registrationData.lastName)) {
          errorText += 'Last name must not contain any special characters. ';
        }

        setErrors((prevErrors) => ({ ...prevErrors, lastName: errorText }));
      }

      if (registrationData.username.length < 4) {
        setErrors((prevErrors) => ({ ...prevErrors, username: 'Username must be at least 4 characters long' }));
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registrationData.email)) {
        setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email format' }));
      }

      if (registrationData.password.length < 8 || !/(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(registrationData.password)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: 'Password must be at least 8 characters long and include one digit, one special character, one lowercase letter, and one uppercase letter',
        }));
      }

      if (registrationData.password !== registrationData.confirmPassword) {
        setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: 'Passwords do not match' }));
      }

      if (!/^[a-zA-Z ]{4,}$/.test(registrationData.jobTitle)) {
        let errorText = '';

        if (registrationData.jobTitle.length < 4) {
          errorText += 'Job title must be at least 4 characters long. ';
        }

        if (/\d/.test(registrationData.jobTitle)) {
          errorText += 'Job title must not contain any numbers. ';
        }

        if (/[^a-zA-Z\d\s]/.test(registrationData.jobTitle)) {
          errorText += 'Job title must not contain any special characters. ';
        }

        setErrors((prevErrors) => ({ ...prevErrors, jobTitle: errorText }));
      }

      if (!/^[a-zA-Z ]{4,}$/.test(registrationData.fieldOfWork)) {
        let errorText = '';

        if (registrationData.fieldOfWork.length < 4) {
          errorText += 'Field of work must be at least 4 characters long. ';
        }

        if (/\d/.test(registrationData.fieldOfWork)) {
          errorText += 'Field of work must not contain any numbers. ';
        }

        if (/[^a-zA-Z\d\s]/.test(registrationData.fieldOfWork)) {
          errorText += 'Field of work must not contain any special characters. ';
        }

        setErrors((prevErrors) => ({ ...prevErrors, fieldOfWork: errorText }));
      }

      if (Object.values(errors).some((error) => error !== '')) {
        setSnackbarMessage('There are validation errors. Please check the form.');
        setSnackbarOpen(true);
        return;
      }

      setLoading(true);

      const result = await Auth.register({
        FirstName: registrationData.firstName,
        LastName: registrationData.lastName,
        user_name: registrationData.username,
        Email: registrationData.email,
        Bio: registrationData.bio,
        Password: registrationData.password,
        confirmPassword: registrationData.confirmPassword,
        UserTypeId: 3,
        JobTitle: registrationData.jobTitle,
        FieldOfWork: registrationData.fieldOfWork,
        Skills: selectedSkills.map((skill) => skill.id),
      });

      setAuthToken(result);

      navigate('/FreeLancerHome');
    } catch (error) {
      console.error('Registration error:', error.message);

      
      if (error.response && error.response.status === 400) {
        setSnackbarMessage(error.response.data); // Assuming the error message is in the response data
        setSnackbarOpen(true);
      }

    }finally {
      setLoading(false); // Reset loading state when registration is complete (whether success or failure)
    }

  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  
  const handleSkillsChange = (event, value) => {
    setSelectedSkills(value);
  };

  return (
    <Box>
      <Header showLoginLink={true} />
      <Container maxWidth="lg" style={{ marginTop: 70 }}>
        <Paper elevation={3} style={{ width: '101%', padding: '30px' }}>
          <Grid container spacing={3} direction="row" alignItems="center" component="form" onSubmit={handleRegistration}>
            <Grid item xs={6}>
              <Typography variant="h4">Freelancer Registration</Typography>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="error">
                {errors.firstName}
              </Typography>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                name="firstName"
                value={registrationData.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="error">
                {errors.lastName}
              </Typography>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                name="lastName"
                value={registrationData.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="error">
                {errors.username}
              </Typography>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                name="username"
                value={registrationData.username}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="error">
                {errors.email}
              </Typography>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                type="email"
                value={registrationData.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption" color="error">
                {errors.bio}
              </Typography>
              <TextField
                label="Bio (Description)"
                multiline
                rows={3}
                fullWidth
                variant="outlined"
                name="bio"
                value={registrationData.bio}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="error">
                {errors.password}
              </Typography>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                type="password"
                value={registrationData.password}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="error">
                {errors.confirmPassword}
              </Typography>
              <TextField
                label="Confirm Password"
                variant="outlined"
                fullWidth
                name="confirmPassword"
                type="password"
                value={registrationData.confirmPassword}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="error">
                {errors.jobTitle}
              </Typography>
              <TextField
                label="Job Title"
                variant="outlined"
                fullWidth
                name="jobTitle"
                value={registrationData.jobTitle}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="error">
                {errors.fieldOfWork}
              </Typography>
              <TextField
                label="Field of Work"
                variant="outlined"
                fullWidth
                name="fieldOfWork"
                value={registrationData.fieldOfWork}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="error">
                Skills
              </Typography>
              <Autocomplete
                multiple
                id="skills"
                options={skillsOptions}
                getOptionLabel={(option) => option.name}
                value={selectedSkills}
                onChange={handleSkillsChange}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" fullWidth placeholder="Add Skills" />
                )}
                renderOption={(props, option) => (
                  <MenuItem {...props} key={option.id}>
                    {option.name}
                  </MenuItem>
                )}
              />
            </Grid>
          
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" style={{ backgroundColor: '#8b0000', color: '#fff' }}>
              {loading ? 'Registering...' : 'Register'}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} message={snackbarMessage} />
    </Box>
  );
};

export default FreelancerRegistrationPage;
