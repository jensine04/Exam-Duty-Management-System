// ViewDutyDetails.js
import React, { useState, useEffect } from 'react';
import './viewDetails.css'; // Import CSS file for styling
import profiless from '../images/profiless.png'
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import axios from 'axios';
import {Link} from 'react-router-dom'

const ViewDetails = () => {
  const [viewDetails, setViewDetails] = useState([]);

  useEffect(()=> { 
    axios.post('http://localhost:3001/admindutycontent')
    .then(res=> {
        console.log('is this res',res.data);
        setViewDetails(res.data);
        console.log('fetchdet',viewDetails[0].date);
      //}
      // else {
      //   setAuth(false)
      //   //setMessage(res.data.Message);
      // }
      })
      .catch(err => console.log("ERROR"))
     
    },[]);


 
  return (
    <div className="view-duty-details">
     <div className="table__wrapper">
     <h1>Duty Details</h1>
      <table className="table">
        <thead className="table__header">
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Classroom</th>
            <th>Teacher Assigned</th>
          </tr>
        </thead>
        <tbody className="table__body">
        {/* <tr>
        <td>30-04-2024</td>
        <td>10:00</td>
        <td>11:00</td>
        <td>501</td>
        <td>Jisha Robin</td>
      </tr> */}
          {viewDetails.map((detail, index) => (
            <tr key={index}>
              <td>{detail.date}</td>
              <td>{detail.stime}</td>
              <td>{detail.etime}</td>
              <td>{detail.classroom}</td>
              <td>{detail.name ? detail.name : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div></div>
  );
};

export default ViewDetails;