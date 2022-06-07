import React from 'react'
import axios from 'axios'
import { Link as Links } from 'react-router-dom'
import SkeletonPost from '../component/skeleton/post'
import Loader from '../component/loader'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'

import Post from './post'
import { server } from '../backend'
import { UserContext } from '../state/UserContext'

export default function timeline() {
    const {user} = React.useContext(UserContext)

    const [datas,setDatas] = React.useState([])
    const [addFriends, setAddFriends] = React.useState([])    
    const [limit,setLimit] = React.useState(10)
    const [page,setPage] = React.useState(1)
    const [isFetching, setIsFetching] = React.useState(false);    
    const [next,setNext] = React.useState(true)

    const [error, setError] = React.useState(false)
    const [isLoading, setisLoading] = React.useState(true)
        
    const body = React.useRef()    

    React.useEffect(() => {            
      getPost()  
      
      getFriends()
      
    }, [])  

    React.useEffect(() => {
      if(isFetching && next){
        
        setTimeout(() => {
          getPost()
        }, 800)
      }
    },[isFetching])

    React.useEffect(() => {                  
      window.addEventListener('scroll', handleScroll, { passive: true });      
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };            
    }, [])  

    const getPost = () => {      
      var userId = ''
      if(user.user !== ''){
        userId = user.user._id
      }

      var formData = new FormData()
      formData.append('page', page);
      formData.append('limit', limit);
      formData.append('user_id', userId);

      axios.post(server.url + '/post/timeline', formData)
      .then((response) => {                                      
        if(response.data.posts.length === 0) {
          setNext(false)                                                              
        }else{
          setDatas([...datas, ...response.data.posts])
          setPage(page + 1)
        } 
        
        setTimeout(() => {
          setisLoading(false)
          setIsFetching(false)                    
        }, 800)
        console.log(response.data)   
      })
      .catch((error) => {
        console.error(error.response.data.message);
        setError(true)
        setisLoading(false)
      })      
    }

    const getFriends = () => {
      var formData = new FormData()      
      formData.append('user_id', user.user._id);

      axios.post(server.url + '/user/findFriend/' + user.user._id, formData)
      .then((response) => {                                                                  
        console.log(response.data)           
        setAddFriends(response.data.posts)
      })
      .catch((error) => {
        console.error(error.response.data.message);
        setError(true)
        setisLoading(false)
      }) 
    }
   
  const handleScroll = () => {        
    if (window.innerHeight + window.pageYOffset === document.body.offsetHeight && next){
      return setIsFetching(true)
    }                      
  }

  const Loading = () => {    
    return (
      <Box minWidth='100%'>
          <SkeletonPost style={{marginBottom: 12}} />
          <SkeletonPost style={{marginBottom: 2}}/>
          <SkeletonPost style={{marginBottom: 2}}/>
      </Box>
    )
  }

  return (
    <div ref={body}>      
        {
          isLoading ? 
            <Box minWidth='100%'>
                <SkeletonPost  />
                <SkeletonPost />
                <SkeletonPost />
            </Box>
          : 
            <div>
            {
              datas.map((data,index) => {
              return(
                  <Box key={index}>
                      <Post 
                        id={data._id} 
                        img={data.image_path} 
                        caption={data.caption} 
                        user={data.user_detail} 
                        like={data.is_liked}
                        data= {data}
                      >
                      </Post>                    
                  </Box>
              )
              })              
            }
            {
              addFriends.length !== 0 ?
              <Box p={3} backgroundColor='white' mt={1}>
                <Typography variant='h6' color='primary' align='center' >Add New Friend</Typography>
              </Box>
              :
              ''
            }
            {
              addFriends.map((friends,index) => {
                return (
                  <Stack key={index} mt={3}
                    sx={{ 
                      px: {xs: 2, md: 5}, 
                      pt: {xs: 2, md: 5}, 
                      pb: 2, 
                      my: 1, 
                      backgroundColor: '#fff', 
                      borderRadius: 1.5 
                    }}>
                    <Stack direction="row" spacing={2}>
                      <Avatar component={Links} to={'/' + friends.user_profile.username}
                        alt={friends.user_profile.username}
                        src={friends.user_profile.profile.image_path}
                        sx={{ 
                            mr: {xs: 1, md: 2},
                            width : { xs : 30, md: 40 },
                            height : { xs : 30, md: 40 }
                        }}
                      />
                      <Typography variant='body1' component="div" color="inherit" >{friends.user_profile.username}</Typography>
                    </Stack>
                    <Grid container sx={{ display: 'flex',}} mt={2}>
                      {
                        friends.post.map((post,index) => {
                          return(                          
                              <Grid item xs={4} md={4} key={index} sx={{
                                minHeight : 120,
                                minWidth : 'auto',
                                backgroundImage : 'url('+ post.image_path +')',
                                backgroundRepeat: 'no-repeat',            
                                backgroundPosition: 'center center', 
                                backgroundSize: 'cover',
                              }}></Grid>                          
                          )
                        })                      
                      }
                    </Grid>
                  </Stack>
                )
              })
            }                    
            {
              isFetching && next ? 
              <Box mt={5} minWidth='100%' justifyContent='center' display='flex'>
                  <Loader  />                          
              </Box>
              :
              <Box mt={5} minWidth='100%' justifyContent='center' display='flex'>
                  
              </Box>
            }            
            </div>         
        }
        <Box>
            { error ? 
                <Typography align='center' variant='h5' sx={{ mt: 10}}>Tidak dapat menampilkan timeline anda</Typography>
                :
                ''
            }
        </Box>                                        
    </div>
  )
}
