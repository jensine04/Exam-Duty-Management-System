import React, { useState } from 'react';
import './adminlogin.css'; // Import CSS file for styling (create this file in the same directory)
import mec from '../images/mec.jpg'

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <section>
      <div className="imgBx">
        <img src={mec} alt="Background" /><img/>
      </div>
      <div className="contentBx">
        <div className="formBx">
          <h2>Login for Admin</h2>
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

export default AdminLogin;
