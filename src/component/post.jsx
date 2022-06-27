import React from 'react'
import {useNavigate, Link as Links, useLocation} from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

import Comments from './comments'

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack'
import Modal from '@mui/material/Modal';

import Card from '@mui/material/Card';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { UserContext } from '../state/UserContext'
import { TimelineContext } from '../state/TimelineContext'
import { server } from '../backend'
import MoreVert from '@mui/icons-material/MoreVert'

export default function post(props) {  
  const [like,setLike] = React.useState(props.data.is_liked ? props.data.is_liked : false)
  const [likeCount,setLikeCount] = React.useState(props.data.like.length)
  const [commentCount,setCommentCount] = React.useState(props.data.comment.length)
  const [imageDetail, setImageDetail] = React.useState(props.data.media_details !== undefined ? props.data.media_details : '')   
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  const {user} = React.useContext(UserContext)
  const { likePost, unlikePost } = React.useContext(TimelineContext)

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
        likePost(props.data._id)
        setLikeCount(likeCount + 1)
    })
    .catch((error) => {
        console.log(error.response.data)
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
        unlikePost(props.data._id)
        setLikeCount(likeCount - 1)
    })
    .catch((error) => {
        console.log(error)
    })
  }  

  const checkLike = () => {                
    if (like){
    return (
        <IconButton aria-label="favorite" sx={{ mr: 1.5}} color='primary' onClick={unliked}>
            <FavoriteIcon />
        </IconButton>
        )
    }
    return (
    <IconButton aria-label="favorite" color='inherit' sx={{ mr: 1.5}}  onClick={liked}>
        <FavoriteBorderIcon />
    </IconButton>
    )
  }

  const detailPage = () => {
    return navigate("/detail/" + props.data._id, 
        // { state : {user : props.user, data : props.data} } 
    ),
     {replace: true}
  }

  const editPage = () => {
    return navigate("/edit/post/" + props.data._id, 
        { state : {user : props.user, data : props.data} } 
    ),
     {replace: true}
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
    <Box sx={{ px: {xs: 2, md: 5}, pt: {xs: 2, md: 5}, pb: 1, mb : 1, backgroundColor: '#fff', borderRadius: 1.5 }}>
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
            height: {xs: '80vw', md: '50vw', xl: '30vw'},
            minHeight: {xs: '80vw', md: '50vw', xl: '30vw'},
            maxHeight: {xs: '80vw', md: '50vw', xl: '30vw'}
        }}
        alt={props.user.username}
        src={props.data.media_path}
        // loading="lazy"
        onClick={detailPage}
        >            
        </Card>
        }
        <Box sx={{ display: 'flex', alignItems: 'center', mt: {xs: 1, md: 2}, mb: {xs: 3, md: 5} }}>
            <Box>
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
            <Box sx={{display: 'flex', alignItems: 'center', ml: 'auto'}}>
                <Typography variant="body1" sx={{ mr: {xs: 0, md: 1}}}> {likeCount} </Typography>
                {checkLike()}
                <Typography variant="body1" sx={{ mr: {xs: 0, md: 1}}}>{commentCount} </Typography>
                <IconButton aria-label="chat" color='inherit' onClick={detailPage}>
                    <ChatBubbleOutlineIcon />
                </IconButton>
                <IconButton aria-label="chat" color='inherit' onClick={editPage}>
                    <MoreVertIcon />
                </IconButton>
            </Box>
        </Box>
        <Box sx={{ mb: {xs : 1, md: 3}}}>
            <Typography variant='h6' color='inherit' fontWeight='normal'>{props.data.caption}</Typography>
        </Box>
        <Modal
        open={open}          
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}          
        onClick={() => setOpen(false)}
        >        
            <Box 
            sx={{ 
                display: 'flex', 
                flexDirection:'column', 
                justifyContent: 'center', 
                alignItems:'center', 
                py: 15,
                minWidth: '100%',
                minHeight: '100%',
                borderRadius : 1,                  
                }}>
                {/* <Card component='img'
                    sx={{ 
                        p: 0,            
                        backgroundRepeat: 'no-repeat',            
                        backgroundPosition: 'center center',            
                        backgroundSize: 'cover',
                        minWidth: {xs: '90%', xl:'50%'},
                        maxWidth: {xs: '90%', xl:'50%'},
                        minHeight: {xs: '100%', md: '100%'},
                        maxHeight: {xs: '100%', md: '70%'}
                    }}
                    alt={props.user.username}
                    src={props.data.media_path}
                    loading="lazy"                      
                    >            
                  </Card>                                    */}

                { checkLike()}
                {/* <Button variant='text' size='medium' color="inherit" onClick={() => setModal(false)}> Close</Button> */}
            </Box>
       </Modal>
        
    </Box>
  )
}
