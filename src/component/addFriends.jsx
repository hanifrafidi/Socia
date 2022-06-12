import React from 'react'
import { Link as Links } from 'react-router-dom'


import {
    Typography,
    Grid,
    Box,
    Stack,
    Avatar,
    Button
} from '@mui/material'

export default function addFriends({friends}) {
  return (
    <div>
        <Stack mt={3}
                    sx={{ 
                      px: {xs: 2, md: 5}, 
                      pt: {xs: 2, md: 5}, 
                      pb: 2, 
                      my: 1, 
                      backgroundColor: '#fff', 
                      borderRadius: 1.5 
                    }}>
                    <Stack direction="row" spacing={2}>
                      <Avatar component={Links} to={'/' + friends.user_profile.username}
                        alt={friends.user_profile.username}
                        src={friends.user_profile.image_url}
                        sx={{ 
                            mr: {xs: 1, md: 2},
                            width : { xs : 30, md: 40 },
                            height : { xs : 30, md: 40 }
                        }}
                      />
                      <Typography variant='body1' component="div" color="inherit" >{friends.user_profile.username}</Typography>
                    </Stack>
                    <Grid container sx={{ display: 'flex',}} mt={2}>
                      {
                        friends.post.map((post,index) => {
                          return(                          
                              <Grid item xs={4} md={4} key={index} sx={{
                                minHeight : 120,
                                minWidth : 'auto',
                                backgroundImage : 'url('+ post.image_path +')',
                                backgroundRepeat: 'no-repeat',            
                                backgroundPosition: 'center center', 
                                backgroundSize: 'cover',
                              }}></Grid>                          
                          )
                        })                      
                      }
                    </Grid>
                  </Stack>
    </div>
  )
}
