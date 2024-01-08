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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

const ClientProfile = () => {
  const { token } = useAuth();
  const [publicProfileData, setPublicProfileData] = useState(null);
  const [userWallet, setUserWallet] = useState(null);
  const [amountToAdd, setAmountToAdd] = useState(0);
  const [isAddingMoney, setIsAddingMoney] = useState(false);

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
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>
                Wallet
              </Typography>
              {userWallet ? (
                <>
                  <Typography variant="body1">
                    <strong>Balance:</strong> {userWallet.balance}
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
    </div>
  );
};

export default ClientProfile;
