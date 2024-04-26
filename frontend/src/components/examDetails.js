// import React from 'react'

// function examDetails() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default examDetails
import React, { useState } from 'react';
import axios from 'axios';
import './examDetails.css';

const ExamDetails = () => {
  // State to store exam details
  const [exams, setExams] = useState([
    { series: '', semester: '', startDate: '', timetable: null }
  ]);

  // Function to handle file input change
  const handleFileChange = (event, index) => {
    const newExams = [...exams];
    newExams[index].timetable = event.target.files[0];
    setExams(newExams);
  };

  // Function to add a new set of exam details
  const handleAddExam = () => {
    setExams([...exams, { series: '', semester: '', startDate: '', timetable: null }]);
  };

  // Function to submit exams
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      exams.forEach((exam, index) => {
        formData.append(`series${index}`, exam.series);
        formData.append(`semester${index}`, exam.semester);
        formData.append(`startDate${index}`, exam.startDate);
        formData.append(`timetable${index}`, exam.timetable);
      });
      // Send exam details to server
      const response = await axios.post('/api/exams', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Exams submitted:', response.data);
    } catch (error) {
      console.error('Error submitting exams:', error);
    }
  };

  return (
    <div className="manage-exams-container">
      {/* Render a form for each exam */}
      {exams.map((exam, index) => (
        <div key={index} className="form-container">
          
          <input
            type="text"
            value={exam.series}
            onChange={(e) => setExams(exams.map((item, i) => (i === index ? { ...item, series: e.target.value } : item)))}
            placeholder="Series"
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
          <input
            type="file"
            onChange={(e) => handleFileChange(e, index)}
            
          />
        </div>
      ))}
      {/* Button to add another set of exam details */}
      <button className="add-exam-btn" onClick={handleAddExam}>Add Another Exam</button>
      {/* Button to submit exams */}
      <button className="submit-exam-btn" onClick={handleSubmit}>Submit Exams</button>
    </div>
  );
};

export default ExamDetails;

