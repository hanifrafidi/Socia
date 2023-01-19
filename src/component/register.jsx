import React from 'react'
import axios from 'axios'
import { server } from '../backend'
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
import Loader from '../component/loader'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { styled } from '@mui/material/styles';

import {UserContext} from '../state/UserContext'
import { grey } from '@mui/material/colors';

export default function register() {
  const [preview, setPreview] = React.useState([])
  const [image, setImage] = React.useState([])

  const [username, setUsername] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  
  const [checkUsername, setCheckUsername] = React.useState(false)
  const [checkEmail, setCheckEmail] = React.useState(false)
  
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

  const checkUser = () => {
    axios.get(server.url + '/user/check_user/'+ username)
    .then((response) => {
      console.log(response.data)
      if(response.data.user.length > 0){
        setCheckUsername(true)
      }else{
        setCheckUsername(false)
      }
    })
    .catch((error) => {
      console.log(error)
    })
  }

  React.useEffect(() => {    
    
    if(username !== ''){
      var delay = setTimeout(() => {      
        checkUser()
      }, 3000)    
      return () => clearTimeout(delay)
    }else{
      setCheckUsername(false)
    }
      
  },[username])
  
  // React.useEffect(() => { console.log(checkUsername)},[checkUsername])

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
      // formData.append('firstname', firstname);   
      // formData.append('lastname', lastname);            
      // formData.append('location', location);   


      axios.post( server.url + '/user/', formData)
      .then((response) => {                                                                        
          setModal(false)                   
          console.log(response.data)           
          return login(response.data)
      })
      .catch((error) => {
          console.log(error.data)
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
        px: { xs : 3, md: 8 },
        py : { xs : 5, md: 5 },
        mx: { xs : 2, md: 25 },
        my: { xs : 1, md: 5 },
        display: 'flex', 
        flexDirection: 'column', 
        backgroundColor: '#fff' }}
    >      

        <Typography variant="h4" color='primary' textAlign='center' fontWeight='bold' >Create your Account</Typography>        

        <Box sx={{ mt: 5}}>
          <Typography variant="body2" color='inherit' sx={{ my: 2}} > Username </Typography>
          <TextField
            id='username'
            name='username'
            type='text'
            variant='outlined'
            size='small'            
            onChange={(e) => setUsername(e.target.value.toLowerCase())}
            required
            fullWidth
            error = {checkUsername}
            helperText={ checkUsername ? "username has been used" : ''}
           />          
        </Box>

        <Box sx={{ mt: 2}}>
          <Typography variant="body2" color='inherit' sx={{ my: 2}} > Email </Typography>
          <TextField
            id='email'
            name='email'
            type='text'
            variant='outlined'
            size='small'
            required
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
           />          
        </Box>

        <Box sx={{ mt: 2}}>
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
        </Box>

        {/* <Box sx={{ mt: 5}}>
          <Typography variant="body2" color='inherit' sx={{ my: 2}} > Firstname </Typography>
          <TextField
            id='firstname'
            name='firstname'
            type='text'
            variant='outlined'
            size='medium'            
            onChange={(e) => setFirstName(e.target.value)}
            required
            fullWidth
           />          
        </Box>

        <Box sx={{ mt: 5}}>
          <Typography variant="body2" color='inherit' sx={{ my: 2}} > Lastname </Typography>
          <TextField
            id='lastname'
            name='lastname'
            type='text'
            variant='outlined'
            size='medium'            
            onChange={(e) => setLastName(e.target.value)}
            required
            fullWidth
           />          
        </Box>

        <Box sx={{ mt: 5}}>
          <Typography variant="body2" color='inherit' sx={{ my: 2}} > Firstname </Typography>
          <TextField
            id='location'
            name='location'
            type='text'
            variant='outlined'
            size='medium'            
            onChange={(e) => setLocation(e.target.value)}            
            fullWidth
           />          
        </Box> */}

        <Box sx={{ mt: 2}}>
          <Typography variant="body2" color='inherit' sx={{ mt: 3, mb: 7}} > Upload Photo Profile </Typography>
          <label htmlFor="contained-button-file">
            <Input id="contained-button-file" multiple type="file" accept="image/jpeg,image/png,image/jpg" onChange={uploadImage} />
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
                    <CameraAltIcon fontSize="large" sx={{ color: grey[700] }} />
                </IconButton>
                <Typography variant='subtitle1' component='div'>Upload your photo profile</Typography>                
            </Card>
            </label> 
        </Box>

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
