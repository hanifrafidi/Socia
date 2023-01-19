import React from 'react'
import background from '../background.jpg'

import {Box,Container} from '@mui/material'


export default function bgr() {
  return (
    <Box >
      <Box
       sx={{                 
                backgroundImage : 'url('+ background +')',
                backgroundRepeat: 'no-repeat',            
                backgroundPosition: 'center',            
                backgroundSize: 'cover',
                p: 0, 
                minHeight: {xs: '100vh', md:'100vh'},
                minWidth: {xs: '100vw', md:'100vw'},
                position: 'absolute',
                top: 0,left: 0,        
                zIndex: 'modal'
             }}
       />
       <Container maxWidth='md' sx={{ position: 'relative', zIndex: 'tooltip' }}>        
             <Box p={5} height={20}>
                Hello Im here
             </Box>
       </Container>
    </Box>
  )
}
