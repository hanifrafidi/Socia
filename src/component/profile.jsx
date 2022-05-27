import React from 'react'
import axios from 'axios'

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Card from '@mui/material/Card';

import {UserContext}  from '../state/UserContext'
import {useNavigate, useLocation, useParams, Link as Links} from 'react-router-dom'

export default function profile({match}) {
    const [value, setValue] = React.useState('1');
    const {user, logout} = React.useContext(UserContext)    

    const [userProfile,setProfile] = React.useState([]);
    const [posts,setPosts] = React.useState([]);
    const [friends, setFriends] = React.useState([]);    
    const [imagepf, setImagepf] = React.useState('');    

    const { id } = useParams()
                        
    React.useEffect(() => {                 
        axios.get('https://socia-apps.herokuapp.com/post/profile/' + id)
        .then((response) => {            
            console.log(response.data)
            setPosts(response.data.post)            
            setProfile(response.data.profile)
            setFriends(response.data.profile.friend_profile)            
            setImagepf(response.data.profile.profile)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };     

  return (
    <Box sx={{ px: 3 }}>                                
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8}}>
                <Avatar 
                        alt={userProfile.username}
                        src={imagepf.image_path}
                        sx={{ mb: 3, height: 170, width: 170 }}
                />
                <Typography variant="h4" component="div" sx={{ mb: 1}}>{userProfile.username}</Typography>
                <Typography variant="body1" component="div">Tokyo</Typography>

                { user.userData === userProfile.username ? 
                    <Button color="warning" variant="text" sx={{ my: 3}} onClick={logout}>Logout</Button>
                    :
                    ''
                }
        </Box>
        <Box>
            <TabContext value={value}>
                <Box sx={{ borderColor: 'divider', display: 'flex', justifyContent: 'center', mb: 3}}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{ display: 'flex', justifyContent: 'center'}}>
                        <Tab label="Posts" value="1" sx={{ mx: 5}}/>
                        <Tab label="Friend" value="2" sx={{ mx: 5}}/>
                        <Tab label="Circle" value="3" sx={{ mx: 5}}/>
                    </TabList>
                </Box>
                <TabPanel value="1" sx={{ px: 0, }}>
                    <Grid 
                        container
                        direction="row"
                        justifyContent="space-between"
                        
                        spacing={1}
                        sx={{ minHeight : '100vh'}}
                    >
                        {
                            posts.map((post, index) => {
                                return(
                                    <Grid item xs={4} key={index}>
                                        <Card sx={{ 
                                                p: 0,
                                                backgroundImage : 'url('+ post.image_path +')',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'top',
                                                minWidth: 216,
                                                minHeight: 270
                                        }} />   
                                    </Grid>
                                )
                            })
                        }                        
                    </Grid>
                </TabPanel>
                <TabPanel value="2">
                    
                        {
                            friends.map((friend, index) => {
                                return(
                                    <Box sx={{display: 'flex', alignItems:'center'}} key={index}>
                                        <Avatar alt={friend.username} src={friend.profile.image_path} sx={{ mr: 3}} />
                                        <Typography variant='h6'>{friend.username}</Typography>                                    
                                    </Box>
                                )

                            })
                        }                    
                </TabPanel>
                <TabPanel value="3">Circle</TabPanel>
            </TabContext>
        </Box>
    </Box>
  )
}
