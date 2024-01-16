import React, { useEffect, useState } from 'react';
import authService from '../../Authentication/Service/Auth';
import ClientProfileHeader from './ClientProfileHeader';
import { useAuth } from '../../../Components/Context';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,

} from '@mui/material';

const ClientProfile = () => {
  const { token } = useAuth();
  const { clearAuthToken } = useAuth();

  const navigate = useNavigate();

  const [isUsernameTaken, setIsUsernameTaken] = useState(false);

  const [publicProfileData, setPublicProfileData] = useState(null);
  const [userWallet, setUserWallet] = useState(null);
  const [amountToAdd, setAmountToAdd] = useState(0);
  const [isAddingMoney, setIsAddingMoney] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [isEditing, setIsEditing] = useState(false);
  const [updatedInfo, setUpdatedInfo] = useState({
    strNewUsername: '',
    strOldPassword: '',
    strNewPassword: '',
    strNewBio: '',
    strNewFieldOfWork: '',
    strNewJobTitle: '',
  });

  useEffect(() => {
    const fetchPublicProfile = async () => {
      try {
        const clientProfile = await authService.getPublicProfile(token);
        setPublicProfileData(clientProfile);

        //walet
        const walletData = await authService.getUserWallet(token);
        setUserWallet(walletData);
      } catch (error) {
        console.error('Error fetching client profile:', error.message);
      }
    };

    fetchPublicProfile();
  }, [token]);

  const handleAddMoney = async () => {
    try {
      setIsAddingMoney(true);

      if (amountToAdd < 1) {
        setSnackbarMessage('Amount must be 1$ or more.');
        setSnackbarOpen(true);
        setIsAddingMoney(false);
        return;
      }

      console.log('Amount to Add:', amountToAdd);
      // Send a request to add money to the wallet
      await authService.addMoneyToWallet(token, amountToAdd);

      // Refresh the user's wallet after the transaction
      const walletData = await authService.getUserWallet(token);
      setUserWallet(walletData);

      // Reset the amountToAdd and close the add money dialog
      setAmountToAdd(0);
      setIsAddingMoney(false);
    } catch (error) {
      console.error('Error adding money to wallet:', error.message);
      setIsAddingMoney(false);
    }
  };

  const handleEditPersonalInfo = () => {
    setIsEditing(!isEditing);
    // Reset the updatedInfo state when entering edit mode
    if (!isEditing) {
      setUpdatedInfo({
        strNewUsername: '',
        strOldPassword: '',
        strNewPassword: '',
        strNewBio: publicProfileData?.bio || '',
        strNewFieldOfWork: publicProfileData?.fieldOfWork || '',
        strNewJobTitle: publicProfileData?.jobTitle || '',
      });
    }
  };

  const handleUpdatePersonalInfo = async () => {
    try {
      if (updatedInfo.strNewUsername) {
        // Check if the new username is already used
        const usernameTaken = await authService.isUsernameTaken(updatedInfo.strNewUsername);
  
        if (usernameTaken) {
          setSnackbarMessage('Username is already used.');
          setSnackbarOpen(true);
          setIsUsernameTaken(true); // Set the state to handle UI indication if needed
          return;
        } else {
          setIsUsernameTaken(false); // Reset the state
        }
      }

      if (
        updatedInfo.strNewFieldOfWork.length < 5 ||
        !/^[a-zA-Z& ]+$/.test(updatedInfo.strNewFieldOfWork)
      ) {
        setSnackbarMessage(
          'Field of work must be at least 5 characters long, and can only contain letters and the "&" character.'
        );
        setSnackbarOpen(true);
        return;
      }

      if (
        updatedInfo.strNewJobTitle.length < 5 ||
        !/^[a-zA-Z& ]+$/.test(updatedInfo.strNewJobTitle)
      ) {
        setSnackbarMessage(
          'Job title must be at least 5 characters long, and can only contain letters and the "&" character.'
        );
        setSnackbarOpen(true);
        return;
      }



      console.log('Updating personal info with:', updatedInfo);

      await authService.updatePersonalInfo(token, updatedInfo);

      setIsEditing(false);
      setSnackbarMessage('Personal information updated successfully.');
      setSnackbarOpen(true);

      if (updatedInfo.strNewUsername) {
        setTimeout(() => {
          // Clear authentication token and navigate to login page
          clearAuthToken();
          navigate('/login');
        }, 1000);
      } else {
        // Fetch updated public profile if the username is not updated
        const updatedPublicProfile = await authService.getPublicProfile(token);
        setPublicProfileData(updatedPublicProfile);
      }
    } catch (error) {
      console.error('Error updating personal information:', error.message);
      setSnackbarMessage(`Error updating personal information`);
    setSnackbarOpen(true);
    }
  };

  return (
    <div>
      <ClientProfileHeader />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 3, height: '100%' ,  textAlign: 'center'}}>
              <Typography variant="h5" gutterBottom>
                Profile
              </Typography>
              <Avatar alt="Profile Picture" src={publicProfileData?.profilePicture} sx={{ width: 100, height: 100, margin: 'auto', marginBottom: 2 }} />
              <Typography variant="h5" gutterBottom>
                {`${publicProfileData?.firstName} ${publicProfileData?.lastName}`}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                <strong>{publicProfileData?.userType}</strong>
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>{publicProfileData?.email}</strong> 
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ padding: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Additional Information
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1, minHeight: 10 }}>
                
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2, minHeight: 20 }}>
                <strong>Field of Work:</strong> {publicProfileData?.fieldOfWork}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1, minHeight: 10 }}>
                
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2, minHeight: 20 }}>
                <strong>Job Title:</strong> {publicProfileData?.jobTitle}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 1, minHeight: 10 }}>
                
              </Typography>
              

              <Typography variant="body1" sx={{ marginBottom: 2, minHeight: 20 }}>
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
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Wallet
              </Typography>
              {userWallet ? (
                <>
                  <Typography variant="body1">
                    <strong>Balance:</strong> {userWallet.balance} $
                  </Typography>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: '#8b0000', color: '#fff' }}
                    onClick={() => setIsAddingMoney(true)}
                    disabled={isAddingMoney}
                  >
                    Add money to wallet
                  </Button>
                  <Dialog open={isAddingMoney} onClose={() => setIsAddingMoney(false)}>
                    <DialogTitle>Add Money to Wallet</DialogTitle>
                    <DialogContent>
                    <TextField
                        label="Amount"
                        type="number"
                        value={amountToAdd}
                        onChange={(e) => {
                            const newValue = Number(e.target.value.trim()) || 0;
                            console.log('New Value:', newValue);
                            setAmountToAdd(newValue);
                        }}
                    />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setIsAddingMoney(false)}>Cancel</Button>
                      <Button onClick={handleAddMoney} color="primary">
                        Confirm
                      </Button>
                    </DialogActions>
                  </Dialog>
                </>
              ) : (
                <Typography variant="body1">Loading wallet data...</Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mb: 2 }}>
        <Button
          variant="contained"
          style={{ backgroundColor: '#8b0000', color: '#fff' }}
          onClick={() => handleEditPersonalInfo()}
        >
          Edit Personal Info
        </Button>
      </Box>

        
          <Dialog open={isEditing} onClose={() => setIsEditing(false)} maxWidth="md" fullWidth>
  <DialogTitle>Edit Personal Information</DialogTitle>
  <DialogContent>
    <Paper sx={{ width: '100%', padding: 2 }}>
      {/* Input fields for editing personal information */}
      <TextField
        label="New Username"
        fullWidth
        value={updatedInfo.strNewUsername}
        onChange={(e) => setUpdatedInfo({ ...updatedInfo, strNewUsername: e.target.value })}
      />

      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <TextField
          label="Old Password"
          type="password"
          fullWidth
          value={updatedInfo.strOldPassword}
          onChange={(e) => setUpdatedInfo({ ...updatedInfo, strOldPassword: e.target.value })}
        />
        <TextField
          label="New Password"
          type="password"
          fullWidth
          value={updatedInfo.strNewPassword}
          onChange={(e) => setUpdatedInfo({ ...updatedInfo, strNewPassword: e.target.value })}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <TextField
          label="Bio"
          fullWidth
          multiline
          rows={4}
          value={updatedInfo.strNewBio}
          onChange={(e) => setUpdatedInfo({ ...updatedInfo, strNewBio: e.target.value })}
        />
      </Box>

      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <TextField
          label="Field of Work"
          fullWidth
          value={updatedInfo.strNewFieldOfWork}
          onChange={(e) => setUpdatedInfo({ ...updatedInfo, strNewFieldOfWork: e.target.value })}
        />
        <TextField
          label="Job Title"
          fullWidth
          value={updatedInfo.strNewJobTitle}
          onChange={(e) => setUpdatedInfo({ ...updatedInfo, strNewJobTitle: e.target.value })}
        />
      </Box>

     
    </Paper>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setIsEditing(false)} style={{ color: '#8b0000' }}>
      Cancel
      </Button>
    <Button onClick={handleUpdatePersonalInfo} color="primary" style={{ color: '#8b0000' }}>
      Save Changes
    </Button>
  </DialogActions>
</Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
};

export default ClientProfile;
