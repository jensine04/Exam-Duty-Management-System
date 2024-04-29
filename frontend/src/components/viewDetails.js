// ViewDutyDetails.js
import React, { useState, useEffect } from 'react';
import './viewDetails.css'; // Import CSS file for styling

const ViewDetails = () => {
  const [viewDetails, ViewDetails] = useState([]);

 
  return (
    <div className="view-duty-details">
     <div className="table__wrapper">
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
        <tr>
        <td>30-04-2024</td>
        <td>10:00</td>
        <td>11:00</td>
        <td>501</td>
        <td>Jisha Robin</td>
      </tr>
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
    </div></div>
  );
};

export default ViewDetails;