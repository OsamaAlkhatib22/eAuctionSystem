import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  Grid,
  Paper,
  Box,
  styled,
} from '@mui/material';
import authService from '../Service/Auth';
import Header from '../../../Components/Header';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../../Components/Context';

const LoginContainer = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  marginTop: '50px',
});

const LoginForm = styled('form')({
  width: '100%',
  marginTop: '1em',
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuthToken } = useAuth();

  const [loginData, setLoginData] = useState({
    strLogin: '',
    strPassword: '',
  });

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const token = await authService.login(loginData);

      console.log('Login successful! Token:', token);
      setAuthToken(token);

      // Decode the token
      const decodedToken = jwtDecode(token);

      // Extract information from the decoded token
      const userType = decodedToken.UserType;

      if (userType === 'Client') {
        navigate('/ClientHome');
      } else if (userType === 'Free Lancer') {
        navigate('/FreeLancerHome');
      } else {
        console.error('Invalid user type');
      }
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <>
      <Header showLoginLink={false} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <LoginContainer elevation={3}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <LoginForm onSubmit={handleLogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="strLogin"
              label="Username"
              name="strLogin"
              value={loginData.strLogin}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="strPassword"
              label="Password"
              type="password"
              id="strPassword"
              value={loginData.strPassword}
              onChange={handleInputChange}
            />
            {/* Set the color attribute of Button to 'red' */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#8b0000', color: '#FFFFFF', '&:hover': { backgroundColor: '#8b0000' } }}
            >
              Login
            </Button>
          </LoginForm>
          <Grid container>
            <Grid item xs>
              <Typography variant="body2">
                {"Don't have an account? "}
                <Link to="/SplitLayout" variant="body2">
                  Create one
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </LoginContainer>
        <Box mt={8}></Box>
      </Container>
    </>
  );
};

export default LoginPage;