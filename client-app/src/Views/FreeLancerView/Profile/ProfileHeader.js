import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Toolbar,
  Typography,
  Box,
} from '@mui/material';
import logo from '../../../Assets/Images/auction.png';
import { useAuth } from '../../../Components/Context';

const ProfileHeader = ({ showProfileLink = true }) => {
  const [signOutConfirmation, setSignOutConfirmation] = useState(false);
  const navigate = useNavigate();
  const { clearAuthToken } = useAuth();

  const handleSignOut = () => {
    setSignOutConfirmation(true);
  };

  const handleCancelSignOut = () => {
    setSignOutConfirmation(false);
  };

  const handleConfirmSignOut = () => {
    clearAuthToken();
    setSignOutConfirmation(false);
    navigate('/SplitLayout');
  };

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: '#8b0000' }}>
        <Toolbar>
          <Box display="flex" alignItems="center">
            <Link to="/FreeLancerHome" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>
              <img src={logo} alt="Auction Logo" style={{ width: '30px', height: '30px', marginRight: '10px' }} />
              <Typography variant="h5" style={{ fontWeight: 'bold', fontSize: '28px' }}>
                eAuction
              </Typography>
            </Link>
          </Box>
          <div style={{ marginLeft: 'auto' }}>
            <Button color="inherit" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Dialog open={signOutConfirmation} onClose={handleCancelSignOut}>
        <DialogTitle>Are you sure you want to sign out?</DialogTitle>
        <DialogContent>
          {/* Add any additional content here if needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelSignOut} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmSignOut} color="primary">
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileHeader;
