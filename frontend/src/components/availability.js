import React, { useEffect,useState } from 'react';
import './availability.css'; // Import the CSS file
import profiless from '../images/profiless.png'
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import axios from 'axios';
import {Link} from 'react-router-dom'

function Availability() {
  // State to manage the exam schedule
  {/*const [examSchedule, setExamSchedule] = useState([
    { id: 1, dateTime: 'April 30, 2024 - 10:00 AM', classroom: 'Room A', available: false },
    { id: 2, dateTime: 'May 1, 2024 - 2:00 PM', classroom: 'Room B', available: false },
    { id: 3, dateTime: 'May 3, 2024 - 9:00 AM', classroom: 'Room C', available: false },
  ]);
*/}

const [auth,setAuth] = useState(false)
const [name,setName] = useState('')
const [department,setDepartment] = useState('')
const [id,setId] = useState('')

//const [message,setMessage] = useState('')
axios.defaults.withCredentials=true;

useEffect(()=> { 
  axios.get('http://localhost:3001/availability')
  .then(res=> {
    if (res.data.Status === 'Success'){
      setAuth(true);
      setName(res.data.name);
      setDepartment(res.data.department);
      setId(res.data.id);
      console.log(res.data);}
    else {
      setAuth(false)
      //setMessage(res.data.Message);
    }
    }
   )
  })

    const handleLogout= () => {
      axios.get('http://localhost:3001/logout')
      .then( res => {
        if (res.data.Status === 'Success'){
          window.location.href = '/facultylogin';}
        else {
          alert("error")
        }
      }) .catch (err => console.log(err))
    }


  return (
    <div>
    {
        auth ?
        <>
    <div class="sidebar">
    <div class="faculty-section">
    <img src={profiless} alt=""></img>
    <div class="faculty-details">
    <br></br>
    <p>{name}</p>
        <p>{department}</p>
        <p> ID: {id}</p><br></br>
    </div>
  <a href="/facultypage" > TimeTable</a>
  <a href="/availability"class="active">Availability</a>
  </div>

  <Button  colorScheme="teal" _hover={{ bg: 'lightblue' }} mt={50} size="lg">
  Logout
  </Button> </div>

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
          <div class="content">
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
      <Button colorScheme="teal" _hover={{ bg: 'lightblue' }} ml={900} mt={50} size="lg">
  Confirm
</Button>
      </div></div>
      </>
      :
      <div> 
        <h3>You are not logged in</h3>
        <h3>Login</h3>
        <Link to='/' className='btn btn-primary'>Login</Link>
      </div>
}
    </div>
  );
}

export default Availability;
