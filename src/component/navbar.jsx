import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';

import { useLocation, Link as Links, useNavigate} from "react-router-dom";

import {UserContext} from '../state/UserContext'

export default function navbar() {

  const {user} = React.useContext(UserContext)

  const location = useLocation();  
  const navigate = useNavigate();

  const navDisplay = () => {      
      if(location.pathname === '/login' || location.pathname === '/register'){
          return 'none'
      }
      return ''
  }  

//   React.useEffect(() => {
//     if(user.user === ''){
//         return navigate("/login", {replace: true}) 
//     }else{
//         // console.log(user)
//     }
//   },[])

  return (
    <Box sx={{ display: () => navDisplay() }}>
        <AppBar position='fixed' color='transparent' sx={{ boxShadow: 'none', px: 65.6,}}>
            <Container maxWidth='md' sx={{ backgroundColor: 'white', py: 1, }}>
            <Toolbar >
                <Typography 
                    variant="h5"                     
                    component={Links} 
                    color="primary"
                    to="/" 
                    sx={{ flexGrow: 1, fontWeight: 'bold', textDecoration: 'none' }}>
                    SOCIA
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                    <Typography variant="button" component={Links} to='/AddPost' sx={{ mr: 4, textDecoration: 'none', color: 'inherit' }}>
                        Create a Post
                    </Typography>           
                    { user.user != '' ? 
                        <Button variant='text' component={Links} to={"/" + user.user.username} color="inherit">                                                        
                            <Avatar alt={user.user.username} src={user.user.profile.image_path} />
                        </Button>    
                        :
                        <Button variant='text' component={Links} to="/login" color="inherit">
                            Login
                        </Button>    
                    }
                    {/* <Button variant='text' component={Links} to="/Profile">
                        <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1649214489153-88e679a6f7be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80" />
                    </Button>     */}                
                </Box>
            </Toolbar>            
            </Container>
        </AppBar>
    </Box>
  )
}
