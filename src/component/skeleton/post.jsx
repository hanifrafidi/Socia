import React from 'react'

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export default function post() {
  return (
    <Box sx={{ px: {xs: 2, md: 5}, pt: {xs: 2, md: 5}, pb: 4, my: 1, backgroundColor: '#fff', borderRadius: 1.5 }}>
        <Skeleton animation="wave" variant='rectangular' width='100%' sx={{ height: { xs: '30vh', md :'50vh'} }} ></Skeleton>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 3}}>
            <Skeleton animation="wave" variant='circular' width={40} height={40} sx={{ mr: 2}}></Skeleton>
            <Skeleton animation="wave" variant='text' width='30%' sx={{ mr: 'auto'}} />
            <Skeleton animation="wave" variant='text' width='10%' sx={{ mr: 3}} />
            <Skeleton animation="wave" variant='text' width='10%' />            
        </Box>        
        <Skeleton animation="wave" variant='text' width='100%' sx={{ mt: 3 }}></Skeleton>
        <Skeleton animation="wave" variant='text' width='70%' sx={{ mt: 1 }}></Skeleton>
    </Box>
  )
}
