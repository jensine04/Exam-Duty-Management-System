// AdminDutyDetails.js

import React, { useState } from 'react';
import './dutyDetails.css'

const DutyDetails = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    classroom: '',
    teacherAssigned: ''
  });

  // Function to handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle adding new duty details
  const handleAdd = () => {
    // Send form data to server or perform any other necessary action
    console.log('Adding duty details:', formData);
    // Clear form after adding
    setFormData({
      date: '',
      startTime: '',
      endTime: '',
      classroom: '',
      teacherAssigned: ''
    });
  };

  return (
    <div className="admin-duty-details">
      <h2>Enter Duty Details</h2>
      <form>
        <div>
          <label>Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>
        <div>
          <label>Start Time:</label>
          <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
        </div>
        <div>
          <label>End Time:</label>
          <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
        </div>
        <div>
          <label>Classroom:</label>
          <input type="text" name="classroom" value={formData.classroom} onChange={handleChange} required />
        </div>
        <div>
          <label>Teacher Assigned:</label>
          <input type="text" name="teacherAssigned" value={formData.teacherAssigned} onChange={handleChange} required />
        </div>
      </form>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default DutyDetails;

