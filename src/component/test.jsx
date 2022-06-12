import React from 'react'
import axios from 'axios'
import {UserContext}  from '../state/UserContext'


import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';

import TextField from '@mui/material/TextField';

import { server } from '../backend'

export default function test() {
    const [name, setName] = React.useState('')
    const [caption, setCaption] = React.useState('')
    const [title, setTitle] = React.useState('')

    const {user, logout} = React.useContext(UserContext)    


    const onSubmit = (e) => {
        e.preventDefault();

        console.log(name,caption,title)

        let data = new FormData(form)
        // data.append('name', name)
        // data.append('caption', caption)
        // data.append('title', title)
                        
        axios.post('http://localhost:3001/test/form', data)
        .then((response) => {
            console.log(response.data); //
                        
            if(response.status === 200) {
                console.log('berhasil')
            }
        })
    }

    const checkFriend = () => {
      let data = new FormData()
        data.append('id_friend', '628f0f9b06b131e9005374d0')
        // data.append('id', '628de258fd5bb0be667329ac')
      axios.post(server.url + '/user/check/629418837c7f374e748ca150', data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
    }

    const timelineTest = () => {
      axios.get(server.url + '/post/test/' + user.user.username)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
    }

    const userMod = () => {
      axios.get(server.url + '/user/moduser')
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.error);
      })
    }

    React.useEffect(() => {      
    },[])

  return (
    <Box>
      {/* <Button size="large" variant="outlined" onClick={checkFriend} >Check Friend</Button>
      <Button size="large" variant="outlined" color="primary" onClick={timelineTest} >Check Timeline</Button> */}

<Button size="large" variant="outlined" onClick={userMod} >User Mod</Button>
    </Box>
    
    // simple form
    // <Box
    //     id='form'
    //     component='form'
    //     onSubmit={onSubmit}
    //     // enctype = 'multipart/form-data
    //     sx={{
    //         py: 15
    //     }}
    // >
    //     <Box sx={{ my: 3}}>
    //         <Typography variant='h6'>Name</Typography>
    //         <TextField id='name' name='name' type='text' variant='outlined' sx={{ minWidth: '100%' }} onChange={(e) => setName(e.target.value)}></TextField>
    //     </Box>

    //     <Box sx={{ my: 3}}>
    //         <Typography variant='h6'>Caption</Typography>
    //         <TextField name='caption' type='text' variant='outlined' sx={{ minWidth: '100%' }} onChange={(e) => setCaption(e.target.value)}></TextField>
    //     </Box>

    //     <Box sx={{ my: 3}}>
    //         <Typography variant='h6'>Title</Typography>
    //         <TextField name='Title' type='text' variant='outlined' sx={{ minWidth: '100%' }} onChange={(e) => setTitle(e.target.value)}></TextField>
    //     </Box>

    //     <Button type='submit' variant='contained' size='large' color='success' fullWidth={true} sx={{ mt: 4, mb: 3}}>Submit</Button>
    // </Box>
  )
}
