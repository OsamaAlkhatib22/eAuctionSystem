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
} from '@mui/material';

const FreeLancerProfile = () => {
  const { token } = useAuth();

  const [publicProfileData, setPublicProfileData] = useState(null);
  const [userWallet, setUserWallet] = useState(null);
  const [amountToWithdraw, setAmountToWithdraw] = useState(0);
  const [isWithdrawingMoney, setIsWithdrawingMoney] = useState(false);
 

  useEffect(() => {
    const fetchPublicProfile = async () => {
      try {
        const publicProfile = await authService.getPublicProfile(token);
        setPublicProfileData(publicProfile);

         //walet
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

  return (
    <div>
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
      </Box>
    </div>
  );
};

export default FreeLancerProfile;
