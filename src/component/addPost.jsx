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
    const [videoPreview, setVideoPreview] = React.useState('')
    const [image, setImage] = React.useState('')
    const [caption, setCaption] = React.useState([])
    const [progress, setProgress] = React.useState(0)

    const [sizeLimit, setSizeLimit] = React.useState(false)

    const [submit, setSubmit] = React.useState(false)

    const [modal, setModal] = React.useState(false)

    let navigate = useNavigate();

    const Input = styled('input')({
        display: 'none',
    });   
    
    const uploadImage = (e) => {  
        // console.log(e.target.files[0].size)
        
        if(e.target.files[0].size > 21000000 && e.target.files[0].type === 'video/mp4'){
            return setSizeLimit(true)
        }

        if(e.target.files[0].size > 22000000 && e.target.files[0].type === 'image/*'){
            return setSizeLimit(true)
        }
                
        if(e.target.files[0].type === 'image/jpg' || e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg'){
            setImage('');
            
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.readAsDataURL(file);

            // console.log(file)

            // setImage(file)
            // reader.onloadend = (event) => {
            //     setPreview(event.target.result)
            //     // setImage(event.target.result)
            // }

            reader.onloadend = (event) => {
                
                const imgElement = document.createElement("img");
                imgElement.src = event.target.result;
                // document.querySelector("#input").src = event.target.result;

                imgElement.onload = (events) => {
                    // console.log(events)
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    canvas.width = events.target.width;
                    canvas.height = events.target.height;
                    ctx.drawImage(events.target, 0, 0, canvas.width, canvas.height);

                    canvas.toBlob((blob) => {
                        var reader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onload = (events) => {   
                            var basedata = reader.result;
                            // console.log(basedata);
                            setPreview(basedata)
                            setImage(basedata)
                        }

                        // const newImg = document.createElement('img');
                        // const url = URL.createObjectURL(blob);
                        // newImg.onload = () => {
                        //     URL.revokeObjectURL(url);
                        // }

                        // console.log(url)
                        // setPreview(url)
                        // setImage(url)
                    }, 'image/webp', 0.55)

                    // const srcEncoded = ctx.canvas.toDataURL(events.target);                    

                    // setPreview(srcEncoded);                        
                    // setImage(srcEncoded);
                    // console.log(events.target.files)
                }

                
            }                         
        }

        setVideoPreview('')
        if(e.target.files[0].type === 'video/mp4'){            
            
            const file = e.target.files[0];            
            var reader = new FileReader();

            reader.onload = (e) => {
                setVideoPreview(e.target.result)
                setImage(e.target.result)
            }

            reader.readAsDataURL(file);           
        }
    }            

    // React.useEffect(() => {        
    //     if(submit){
    //        onSubmit()           
    //     }
    // },[submit])
    
    const onSubmit = () => {
        event.preventDefault();        

        setModal(true)

        const options = {                
            onUploadProgress: (progressEvent) => {
              const { loaded, total } = progressEvent;
              console.log(loaded)        
            },
        };

        let formData = new FormData();
        formData.append('file', image);
        formData.append('caption', caption);
        formData.append('user_id', user.user._id);                                  

        // axios.post( server.url +'/post/', formData, options)
        axios.request({
            method: "post", 
            url: server.url +'/post/', 
            data: formData, 
            headers: {
                'content-type': 'multipart/form-data'
            },
            onUploadProgress: (p) => {            
              setProgress(p.loaded / p.total)              
            }
        })
        .then((response) => {                                                 
            console.log(response.data);             
            setModal(false)            
            setSubmit(false)
            return navigate("/", { replace: true });
        })
        .catch((error) => {
            setModal(false)
            setSubmit(false)
            console.log(error)
        })

        // console.log(image)
        // console.log(videoPreview)        
    }

      React.useEffect(() => {
        if(user.user === ''){
            return navigate("/login", {replace: true}) 
        }else{
            // console.log(user)
        }
        },[])

     React.useEffect(() => {
        console.log(progress)
     },[progress])

  return (
    <Box
        component='form'
        autoComplete='off'
        onSubmit={onSubmit}
        // enctype='multipart/form-data'
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
            <Box my={3}>
            
            <Card 
                    sx={{ 
                        minHeight: {xs: 300, xl :500}, 
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
                <label htmlFor="icon-button-file">                
                    <Input accept="image/*, video/*" id="icon-button-file" type="file" onChange={uploadImage}/>
                    <Box sx={{display: 'flex', justifyContent: 'center', minWidth: '100%', minHeight: '100%'}}>
                        <IconButton aria-label="upload picture" component="span">
                            <CameraAltIcon fontSize="large" />
                        </IconButton>
                    </Box>
                    <Typography variant='subtitle1' component='div' textAlign='center'>Upload your file</Typography>                            
                
                </label>   
            </Card>
            
        </Box>
                <Box my={5}>
                
                </Box>
        </Box>
        <Box>
            { sizeLimit ? 
                <Typography variant='h6' color='primary'>Video tidak boleh melebihi 20MB</Typography>
                : ''
            }
        </Box>
        
        { 
            videoPreview !== '' ?
            <Box my={3}>                
                <Box component='video' width="100%" height="240" controls>
                    <source src={videoPreview} type="video/mp4" />
                </Box>   
            </Box>
            :
            ''
        }
        <Box sx={{ minWidth: '100%', mt: 5 }}>
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

       
        
        
        <Button type='submit' variant='contained' size='large' color='success' fullWidth={true} sx={{ mt: 4, mb: 3, py: 1.5}} disabled={ image === '' ? true : false} >Submit</Button>
        <Button variant='text' color='error' fullWidth={true}  sx={{ textAlign: 'center' }} component={Links} to='/' disabled={ image === '' ? true : false}>Delete</Button>

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
                  <Box><Loader progress={progress}/></Box>
                  <Typography variant='h6' color="text.secondary" sx={{ mt: 3}}>Loading dulu ya...</Typography>
                  {/* <Button variant='text' size='medium' color="inherit" onClick={() => setModal(false)}> Close</Button> */}
              </Box>
         </Modal>
    </Box>
  )
}
