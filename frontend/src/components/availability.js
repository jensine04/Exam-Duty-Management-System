import React, { useState } from 'react';
import './availability.css'; // Import the CSS file
import profiless from '../images/profiless.png'
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

function Availability() {
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
        <h1>Availability</h1>
        <table className="table">
          <thead className="table__header">
            <tr>
              <td>Date</td>
              <td>Start Time</td> 
              <td>End Time</td> 
              <td>Availability</td>
            </tr>
          </thead>
          <tbody className="table__body">
          
      <tr>
        <td>16-06-2024</td>
        <td>9:30 A.M</td>
        <td>11:00 A.M</td>
        <td><label>
        <input type="checkbox" />
       
      </label></td>
      </tr>
      <tr>
        <td>16-06-2024</td>
        <td>1:30 P.M</td>
        <td>3:00 P.M</td>
        <td><label>
        <input type="checkbox" />
        
      </label></td>
      </tr>
      <tr>
        <td>17-06-2024</td>
        <td>9:30 A.M</td>
        <td>11:00 A.M</td>
        <td><label>
        <input type="checkbox" />
       
      </label></td>
      </tr>
      
   
          </tbody>
        </table>
      </div>
      </section>
    </div>
  );
}

export default Availability;
