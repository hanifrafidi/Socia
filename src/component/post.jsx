import React from 'react'
import {useNavigate, Link as Links} from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

import Comments from './comments'

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack'

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
    PostImageWidth()
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

  const detailPage = () => {
    return navigate("/detail/" + props.data._id), {replace: true}
  }

  const changeDate = (date) => {
    return moment(Date.parse(date)).fromNow();
  }

  const PostImageWidth = () => {      
      if(props.data.image_detail !== undefined) {
        console.log(props.data.image_detail)
        var width = props.data.image_detail.width;
        var height = props.data.image_detail.height;
        var portrait = height > width

        console.log(portrait)
      }
  }
  
  return (
    <Box sx={{ px: {xs: 2, md: 5}, pt: {xs: 2, md: 5}, pb: 2, my: 1, backgroundColor: '#fff', borderRadius: 1.5 }}>
        <Card component='img'
        sx={{ 
            p: 0,            
            backgroundRepeat: 'no-repeat',            
            backgroundPosition: 'center center',            
            backgroundSize: 'cover',
            minWidth: '100%',
            maxWidth: '100%',
            minHeight: {xs: '100%', md: '100%'},
            maxHeight: {xs: '100%', md: '100%'}
        }}
        alt={props.user[0].username}
        src={props.img}
        loading="lazy"
        onClick={detailPage}
        >            
        </Card>
        <Box sx={{ display: 'flex', alignItems: 'center', py: {xs: 3, md: 4} }}>
            <Box sx={{ flexGrow : 1}}>
                <Box component = {Links} to={'/' + props.user[0].username} sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'black'}}>                
                <Avatar 
                    alt={props.user[0].username}
                    src={props.user[0].profile.image_path}
                    sx={{ 
                        mr: {xs: 1, md: 2},
                        width : { xs : 30, md: 40 },
                        height : { xs : 30, md: 40 }
                    }}
                />
                <Stack  sx={{ mr: {xs: 2, md: 4} }}>
                    <Typography variant='body1' component="div" color="inherit">
                            {props.user[0].username}
                    </Typography>
                    <Typography variant='caption' component="div" color="text.secondary">
                            {changeDate(props.data.date)}
                    </Typography>
                </Stack>
                </Box>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <Typography variant="body1" sx={{ mr: {xs: 0, md: 1}}}> {likeCount} </Typography>
                {checkLike()}
                <Typography variant="body1" sx={{ mr: {xs: 0, md: 1}}}>{commentCount} </Typography>
                <IconButton aria-label="chat" onClick={detailPage}>
                    <ChatBubbleOutlineIcon />
                </IconButton>
            </Box>
        </Box>
        <Box sx={{ mb: {xs : 2, md: 3}}}>
            <Typography variant='h6' color='text'>{props.caption}</Typography>
        </Box>
        
    </Box>
  )
}
