import React from 'react'
import axios from 'axios'
import {Link as Links} from 'react-router-dom'

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
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { styled } from '@mui/material/styles';

import {UserContext} from '../state/UserContext'

export default function register() {
  const [preview, setPreview] = React.useState([])
  const [image, setImage] = React.useState([])

  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  
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

  const uploadImage = (e) => {
    // console.log(e.target.files[0]);
    var file = e.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
  
    reader.onloadend = (e) => {
        setPreview(reader.result);                        
        setImage(reader.result);
    }                     
  }    

  const onSubmit = (event) => {
      event.preventDefault();        

      setModal(true)      

      let formData = new FormData();
      formData.append('files', image);
      formData.append('username', username);      
      formData.append('email', email);      
      formData.append('password', password);      

      axios.post('https://socia-apps.herokuapp.com/user/', formData)
      .then((response) => {                                                                        
          setModal(false)                   
          console.log(response.data)           
          return login(response.data)
      })
      .catch((error) => {
          console.log(error)
      })

  }

  return (
    <Box 
      component='form' 
      onSubmit = {onSubmit}
      enctype='multipart/form-data'
      sx={{ px: 10, display: 'flex', flexDirection: 'column' 
    }}>      

        <Typography variant="h6" color='inherit' >Create your Account</Typography>        

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
          <Typography variant="body1" color='inherit' sx={{ my: 3}} > Email </Typography>
          <TextField
            id='email'
            name='email'
            type='text'
            variant='outlined'
            size='medium'
            onChange={(e) => setEmail(e.target.value)}
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

        <Box sx={{ mt: 5}}>
          <Typography variant="body1" color='inherit' sx={{ mt: 3, mb: 7}} > Upload Photo Profile </Typography>
          <label htmlFor="contained-button-file">
            <Input id="contained-button-file" multiple type="file" accept="image/jpeg,image/png,image/jpg" onChange={uploadImage}/>
            <Card 
                sx={{ 
                    height: 250, 
                    width: 250,
                    borderRadius : '100%',
                    cursor: 'pointer', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundImage: 'url('+ preview +')',
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    mx: 'auto'
                }}
            >
                <IconButton size="large">
                    <CameraAltIcon fontSize="large" />
                </IconButton>
                <Typography variant='subtitle1' component='div'>Upload your photo profile</Typography>
                
            </Card>
            </label> 
        </Box>

        <Button type='submit' variant='contained' size='large' color='success' fullWidth={true} sx={{ mt: 15, mb: 3}}>Submit</Button>
        <Button variant='text' color='error' fullWidth={true}  sx={{ textAlign: 'center' }} component={Links} to='/'>Delete</Button>

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
