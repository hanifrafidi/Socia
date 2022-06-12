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
  const [imageDetail, setImageDetail] = React.useState(props.data.media_details !== undefined ? props.data.media_details : '')   
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
        
    axios.post(server.url + '/post/like/' + props.data._id, formData)
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
        
    axios.post(server.url + '/post/unlike/' + props.data._id, formData)
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
    if(props.data.is_like) {
        setLike( props.data.is_like )
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

  const detailPage = () => {
    return navigate("/detail/" + props.data._id), {replace: true}
  }

  const changeDate = (date) => {
    return moment(Date.parse(date)).fromNow();
  }

//   const PostImageWidth = () => {      
//       if(props.data.image_detail !== undefined) {
//         console.log(imageDetail.resource_type)        
//       }
//   }
  
  return (
    <Box sx={{ px: {xs: 2, md: 5}, pt: {xs: 2, md: 5}, pb: 2, my: 1, backgroundColor: '#fff', borderRadius: 1.5 }}>
        { imageDetail.resource_type === 'video' ?
        <Box component='video' width="100%" height="540" controls>
            <source src={props.data.media_path} type="video/mp4" />
        </Box>   
        :    
        <Card component='img'
        sx={{ 
            p: 0,            
            backgroundRepeat: 'no-repeat',            
            backgroundPosition: 'center center',            
            objectFit: 'cover',
            minWidth: '100%',
            maxWidth: '100%',
            height: {xs: '80vw', md: '30vw'},
            minHeight: {xs: '80vw', md: '30vw'},
            maxHeight: {xs: '80vw', md: '30vw'}
        }}
        alt={props.user.username}
        src={props.data.media_path}
        // loading="lazy"
        onClick={detailPage}
        >            
        </Card>
        }
        <Box sx={{ display: 'flex', alignItems: 'center', py: {xs: 3, md: 4} }}>
            <Box sx={{ flexGrow : 1}}>
                <Box component = {Links} to={'/' + props.user.username} sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'black'}}>                
                <Avatar 
                    alt={props.user.username}
                    src={props.user.image_url}
                    sx={{ 
                        mr: {xs: 1, md: 2},
                        width : { xs : 30, md: 40 },
                        height : { xs : 30, md: 40 }
                    }}
                />
                <Stack  sx={{ mr: {xs: 2, md: 4} }}>
                    <Typography variant='body1' component="div" color="inherit">
                            {props.user.username}
                    </Typography>
                    <Typography variant='caption' component="div" color="text.secondary">
                            {changeDate(props.data.date.created_at)}
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
            <Typography variant='h6' color='text'>{props.data.caption}</Typography>
        </Box>
        
    </Box>
  )
}
