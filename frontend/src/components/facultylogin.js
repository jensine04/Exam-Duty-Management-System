import React, { useState } from 'react';
import './facultylogin.css'; // Import CSS file for styling (create this file in the same directory)
import mec from '../images/mec.jpg'
import axios from 'axios';
import Validation from './loginvalidation';
import { useNavigate } from 'react-router-dom';
//import {Link} from 'react-router-dom'
  
const FacultyLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  axios.defaults.withCredentials = true;

  const [errors,setErrors]=useState({});
  const navigate=useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Validation(username,password));
    if(errors.username === "" && errors.password === ""){
      axios.post('http://localhost:3001/facultylogin',{username,password})
    .then(res => {
        if (res.data.Status === 'Success'){
          navigate('/facultypage');
          console.log('1',res);}
        else{
           alert("Login Failed")
        }
        }
       )
    .catch(err => console.log(err));
    }
    
  };

  return (
    <section>
      <div className="imgBx">
        <img src={mec} alt="Background" /><img/>
      </div>
      <div className="contentBx">
        <div className="formBx">
          <h2>Login for Faculty</h2>
          <form onSubmit={handleSubmit}>
            <div className="inputBx">
              <span>Username</span>
              <input type="text" name="" value={username} onChange={(e) => setUsername(e.target.value)} />
              {errors.username && <span className='text-danger'> {errors.username} </span>}
            </div>
            <div className="inputBx">
              <span>Password</span>
              <input type="password" name="" value={password} onChange={(e) => setPassword(e.target.value)} />
              {errors.password && <span className='text-danger'> {errors.password} </span>}
            </div>
            {/* <div className="remember">
              <label><input type="checkbox" name="" />Remember me</label>
            </div> */}
            <div className="inputBx">
              <input type="submit" value="Sign in" name="" />
            </div>
            <div className="inputBx">
              {/*<p>Don't have an account? <a href="#">Sign up</a></p>*/}
            </div>
          </form>
          
        </div>
      </div>
    </section>
  );
};

export default FacultyLogin;



