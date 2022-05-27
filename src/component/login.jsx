import React from 'react'
import axios from 'axios'
import { server } from '../backend'

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

    axios.post( server.url + '/user/login', formData)
    .then((response) => {                                                                        
        setModal(false)                 
        console.log(response.data)
        // console.log(response.data.user.profile.image_path)
        return login(response.data)
    })
    .catch((error) => {
        console.log(error.response.data)
        setModal(false)
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
    <Card
      component='form' 
      onSubmit = {onSubmit}
      encType='multipart/form-data'
       sx={{ 
          display: 'flex', 
          px: 10,
          py : 8,
          mx: 20,
          my: 10,
          
          flexDirection: 'column',
          minHeight: '100%',
          backgroundColor: '#fff',          
        }}>

        <Typography variant='h3' align='center' sx={{ fontWeight: 'bold', mb: 3, color: '#eb5757' }}>SOCIA</Typography>

        <Box>
          <Typography variant="body1" color='inherit' sx={{ my: 2}}> Username </Typography>
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

        <Box>
          <Typography variant="body1" color='inherit' sx={{ my: 2}} > Password </Typography>
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
        
        <Button type='submit' variant='contained' size='large' fullWidth={true} sx={{ mt: 5, mb: 3, backgroundColor: '#eb5757'}}>Login</Button>
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
    </Card>
  )
}
