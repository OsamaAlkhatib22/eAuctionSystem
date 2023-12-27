import React, { useEffect, useState } from 'react';
import authService from '../../Authentication/Service/Auth';
import ClientProfileHeader from './ClientProfileHeader';
import './Styling/ClientProfile.css';
import { useAuth } from '../../../Components/Context';

const ClientProfile = () => {
  const { token } = useAuth();
  const [publicProfileData, setPublicProfileData] = useState(null);

  useEffect(() => {
    const fetchPublicProfile = async () => {
      try {
        const clientProfile = await authService.getPublicProfile(token); 
        setPublicProfileData(clientProfile);
      } catch (error) {
        console.error('Error fetching client profile:', error.message);
      }
    };

    fetchPublicProfile();
  }, [token]);

  const handleButtonClick = () => {
    // Print the saved token to the console
    console.log('Saved token:', token);
  };

  return (
    <div>
      <ClientProfileHeader />
      <div className="profile-container">
        <div className="profile-info">
          <h1>{`${publicProfileData?.firstName} ${publicProfileData?.lastName}`}</h1>
          <p>
            <strong></strong> {publicProfileData?.userType}
          </p>
          <p>{publicProfileData?.bio}</p>
          <div className="additional-info">
            <p>
              <strong>Rating:</strong> {publicProfileData?.rating}
            </p>
            <p>
              <strong>Registration Date:</strong> {publicProfileData?.registrationDate ? new Date(publicProfileData.registrationDate).toLocaleDateString() : 'N/A'}
            </p>
            <p>
              <strong>Job Title:</strong> {publicProfileData?.jobTitle}
            </p>
            <p>
              <strong>Field of Work:</strong> {publicProfileData?.fieldOfWork}
            </p>
          
            <button onClick={handleButtonClick}>
              Print Token
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
