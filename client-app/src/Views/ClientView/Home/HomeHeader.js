import React from 'react';
import { Link } from 'react-router-dom';
import './Styling/HomeHeader.css';
import logo from '../../../Assets/Images/auction.png';
import profilelogo from '../../../Assets/Images/icons8-customer-100.png'

const HomeHeader = ({ showProfileLink = true }) => {
  return (
    <div className="new-header">
      <div className="logo">
        <Link to="/ClientHome" style={{ textDecoration: 'none', color: 'white' }}>
          <img src={logo} alt="Auction Logo" className="logo-img" />
          eAuction
        </Link>
      </div>
      <div className="button-list">
        
        <Link to="/ClientExploreTasks" className="header-button">
          Explore Tasks
        </Link>
        <Link to="/ClientTransactions" className="header-button">
          Transactions
        </Link>
        
      </div>
      {showProfileLink && (
        <div className="profile-link">
          <Link to="/ClientProfile" style={{ textDecoration: 'none', color: 'white' }}>
          <img src={profilelogo} alt="Auction Logo" className="logo-img" />
           
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomeHeader;
