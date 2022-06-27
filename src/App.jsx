import React from "react";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box'

import Navbar from './component/navbar'
import EditProfile from './component/editProfile'
import Timeline from './component/timeline'
import Profile from './component/profile'
import AddPost from './component/addPost'
import Register from './component/register'
import Detail from "./component/detail";
import Login from './component/login'
import Test from './component/test'
import Notif from './component/notification'
import EditPost from './component/editPost'

import { Routes, Route, Link, useLocation } from "react-router-dom";

import UserProvider from './state/UserContext'
import TimelineProvider from './state/TimelineContext'

import axios from 'axios';

import background from './background.jpg'

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
                backgroundColor: '#f0f5f5', 
                backgroundImage : 'url('+ bgr() +')',
                backgroundRepeat: 'no-repeat',            
                backgroundPosition: 'center center',            
                backgroundSize: 'cover',
                p: 0, 
                minHeight: {xs: '100%', md:'100vh'},                
             }}>
              <Container maxWidth='md' disableGutters
               sx={{ 
                pt: {xs: 8, md : 11}, 
                pb: {xs: 1, xl :5},                                 
                minHeight: {xs: '100vh', md : '100vh'},                
                 }}>
                <Navbar></Navbar>
                <Routes>                  
                
                  <Route path='/' element={<TimelineProvider><Timeline /> </TimelineProvider>}></Route>
                  <Route path='/detail/:id_post' element={<TimelineProvider><Detail /></TimelineProvider>}></Route>
                  <Route path='/edit/post/:id_post' element={<TimelineProvider><EditPost /></TimelineProvider>}></Route>
                  
                  <Route path='/AddPost' element={<TimelineProvider><AddPost /></TimelineProvider>}></Route>

                  <Route path='/:username' element={<Profile />}></Route>                                    
                  <Route path='/profile/edit/:username' element={<EditProfile />}></Route>                  
                  
                  <Route path='/login' element={<Login />}></Route>                  
                  <Route path='/register' element={<Register />}></Route>
                  <Route path='/notification' element={<Notif />}></Route>

                  <Route path='/Tests' element={<Test />}></Route>
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
