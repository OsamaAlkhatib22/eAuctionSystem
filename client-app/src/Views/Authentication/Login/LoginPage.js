import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import authService from '../Service/Auth';
import './LoginPage.css'; 
import Header from '../../../Components/Header';
import { jwtDecode } from "jwt-decode";
import { useAuth } from '../../../Components/Context';



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
    <div>
    <Header showLoginLink={false} />
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="strLogin">Username</label>
          <input
            type="text"
            id="strLogin"
            name="strLogin"
            value={loginData.strLogin}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="strPassword">Password</label>
          <input
            type="password"
            id="strPassword"
            name="strPassword"
            value={loginData.strPassword}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default LoginPage;
