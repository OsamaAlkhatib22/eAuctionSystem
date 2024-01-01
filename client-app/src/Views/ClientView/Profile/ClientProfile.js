import React, { useEffect, useState } from 'react';
import authService from '../../Authentication/Service/Auth';
import ClientProfileHeader from './ClientProfileHeader';
import { useAuth } from '../../../Components/Context';
import {
  Avatar,
  Box,
  Grid,
  Paper,
  Typography,
} from '@mui/material';

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

  return (
    <div>
      <ClientProfileHeader />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Profile
              </Typography>
              <Avatar alt="Profile Picture" src={publicProfileData?.profilePicture} sx={{ width: 100, height: 100, margin: 'auto', marginBottom: 2 }} />
              <Typography variant="h5" gutterBottom>
                {`${publicProfileData?.firstName} ${publicProfileData?.lastName}`}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {publicProfileData?.userType}
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

export default ClientProfile;
