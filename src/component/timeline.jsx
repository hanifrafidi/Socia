import React from 'react'
import axios from 'axios'

import Box from '@mui/material/Box'

import Post from './post'
import { server } from '../backend'

export default function timeline() {
    

    const [datas,setDatas] = React.useState([])

    React.useEffect(() => {
      axios.get(server.url + '/post/timeline')
      .then((response) => {
        // console.log(response.data)
        setDatas(response.data)
      })
      .catch((error) => {
        console.error(error.response.data);
      })
    }, [])  
    

  return (
    <div>
        {
            datas.map((data,index) => {                
            return(
                <Box key={index}>
                    <Post img={data.image_path} caption={data.caption} user={data.user_detail}></Post>            
                </Box>
            )
            })      
        }
    </div>
  )
}
