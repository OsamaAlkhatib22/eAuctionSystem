// src/components/SplitLayout.js
import React from 'react';
import { Link } from 'react-router-dom';
import './SplitLayout.css';
import Header from '../Components/Header';

const SplitLayout = () => {
  return (
    <div>
      <Header />
      <div className="split-layout-container">
        {/* Left Box for Clients */}
        <div className="split-box">
          <h6>If you are a client, click down here to get started:</h6>
          <Link to="/client-registration" className="get-started-link">
            Get Started
          </Link>
        </div>

        {/* Right Box for Freelancers */}
        <div className="split-box">
          <h6>If you are a freelancer, click down here to get started:</h6>
          <Link to="/freelancer-registration" className="get-started-link">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SplitLayout;
