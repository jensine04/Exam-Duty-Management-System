import React, { useState } from 'react';
import './facultylogin.css'; // Import CSS file for styling (create this file in the same directory)
import mec from '../images/mec.jpg'
import axios from 'axios';

const FacultyLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/facultylogin',{username,password})
    .then(res => console.log(res))
    .catch(err => console.log(err));
    // Handle form submission logic here
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
            </div>
            <div className="inputBx">
              <span>Password</span>
              <input type="password" name="" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="remember">
              <label><input type="checkbox" name="" />Remember me</label>
            </div>
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



