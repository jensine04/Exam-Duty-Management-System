// // AdminDashboard.js

// import React from 'react';
// import './admindashboard.css'; 
// import profiless from '../images/profiless.png'
// import { Link } from 'react-router-dom';

// const AdminDashboard = () => {
//   // Placeholder profile information
//   const adminProfile = {
//     name: 'Admin Name',
//     username: 'admin123',
//     email: 'admin@example.com'
//   };

//   return (
//     <div className="admin-dashboard">
//       <div className="sidebar">
//         <div className="profile-info">
//           <div className="imgBox">
//           <img src={profiless} alt=""></img>
//           </div>
        
          
//           <p>Name: {adminProfile.name}</p>
          
//           <p>Username: {adminProfile.username}</p>
//           <p>Email: {adminProfile.email}</p>
//         </div>
//         <div className="sidebar-options">
//         <button>Enter Exam Details</button>
//         <button>Enter Duty Details</button>
//           <button>Log Out</button>
//         </div>
//       </div>
//      {/* <div className="main-content">
        
//         <div className="Buttons">
//         <Link to="/manageexams">
//             <button>Enter Exam Details</button>
//           </Link>
//          <button>Enter Exam Details</button> 
//         <button>Enter Duty Details</button>
        
//          <button>View Exam</button> 
//         </div>

//       </div> */}
      
//     </div>
//   );
// };

// export default AdminDashboard;


// AdminDashboard.js
import React, { useState } from 'react';
import Sidebar from './sidebar';
import ExamDetails from './examDetails'; 
import DutyDetails from './dutyDetails';
import axios from 'axios';
import {Link} from 'react-router-dom'

import'./admindashboard.css'// Placeholder for View Exam Details page content

const AdminDashboard = () => {
  // Placeholder admin information
  const adminInfo = {
    name: 'Admin Name',
    username: 'admin123',
    email: 'admin@example.com'
  };

  const [currentPage, setCurrentPage] = useState('examDetails'); // Default to View Exam Details page

  const handlePageChange = (page) => {
    console.log(page)
    setCurrentPage(page);
  };

  const renderMainContent = () => {
    console.log(currentPage)
    switch (currentPage) {
    
      case 'examDetails':
        
        return <ExamDetails />;
        
        
      case 'dutyDetails':
        return <DutyDetails />; // Placeholder for View Duty Details page content
      // Add cases for other pages as needed
      default:
        return null;
    }
  };



  
  return (
    <div className="admin-dashboard">
      <Sidebar adminInfo={adminInfo} onPageChange={handlePageChange} />
      <div className="main-content">
        {renderMainContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
