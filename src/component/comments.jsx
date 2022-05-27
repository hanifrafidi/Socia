import React from 'react'

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

export default function comments() {
  return (
    <Box sx={{ mt: 2}}>
        <Box sx={{ display: 'flex'}}>
            <Typography variant='subtitle1' component='div' sx={{ flexGrow: 1 }}>Comments</Typography>
            <Typography variant='subtitle1' component='div'>Filter</Typography>
        </Box>
        <Box>
            <Box sx={{ mt: 5}}>
               <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar 
                        alt="Remy Sharp"
                        src="https://images.unsplash.com/photo-1649214489153-88e679a6f7be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80" 
                        sx={{ mr: 2}}
                    />
                    <Typography variant='subtitle1' component='div' sx={{ flexGrow: 1 }}>Remy Sharp</Typography>
                    <Typography variant='subtitle1' component='div'>3 weeks ago</Typography>
               </Box>
               <Typography variant='subtitle2' component='div' sx={{ ml: 7}} >lorem ipsum sit dolor amet anteque cikt</Typography>
            </Box>            
            <Box sx={{ mt: 5}}>
               <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar 
                        alt="Remy Sharp"
                        src="https://images.unsplash.com/photo-1649214489153-88e679a6f7be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80" 
                        sx={{ mr: 2}}
                    />
                    <Typography variant='subtitle1' component='div' sx={{ flexGrow: 1 }}>Remy Sharp</Typography>
                    <Typography variant='subtitle1' component='div'>3 weeks ago</Typography>
               </Box>
               <Typography variant='subtitle2' component='div' sx={{ ml: 7}}>lorem ipsum sit dolor amet anteque cikt</Typography>
            </Box>            
        </Box>
    </Box>
  )
}
