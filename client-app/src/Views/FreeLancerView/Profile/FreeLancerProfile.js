import React, { useEffect, useState } from 'react';
import authService from '../../Authentication/Service/Auth';
import ProfileHeader from './ProfileHeader';
import { useAuth } from '../../../Components/Context';
import { useSkills } from '../../../Components/FreeLancerSkillsContext';
import {
  Avatar,
  Box,
  Grid,
  Paper,
  Typography,
} from '@mui/material';

const FreeLancerProfile = () => {
  const { token } = useAuth();
  const { selectedSkills } = useSkills();
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
  }, [token, selectedSkills]);

  

  useSkills(selectedSkills);
  console.log('Selected Skills:', selectedSkills);
  return (
    <div>
      <ProfileHeader />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 3, textAlign: 'center' }}>
              <Avatar alt="Profile Picture" src={publicProfileData?.profilePicture} sx={{ width: 100, height: 100, margin: 'auto', marginBottom: 2 }} />
              <Typography variant="h5" gutterBottom>
                {`${publicProfileData?.firstName} ${publicProfileData?.lastName}`}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {publicProfileData?.userType}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  <strong>Skills:</strong> {selectedSkills.map((skill) => skill.name).join(', ')}
                </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ padding: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Additional Information
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Field of Work:</strong> {publicProfileData?.fieldOfWork}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Job Title:</strong> {publicProfileData?.jobTitle}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Rating:</strong> {publicProfileData?.rating}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Registration Date:</strong>{' '}
                {publicProfileData?.registrationDate
                  ? new Date(publicProfileData.registrationDate).toLocaleDateString()
                  : 'N/A'}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
              <Typography variant="h5" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1">
                {publicProfileData?.bio}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default FreeLancerProfile;
