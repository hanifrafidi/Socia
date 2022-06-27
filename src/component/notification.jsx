import React from 'react'
import axios from 'axios'
import {server} from '../backend'
import moment from 'moment'

import {Link as Links} from 'react-router-dom'
import { UserContext } from '../state/UserContext'

import { Box, Typography, Button, Stack, Avatar} from '@mui/material'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

export default function notification() {
  const {user} = React.useContext(UserContext)

  const [notif, setNotif] = React.useState([])
    
  const getNotif = async () =>{
    var notif = 's'    
        
        return axios.get(server.url + '/notification/get_notif/' + user.user._id)
        .then(response => {
          console.log(response.data.notif)
            // setNotif(response.data.notif)
        })    
        .catch(err => {
            return err.message
        })

    // return notif
  }

  const likeRender = (item) => {
    return(
      <Box>{item.like_user_detail.username} menyukai postingan anda</Box>
    )
  }

  const changeDate = (date) => {
    return moment(Date.parse(date)).fromNow();
  }

  const commentRender = (item) => {
    return(
      <Stack direction='row'>
        <Avatar 
          alt={item.user_detail.username} 
          src={item.user_detail.image_url} 
          component={Links} to={"/" + item.user_detail.username}
          sx= {{ 
              width : { xs : 30, md: 32 },
              height : { xs : 30, md: 32 },     
              mr: 1,
              border: '1px solid #F2F2F2'
          }}                                
        />
        <Typography paragraph={true}>
          <strong>{item.comment_user_detail.username}</strong> 
          mengomentari postingan anda
        </Typography>
      </Stack>
    )
  }

  const render = (item) => {
    return(
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Brunch this weekend?"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Oui Oui"
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Sandra Adams
              </Typography>
              {' — Do you have Paris recommendations? Have you ever…'}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
    )
  }

  React.useEffect(() => {    
    getNotif()
  },[])

  return (
    <Box backgroundColor='white' width='100%' height='100vh'>
      
      { notif.length > 0 ?
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {notif.map((notif, index) => (
            <div key={index}>
              <ListItem alignItems="flex-start">
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
        ''
      }
    </Box>
  )
}
