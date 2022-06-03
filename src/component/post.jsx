import React from 'react'
import {useNavigate, Link as Links} from 'react-router-dom'
import axios from 'axios'

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
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';

import { UserContext } from '../state/UserContext'
import { server } from '../backend'

export default function post(props) {
  const [open, setOpen] = React.useState(false);
  const [like,setLike] = React.useState(false)
  const [likeCount,setLikeCount] = React.useState(props.data.like.length)
  const [commentCount,setCommentCount] = React.useState(props.data.comment.length)
  const navigate = useNavigate();

  const {user} = React.useContext(UserContext)

  const handleClick = () => {
    setOpen(!open);
  };

  const liked = () => {
    if(user.user === ''){
        return navigate("/login", {replace: true}) 
    }
    
    let formData = new FormData();
    formData.append('user_id', user.user._id);    
        
    axios.post(server.url + '/post/like/' + props.id, formData)
    .then((response) => {
        console.log(response.data)
        setLike(true)
        setLikeCount(likeCount + 1)
    })
    .catch((error) => {
        console.log(error)
    })
  }

  const unliked = () => {
    if(user.user === ''){
        return navigate("/login", {replace: true}) 
    }
    
    let formData = new FormData();
    formData.append('user_id', user.user._id);    
        
    axios.post(server.url + '/post/unlike/' + props.id, formData)
    .then((response) => {
        console.log(response.data)
        setLike(false)
        setLikeCount(likeCount - 1)
    })
    .catch((error) => {
        console.log(error)
    })
  }

  React.useEffect(() => {    
    if(props.like !== undefined) {
        setLike( props.like )
    }
  },[])

  const checkLike = () => {            
    if (like){
    return (
        <IconButton aria-label="favorite" sx={{ mr: 1.5}} color='primary' onClick={unliked}>
            <FavoriteIcon />
        </IconButton>
        )
    }
    return (
    <IconButton aria-label="favorite" sx={{ mr: 1.5}}  onClick={liked}>
        <FavoriteBorderIcon />
    </IconButton>
    )
  }
  
  return (
    <Box sx={{ px: 5, pt: 5, pb: 2, my: 1, backgroundColor: '#fff', borderRadius: 1.5 }}>
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
        <Box sx={{ display: 'flex', alignItems: 'center', py: 4 }}>
            <Box sx={{ flexGrow : 1}}>
                <Box component = {Links} to={'/' + props.user[0].username} sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'black'}}>                
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
                <Typography variant="body1" sx={{ mr: 1}}> {likeCount} </Typography>
                {checkLike()}
                <Typography variant="body1" sx={{ mr: 1}}>{commentCount} </Typography>
                <IconButton aria-label="chat" onClick={() => handleClick()}>
                    <ChatBubbleOutlineIcon />
                </IconButton>
            </Box>
        </Box>
        <Box sx={{ mb: 3}}>
            <Typography variant="h6" color='text'>{props.caption}</Typography>
        </Box>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Comments open={open} posts={props.data} comments={props.data.comment}></Comments>
        </Collapse>
    </Box>
  )
}
