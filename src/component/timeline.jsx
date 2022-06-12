import React from 'react'
import axios from 'axios'
import { Link as Links } from 'react-router-dom'
import { server } from '../backend'
import { UserContext } from '../state/UserContext'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'

import Post from './post'
import AddFriends from './addFriends'
import SkeletonPost from '../component/skeleton/post'
import Loader from '../component/loader'

export default function timeline() {
    const {user} = React.useContext(UserContext)

    const [timeline, setTimeline] = React.useState([])
    const [timelineList, setTimelineList] = React.useState(0)

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
      if(user.user._id !== undefined){
        getFriends()
      }            
    }, [])  

    React.useEffect(() => {
      if(isFetching && next){        
        setTimeout(() => {
          getPost()
          getFriends()
        }, 800)
      }
    },[isFetching])

    React.useEffect(() => {                  
      window.addEventListener('scroll', handleScroll, { passive: true });      
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };            
    }, [])  

    React.useEffect(() => { 
      var renderp = renderPost()      
      setTimeline([...timeline, ...renderp])                                            
    },[datas])

    React.useEffect(()=>{
      if(addFriends.length > 0 && datas.length > 0){
        var renderp = renderFriends()      
        setTimeline([...timeline, ...renderp])                                            
      }          
    },[addFriends])
        

    const renderPost = () => {        
      var list = []
      for( var i = 0; i < datas.length; i++ ) {
        list.push(<div key={datas[i]._id}> <Post user={datas[i].user_detail[0]} data= {datas[i]} /> </div>)        
      } 
      
      return list;              
    }

    const renderFriends = () => {        
      var list = []      
      var cek = (
        <div key={timeline.length + 1}>
          <Box p={3} backgroundColor='white' mt={1} >
            <Typography variant='h6' color='primary' align='center' >Add New Friend</Typography>          
          </Box>
            {
              addFriends.map((friends) => {             
                return(
                  <AddFriends key={friends.user_profile.username} friends={friends} />
                )   
              })      
            }
        </div>
      )
      list.push(cek)
      
      return list;              
    }

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
        console.log(response.data)
        if(response.data.posts.length === 0) {
          setNext(false)                                                              
        }else{
          setDatas(response.data.posts)
          setPage(page + 1)                  
        } 
        
        setTimeout(() => {
          setisLoading(false)
          setIsFetching(false)                    
        }, 300)
        // console.log(response.data)          
      })
      .catch((error) => {
        console.error(error);
        setError(true)
        setisLoading(false)
      })      
    }

    const getFriends = () => {
      var formData = new FormData()      
      formData.append('user_id', user.user._id);
      formData.append('page', page);

      axios.post(server.url + '/user/findFriend/' + user.user._id, formData)
      .then((response) => {                                                                  
        console.log(response.data)           
        setAddFriends(response.data.posts)
      })
      .catch((error) => {
        console.error(error);
        setError(true)
        setisLoading(false)
      }) 
    }
   
    const handleScroll = () => {        
      if (window.innerHeight + window.pageYOffset === document.body.offsetHeight && next && user.user._id !== undefined){
        return setIsFetching(true)
      }                      
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
              {console.log(timeline)}       
            <Box>
              {                
                timeline
              }
            </Box>                                    
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
                <Typography align='center' variant='h5' sx={{ mt: 10}}>Tidak dapat menampilkan timeline anda, silakan refresh kembali</Typography>
                :
                ''
            }
        </Box>                                        
    </div>
  )
}
