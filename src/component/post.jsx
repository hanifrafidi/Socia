import React from 'react'
import {Link as Links} from 'react-router-dom'

import Comments from './comments'

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

import Collapse from '@mui/material/Collapse';
import Card from '@mui/material/Card';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

export default function post(props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  
  return (
    <Box sx={{ px: 3, py: 5}}>
        <Card sx={{ 
            p: 0,
            backgroundImage : 'url('+ props.img +')',
            backgroundRepeat: 'no-repeat',            
            backgroundPosition: 'center center',            
            backgroundSize: 'cover',
            minWidth: '100%',
            minHeight: 500
        }}>            
        </Card>
        <Box sx={{ display: 'flex', alignItems: 'center', py: 3 }}>
            <Box sx={{ flexGrow : 1}}>
                <Box component = {Links} to={'/profile/' + props.user[0]._id} sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none'}}>
                {/* {console.log(props.user[0].username)}
                {console.log(props.user[0].profile.image_path)} */}
                <Avatar 
                    alt={props.user[0].username}
                    src={props.user[0].profile.image_path}
                    sx={{ mr: 2}}
                />
                <Typography variant="body1" component="div" color="inherit" sx={{ mr: 4 }}>
                        {props.user[0].username}
                </Typography>
                </Box>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Typography variant="body1" sx={{ mr: 1}}>120 K </Typography>
                <IconButton aria-label="delete" sx={{ mr: 1.5}}>
                    <FavoriteBorderIcon />
                </IconButton>
                <Typography variant="body1" sx={{ mr: 1}}>10 K </Typography>
                <IconButton aria-label="chat" onClick={() => handleClick()}>
                    <ChatBubbleOutlineIcon />
                </IconButton>
            </Box>
        </Box>
        <Box>
            <Typography variant="body1">{props.caption}</Typography>
        </Box>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Comments ></Comments>
        </Collapse>
    </Box>
  )
}
