import React, { useState, useEffect } from 'react';
import './viewDetails.css'; // Import CSS file for styling
import profiless from '../images/profiless.png'
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import { color } from 'framer-motion';

const Upcoming = () => {
    const [auth,setAuth] = useState(false)
  const [name,setName] = useState('')
  const [department,setDepartment] = useState('')
  const [id,setId] = useState('')
  const [viewDetails, setViewDetails] = useState([]);
  axios.defaults.withCredentials=true;

  useEffect(()=> {
    axios.get('http://localhost:3001/upcoming')
    .then(res=> {
      if (res.data.Status === 'Success'){
        setAuth(true);
        setName(res.data.name);
        setDepartment(res.data.department);
        setId(res.data.id);
        console.log(res.data);
    console.log(id);}
      else {
        setAuth(false)
        //setMessage(res.data.Message);
      }
      }
     )
    },[] )

  useEffect(()=> { 
    axios.post('http://localhost:3001/facultydutycontent',{id})
    .then(res=> {
        console.log('id here',id);
        console.log('is this res',res.data);
        setViewDetails(res.data);
        console.log('fetchdet',viewDetails[0].date);
      //}
      // else {
      //   setAuth(false)
      //   //setMessage(res.data.Message);
      // }
      })
      .catch(err => console.log("ERROR"))
     
    },[]);

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
        <div className="imgBox">
               <img src={profiless} alt=""></img>
             </div>
        <div class="faculty-details">
        <br></br>
        <p>Name: {name}</p>
            <p>Department: {department}</p>
            <p> ID: {id}</p><br></br>
        </div>
      <a href="/facultypage" > TimeTable</a>
      <a href="/availability">Availability</a>
      <a href="/upcoming"class="active">Upcoming Duty</a>
      </div>
    
      <Button  colorScheme="teal" _hover={{ bg: 'lightblue' }} mt={50} size="lg" onClick={handleLogout}>
      Logout
      </Button> </div>
      
      <div className="content">
      <div className="view-duty-details">
     <div className="table__wrapper">
     <h1>Upcoming Duties</h1>
      <table className="table">
        <thead className="table__header">
          <tr>
            <th style={{color:'black'}}>Date</th>
            <th style={{color:'black'}}>Start Time</th>
            <th style={{color:'black'}}>End Time</th>
            <th style={{color:'black'}}>Classroom</th>
          </tr>
        </thead>
        <tbody className="table__body">
        {/* <tr>
        <td>30-04-2024</td>
        <td>10:00</td>
        <td>11:00</td>
        <td>501</td>
        <td>Jisha Robin</td>
      </tr> */}
          {viewDetails.map((detail, index) => (
            <tr key={index}>
              <td>{detail.date}</td>
              <td>{detail.stime}</td>
              <td>{detail.etime}</td>
              <td>{detail.classroom}</td>
            </tr>
          ))}
        </tbody>
      </table>





    </div></div>
    
    </div></>
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


export default Upcoming;