
import React, { useState } from 'react';
import './facultypage.css'; // Import the CSS file
import profiless from '../images/profiless.png'
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

function FacultyPage() {
  // State to manage the exam schedule
  {/*const [examSchedule, setExamSchedule] = useState([
    { id: 1, dateTime: 'April 30, 2024 - 10:00 AM', classroom: 'Room A', available: false },
    { id: 2, dateTime: 'May 1, 2024 - 2:00 PM', classroom: 'Room B', available: false },
    { id: 3, dateTime: 'May 3, 2024 - 9:00 AM', classroom: 'Room C', available: false },
  ]);
*/}
const navigate = useNavigate();
const handleAvailabilityClick = () => {
  
  navigate('/availability'); 
};

  return (
    <div>
    <div class="sidebar">
    <div class="faculty-section">
    <img src={profiless} alt=""></img>
    <div class="faculty-details">
    <br></br>
                <p>Murali Mohan</p>
        <p>Computer Science</p>
        <p> Class: CSB</p><br></br>
    </div>
  <a href="/facultypage" class="active"> TimeTable</a>
  <a href="/availability">Availability</a>
  </div>

  <Button  colorScheme="blue" _hover={{ bg: 'lightblue' }} mt={50} size="lg">
  Logout
  </Button> </div>
  <div class="content">
  <div className="table__wrapper">
        <h1>Upcoming Exams</h1>
        <table className="table">
          <thead className="table__header">
            <tr>
              <td>Exam</td>
              <td>Semester</td> 
              <td>View Time Table</td> 
            </tr>
          </thead>
          <tbody className="table__body">
          
      <tr>
        <td>Series 1</td>
        <td>S2</td>
        <td><Button colorScheme="teal" _hover={{ bg: 'lightblue' }} m={30} size="md">
  View Time Table
</Button></td>
      </tr>
      <tr>
        <td>Series 1</td>
        <td>S6</td>
        <td><Button colorScheme="teal" _hover={{ bg: 'lightblue' }} m={30} size="md">
  View Time Table
</Button></td>
      </tr>
      <tr>
        <td>Series 1</td>
        <td>S8</td>
        <td><Button colorScheme="teal" _hover={{ bg: 'lightblue' }} m={30} size="md">
  View Time Table
</Button></td>
      </tr>
   
          </tbody>
        </table>
      
    </div>
  </div>


</div>
  );
}

export default FacultyPage;
