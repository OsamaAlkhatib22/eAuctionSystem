import React from 'react';
import { Link } from 'react-router-dom';
import './Styling/ProfileHeader.css';
import logo from '../../../Assets/Images/auction.png';


const ProfileHeader = ({ showProfileLink = true }) => {
  return (
    <div className="new-header">
      <div className="logo">
        <Link to="/FreeLancerHome" style={{ textDecoration: 'none', color: 'white' }}>
          <img src={logo} alt="Auction Logo" className="logo-img" />
          eAuction
        </Link>
      </div>
    </div>
  );
};

export default ProfileHeader;
