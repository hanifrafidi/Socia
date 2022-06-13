import React from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroller'
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
import { PosterImage } from 'video-react'

export default function timeline() {
    const {user} = React.useContext(UserContext)
    
    // const [timeline, setTimeline] = React.useState([])
    var timeline = []
    const [datas,setDatas] = React.useState([])                
    const [addFriends, setAddFriends] = React.useState([])    
    const [limit,setLimit] = React.useState(10)
    // const [page,setPage] = React.useState(1)
    const [isFetching, setIsFetching] = React.useState(false);    
    const [next,setNext] = React.useState(true)

    const [error, setError] = React.useState(false)
    const [isLoading, setisLoading] = React.useState(true)               

    // const useOnScreen = (ref) => {

    //   const [isIntersecting, setIntersecting] = React.useState(false)
    
    //   const observer = new IntersectionObserver(
    //     ([entry]) => setIntersecting(entry.isIntersecting)
    //   )
    
    //   React.useEffect(() => {
    //     observer.observe(ref.current)
    //     // Remove the observer as soon as the component is unmounted
    //     return () => { observer.disconnect() }
    //   }, [])
    
    //   return isIntersecting
    // }
    
    // const bottom = React.useRef() 
    // const isVisible = useOnScreen(bottom)

    // React.useEffect(() => {             
    //     getPost()
    //     if(user.user._id !== undefined){
    //       getFriends()
    //     }          
    // }, [])

    // React.useEffect(() => {
    //   if( timeline.length > 0)
    //   getFriends()
    // },[timeline])

    // React.useEffect(() => {      
    //     var renderp = renderPost();
    //     setTimeline([...timeline, ...renderp])                                                   
    // },[datas])
    
    // React.useEffect(()=>{
    //   if(addFriends.length > 0 && datas.length > 0){
    //     var renderp = renderFriends()      
    //     setTimeline([...timeline, ...renderp])                                            
    //   }          
    // },[addFriends])
        
    const renderTimeline = () => {      
      datas.map((data, i) => (
        <Post user={data.user_detail[0]} data={data} key={i} />
      ))
    }

    const getTimeline = (page) => {
      getPost(page)      
    }


    const renderPost = () => {        
      var list = []
            
      datas.map((data, i) => (
        list.push(<Post user={data.user_detail[0]} data={data} key={i} />)
      ))
      
      return list
    }
    // var timeline = React.useMemo(() => renderPost(),[datas])
    const renderFriends = () => {  
      if(addFriends.length > 0) {
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
      }  else{
        return []
      }
    }    

    const getPost = (page) => {      
      var userId = ''
      if(user.user !== ''){
        userId = user.user._id
      }        
      var formData = new FormData()
      formData.append('page', page);
      formData.append('limit', limit);
      formData.append('user_id', userId);

      setTimeout(() => {
        axios.post(server.url + '/post/timeline', formData)
        .then((response) => {                                              
          const newList = datas.concat(response.data.posts);
          // const newList = [...datas, ...response.data.posts]
          setDatas(newList)        
  
          if(response.data.posts.length === 0) {
            setNext(false)                                                              
            
          }else{                                    
            setNext(true)
          }                 
                  
          // setTimeout(() => {
          //   setisLoading(false)          
          //   setIsFetching(false)                    
          // }, 300)
  
                          
        })
        .catch((error) => {
          console.log(error);
          setError(true)
          setisLoading(false)
        })
      },1500)

            
      
    }

    const getFriends = (page) => {
      var formData = new FormData()      
      formData.append('user_id', user.user._id);
      formData.append('page', page);

      axios.post(server.url + '/user/findFriend/' + user.user._id, formData)
      .then((response) => {              
                                                                 
        setAddFriends(response.data.posts)              
      })
      .catch((error) => {
        console.error(error);
        setError(true)
        setisLoading(false)
      }) 
    }

    // React.useEffect(() => {                  
    //   window.addEventListener('scroll', handleScroll, { passive: true });      
    //   return () => {
    //       window.removeEventListener('scroll', handleScroll);
    //   };            
    // }, [])
   
    // const handleScroll = () => {        
    //   if (window.innerHeight + window.pageYOffset === document.body.offsetHeight && next && user.user._id !== undefined){
    //     return setIsFetching(true)
    //   }                      
    // }
    
    // React.useEffect(() => {
    //   if(isVisible && next && timeline.length !== 0){
    //     setIsFetching(true)
    //     setTimeout(() => {          
    //       getPost() 
    //       getFriends()       
    //     }, 800)        
    //   }
    // }, [isVisible])

  return (
    <Box>       
        <InfiniteScroll
                threshold={0}
                pageStart={0}
                loadMore={getTimeline}
                hasMore={next}
                loader={<Loader  />}>

                  {
                    datas.map((data, i) => (
                      <Post user={data.user_detail[0]} data={data} key={i} />
                    ))
                  }
              </InfiniteScroll>  
    </Box>
  )
}
