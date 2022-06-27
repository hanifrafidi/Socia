import React from 'react'
import { useParams, useLocation } from 'react-router-dom'

import {
    Box,
    Typography,
    Stack,
    Avatar,
    Button,
    Card,
    TextField
} from '@mui/material'

import Autocomplete from '@mui/material/Autocomplete';

export default function editPost() {
  const { id_post } = useParams()
  const location = useLocation()

  const [post,setPost] = React.useState(location.state.data)
  const [user,setUser] = React.useState(location.state.user)
  
  React.useEffect(() => {            
    // getPost()        
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;           
    
    console.log(post)

    return () => {
      null
    }
  },[]) 

  const postTags = [
    { 
      title : 'music',
    },
    { 
      title : 'gaming',
    },
    { 
      title : 'movie',
    },
    { 
      title : 'funny',
    }
  ]

  return (
    <Box sx={{ 
            px: {xs: 2, md: 5},
            py: {xs: 2, md: 8},
            mt: 0, 
            backgroundColor: '#fff', 
            borderRadius: 1.5, 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection : 'column',
            alignItems : 'center'
            
        }}> 
        <Card component='img'
        sx={{ 
            p: 0,            
            backgroundRepeat: 'no-repeat',            
            backgroundPosition: 'center center',            
            objectFit: 'cover',
            minWidth: '50%',
            maxWidth: '50%',            
            minHeight: {xs: '80vw', md: '50vw', xl: '20vw'},
            maxHeight: {xs: '80vw', md: '50vw', xl: '20vw'}
        }}
        alt={user.username}
        src={post.media_path}
        // loading="lazy"
        // onClick={detailPage}
        >            
        </Card>
        <Stack mt={10} display='flex' minWidth='100%' spacing={4}>
          <Stack spacing={3}>
            <Typography variant='h5'> Caption </Typography>
            <TextField 
                multiline
                rows={4}
                value={post.caption}
                fullWidth={true}
            />
          </Stack>
          <Stack spacing={3}>
            <Typography variant='h5'> Tags </Typography>
            <Autocomplete
              multiple
              id="tags-standard"
              options={postTags}
              getOptionLabel={(option) => option.title}
              defaultValue={[postTags[1]]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="tags"
                  placeholder="Post Tags"
                  sx={{
                    py: 3
                  }}
                />
              )}
            />
          </Stack>
        </Stack>
    </Box>
  )
}
