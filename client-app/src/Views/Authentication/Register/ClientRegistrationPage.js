  import React, { useState } from 'react';
  import Header from '../../../Components/Header';
  import Auth from '../Service/Auth';
  import './ClientRegistrationPage.css';
  import {  useNavigate } from 'react-router-dom';
  import { useAuth } from '../../../Components/Context';


  const ClientRegistrationPage = () => {
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
    });

    const handleInputChange = (e) => {
      setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
    };

    const handleRegistration = async (e) => {
      e.preventDefault();

      try {
        // Check if passwords match
        if (registrationData.password !== registrationData.confirmPassword) {
          throw new Error("Passwords do not match");
        }

        console.log('Registration data:', registrationData);

        // Call registration API
        const result = await Auth.register({
          FirstName: registrationData.firstName,
          LastName: registrationData.lastName,
          user_name: registrationData.username,
          Email: registrationData.email,
          Bio: registrationData.bio,
          Password: registrationData.password,
          UserTypeId: 2,
          JobTitle: registrationData.jobTitle,
          FieldOfWork: registrationData.fieldOfWork,
        });
        

        // Handle successful registration
        console.log('Registration successful:', result);

        //update the token
        setAuthToken(result);
        navigate("/ClientHome");
      } catch (error) {
        // Handle registration error
        console.error('Registration error:', error.message);
      }
    };

    return (
      <div>
        <Header showLoginLink={true} />
        <div className="registration-container">
          <h1>Client Registration</h1>
          <form onSubmit={handleRegistration}>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={registrationData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={registrationData.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={registrationData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={registrationData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bio">Bio (Description)</label>
              <textarea
                id="bio"
                name="bio"
                value={registrationData.bio}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={registrationData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={registrationData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
            <label htmlFor="jobTitle">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={registrationData.jobTitle}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fieldOfWork">Field of Work</label>
            <input
              type="text"
              id="fieldOfWork"
              name="fieldOfWork"
              value={registrationData.fieldOfWork}
              onChange={handleInputChange}
            />
          </div>
            <div className="form-group">
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default ClientRegistrationPage;

