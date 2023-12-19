import React, { useEffect, useState } from 'react';
import authService from '../../Authentication/Service/Auth';
import ProfileHeader from './ProfileHeader';
import './Styling/FreeLancerProfile.css';
import { useAuth } from '../../../Components/Context';

const FreeLancerProfile = () => {
  const { token } = useAuth();
  const [publicProfileData, setPublicProfileData] = useState(null);

  useEffect(() => {
    const fetchPublicProfile = async () => {
      try {
        const publicProfile = await authService.getPublicProfile(token);
        setPublicProfileData(publicProfile);
      } catch (error) {
        console.error('Error fetching public profile:', error.message);
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
      <ProfileHeader />
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
              <strong>Registration Date:</strong> {publicProfileData?.registrationDate? new Date(publicProfileData.registrationDate).toLocaleDateString(): 'N/A'}
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

export default FreeLancerProfile;
