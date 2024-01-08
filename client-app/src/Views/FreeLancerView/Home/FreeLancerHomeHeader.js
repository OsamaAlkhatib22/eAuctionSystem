import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  styled,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  CircularProgress,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../../Assets/Images/auction.png';
import profilelogo from '../../../Assets/Images/icons8-customer-100.png';
import notificationIcon from '../../../Assets/Images/icons8-notifications-78.png';
import { fetchNotifications } from './Service/Auth';
import { useAuth } from '../../../Components/Context';

const NewHeader = styled(AppBar)({
  backgroundColor: '#8b0000',
});

const Logo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const LogoImg = styled('img')({
  width: '30px',
  height: '30px',
  marginRight: '10px',
});

const LogoText = styled(Typography)({
  fontSize: '28px',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
});

const ButtonList = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  color: 'white',
});

const HeaderButton = styled(Button)({
  marginLeft: '20px',
  textDecoration: 'none',
  color: 'white',
});

const ProfileLink = styled('div')({
  marginLeft: 'auto',
  display: 'flex',
  alignItems: 'center',
});

const FreeLancerHomeHeader = ({ showProfileLink = true }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchNotificationsData = async () => {
      try {
        if (token) {
          setLoading(true);
          const notificationsData = await fetchNotifications(token);
          setNotifications(notificationsData);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (isDrawerOpen) {
      fetchNotificationsData();
    }
  }, [isDrawerOpen, token]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const formatDate = (dateString) => {
    const notificationDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate - notificationDate;
  
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
  
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return notificationDate.toLocaleDateString(undefined, options);
    }
  };
  

  return (
    <React.Fragment>
      <NewHeader position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Logo>
            <Link
              to="/FreeLancerHome"
              style={{
                textDecoration: 'none',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <LogoImg src={logo} alt="Auction Logo" />
              <LogoText variant="h4">eAuction</LogoText>
            </Link>
          </Logo>
          <ButtonList>
            <HeaderButton component={Link} to="/FreeLancerMyTask">
              My Task
            </HeaderButton>
            <HeaderButton component={Link} to="/FreeLancerTransactions">
              Transactions
            </HeaderButton>
          </ButtonList>
          {showProfileLink && (
            <ProfileLink>
              <Link
                to="/FreeLancerProfile"
                style={{ textDecoration: 'none', color: 'white' }}
              >
                <LogoImg src={profilelogo} alt="Auction Logo" />
              </Link>
            </ProfileLink>
          )}
        </Toolbar>
      </NewHeader>
      {!loading && (
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        {error && <p>Error fetching notifications: {error.message}</p>}
        {!error && (
          <List>
            <ListItem>
              <ListItemIcon>
                <img src={notificationIcon} alt="Notification Icon" />
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItem>
            {notifications.map((notification, index) => (
              <ListItem key={index} button>
                <ListItemText
                  primary={notification.notification}
                  secondary={formatDate(notification.notificationDate)}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Drawer>
      
      
      )}
    </React.Fragment>
  );
};

export default FreeLancerHomeHeader;
