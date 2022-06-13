import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import Container from '@mui/material/Container';

import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';

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
        <AppBar position='fixed' color='transparent' sx={{ boxShadow: 'none', px: { xs: 0, xl: 65.6, md: 26} }}>                                                                                
            <Container maxWidth='md' sx={{ backgroundColor: 'white', py: {xs : 0.5, xl: 1}, px: { xs: 0 }, borderBottom : '0.8px solid #F5F5F5' }}>
            <Toolbar >
                <Typography 
                    variant="h5"                     
                    component={Links} 
                    color="primary"
                    to="/" 
                    sx={{ fontWeight: 'bolder', textDecoration: 'none' }}>
                    SOCIA
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', ml : 'auto'}}>
                    {/* <Typography variant="button" component={Links} to='/AddPost' sx={{ mr: {xs: 0, md: 2}, textDecoration: 'none', color: 'inherit' }}>
                        Create a Post
                    </Typography>          */}                    
                    { user.user != '' ? 
                            <>
                                <IconButton color='inherit' aria-label="create" size="large" sx={{ mr: 2}} component={Links} to={"/AddPost"}>
                                    <PhotoCameraOutlinedIcon />
                                </IconButton>  
                                <Avatar alt={user.user.username} src={user.user.image_url} component={Links} to={"/" + user.user.username}
                                    sx= {{ 
                                        width : { xs : 30, md: 40 },
                                        height : { xs : 30, md: 40 },                                                                    
                                    }}
                                
                                />
                            </>                        
                        :
                        <Button variant='outlined' size='small' color='primary' component={Links} to="/login">
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
