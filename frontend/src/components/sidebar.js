// Sidebar.js
import React from 'react';
import './sidebar.css'
import profiless from '../images/profiless.png'

const Sidebar = ({ adminInfo, onPageChange }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <div className="sidebar">
      <div className="profile-info">
      <div className="imgBox">
           <img src={profiless} alt=""></img>
         </div>
        <p>Name: {adminInfo.name}</p>
        <p>Username: {adminInfo.username}</p>
        <p>Department: {adminInfo.dept}</p>
      </div>
      <div className="sidebar-options">
        <button onClick={() => handlePageChange('examDetails')}>Upload Exam Details</button>
        <button onClick={() => handlePageChange('dutyDetails')}>Upload Duty Details</button>
        <button onClick={() =>handlePageChange('viewDetails')}>View Duty Details</button>
        <button onClick={() => handlePageChange('logout')}>Logout</button>
       
      </div>
    </div>
  );
};

export default Sidebar;
