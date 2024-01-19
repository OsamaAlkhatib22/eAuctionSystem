import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import { fetchSelectedProfileInfo } from './SelectedProfileAuth'
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAuth } from "./Context";


const SelectedProfileUserNameInfo = () => {
  const { UserName } = useParams();
  const [ProfileInfo, setProfileInfo] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await fetchSelectedProfileInfo(UserName);
        setProfileInfo(details);
      } catch (error) {
        console.error("Error fetching task details:", error.message);
      }
    };

    fetchData();
  }, [UserName]);

  const handleGoBack = () => {
    navigate(-1);
  };

 
  

  return (
    <div>
      
        <IconButton onClick={handleGoBack} color="primary">
          <ArrowBackIcon />
        </IconButton>
      
      <Box sx={{ flexGrow: 1, p: 3, marginTop: 6 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 3, height: '100%', textAlign: 'center' }}>
              <Avatar alt="Profile Picture" src={ProfileInfo?.profilePicture} sx={{ width: 100, height: 100, margin: 'auto', marginBottom: 2 }} />
              <Typography variant="h5" gutterBottom>
                {`${ProfileInfo?.firstName} ${ProfileInfo?.lastName}`}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {ProfileInfo?.userType}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>{ProfileInfo?.email}</strong>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ padding: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Additional Information
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Field of Work:</strong> {ProfileInfo?.fieldOfWork}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Job Title:</strong> {ProfileInfo?.jobTitle}
              </Typography>
              {ProfileInfo?.userType === "Freelancer" && (
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  <strong>Skills:</strong> {ProfileInfo?.skills?.join(', ')}
                </Typography>
              )}
              
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Registration Date:</strong>{' '}
                {ProfileInfo?.registrationDate
                  ? new Date(ProfileInfo.registrationDate).toLocaleDateString()
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
                {ProfileInfo?.bio}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default SelectedProfileUserNameInfo;
