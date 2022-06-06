import React from 'react'
import axios from 'axios'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import Post from './post'
import { server } from '../backend'
import { UserContext } from '../state/UserContext'

export default function timeline() {
    const {user} = React.useContext(UserContext)

    const [datas,setDatas] = React.useState([])    
    const [limit,setLimit] = React.useState(10)
    const [page,setPage] = React.useState(1)
    const [isFetching, setIsFetching] = React.useState(false);    
    const [next,setNext] = React.useState(true)
        
    const body = React.useRef()    

    React.useEffect(() => {            
      getPost()            
    }, [])  

    React.useEffect(() => {
      if(isFetching && next){
        getPost()
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

      axios.post(server.url + '/post/timeline/' + userId, formData)
      .then((response) => {                                      
        if(response.data.posts.length !== 0) {          
          setDatas([...datas, ...response.data.posts])
          setPage(page + 1)                      
          setIsFetching(false)
        }else{
          setNext(false)
        }                     
        console.log(response.data)   
      })
      .catch((error) => {
        console.error(error);
      })
    }
   
  const handleScroll = () => {        
    if (window.innerHeight + window.pageYOffset === document.body.offsetHeight){
      return setIsFetching(true)
    }                      
  }

  return (
    <div ref={body}>
        {
          datas.length > 0 ? 
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
            :
            ''
        }                                
    </div>
  )
}
