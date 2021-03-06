import React from 'react'
import axios from 'axios'
import { server } from '../backend'
import { UserContext } from '../state/UserContext'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Snackbar from '@mui/material/Snackbar';
import Button  from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close';

import Post from './post'
import AddFriends from './addFriends'
import SkeletonPost from '../component/skeleton/post'
import Loader from '../component/loader'
import { PosterImage } from 'video-react'
import post from '../component/skeleton/post'

import { TimelineContext } from '../state/TimelineContext'
import { useNavigate, Link as Links} from 'react-router-dom'

export default function timeline() {
    const {user} = React.useContext(UserContext)    
    const { Timeline, addToTimeline, page, setPage, refreshTimeline } = React.useContext(TimelineContext)
    const navigate = useNavigate()
    
    // var timeline = []
    const [datas,setDatas] = React.useState([])                
    const [addFriends, setAddFriends] = React.useState([])    
    
    const [limit,setLimit] = React.useState(10)
    // const [page,setPage] = React.useState(1)
    const [next,setNext] = React.useState(true)    
    const [isFetching, setIsFetching] = React.useState(true);    
    

    const [error, setError] = React.useState(false)
    const [isLoading, setisLoading] = React.useState(true)  
    const [open, setOpen] = React.useState(false)

    const handleClose = () => {
      setOpen(false)
    };     
        
    const renderTimeline = () => {            
      var friend = []      
      if(addFriends.length > 0){
        friend = renderFriends()
      }      

      var posts = renderPost(Timeline)                   
      
      return posts            
    }    

    const getPost = async (pages) => {                  
      var render = []
      var userId = ''
      if(user.user !== ''){
        userId = user.user._id
      }        
      var formData = new FormData()
      formData.append('page', pages);
      formData.append('limit', limit);
      formData.append('user_id', userId);
      
     await axios({
          method : 'post',
          url : server.url + '/post/timeline',           
          data : formData,
          validateStatus: (status) => {
            return true;
          },
        })
        .then((response) => {                                              
          const newPost = response.data.posts;                              
                                                  
          if(newPost.length === 0 || newPost.length < limit) {
            setNext(false)
            setIsFetching(false)            

            return render = []
          }else{                                    
            setNext(true)            
            setPage(pages + 1)
            localStorage.setItem("page", (pages + 1))
            

            return render = newPost            
          }                                
        })
        .catch((error) => {
          console.log(error);                            
          return setError(true)          
        })                                             

        return render
    }

    const getFriends = async (pages) => {
      var render = []
      var formData = new FormData()      
      formData.append('user_id', user.user._id);
      formData.append('page', pages);

      await axios({
        method: 'post',
        url : server.url + '/user/findFriend/' + user.user._id, 
        data : formData,
        validateStatus: (status) => {
          return true;
        },
      })
      .then((response) => {                                                                                       
        setAddFriends([...addFriends, ...response.data.posts]) 
        
        
        if(response.data.posts.length > 0){
          render = response.data.posts
          // console.log(response.data)
          return render
          // addToTimeline(friends[0])
        }
      })
      .catch((error) => {
        console.error(error);                
        
        return setError(true)
      }) 

      return render
    }

    const newTimeline = async () => {
      var posts = []
      var friend = []
      await getPost(1).then(response => {
        posts = response
      })

      await getFriends(1).then(response => {
        friend = response        
      })      

      var timeline = [...posts]

      timeline.push(friend)

      // console.log(friend)

      addToTimeline(timeline)
      // setIsFetching(false)               
    }

    const nextTimeline = async () => {
      var posts = []
      var friend = []
      await getPost(page).then(response => {
        posts = response
      })

      await getFriends(page).then(response => {
        friend = response        
      })      

      var timeline = [...posts]

      timeline.push(friend)       

      addToTimeline(timeline)
      // setIsFetching(false)               
    }

    React.useEffect(() => {      
      if(user.user === ''){
        return navigate("/login", {replace: true}) 
      }

      if(Timeline.length === 0 && Timeline !== undefined){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        newTimeline()
      }
      
      // getFriends(0)             
      // checkNewPost(1)                  
      
      return () => {
        setDatas([])
        setAddFriends([])        
        setNext(true)
      }      
    },[])

    React.useEffect(() => {        
      if(page === 1){
        newTimeline()
      }         
    },[page])    

    const renderPost = (post) => {        
      var list = []      
            
      post.map((data, i) => (
        list.push(<Post user={data.user_detail[0]} data={data} key={data._id} />)
      ))
      
      return list
    }
    // var timeline = React.useMemo(() => renderPost(),[datas])
    const renderFriends = (friend,i) => {        
      var list = []      
      var cek = (
        <div key={i}>
          <Box p={3} backgroundColor='white' mt={1} >
            <Typography variant='h6' color='primary' align='center' >Add New Friend</Typography>          
          </Box>
            {
              friend.map((friends) => {             
                return(
                  <AddFriends key={friends.user_profile.username} friends={friends} />
                )   
              })      
            }
        </div>
      )
      
      list.push(cek)
      
      
      if(friend.length > 0){
        return list;        
      }else{
        return ''
      }
    }                

    const checkNewPost = (page) => {            
      var userId = user.user._id
      var formData = new FormData()
      formData.append('page', page);
      formData.append('limit', limit);
      formData.append('user_id', userId);

      if(datas.length > 0)
      setTimeout(() => {
        axios.post(server.url + '/post/timeline', formData)
        .then((response) => {                                              
          const now = datas.slice(0,10)
          const newData = response.data.posts

          if(JSON.stringify(now) !== JSON.stringify(newData)){            
            setOpen(true)
          }                   
        
        })
        .catch((error) => {
          console.log(error);
          setError(true)
          setisLoading(false)
        })
      },1500)                
      
    }

        

    window.onscroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        // if(!noData) {
        //   loadUserList(page);
        // }
        if(next){       
          setIsFetching(true)   
          nextTimeline()
        }        
      }
    }

    const refresh = () => {
      setOpen(false)
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      setIsFetching(true)                  
      refreshTimeline()            
      setPage(1)      
  }

    const action = (
      <React.Fragment>
        <Button color="secondary" size="small" onClick={refresh}>
          refresh
        </Button>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );
    
    // var timeline = React.useMemo(() => renderTimeline(),[datas])

  return (
    <Box minHeight='100vh'>       
        
              {/* {Timeline}                          */}
              {/* {
                isFetching ? 
                <SkeletonPost  />
                : ''
              } */}

              {
                
                Timeline.length > 0 ?
                <>
                  {Timeline.map((data,i) => {
                    return(
                      data._id === undefined ? 
                      renderFriends(data,i)
                      : 
                      <Post user={data.user_detail[0]} data={data} key={i} />                      
                    )
                  })}
                  { next ? 
                    <Box display='flex' justifyContent='center' py={5}>
                      <Loader />
                    </Box>                    
                    : 
                    ''
                  }
                </>
                :
                <>
                  <SkeletonPost />
                  <SkeletonPost />
                </>
              }

              <Snackbar sx={{ mt: 8,}}
                // anchorOrigin={{ vertical, horizontal }}
                anchorOrigin={{ vertical : 'top', horizontal : 'center' }}
                open={open}
                onClose={handleClose}
                message="timeline update"
                action={action}                 
              />
    </Box>
  )
}
