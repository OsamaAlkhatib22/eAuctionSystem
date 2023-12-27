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
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';

const FreelancerRegistrationPage = () => {
  const navigate = useNavigate();
  const { setAuthToken } = useAuth();

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
    skill_id: [],// Added for skills
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
    skill_id: '', // Added for skills
  });

  const handleInputChange = (e) => {
    setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSkillsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setRegistrationData({ ...registrationData, skill_id: selectedOptions });
    setErrors({ ...errors, skill_id: '' });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
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
        skills: '',
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

      // If there are validation errors, stop the registration
      if (Object.values(errors).some((error) => error !== '')) {
        return;
      }

      const result = await Auth.register({
        FirstName: registrationData.firstName,
        LastName: registrationData.lastName,
        user_name: registrationData.username,
        Email: registrationData.email,
        Bio: registrationData.bio,
        Password: registrationData.password,
        UserTypeId: 3,
        JobTitle: registrationData.jobTitle,
        FieldOfWork: registrationData.fieldOfWork,
        skill_id: registrationData.skill_id,
      });

      setAuthToken(result);

      navigate('/FreeLancerHome');
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };
  

  return (
    <Box>
      <Header showLoginLink={true} />
      <Container maxWidth="lg" style={{ marginTop: 70 }}>
        <Paper elevation={3} style={{ width: '101%' }}>
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
    {errors.skill_id}
  </Typography>
  <FormControl fullWidth>
    <InputLabel>Skills</InputLabel>
    <Select
      name="skill_id"
      multiple
      value={registrationData.skill_id}
      onChange={handleSkillsChange}
      renderValue={(selected) => selected.join(', ')}
    >
      <MenuItem value={1}>Backend Developer</MenuItem>
      <MenuItem value={2}>Frontend Developer</MenuItem>
      <MenuItem value={3}>Full Stack Developer</MenuItem>
    </Select>
  </FormControl>
</Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Register
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default FreelancerRegistrationPage;
