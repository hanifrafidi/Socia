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

import { UserContext } from '../state/UserContext'

export default function addPost() {
    const {user}  = React.useContext(UserContext)

    const [preview, setPreview] = React.useState([])
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

        // setImage(file)
    }    
    
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
        formData.append('hashtag', JSON.stringify(hashtag));
        formData.append('date', 222);
        formData.append('comment', JSON.stringify(comment))
        formData.append('like', JSON.stringify(like))                        

        axios.post( server.url +'/post/', formData)
        .then((response) => {                                                 
            console.log(response.data);    
            setModal(false)            
            return navigate("/", { replace: true });
        })
        .catch((error) => {
            console.log(error)
        })

    }

  return (
    <Box
        component='form'
        autoComplete='off'
        onSubmit={onSubmit}
        enctype='multipart/form-data'
        sx={{
            py: 5,
            px: 6,
            mt: 1,
            minHeight: '100vh',
            backgroundColor: '#fff'
        }}
    >
        <Box sx={{ minWidth: '100%', mb: 5 }}>
            <Typography variant='h6' component='div' sx={{ mb: 3}}>Upload your file</Typography>
            <label htmlFor="contained-button-file">
            <Input id="contained-button-file" multiple type="file" accept="image/jpeg,image/png,image/jpg" onChange={uploadImage}/>
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
                <IconButton size="large">
                    <CameraAltIcon fontSize="large" />
                </IconButton>
                <Typography variant='subtitle1' component='div'>Upload your file</Typography>
                
            </Card>
            </label>
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
        
        <Button type='submit' variant='contained' size='large' color='success' fullWidth={true} sx={{ mt: 4, mb: 3, py: 1.5}}>Submit</Button>
        <Button variant='text' color='error' fullWidth={true}  sx={{ textAlign: 'center' }} component={Links} to='/'>Delete</Button>

        <Modal
        open={modal}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
         >        
            <Box sx={{ display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center', minHeight: '100vh'}}>
                <Typography variant='h6' sx={{ my: 3}}>Loading dulu ya...</Typography>
                <Button variant='text' color="inherit" onClick={() => setModal(false)}> Close</Button>
            </Box>
         </Modal>
    </Box>
  )
}
