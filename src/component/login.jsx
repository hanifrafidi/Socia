import React from 'react'
import axios from 'axios'

import { 
  Typography,
  Card,
  Grid,
  IconButton,
  Box,
  Container,
  Button,
  Link,
  TextField,
  Modal
} from '@mui/material'

import { useLocation, Link as Links} from "react-router-dom";

import {UserContext} from '../state/UserContext'

export default function login() {
  const {login,user} = React.useContext(UserContext)

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [modal, setModal] = React.useState(false)


  const onSubmit = (event) => {
    event.preventDefault();        

    setModal(true)      

    let formData = new FormData();    
    formData.append('username', username);          
    formData.append('password', password);      

    axios.post('https://socia-apps.herokuapp.com/user/login', formData)
    .then((response) => {                                                                        
        setModal(false)                 
        console.log(response.data)
        // console.log(response.data.user.profile.image_path)
        return login(response.data)
    })
    .catch((error) => {
        console.log(error.response.data)
    })

  }

  const [showPass, setShowPass] = React.useState('password');
  const showPassword = () => { 
    if( showPass === 'password'){
      return setShowPass('text') 
    }
    return setShowPass('password') 
  }

  return (
    <Box
      component='form' 
      onSubmit = {onSubmit}
      enctype='multipart/form-data'
       sx={{ 
          display: 'flex', 
          px: 25,
          flexDirection: 'column',
          minHeight: '100%',
        }}>

        <Box sx={{ mt: 5}}>
          <Typography variant="body1" color='inherit' sx={{ my: 3}} > Username </Typography>
          <TextField
            id='username'
            name='username'
            type='text'
            variant='outlined'
            size='medium'
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
           />          
        </Box>

        <Box sx={{ mt: 5}}>
          <Typography variant="body1" color='inherit' sx={{ my: 3}} > Password </Typography>
          <TextField
            id='password'
            name='password'
            type={showPass}
            variant='outlined'
            size='medium'
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
           />          
           <Typography variant='body1' color='text' sx={{ mt: 3, textAlign: 'end', cursor: 'pointer' }} onClick={() => showPassword()}> Show Password</Typography>
        </Box>
        
        <Button type='submit' variant='contained' size='large' color='success' fullWidth={true} sx={{ mt: 15, mb: 3}}>Submit</Button>
        <Button variant='text' color='inherit' component={Links} to='/register'> Register </Button>

        <Modal
          open={modal}          
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          >        
              <Box sx={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center', minHeight: '100vh'}}>
                  <Typography variant='h6' sx={{ my: 3}}>Loading dulu ya...</Typography>
                  <Button variant='text' color="inherit" onClick={() => setModal(false)}> Close</Button>
              </Box>
         </Modal>
    </Box>
  )
}
