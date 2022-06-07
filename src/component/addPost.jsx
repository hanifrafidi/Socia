import React from 'react'
import axios from 'axios'
import { server } from '../backend'
import { useNavigate, Link as Links } from "react-router-dom";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';

import TextField from '@mui/material/TextField';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { styled } from '@mui/material/styles';

import { Player } from "video-react";

import { UserContext } from '../state/UserContext'

import Loader from '../component/loader'

export default function addPost() {
    const {user}  = React.useContext(UserContext)

    const [preview, setPreview] = React.useState('')
    const [image, setImage] = React.useState([])
    const [caption, setCaption] = React.useState([])

    const [modal, setModal] = React.useState(false)

    let navigate = useNavigate();

    const Input = styled('input')({
        display: 'none',
    });
    
    const uploadImage = (e) => {
        // console.log(e.target.files[0]);
        var file = e.target.files[0];
        var reader = new FileReader();
        var url = reader.readAsDataURL(file);
      
        reader.onloadend = (e) => {
            setPreview(reader.result);                        
            setImage(reader.result);
        }                 
        // var url = URL.createObjectURL(file.originFileObj);
        // seVideoSrc(url);

        // setPreview(url);

        // setImage(file)
    }    

    const handleChange = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setPreview(url);
      };
    
    const onSubmit = (event) => {
        event.preventDefault();        

        setModal(true)

        const hashtag = ['2','2','2']
        const comment = [{ 'user_id' : '222', 'comment' : 'helo', 'date' : 222}]
        const like = [{'user_id' : '222'}, {'user_id' : '222'}]

        let formData = new FormData();
        formData.append('files', image);
        formData.append('caption', caption);
        formData.append('user_id', user.accessToken);                                  

        axios.post( server.url +'/post/', formData)
        .then((response) => {                                                 
            console.log(response.data);    
            setModal(false)            
            return navigate("/", { replace: true });
        })
        .catch((error) => {
            setModal(false)
            console.log(error)
        })

    }

      React.useEffect(() => {
        if(user.user === ''){
            return navigate("/login", {replace: true}) 
        }else{
            // console.log(user)
        }
        },[])

  return (
    <Box
        component='form'
        autoComplete='off'
        onSubmit={onSubmit}
        enctype='multipart/form-data'
        sx={{
            py: 5,
            px: {xs : 2, md: 6},
            mt: 1,
            minHeight: '100vh',
            backgroundColor: '#fff'
        }}
    >
        <Box sx={{ minWidth: '100%', mb: 5 }}>
            <Typography variant='h6' component='div' sx={{ mb: 3}}>Upload your file</Typography>
                <Box my={5}>
                <label htmlFor="icon-button-file">
                
                    <Input accept="image/*" id="icon-button-file" type="file" onChange={uploadImage}/>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <IconButton aria-label="upload picture" component="span">
                            <CameraAltIcon fontSize="large" />
                        </IconButton>
                    </Box>
                    <Typography variant='subtitle1' component='div' textAlign='center'>Upload your file</Typography>                            
                
                </label>
                </Box>
        </Box>
        <Box my={3}>
            { preview === '' ? '' :
            <Card 
                    sx={{ 
                        minHeight: 500, 
                        minWidth: '100%', 
                        cursor: 'pointer', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        backgroundImage: 'url('+ preview +')',
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover' 
                    }}
                >

            </Card>
            }
        </Box>
        <Box sx={{ minWidth: '100%' }}>
            <Typography variant='h6' component='div' sx={{ mb: 3}}>Caption</Typography>
            <TextField 
                id='caption'                 
                name='caption'
                type='text'
                variant='outlined' 
                label='insert your unique caption here'
                multiline
                rows={5}
                sx={{ minWidth: '100%' }}
                onChange={(e) => setCaption(e.target.value)}
            />
        </Box>

        {/* <Box>
            Video
            <Player
                playsInline
                src={preview}
                fluid={false}
                width={'100%'}
                height={600}
            />    
        </Box> */}
        
        <Button type='submit' variant='contained' size='large' color='success' fullWidth={true} sx={{ mt: 4, mb: 3, py: 1.5}}>Submit</Button>
        <Button variant='text' color='error' fullWidth={true}  sx={{ textAlign: 'center' }} component={Links} to='/'>Delete</Button>

        <Modal
          open={modal}          
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >        
              <Box sx={{ 
                  display: 'flex', 
                  flexDirection:'column', 
                  justifyContent: 'center', 
                  alignItems:'center', 
                  py: 15,
                  minWidth: {xs: '70%', md :'20%'}, 
                  borderRadius : 1,
                  background:'#fff',                                    
                  }}>
                  <Box><Loader /></Box>
                  <Typography variant='h6' color="text.secondary" sx={{ mt: 3}}>Loading dulu ya...</Typography>
                  {/* <Button variant='text' size='medium' color="inherit" onClick={() => setModal(false)}> Close</Button> */}
              </Box>
         </Modal>
    </Box>
  )
}
