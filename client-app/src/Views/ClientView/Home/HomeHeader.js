import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography, styled } from '@mui/material';
import logo from '../../../Assets/Images/auction.png';
import profilelogo from '../../../Assets/Images/icons8-customer-100.png';

const NewHeader = styled(AppBar)({
  backgroundColor: '#8b0000',
});

const Logo = styled('div')({
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
  alignItems: 'center', // Ensure both elements are aligned
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
  return (
    <NewHeader position="static">
      <Toolbar>
      <Logo>
  <Link to="/ClientHome" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>
    <LogoImg src={logo} alt="Auction Logo" />
    <LogoText variant="h4">
      eAuction
    </LogoText>
  </Link>
</Logo>
        <ButtonList>
          <HeaderButton component={Link} to="/ClientExploreTasks">
            Explore Tasks
          </HeaderButton>
          <HeaderButton component={Link} to="/ClientTransactions">
            My Transactions
          </HeaderButton>
          <HeaderButton component={Link} to="/MyTasks">
            My Tasks
          </HeaderButton>
        </ButtonList>
        {showProfileLink && (
          <ProfileLink>
            <Link to="/ClientProfile" style={{ textDecoration: 'none', color: 'white' }}>
              <LogoImg src={profilelogo} alt="Auction Logo" />
            </Link>
          </ProfileLink>
        )}
      </Toolbar>
    </NewHeader>
  );
};

export default HomeHeader;
