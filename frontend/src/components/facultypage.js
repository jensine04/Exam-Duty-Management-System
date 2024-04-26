
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


  return (
    <div className="faculty-page">
        <section className="tables">
        <div className="faculty-info" >
        <div className="faculty-text">
        <img src={profiless} alt=""></img>
        <br></br>
        <br></br>
        <p>Murali Mohan</p>
        <p>Computer Science</p>
        <p> Class: CSB</p>
        
        </div>
        {/* Add more faculty information as needed */}
        
      <Button colorScheme="blue" _hover={{ bg: 'lightblue' }} mt={50} size="lg">
  Availability
</Button>
<Button colorScheme="blue" _hover={{ bg: 'lightblue' }} mt={50} size="lg">
  Logout
</Button>
      </div>
      {/*
      <div>
      <table>
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Classroom</th>
            <th>Availability</th>
          </tr>
        </thead>
        <tbody>
          {examSchedule.map((exam) => (
            <tr key={exam.id}>
              <td>{exam.dateTime}</td>
              <td>{exam.classroom}</td>
              <td>
                <input
                  type="checkbox"
                  checked={exam.available}
                  onChange={() => toggleAvailability(exam.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          </div>*/}
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
      </section>
    </div>
  );
}

export default FacultyPage;
