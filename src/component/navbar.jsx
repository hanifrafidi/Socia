import React from 'react'
import axios from 'axios'
import moment from 'moment'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Badge from '@mui/material/Badge';

import { grey } from '@mui/material/colors';

import Container from '@mui/material/Container';

import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import { useLocation, Link as Links, useNavigate} from "react-router-dom";

import {UserContext} from '../state/UserContext'
import {server} from '../backend'

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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    if( notif.length > 0){
        readNotif()
    }

    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {    
    setAnchorEl(null);
  };

  const [notif, setNotif] = React.useState([])
    
  const getNotif = async () =>{
    var notif = 's'    
        
        return axios.get(server.url + '/notification/get_notif/' + user.user._id)
        .then(response => {
        //   console.log(response.data.notif)
          var c = response.data.notif                    
          setNotif(response.data.notif)
        })    
        .catch(err => {
            return err.message
        })

    // return notif
  }
  
  const readNotif = async () =>{            

        return axios.patch(server.url + '/notification/read_notif/' + user.user._id)
        .then(response => {
          console.log(response.data.notif)
          var c = response.data.notif          
          console.log(c)
        //   setNotif(response.data.notif)
        })    
        .catch(err => {
            return err.message
        })

    // return notif
  }

  const changeDate = (date) => {
    return moment(Date.parse(date)).fromNow();
  }

  React.useEffect(() => {
    if(user.user){
        getNotif()    
    }
  },[])

  return (
    <Box sx={{ display: () => navDisplay(), }}>
      
        <AppBar position='fixed' color='transparent' sx={{ boxShadow: 'none', }}>
          <Container maxWidth='md' disableGutters 
            sx={{ backgroundColor: 'white', 
                py: {xs : 0.5, xl: 1}, 
                px: {xs : 0, md : 2},
                borderBottom : '0.8px solid #F5F5F5' 
            }}>
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
                              <Stack direction='row' alignItems='center'>
                                  <IconButton sx={{ mr : 
                                    1}} color='inherit' aria-label="create" size="medium" component={Links} to={"/AddPost"}>
                                      <PhotoCameraOutlinedIcon sx={{ color: grey[700] }} />
                                  </IconButton>
                                  <IconButton
                                  sx={{ mr : 1}} 
                                  color='inherit' 
                                  aria-label="create"
                                  size="medium"
                                  aria-controls={open ? 'basic-menu' : undefined}
                                  aria-haspopup="true"
                                  aria-expanded={open ? 'true' : undefined}
                                  onClick={handleClick}
                                  >
                                      <Badge badgeContent={notif.length} color="primary">
                                          <NotificationsNoneIcon sx={{ color: grey[700] }} />
                                      </Badge>
                                  </IconButton>  
                                  <Avatar alt={user.user.username} src={user.user.image_url} component={Links} to={"/" + user.user.username}
                                      sx= {{ 
                                          width : { xs : 30, md: 32 },
                                          height : { xs : 30, md: 32 },     
                                          ml: 1,
                                          border: '1px solid #F2F2F2'
                                      }}                                
                                  />
                              </Stack>                        
                          :
                          <Button variant='outlined' size='small' color='primary' component={Links} to="/login">
                              Login
                          </Button>    
                      }                    
                  </Box>
              </Toolbar>                        
            </Container>
        </AppBar>
        
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            sx={{
                maxHeight: 400
            }}
        >
        { notif.length > 0 ?
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {notif.map((notif, index) => (
            <div key={index} >
              <ListItem alignItems="flex-start" component={Links} to={'/detail/'+ notif.detail.post_id}>
                <ListItemAvatar>
                  { notif.type === 'like' ?
                    <Avatar alt={notif.like_user_detail.username} src={notif.like_user_detail.image_url} />  
                    :
                    notif.type === 'comment' ?
                    <Avatar alt={notif.comment_user_detail.username} src={notif.comment_user_detail.image_url} />  
                    :
                    ''
                  }
                  
                </ListItemAvatar>
                <ListItemText                  
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                         
                          {
                            notif.type === 'like' ?
                            notif.like_user_detail.username
                            :
                            notif.type === 'comment' ?
                            notif.comment_user_detail.username
                            :
                            ''}
                        
                      </Typography>
                      {                        
                        notif.type === 'like' ?
                        " menyukai postingan anda"
                        :
                        notif.type === 'comment' ?
                        " mengomentari postingan anda"
                        : 
                        ''
                      }
                      {
                        ', ' + changeDate(notif.date.created_at)
                      }
                    </React.Fragment>
                  }
                />
              </ListItem>
              {/* <Divider variant="inset" component="li" /> */}
            </div>
          ))}
        </List>
        :
        <Box p={2} maxWidth={220}>
            You've been read all your new notifications
        </Box>
      }
      </Menu>
    </Box>
  )
}
