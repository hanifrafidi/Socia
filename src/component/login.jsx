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
  Modal,
  Alert
} from '@mui/material'

import Loader from '../component/loader'

import { useNavigate, Link as Links} from "react-router-dom";

import {UserContext} from '../state/UserContext'

export default function login() {
  const {login,user} = React.useContext(UserContext)
  const navigate = useNavigate()

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [error, setError] = React.useState(false)
  const [modal, setModal] = React.useState(false)


  const onSubmit = (event) => {
    event.preventDefault();        

    setModal(true)      

    let formData = new FormData();    
    formData.append('username', username);          
    formData.append('password', password);      

    axios.post( server.url + '/user/login', formData)
    .then((response) => {                                                                        
        
        console.log(response.data)
        // console.log(response.data.user.profile.image_path)
        setTimeout(() => {
          setModal(false)                 
          login(response.data)
        },800)        
    })
    .catch((error) => {
        console.log(error)
        setError(true)
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

    React.useEffect(() => {
    
    if(user.user !== ''){
          return navigate("/", {replace: true}) 
      }else{
          // console.log(user)
      }
    },[])

  return (
    <Card
      component='form' 
      onSubmit = {onSubmit}
      encType='multipart/form-data'
       sx={{ 
          display: 'flex', 
          px: { xs : 3, md: 10 },
          py : { xs : 5, md: 8 },
          mx: { xs : 2, md: 20 },
          my: { xs : 1, md: 10 },
          
          flexDirection: 'column',
          // minHeight: '100%',
          backgroundColor: '#fff',          
        }}>

        <Typography variant='h3' align='center' sx={{ fontWeight: 'bold', mb: 3, color: '#eb5757' }}>SOCIA</Typography>

        <Box>
          <Typography variant="body2" color='inherit' sx={{ my: 2}}> Username </Typography>
          <TextField
            id='username'
            name='username'
            type='text'
            variant='outlined'
            size='small'
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            required
           />          
        </Box>

        <Box>
          <Typography variant="body2" color='inherit' sx={{ my: 2}} > Password </Typography>
          <TextField
            id='password'
            name='password'
            type={showPass}
            variant='outlined'
            size='small'
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
           />          
           <Typography variant='body2' color='text' sx={{ mt: 3, textAlign: 'end', cursor: 'pointer' }} onClick={() => showPassword()}> Show Password</Typography>
        </Box>

        {
          error ? 
          <Alert severity="error" sx={{ mt: 3}}>username or password is incorrect</Alert>
          :
          ''
        }
        
        <Button type='submit' variant='contained' size='medium' fullWidth={true} sx={{ mt: 5, mb: 2, backgroundColor: '#eb5757'}}>Login</Button>
        <Button variant='text' color='inherit' size='medium' component={Links} to='/register'> Register </Button>

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
    </Card>
  )
}
