import React from 'react'
import axios from 'axios'
import { server } from '../backend'
import {Link as Links, useParams} from 'react-router-dom'

import { 
    Typography,
    Card,
    Grid,
    IconButton,
    Box,
    Container,    
    Button,
    Link,
    Paper
} from '@mui/material'

import TextField from '@mui/material/TextField'
import Modal from '@mui/material/Modal'
import Loader from './loader'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { styled } from '@mui/material/styles';

import {UserContext} from '../state/UserContext'

export default function editProfile() {  

  
  const { username } = useParams()
  const [userdata, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')    
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [id, setId] = React.useState('')
  const [location, setLocation] = React.useState('')
  
  const [modal, setModal] = React.useState(false)

  const {user, login, logout} = React.useContext(UserContext)
  
  const [showPass, setShowPass] = React.useState('password');
  const showPassword = () => { 
    if( showPass === 'password'){
      return setShowPass('text') 
    }
    return setShowPass('password') 
  }
  
  const Input = styled('input')({
      display: 'none',
  });

  React.useEffect(() => {
    getUser()
  },[])

  const getUser = () => {
    axios.get( server.url + '/user/profile/' + username)
    .then((response) => {
      console.log(response.data)
      setId(response.data.user._id)
      setEmail(response.data.user.email)
      setUsername(response.data.user.username)
      setFirstName(response.data.user.name.first)
      setLastName(response.data.user.name.last)      
    })
    .catch((error) => {
      console.log(error)
    })
  }
  
  const onSubmit = (event) => {
      event.preventDefault();        

      setModal(true)      

      const name = {
         first : firstName,
         last : lastName,
      }

      let formData = new FormData();  
      formData.append('username', userdata);
      formData.append('email', email);                  
      formData.append('name', JSON.stringify(name))
      // formData.append('firstname', firstName);   
      // formData.append('lastname', lastName);                  

      axios.patch( server.url + '/user/' + id, formData)
      .then((response) => {
        setTimeout(() => {
          setModal(false)                   
          console.log(response.data)   
          login(response.data)     
        },800)                                                                                                         
      })
      .catch((error) => {
          console.log(error)
          setModal(false)
      })

  }

  return (
    <div>
    <Box 
      component='form' 
      onSubmit = {(e) => onSubmit(e)}
      enctype='multipart/form-data'
      
      sx={{    
        my: 1,                     
        px: {xs: 3, xl: 20},
        py: 8,
        display: 'flex', 
        flexDirection: 'column', 
        backgroundColor: '#fff' }}
    >      

        <Typography variant="h4" color='primary' textAlign='center' fontWeight='bold' >Edit Your Profile</Typography>        
        
        <Box sx={{ mt: 5}}>
          <Typography variant="body2" color='inherit' sx={{ my: 2}} > Firstname </Typography>
          <TextField
            id='firstname'
            name='firstname'
            type='text'
            variant='outlined'
            size='small'            
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            fullWidth
           />          
        </Box>

        <Box sx={{ mt: 2}}>
          <Typography variant="body2" color='inherit' sx={{ my: 2}} > Lastname </Typography>
          <TextField
            id='lastname'
            name='lastname'
            type='text'
            variant='outlined'
            size='small'            
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            fullWidth
           />          
        </Box>

        <Box sx={{ mt: 2}}>
          <Typography variant="body2" color='inherit' sx={{ my: 2}} > Username </Typography>
          <TextField
            id='username'
            name='username'
            type='text'
            variant='outlined'
            size='small'   
            value={userdata}         
            onChange={(e) => setUsername(e.target.value)}
            required
            fullWidth
           />          
        </Box>

        <Box sx={{ mt: 2}}>
          <Typography variant="body2" color='inherit' sx={{ my: 2}} > Email </Typography>
          <TextField
            id='email'
            name='email'
            type='email'
            variant='outlined'
            size='small'
            required
            value = {email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
           />          
        </Box>

        {/* <Box sx={{ mt: 2}}>
          <Typography variant="body2" color='inherit' sx={{ my: 2}} > Location </Typography>
          <TextField
            id='location'
            name='location'
            type='text'
            variant='outlined'
            value={location}
            size='small'            
            onChange={(e) => setLocation(e.target.value)}            
            fullWidth
            
           />                             
        </Box> */}

        {/* <Box sx={{ mt: 2}}>
          <Typography variant="body2" color='inherit' sx={{ my: 2}} > Password </Typography>
          <TextField
            id='password'
            name='password'
            type={showPass}
            variant='outlined'
            size='small'
            required
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
           />          
           <Typography variant='body2' color='text' sx={{ mt: 3, textAlign: 'end', cursor: 'pointer' }} onClick={() => showPassword()}> Show Password</Typography>
        </Box> */}        

        

        <Button type='submit' variant='contained' size='medium' color='success' fullWidth={true} sx={{ mt: 8, mb: 3}}>Submit</Button>
        <Button variant='text' color='error' size='medium' fullWidth={true}  sx={{ textAlign: 'center' }} component={Links} to='/login'>Delete</Button>        
    </Box>

  <Modal
  open={modal}          
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
  >        
      <Box sx={{ 
          display: 'flex', 
          flexDirection:'column', 
          justifyContent: 'center', 
          alignItems:'center', 
          py: 15,
          minWidth: {xs: '70%', md :'20%'}, 
          borderRadius : 1,
          background:'#fff',                                    
          }}>
          <Box><Loader /></Box>
          <Typography variant='h6' color="text.secondary" sx={{ mt: 3}}>Loading dulu ya...</Typography>
          {/* <Button variant='text' size='medium' color="inherit" onClick={() => setModal(false)}> Close</Button> */}
      </Box>
    </Modal>
  </div>
  )
}
