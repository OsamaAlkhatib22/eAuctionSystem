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
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../../Assets/Images/auction.png';
import profilelogo from '../../../Assets/Images/icons8-customer-100.png';
import notificationIcon from '../../../Assets/Images/icons8-notifications-78.png';
import { fetchNotifications } from '../../../Views/FreeLancerView/Home/Service/Auth';
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

const HomeHeader = ({ showProfileLink = true }) => {
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

  const handleNotificationsClick = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const formatDate = (dateString) => {
    const notificationDate = new Date(dateString);

    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return notificationDate.toLocaleString(undefined, options);
  };

  return (
    <React.Fragment>
      <NewHeader position="static">
        <Toolbar>
          <Logo>
            <Link
              to="/ClientHome"
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
            <HeaderButton component={Link} to="/ClientExploreTasks">
              Explore Tasks
            </HeaderButton>
            <HeaderButton component={Link} to="/MyTasks">
              My Tasks
            </HeaderButton>
            <HeaderButton component={Link} to="/ClientTransactions">
              My Transactions
            </HeaderButton>
          </ButtonList>
          {showProfileLink && (
            <ProfileLink>
              <IconButton color="inherit" onClick={handleNotificationsClick}>
                <NotificationsIcon />
              </IconButton>
              <Link
                to="/ClientProfile"
                style={{ textDecoration: 'none', color: 'white' }}
              >
                <LogoImg src={profilelogo} alt="Auction Logo" />
              </Link>
            </ProfileLink>
          )}
        </Toolbar>
      </NewHeader>
      {!loading && (
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
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

export default HomeHeader;
