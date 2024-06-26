
import Loginform from "./components/loginform.js"
import AdminLogin from "./components/adminlogin.js";
import FacultyLogin from "./components/facultylogin.js"
import FacultyPage from "./components/facultypage.js"
import Availability from "./components/availability.js"
import { ChakraProvider } from '@chakra-ui/react'
import AdminDashboard from "./components/admindashboard.js";
//import ManageExams from "./components/manageexams.js";
import Sidebar from "./components/sidebar.js";
import ExamDetails from "./components/examDetails.js";
import DutyDetails from "./components/dutyDetails.js";
import Upcoming from "./components/upcoming.js";


import { useEffect, useState } from 'react';
import {BrowserRouter,Routes,Route}from 'react-router-dom';


function App() {
  const[token,setToken] = useState(false)
  if(token){
    sessionStorage.setItem('token',JSON.stringify(token))
  }
  useEffect(() => {
    if(sessionStorage.getItem('token')){
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }
  },[])

  
  return ( 
   
    <ChakraProvider >
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Loginform/>}/>
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/facultylogin" element={<FacultyLogin/>}/>
      <Route path="/facultypage" element={<FacultyPage/>}/>
      <Route path="/availability" element={<Availability/>}/>
      <Route path="/admindashboard" element={<AdminDashboard/>}/>
      {/* <Route path="/manageexams" element={<ManageExams/>}/> */}
      <Route path="/sidebar" element={<Sidebar/>}/>
      <Route path="/examDetails" element={<ExamDetails/>}/>
      <Route path="/dutyDetails" element={<DutyDetails/>}/>
      <Route path="/upcoming" element={<Upcoming/>}/>
      
    </Routes>
    </BrowserRouter>
   </ChakraProvider>
  );
}

export default App;
