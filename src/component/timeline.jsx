import React from 'react'
import axios from 'axios'

import Box from '@mui/material/Box'

import Post from './post'
import { server } from '../backend'
import { UserContext } from '../state/UserContext'

export default function timeline() {
    const {user} = React.useContext(UserContext)

    const [datas,setDatas] = React.useState([])
    const [viewerStatus, setStatus] = React.useState(false)

    React.useEffect(() => {            
      var userId = ''
      if(user.user !== ''){
        userId = user.user._id
      }

      axios.get(server.url + '/post/timeline/' + userId)
      .then((response) => {              
        console.log(response.data)
        setDatas(response.data.posts)
        
      })
      .catch((error) => {
        console.error(error);
      })
    }, [])  
    

  return (
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
    </div>
  )
}
