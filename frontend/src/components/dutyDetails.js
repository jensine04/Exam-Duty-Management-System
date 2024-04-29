// AdminDutyDetails.js
/*
import React, { useState } from 'react';
import './dutyDetails.css'

const DutyDetails = () => {
  
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



import React, { useState } from 'react';
import './dutyDetails.css';

const DutyDetails = () => {
  const [dutyDetails, setDutyDetails] = useState([{ date: '', startTime: '', endTime: '', classroom: '', teacherAssigned: '' }]);

  // Function to handle adding a new row for duty details
  const handleAddRow = () => {
    setDutyDetails([...dutyDetails, { date: '', startTime: '', endTime: '', classroom: '', teacherAssigned: '' }]);
  };

  // Function to handle form input change

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDutyDetails = [...dutyDetails];
    updatedDutyDetails[index][name] = value;
    setDutyDetails(updatedDutyDetails);
  };

  // Function to handle removing a row for duty details

  // Function to handle submitting duty details
  const handleSubmit = () => {
    // Logic to submit duty details to the server
    console.log('Submitting duty details:', dutyDetails);
  };

  return (
    <div className="admin-duty-details">
      <h2>Enter Duty Details</h2>
      {dutyDetails.map((detail, index) => (
        <div key={index} className="duty-detail">
           <input
            type="text"
            value={exam.date}
            onChange={(e) => setExams(exams.map((item, i) => (i === index ? { ...item, date: e.target.value } : item)))}
            placeholder="Date"
          />
          <input
            type="text"
            value={exam.semester}
            onChange={(e) => setExams(exams.map((item, i) => (i === index ? { ...item, semester: e.target.value } : item)))}
            placeholder="Semester"
          />
          <input
            type="date"
            value={exam.startDate}
            onChange={(e) => setExams(exams.map((item, i) => (i === index ? { ...item, startDate: e.target.value } : item)))}
          />
          
        </div>
      ))}
      <button onClick={handleAddRow}>Add Row</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default DutyDetails;
*/
import { useDisclosure } from '@chakra-ui/react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,Box, CloseButton
} from '@chakra-ui/react'
import React, { useEffect,useState } from 'react';

import axios from 'axios';
import './dutyDetails.css';

const DutyDetails = () => {
  const [dutyDetails, setDutyDetails] = useState([{ date: '', startTime: '', endTime: '', classroom: '' }]);

  const [isDutyAdded, setIsDutyAdded] = useState(false);
  const { isOpen: isVisible, onClose, onOpen } = useDisclosure();
  // Function to handle adding a new row for duty details
 

  // Function to handle form input change
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedDutyDetails = [...dutyDetails];
    updatedDutyDetails[index][name] = value;
    setDutyDetails(updatedDutyDetails);
  };

  // Function to handle removing a row for duty details
  
  // Function to handle submitting duty details
  
  const handleSubmit = (event) => {
    // Logic to submit duty details to the server
    event.preventDefault();
    axios.post('http://localhost:3001/dutydetails',{dutyDetails})
    .then(res=> {
      console.log("Duty details entered") })
      .catch(err=> console.log("error"));
    console.log('Submitting duty details:', dutyDetails);
    setDutyDetails([{ date: '', startTime: '', endTime: '', classroom: '' }]);
    
    //alert message
    setIsDutyAdded(true);
    onOpen();
  };
  
  

  return (
    <div className="admin-duty-details">
      
      {dutyDetails.map((detail, index) => (
        <div key={index} className="duty-detail">
          <label>Date:</label>
          <input type="date" name="date" value={detail.date} onChange={(e) => handleChange(index, e)} required />
          <label>Start Time:</label>
          <input type="time" name="startTime" value={detail.startTime} onChange={(e) => handleChange(index, e)} required />
          <label>End Time:</label>
          <input type="time" name="endTime" value={detail.endTime} onChange={(e) => handleChange(index, e)} required />
          <label>Classroom:</label>
          <input type="text" name="classroom" value={detail.classroom} onChange={(e) => handleChange(index, e)} required />
          
        
        </div>
      ))}
     
      <button onClick={handleSubmit}>Submit</button>
     

      {isDutyAdded && (
        <CompExample isVisible={isVisible} onClose={onClose} />
      )}
    </div>
  );
}

function CompExample({ isVisible, onClose }) {
  return isVisible ? (
    <div className="alert">
    <Alert status='success'>
    <AlertIcon />
    EXAM DETAILS UPLOADED SUCCESSFULLY!!
  
    <CloseButton style={{backgroundColor: 'transparent', color: 'white'}}
        alignSelf='flex-start'
        position='absolute'
        right={-175}
        blockSize={2}
        size={2}
        top={1.2}
        colorScheme="gray"
        onClick={onClose}
      />
    </Alert></div>
  ) : null;
  


};

export default DutyDetails;
