import React from 'react'
import {useNavigate, useParams, Link as Links} from 'react-router-dom'
import axios from 'axios'

import Post from '../component/post'
import Comments from './comments'

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';

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
  const [isLoading,setIsLoading] = React.useState(true)
  
  const [userDetail,setUserDetail] = React.useState('')  

  const [modal,setModal] = React.useState(false)

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
      // console.log(response.data)
      setPost(response.data.post)
      setUserDetail(response.data.user)      
      setLikeCount(response.data.post.like.length)
      setCommentCount(response.data.post.comment.length)  
      setLike(response.data.post.is_liked)
      setComment(response.data.post.comment)  
      
      
        setIsLoading(false)
      
    })
    .catch((error) => {
      console.log(error.message)
      
      
        setIsLoading(false)      
    })
  }

  React.useEffect(() => {    
    getPost()
    
    return () => {
      null
    }
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
      { isLoading ? 
      <Box>
        <SkeletonPost />
      </Box> 
        :         
      <Box sx={{ backgroundColor: '#fff' }}>                  
          <Post user={userDetail} data= {post} />                                                            
          <Box sx={{ px: {xs: 2, md: 5}, pb: 2 }}>
            <Comments open={open} posts={post} comments={post.comment}></Comments>          
          </Box>

          <Modal
          open={modal}          
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}          
          onClick={() => setModal(!modal)}
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
                  <Card component='img'
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
                      alt={userDetail.username}
                      src={post.media_path}
                      loading="lazy"                      
                      >            
                    </Card>                                   
                  {/* <Button variant='text' size='medium' color="inherit" onClick={() => setModal(false)}> Close</Button> */}
              </Box>
         </Modal>
      </Box>
    }
    </div>
  )
}
