import React from 'react';
import './MainRevenue.css';

const MainRevenue = () => {
  return (
    <div className="main-revenue">
      <h2>Last quarter</h2>
      <div className="revenue-amount">
        <p>1,307,261 ℏ</p>
        <p>$627,801 USD</p>
        <p className="percentage-increase">1.26% ↑</p>
      </div>
    </div>
  );
};

export default MainRevenue;
