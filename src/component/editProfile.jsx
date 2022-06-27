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
import { grey } from '@mui/material/colors';


import {UserContext} from '../state/UserContext'

export default function editProfile() {  

  
  const { username } = useParams()
  const [userdata, setUsername] = React.useState('')  
  const [profile,setProfile] = React.useState('')  
  const [email, setEmail] = React.useState('')    
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [id, setId] = React.useState('')
  const [location, setLocation] = React.useState('')
  const [image , setImage] = React.useState('')
  const [preview, setPreview] = React.useState('') 
  
  const [modal, setModal] = React.useState(false)

  const {user, login, logout, updateProfile} = React.useContext(UserContext)
  
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
      var data = response.data.user
      setId(data._id)
      setEmail(data.email)
      setUsername(data.username)
      setFirstName(data.name.first)
      setLastName(data.name.last)                
      setProfile(data)

      setPreview(data.image_url)
      console.log(data)
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
          // login(response.data)     
        },800)                                                                                                         
      })
      .catch((error) => {
          console.log(error)
          setModal(false)
      })

  }

  const uploadImage = (event) => {
    event.preventDefault();        

    setModal(true)          

    let formData = new FormData();      
    formData.append('file', image);    
    formData.append('public_id', profile.image_details.public_id)    
    
    axios.patch( server.url + '/user/profile_picture/' + id, formData)
    .then((response) => {
      setTimeout(() => {
        setModal(false)                   
        // console.log(response.data)   
        updateProfile(response.data.update)
        // login(response.data)     
      },800)                                                                                                         
    })
    .catch((error) => {
        console.log(error)
        setModal(false)
    })

}

  const previewImage = (e) => {  
    // console.log(e.target.files[0].size)
        
    if(e.target.files[0].size > 22000000 && e.target.files[0].type === 'image/*'){
        return setSizeLimit(true)
    }
            
    if(e.target.files[0].type === 'image/jpg' || e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg'){
        setImage('');
        
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
    
        reader.onloadend = (event) => {

            const imgElement = document.createElement("img");
            imgElement.src = event.target.result;
            // document.querySelector("#input").src = event.target.result;

            imgElement.onload = (events) => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = events.target.width;
                canvas.height = events.target.height;
                ctx.drawImage(events.target, 0, 0, canvas.width, canvas.height);

                canvas.toBlob((blob) => {
                    var reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onload = (events) => {   
                        var basedata = reader.result;
                        // console.log(basedata);
                        setPreview(basedata)
                        setImage(basedata)
                    }
                }, 'image/jpeg', 0.55)                                
              }            
          }                         
      }    
  }

  return (
    <Box sx={{          
      px: {xs: 3, xl: 20},
      py: 5,
      display: 'flex', 
      flexDirection: 'column', 
      backgroundColor: '#fff' }}>       
      <Typography variant="h5" color='primary' fontWeight='bold' >Edit Picture</Typography>        
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
                  mx: 'auto',
                  my: 8
              }}
    >          
      <label htmlFor="icon-button-file">
          <Input id="icon-button-file" type='file' accept="image/*" onChange={previewImage} />
          <IconButton size="large" aria-label="upload picture" component="span">
              <CameraAltIcon fontSize="large"/>
          </IconButton>
      </label>
    </Card>
    <Box 
      component='form' 
      onSubmit = {(e) => uploadImage(e)}
      enctype='multipart/form-data'
      > 
      <Button type='submit' variant='text' color='success' size='large' fullWidth={true} sx={{ textAlign : 'center' }} >Save Changes</Button>
    </Box>
        
    <Box 
      component='form' 
      onSubmit = {(e) => onSubmit(e)}            
      // enctype='multipart/form-data'
      sx={{
        my: 5
      }}    >      
        
    <Typography variant="h5" color='primary' fontWeight='bold' >Edit Bio</Typography>        
        <Box sx={{ mt: 3}}>
          <Typography variant="body2" color='text.secondary' sx={{ my: 2}} > Firstname </Typography>
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
          <Typography variant="body2" color='text.secondary' sx={{ my: 2}} > Lastname </Typography>
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
          <Typography variant="body2" color='text.secondary' sx={{ my: 2}} > Username </Typography>
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
          <Typography variant="body2" color='text.secondary' sx={{ my: 2}} > Email </Typography>
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
        <Button variant='text' color='error' size='medium' fullWidth={true}  sx={{ textAlign: 'center' }} component={Links} to='/'>Delete</Button>        
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
  </Box>
  )
}
