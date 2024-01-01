// src/Components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../Assets/Images/auction.png';

const Header = ({ showLoginLink = true }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    // Go back to the previous page when the logo is clicked
    navigate(-1);
  };

  return (
    <div className="header">
      <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="Auction Logo" />
        eAuction
      </div>
      {showLoginLink && (
        <div className="login-link">
          Already have an account?
          <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
