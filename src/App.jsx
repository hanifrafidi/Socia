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

import { Routes, Route, Link } from "react-router-dom";

import UserProvider from './state/UserContext'

import axios from 'axios';

function App() {  
  const [datas,setDatas] = React.useState([
    {
      img : 'https://images.unsplash.com/photo-1500416149159-461f35b7e5da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80',
      alt : '0',
    },
    {
      img : 'https://images.unsplash.com/flagged/photo-1553928841-ccac95ad7e72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      alt : '1',
    },
    {
      img : 'https://images.unsplash.com/photo-1623171916712-4f3ec1d37c02?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      alt : '2',
    },
    {
      img : 'https://images.unsplash.com/photo-1591723714396-14064ef239dc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80',
      alt : '3',
    },
    {
      img : 'https://images.unsplash.com/photo-1644083584824-70941e7a95cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80',
      alt : '4',
    },
  ])    

  const ServeUrl = 'http://localhost:5000/';

  React.useEffect(() => {
    axios.get(ServeUrl + 'post/timeline')
    .then((response) => {
      // console.log(response.data)
      setDatas(response.data)
    })
    .catch((error) => {
      console.error(error.response.data);
    })
  }, [])  

  function Posts() {
    return(
      datas.map((data,index) => {                
        return(
          <Box key={index}>
            <Post img={data.image_path} caption={data.caption} user={data.user_detail}></Post>            
          </Box>
        )
      })      
    )
  }

  return (    
    <div>
        <UserProvider>
            <Box sx={{ backgroundColor: '#F2F2F2', p: 0, minHeight: '100vh'}}>
              <Container maxWidth='md' sx={{ py: 10, backgroundColor: '#FFF', minHeight: '100vh' }}>
                <Navbar></Navbar>
                <Routes>
                  <Route path='/' element={<Timeline />}></Route>
                  <Route path='/Profile' element={<Profile />}></Route>
                  <Route path='/profile/:id' element={<Profile />}></Route>
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
