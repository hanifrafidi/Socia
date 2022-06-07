import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { server } from '../backend'
import {UserContext} from '../state/UserContext'
import {Link as Links} from 'react-router-dom'

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';


export default function comments(props) {
    const [open, setOpen] = React.useState(props.open)
    const [commentList, setCommentList] = React.useState([])
    const [newComment, setNewComment] = React.useState('')

    const { user } = React.useContext(UserContext)

    const onSubmit = () => {
        event.preventDefault()

        setOpen(false)
        let formData = new FormData();
        formData.append('comment', newComment);        
        formData.append('user_id', user.user._id);
        
        axios.post(server.url + '/post/comment/' + props.posts._id, formData)
        .then(response => {
            console.log(response.data)            
            setCommentList([response.data.comment].concat(commentList));
        })
        .catch(error => {
            console.log(error.response.data)            
        })
    }

    const callComment = () => {
        let formData = new FormData()
        formData.append('post_id', props.posts._id);
        formData.append('comment', JSON.stringify(props.comments));        

        axios.post(server.url + '/post/commentt', formData)
        .then(response => {
            console.log(response.data)
            const comment = response.data.comment;
            const user = response.data.user;                
            
            for (var i = 0; i < comment.length; i++) {
                for (var u = 0; u < user.length; u++) {
                    if( user[u]._id === comment[i].user_id){
                        comment[i].userDetail = user[u]
                    }
                }                    
            }                           
            comment.sort((a,b) => Date.parse(b.date) - Date.parse(a.date))
            setCommentList(commentList => commentList.concat(comment))
        })
        .catch(err => {
            console.log(err)
        })
    }

    const changeDate = (date) => {
        return moment(Date.parse(date)).fromNow();
    }

    React.useEffect(() => {                        
        callComment()
    },[])

        
  return (
    <Box sx={{ mt: 5, mb: 5}}>        
        <Box sx={{ display: 'flex'}}>
            <Typography variant='h6' component='div' color='text.secondary' sx={{ flexGrow: 1 }}>Comments</Typography>
            {/* <Typography variant='subtitle1' component='div'>Filter</Typography> */}
        </Box>
        { user.user !== '' ?
        <Box 
            sx={{ mt: 5, display: 'flex', alignItems: 'center' }} 
            component='form' 
            enCtype='multipart/form-data'
            onSubmit={onSubmit}
        >
                        
                <Avatar 
                    alt={user.user.username}
                    src={user.user.profile.image_path} 
                    sx={{ mr: 2}}
                    component={Links}
                    to={'/'+ user.user.username}
                />
                
            <TextField 
                sx={{ width: '100%', pr: 5 }} 
                id="standard-basic" 
                label="Comment here" 
                variant="standard" 
                onChange={(e) => setNewComment(e.target.value)}  
                required
            />            

            <Button variant='contained' size='small' type='submit' color='primary' sx={{ px: 4, py: 1.5 }}>Submit</Button>
        </Box>
            :
            ''
        }
        <Box>
            {                
                commentList.length > 0 ?
                    
                    commentList.map((comment,index) => {
                        return (                            
                            <div  key={index}>
                                <Box sx={{ mt: 8}}>                                            
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                        <Avatar 
                                            alt={comment.userDetail.username}
                                            src={comment.userDetail.profile.image_path} 
                                            sx={{ mr: 2}}
                                            component={Links}
                                            to={'/'+ comment.userDetail.username}
                                        />
                                        <Typography variant='subtitle1' component='div' sx={{ flexGrow: 1 }}>{comment.userDetail.username}</Typography>
                                        <Typography variant='subtitle1' component='div'>{changeDate(comment.date)}</Typography>
                                    </Box>
                                    <Typography variant='subtitle2' component='div' sx={{ ml: 7}} >{comment.comment}</Typography>                                    
                                </Box>                      
                                <Divider sx={{ mt: 5}}/>
                            </div>                                                     
                            )
                    })                                        
                : 
                <Box mt={10} minWidth='100%' justifyContent='center' display='flex' color='text.secondary'>
                    <Typography variant='body1' >Belum ada yang komentar nih, Yuk komentarin biar rame</Typography>
                </Box>
            }           
        </Box>
    </Box>
  )
}
