// import React from 'react'

// function examDetails() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default examDetails

import React, { useEffect,useState } from 'react';
import axios from 'axios';
import './examDetails.css';
import {Link} from 'react-router-dom'

const ExamDetails = () => {
  const [auth,setAuth] = useState(false)
  
  axios.defaults.withCredentials=true;
  // State to store exam details
  const [previewImage, setPreviewImage] = useState(null);


  const [exams, setExams] = useState([
    { series: '', semester: '', startDate: '', timetable: null }
  ]);

  // Function to handle file input change
  const handleFileChange = (event, index) => {
    const newExams = [...exams];
    newExams[index].timetable = event.target.files[0];
    setExams(newExams);
    // viewtt(event.target.files[0])

   
  };
  const viewImage = () => {
    if (!exams[0].timetable) {
      alert('Please upload a file first.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      // Display the image using the URL created from FileReader
      // alert('Image uploaded: ' + imageUrl);
      setPreviewImage(imageUrl);
    };
    reader.readAsDataURL(exams[0].timetable);
  };

  // const viewImage=()=>{
  //   return <img src={URL.createObjectURL(tt)} alt="images" width='200px' height='200px' />;
  // }

  // Function to add a new set of exam details
  // const handleAddExam = () => {
  //   setExams([...exams, { series: '', semester: '', startDate: '', timetable: null }]);
  // };



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

  // Function to submit exams
  const handleSubmit = async () => {
    try {
      // const formData = new FormData();
      // exams.forEach((exam, index) => {
      //   formData.append(`series${index}`, exam.series);
      //   formData.append(`semester${index}`, exam.semester);
      //   formData.append(`startDate${index}`, exam.startDate);
      //   formData.append(`timetable${index}`, exam.timetable);
      // });
      // Send exam details to server
      // const response = await axios.post('/api/exams', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // });

     // console.log('Submitting duty details:', dutyDetails);
    setExams([{ series: '', semester: '', startDate: '', timetable: null }]);
      //console.log('Exams submitted:', response.data);
      setPreviewImage(null);
      
    } catch (error) {
      console.error('Error submitting exams:', error);
    }
  };

  return (
    <div className="manage-exams-container">
{ auth ?
<>

      
      {exams.map((exam, index) => (
        <div key={index} className="form-container">
          
          <input
            type="text"
            value={exam.series}
            onChange={(e) => setExams(exams.map((item, i) => (i === index ? { ...item, series: e.target.value } : item)))}
            placeholder="Exam Name"
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
          <button onClick={viewImage}>View Image</button>
          
        </div>
      ))}
      <img src={previewImage} />
      {/* Button to add another set of exam details */}
      {/* <button className="add-exam-btn" onClick={handleAddExam}>Add Another Exam</button> */}
      {/* Button to submit exams */}
      <button className="submit-exam-btn" onClick={handleSubmit}>Submit Exams</button>

      </>
      :
      <div> 
        <h3>You are not logged in</h3>
        <Link to='/' className='btn btn-primary'>Login</Link>
      </div>
    }
    </div>
  );
};

export default ExamDetails;

