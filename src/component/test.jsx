import React from 'react'
import axios from 'axios'

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';

import TextField from '@mui/material/TextField';

export default function test() {
    const [name, setName] = React.useState('')
    const [caption, setCaption] = React.useState('')
    const [title, setTitle] = React.useState('')

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

    React.useEffect(() => {
      let data = new FormData()
        data.append('id_friend', '628f0f9b06b131e9005374d0')
        data.append('id', '628de258fd5bb0be667329ac')
      axios.post('http://localhost:5000/user/addFriend/628de258fd5bb0be667329ac', data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
    },[])

  return (
    <Box></Box>
    
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
