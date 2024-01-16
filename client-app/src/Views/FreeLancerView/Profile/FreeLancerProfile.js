import React, { useEffect, useState } from 'react';
import authService from '../../Authentication/Service/Auth';
import ProfileHeader from './ProfileHeader';
import { useAuth } from '../../../Components/Context';
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
  Autocomplete,
  MenuItem,
} from '@mui/material';

const FreeLancerProfile = () => {
  const { token } = useAuth();




  const [publicProfileData, setPublicProfileData] = useState(null);
  const [userWallet, setUserWallet] = useState(null);
  const [amountToWithdraw, setAmountToWithdraw] = useState(0);
  const [isWithdrawingMoney, setIsWithdrawingMoney] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  

  const [isEditing, setIsEditing] = useState(false);
const [updatedInfo, setUpdatedInfo] = useState({
  
  strOldPassword: '',
  strNewPassword: '',
  strNewBio: '',
  strNewFieldOfWork: '',
  strNewJobTitle: '',
  strNewSkills: [],
});


const skillsOptions = [
  { id: 1, name: 'HTML' },
  { id: 2, name: 'CSS' },
  { id: 3, name: 'JavaScript' },
  { id: 4, name: 'React.js' },
  { id: 5, name: 'Angular' },
  { id: 6, name: 'Vue.js' },
  { id: 7, name: 'Node.js' },
  { id: 8, name: 'Express.js' },
  { id: 9, name: 'Python' },
  { id: 10, name: 'Django' },
  { id: 11, name: 'Flask' },
  { id: 12, name: 'Java' },
  { id: 13, name: 'Spring Framework' },
  { id: 14, name: 'OOP' },
  { id: 15, name: '.NET' },
  { id: 16, name: 'SQL' },
  { id: 17, name: 'MySQL' },
  { id: 18, name: 'PostgreSQL' },
  { id: 19, name: 'MongoDB' },
  { id: 20, name: 'Git' },
  { id: 21, name: 'DevOps' },
  { id: 22, name: 'Mobile App Development' },
  { id: 23, name: 'iOS Development' },
  { id: 24, name: 'Android Development' },
  { id: 25, name: 'Unity' },
  { id: 26, name: 'Data Science' },
  { id: 27, name: 'Machine Learning' },
  { id: 28, name: 'TensorFlow' },
  { id: 29, name: 'PyTorch' },
  { id: 30, name: 'Game Development' },
  { id: 31, name: 'C++' },
  { id: 32, name: 'C#' },
  { id: 33, name: 'Unity3D' },
  
];

 

  useEffect(() => {
    const fetchPublicProfile = async () => {
      try {
        const publicProfile = await authService.getPublicProfile(token);
        setPublicProfileData(publicProfile);

         //wallet
         const FreeLancerwalletData = await authService.getUserWallet(token);
         setUserWallet(FreeLancerwalletData);
      } catch (error) {
        console.error('Error fetching public profile:', error.message);
      }
    };

    fetchPublicProfile();
  }, [token]);

  const handleWithdrawMoney = async () => {
    try {
      setIsWithdrawingMoney(true);

      if (userWallet && amountToWithdraw > userWallet.balance) {
        setSnackbarMessage('Insufficient balance for withdrawal.');
        setSnackbarOpen(true);
        setIsWithdrawingMoney(false);
        return;
      }

      if (amountToWithdraw <= 0) {
        setSnackbarMessage('Withdrawal amount must be greater than 0.');
        setSnackbarOpen(true);
        setIsWithdrawingMoney(false);
        return;
      }

      // Withdraw money from the wallet
      await authService.subMoneyFromWallet(token, amountToWithdraw);

      // Refresh the user's wallet after the transaction
      const walletData = await authService.getUserWallet(token);
      setUserWallet(walletData);

      // Reset the amountToWithdraw and close the withdraw money dialog
      setAmountToWithdraw(0);
      setIsWithdrawingMoney(false);
    } catch (error) {
      console.error('Error withdrawing money from wallet:', error.message);
      setIsWithdrawingMoney(false);
    }
  };

  const handleEditPersonalInfo = () => {
    setIsEditing(!isEditing);
    // Reset the updatedInfo state when entering edit mode
    if (!isEditing) {
      setUpdatedInfo({
        strOldPassword: '',
        strNewPassword: '',
        strNewBio: publicProfileData?.bio || '',
        strNewFieldOfWork: publicProfileData?.fieldOfWork || '',
        strNewJobTitle: publicProfileData?.jobTitle || '',
        strNewSkills:  [],
      });
    }
  };
  

  const handleUpdatePersonalInfo = async () => {
    try {

      const response = await authService.updatePersonalInfo(token, updatedInfo);

        if (response.status === 400 && response.data.Error) {
            setSnackbarMessage(response.data.Error);
            setSnackbarOpen(true);
            return;
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

     
        const updatedPublicProfile = await authService.getPublicProfile(token);
        setPublicProfileData(updatedPublicProfile);
      
      
    } catch (error) {
      console.error('Error updating personal information:', error.message);
      setSnackbarMessage(`Error updating personal information`);
    setSnackbarOpen(true);
    }
  };
  

  return (
    <div >
      <ProfileHeader />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 3, height: '100%',  textAlign: 'center' }}>
              <Avatar alt="Profile Picture" src={publicProfileData?.profilePicture} sx={{ width: 100, height: 100, margin: 'auto', marginBottom: 2 }} />
              <Typography variant="h5" gutterBottom>
                {`${publicProfileData?.firstName} ${publicProfileData?.lastName}`}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {publicProfileData?.userType}
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
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Field of Work:</strong> {publicProfileData?.fieldOfWork}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Job Title:</strong> {publicProfileData?.jobTitle}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                <strong>Skills:</strong> {publicProfileData?.skills?.join(', ')}
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
                    onClick={() => setIsWithdrawingMoney(true)}
                    disabled={isWithdrawingMoney}
                  >
                    Withdraw money from wallet
                  </Button>
                  <Dialog open={isWithdrawingMoney} onClose={() => setIsWithdrawingMoney(false)}>
                    <DialogTitle>Withdraw Money from Wallet</DialogTitle>
                    <DialogContent>
                      <TextField
                        label="Amount"
                        type="number"
                        value={amountToWithdraw}
                        onChange={(e) => {
                          const newValue = Number(e.target.value.trim()) || 0;
                          setAmountToWithdraw(newValue);
                        }}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setIsWithdrawingMoney(false)}>Cancel</Button>
                      <Button onClick={handleWithdrawMoney} color="primary">
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

      {/* Autocomplete for editing skills */}
      <Autocomplete
        multiple
        id="strNewSkills"
        options={skillsOptions}
        getOptionLabel={(option) => option.name}
        value={updatedInfo.strNewSkills.map(skillId => skillsOptions.find(option => option.id === skillId))}
        onChange={(event, newValue) => {
          // Extract skill IDs from newValue
          const skillIds = newValue.map(skill => skill.id);

          // Update the state with the array of skill IDs
          setUpdatedInfo({ ...updatedInfo, strNewSkills: skillIds });
        }}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" fullWidth label="Skills" />
        )}
        renderOption={(props, option) => (
          <MenuItem {...props} key={option.id}>
            {option.name}
          </MenuItem>
        )}
      />
    </Paper>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setIsEditing(false)}>Cancel</Button>
    <Button onClick={handleUpdatePersonalInfo} color="primary">
      Save Changes
    </Button>
  </DialogActions>
</Dialog>


      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
};

export default FreeLancerProfile;
