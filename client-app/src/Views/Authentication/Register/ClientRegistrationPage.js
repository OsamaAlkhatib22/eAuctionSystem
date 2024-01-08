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
} from '@mui/material';

const ClientRegistrationPage = () => {
  const navigate = useNavigate();
  const { setAuthToken } = useAuth();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [loading, setLoading] = useState(false);

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
    setErrors({ ...errors, [e.target.name]: '' }); // Clear the error when the user starts typing
  };
  const handleRegistration = async (e) => {
    e.preventDefault();


    try {

      // Reset errors
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
  
      // Validation code...
  
      if (!/^[a-zA-Z ]{2,}$/.test(registrationData.firstName)) {
        let errorText = 'First name must contain at least 2 characters long. ';
      
        // Check for the presence of numbers
        if (/\d/.test(registrationData.firstName)) {
          errorText += 'First name must not contain any numbers. ';
        }
      
        // Check for the presence of special characters
        if (/[^a-zA-Z\d\s]/.test(registrationData.firstName)) {
          errorText += 'First name must not contain any special characters. ';
        }
      
        setErrors((prevErrors) => ({ ...prevErrors, firstName: errorText }));
      }
      
      if (!/^[a-zA-Z ]{2,}$/.test(registrationData.lastName)) {
        let errorText = 'last name must contain at least 2 characters long. ';
      
        // Check for the presence of numbers
        if (/\d/.test(registrationData.lastName)) {
          errorText += 'Last name must not contain any numbers. ';
        }
      
        // Check for the presence of special characters
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
      
        // Check for minimum length
        if (registrationData.jobTitle.length < 4) {
          errorText += 'Job title must be at least 4 characters long. ';
        }
      
        // Check for the presence of numbers
        if (/\d/.test(registrationData.jobTitle)) {
          errorText += 'Job title must not contain any numbers. ';
        }
      
        // Check for the presence of special characters
        if (/[^a-zA-Z\d\s]/.test(registrationData.jobTitle)) {
          errorText += 'Job title must not contain any special characters. ';
        }
      
        setErrors((prevErrors) => ({ ...prevErrors, jobTitle: errorText }));
      }
      
  
      if (!/^[a-zA-Z ]{4,}$/.test(registrationData.fieldOfWork)) {
        let errorText = '';
      
        // Check for minimum length
        if (registrationData.fieldOfWork.length < 4) {
          errorText += 'Field of work must be at least 4 characters long. ';
        }
      
        // Check for the presence of numbers
        if (/\d/.test(registrationData.fieldOfWork)) {
          errorText += 'Field of work must not contain any numbers. ';
        }
      
        // Check for the presence of special characters
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

      setLoading(true);// Set loading state to true while waiting for registration
  
      // If no errors, proceed with registration
      const result = await Auth.register({
        FirstName: registrationData.firstName,
        LastName: registrationData.lastName,
        user_name: registrationData.username,
        Email: registrationData.email,
        Bio: registrationData.bio,
        Password: registrationData.password,
        confirmPassword: registrationData.confirmPassword,
        UserTypeId: 2,
        JobTitle: registrationData.jobTitle,
        FieldOfWork: registrationData.fieldOfWork,
      });
  
      setAuthToken(result);
      navigate('/ClientHome');
    } catch (error) {
      console.error('Registration error:', error.message);

      if (error.response && error.response.status === 400) {
        setSnackbarMessage(error.response.data); // Assuming the error message is in the response data
        setSnackbarOpen(true);
      }
    } finally {
      setLoading(false); // Reset loading state when registration is complete (whether success or failure)
    }


  };
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <Box>
      <Header showLoginLink={true} />
      <Container maxWidth="lg" style={{ marginTop: 70 }} >
        <Paper elevation={3} style={{ width: '101%' , padding: '30px' }} >
          <Grid container spacing={3} direction="row" alignItems="center" component="form" onSubmit={handleRegistration}>
            <Grid item xs={6}>
              <Typography variant="h4">Client Registration</Typography>
            </Grid>
            <Grid item xs={6}>
              {/*  space */}
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="error">{errors.firstName}</Typography>
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
              <Typography variant="caption" color="error">{errors.lastName}</Typography>
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
            <Typography variant="caption" color="error">{errors.username}</Typography>
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
            <Typography variant="caption" color="error">{errors.email}</Typography>
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
              <Typography variant="caption" color="error">{errors.bio}</Typography>
              <TextField
                label="Bio (Description)"
                multiline
                rows={3} // Set the number of visible rows
                fullWidth
                variant="outlined"
                name="bio"
                value={registrationData.bio}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption" color="error">{errors.password}</Typography>
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
              <Typography variant="caption" color="error">{errors.confirmPassword}</Typography>
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
              <Typography variant="caption" color="error">{errors.jobTitle}</Typography>
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
              <Typography variant="caption" color="error">{errors.fieldOfWork}</Typography>
              <TextField
                label="Field of Work"
                variant="outlined"
                fullWidth
                name="fieldOfWork"
                value={registrationData.fieldOfWork}
                onChange={handleInputChange}
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

export default ClientRegistrationPage;
