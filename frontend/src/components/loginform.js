import React from "react";
import mec from '../images/mec.jpg'

import "./loginform.css"
export default function Loginform()
{
    return(  
        <div className="Main">
          
            <div className="hero-cont">
                <div className="hero-left">
                   <h1>Exam Duty Management Cell</h1><br/>
                    <h3>Organising your Exam duties..</h3><br/><br/><br></br>
                    <a href="/facultylogin">Login for Faculty</a>
                    <a href="/adminlogin">Login for Admin</a>
                </div>
                <div className="hero-right">
                <img src={mec} alt=""></img>
                </div>
            </div>
        </div>
    );
}