// Sidebar.js
import React, { useEffect, useState } from 'react';
import './sidebar.css'
import profiless from '../images/profiless.png'
import axios from 'axios';
//import {Link} from 'react-router-dom'



const Sidebar = ({ adminInfo, onPageChange }) => {
  const [auth,setAuth] = useState(false)
  
  axios.defaults.withCredentials=true;
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const handleLogout= () => {
    axios.get('http://localhost:3001/logout')
    .then( res => {
      if (res.data.Status === 'Success'){
        window.location.href = '/adminlogin';}
      else {
        alert("error")
      }
    }) .catch (err => console.log(err))
  }

  useEffect(()=> {
    axios.get('http://localhost:3001/admindashboard')
    .then(res=> {
      if (res.data.Status === 'Success'){
        setAuth(true);
      //   setAdminInfo({
      //     name: res.data.name,
      //     department: res.data.department,
      //     id: res.data.id 
      // });
      console.log(res.data);
        // setAdminInfo.name(res.data.name);
        // setAdminInfo.department(res.data.department);
        // setAdminInfo.id(res.data.id);
        //console.log(res.data);
      }
      else {
        setAuth(false)
      }
      }
     )
    });


  

  return (
    <div className="sidebar">{
      auth ?
      <>
      <button className="back-button" onclick="goBack()">
      <span style={{ fontWeight: '900',fontSize: '21px' }}>&lt;</span>
   
</button>

      <div className="profile-info">
      <div className="imgBox">
           <img src={profiless} alt=""></img>
         </div>
        <p>Name: {adminInfo.name}</p>
        <p>Dept: {adminInfo.department}</p>
        <p>ID: {adminInfo.id}</p>
      </div>
      <div className="sidebar-options">
        <button onClick={() => handlePageChange('examDetails')}>Upload Exam Details</button>
        <button onClick={() => handlePageChange('dutyDetails')}>Upload Duty Details</button>
        <button onClick={() =>handlePageChange('viewDetails')}>View Duty Details</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      </>
      :
      <></>
    }
    </div>
  );
};

export default Sidebar;
