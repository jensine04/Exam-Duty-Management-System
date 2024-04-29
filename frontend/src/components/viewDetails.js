// ViewDutyDetails.js
import React, { useState, useEffect } from 'react';
import './viewDetails.css'; // Import CSS file for styling
// Import Axios for making HTTP requests


const ViewDetails = () => {
  const [viewDetails, ViewDetails] = useState([]);

 
  return (
    <div className="view-duty-details">
     
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Classroom</th>
            <th>Teacher Assigned</th>
          </tr>
        </thead>
        <tbody>
          {viewDetails.map((detail, index) => (
            <tr key={index}>
              <td>{detail.date}</td>
              <td>{detail.startTime}</td>
              <td>{detail.endTime}</td>
              <td>{detail.classroom}</td>
              <td>{detail.teacherAssigned}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewDetails;
