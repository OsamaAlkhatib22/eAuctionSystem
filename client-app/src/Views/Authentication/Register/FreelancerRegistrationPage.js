import React, { useState } from 'react';
import Header from '../../../Components/Header';
import Auth from '../Service/Auth';
import './FreelancerRegistrationPage.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Components/Context';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode

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
  });

  const handleInputChange = (e) => {
    setRegistrationData({ ...registrationData, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setRegistrationData({ ...registrationData, skills: selectedOptions });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      // Check if passwords match
      if (registrationData.password !== registrationData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const token = await Auth.register({
        FirstName: registrationData.firstName,
        LastName: registrationData.lastName,
        user_name: registrationData.username,
        Email: registrationData.email,
        Bio: registrationData.bio,
        Password: registrationData.password,
        UserTypeId: 3,
        JobTitle: registrationData.jobTitle,
        FieldOfWork: registrationData.fieldOfWork,
      });
      //const token = result.token;
      console.log('Reg successful! Token:', token);
      setAuthToken(token);

      // Decode the token
      const decodedToken = jwtDecode(token);

      // Extract information from the decoded token
      const userType = decodedToken.UserType;

      if (userType === 'Free Lancer') {
        navigate('/FreeLancerHome');
      } else {
        console.error('Invalid user type');
      }
    } catch (error) {
      // Handle registration error
      console.error('Registration error:', error.message);
    }
  };
  return (
    <div>
      <Header showLoginLink={true} />
      <div className="registration-container">
        <h1>Freelancer Registration</h1>
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
            <label htmlFor="skills">Skills</label>
            <select
              id="skills"
              name="skills"
              multiple
              value={registrationData.skills}
              onChange={handleSkillsChange}
            >
              {/* Add your suggested skills as options */}
              <option value="Skill1">Skill 1</option>
              <option value="Skill2">Skill 2</option>
              {/* Add more skills as needed */}
            </select>
          </div>
          {/* ... */}
          <div className="form-group">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FreelancerRegistrationPage;
