import React from 'react'
import {useNavigate, useParams, Link as Links} from 'react-router-dom'
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

import SkeletonPost from '../component/skeleton/post'

export default function detail() {
  const [post,setPost] = React.useState([])
  const [comment,setComment] = React.useState([])

  const [open, setOpen] = React.useState(false);
  const [like,setLike] = React.useState(false)
  const [likeCount,setLikeCount] = React.useState(0)
  const [commentCount,setCommentCount] = React.useState(0)
  
  const [userDetail,setUserDetail] = React.useState('')
  const [profile,setProfile] = React.useState('')

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
        
    axios.post(server.url + '/post/like/' + post._id, formData)
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
        
    axios.post(server.url + '/post/unlike/' + post._id, formData)
    .then((response) => {
        console.log(response.data)
        setLike(false)
        setLikeCount(likeCount - 1)
    })
    .catch((error) => {
        console.log(error)
    })
  }

  const { id_post } = useParams()

  const getPost = () => {

    const formData = new FormData()
    formData.append('user_id', user.user._id)

    axios.post(server.url + '/post/' + id_post, formData)
    .then(response => {
      console.log(response.data)
      setPost(response.data.post)
      setUserDetail(response.data.user)
      setProfile(response.data.user.profile)
      setLikeCount(response.data.post.like.length)
      setCommentCount(response.data.post.comment.length)  
      setLike(response.data.post.is_liked)
      setComment(response.data.post.comment)    
    })
    .catch((error) => {
      console.log(error.message)
    })
  }

  React.useEffect(() => {    
    
    setTimeout(()=> {
      getPost()    
  }, 300)    
  },[])

  const checkLike = () => {            
    if (like){
    return (
        <IconButton aria-label="favorite" sx={{ mr: 1.5}} color='primary' onClick={() => unliked()}>
            <FavoriteIcon />
        </IconButton>
        )
    }
    return (
    <IconButton aria-label="favorite" sx={{ mr: 1.5}}  onClick={() => liked()}>
        <FavoriteBorderIcon />
    </IconButton>
    )
  }
  
  return (        
    <div>      
      { post._id === undefined ? 
      <Box>
        <SkeletonPost />
      </Box> 
        :         
      <Box sx={{ px: {xs: 2, md: 5}, pt: {xs: 2, md: 5}, pb: 2, my: 1, backgroundColor: '#fff', borderRadius: 1.5 }}>        
          <Card sx={{ 
              p: 0,
              backgroundImage : 'url(' + post.image_path +')',
              backgroundRepeat: 'no-repeat',            
              backgroundPosition: 'center center',            
              backgroundSize: 'cover',
              minWidth: '100%',
              minHeight: {xs: 250, md: 500}
          }}>            
          </Card>
          <Box sx={{ display: 'flex', alignItems: 'center', py: {xs: 3, md: 4} }}>
              <Box sx={{ flexGrow : 1}}>
                  <Box component = {Links} to={'/' + userDetail.username} sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'black'}}>                
                  {
                  user.user !== '' ? 
                    <Avatar 
                        alt={userDetail.username}
                        src={profile.image_path}
                        sx={{ 
                            mr: {xs: 1, md: 2},
                            width : { xs : 30, md: 40 },
                            height : { xs : 30, md: 40 }
                        }}
                    />
                    :
                    ''
                  }
                  <Typography variant='body1' component="div" color="inherit" sx={{ mr: {xs: 2, md: 4} }}>
                          {userDetail.username}                          
                  </Typography>
                  </Box>
              </Box>
              <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <Typography variant="body1" sx={{ mr: {xs: 0, md: 1}}}> {likeCount} </Typography>
                  {checkLike(post.is_liked)}
                  <Typography variant="body1" sx={{ mr: {xs: 0, md: 1}}}>{commentCount} </Typography>
                  <IconButton aria-label="chat" onClick={() => handleClick()}>
                      <ChatBubbleOutlineIcon />
                  </IconButton>
              </Box>
          </Box>
          <Box sx={{ mb: {xs : 2, md: 3}}}>
              <Typography variant='h6' color='text.primary'>{post.caption}</Typography>
          </Box>                    
          <Comments open={open} posts={post} comments={post.comment}></Comments>          
      </Box>
    }
    </div>
  )
}
