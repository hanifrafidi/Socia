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
        <AppBar position='fixed' color='transparent' sx={{ boxShadow: 'none', px: { xs: 0, md: 65.6} }}>                                                                                
            <Container maxWidth='md' sx={{ backgroundColor: 'white', py: 1, px: { xs: 0 } }}>
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
                    <Typography variant="button" component={Links} to='/AddPost' sx={{ mr: {xs: 0, md: 2}, textDecoration: 'none', color: 'inherit' }}>
                        Create a Post
                    </Typography>           
                    { user.user != '' ? 
                        <Button variant='text' component={Links} to={"/" + user.user.username} color="inherit">                                                        
                            <Avatar alt={user.user.username} src={user.user.profile.image_path}
                                sx= {{ 
                                    width : { xs : 30, md: 40 },
                                    height : { xs : 30, md: 40 },                                    
                                }}
                            
                            />
                        </Button>    
                        :
                        <Button variant='text' component={Links} to="/login" color="inherit">
                            Login
                        </Button>    
                    }                    
                </Box>
            </Toolbar>            
            </Container>
        </AppBar>
    </Box>
  )
}
