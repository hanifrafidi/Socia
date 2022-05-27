import React from "react";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box'

import Navbar from './component/navbar'
import Post from './component/post'
import Timeline from './component/timeline'
import Profile from './component/profile'
import AddPost from './component/addPost'
import Register from './component/register'

// import Auth from './component/auth'
import Login from './component/login'

import Test from './component/test'

import { Routes, Route, Link, useLocation } from "react-router-dom";

import UserProvider from './state/UserContext'

import axios from 'axios';

import background from './background.png'

function App() {  
  const location = useLocation();

  const bgr = ()  => {
    let bgrImg = ''
    
    if(location.pathname === '/login' || location.pathname === '/register'){
      bgrImg = background      
    }
    
    return bgrImg
  }

  return (    
    <div>
      
        <UserProvider>
            <Box
             sx={{ 
                backgroundColor: '#E3E3E3', 
                backgroundImage : 'url('+ bgr() +')',
                backgroundRepeat: 'no-repeat',            
                backgroundPosition: 'center center',            
                backgroundSize: 'cover',
                p: 0, 
                minHeight: '100vh'
             }}>
              <Container maxWidth='md' sx={{ py: 10, minHeight: '100vh' }}>
                <Navbar></Navbar>
                <Routes>
                  <Route path='/' element={<Timeline />}></Route>
                  <Route path='/Profile' element={<Profile />}></Route>
                  <Route path='/profile/:username' element={<Profile />}></Route>
                  <Route path='/AddPost' element={<AddPost />}></Route>
                  <Route path='/test' element={<Test />}></Route>
                  <Route path='/login' element={<Login />}></Route>
                  <Route path='/register' element={<Register />}></Route>
                  {/* <Route path='/auth' element={<Auth />}></Route> */}
                </Routes>            
              </Container>
            </Box>
        </UserProvider>
      </div>
        // <div></div>
  )
}

export default App
