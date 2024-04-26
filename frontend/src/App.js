
import Loginform from "./components/loginform.js"
import AdminLogin from "./components/adminlogin.js";
import FacultyLogin from "./components/facultylogin.js"
import FacultyPage from "./components/facultypage.js"
import { ChakraProvider } from '@chakra-ui/react'


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
      
    </Routes>
    </BrowserRouter>
   </ChakraProvider>
  );
}

export default App;
