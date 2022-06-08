import React from 'react'
import axios from 'axios'

import { server } from '../backend'
import Loader from '../component/loader'
import SkeletonPost from '../component/skeleton/post'

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
import {useNavigate, useParams, Link as Links, useSearchParams} from 'react-router-dom'

export default function profile({match}) {
    const [value, setValue] = React.useState('1');
    const navigate = useNavigate();    
    const {user, logout} = React.useContext(UserContext)    
    let [searchParams, setSearchParams] = useSearchParams();


    const [userProfile,setProfile] = React.useState({});
    const [posts,setPosts] = React.useState([]);
    const [friendStatus, setFriendStatus] = React.useState('');
    const [friends, setFriends] = React.useState([]);    
    const [imagepf, setImagepf] = React.useState('');

    const [error, setError] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)

    const { username } = useParams()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };    

    const getProfile = (user_name) => { 
        let data = new FormData()
        
        if(user.user !== ''){                        
            data.append('id_viewer', user.user._id)
            
            axios.post( server.url + '/post/profile/' + user_name, data)
            .then((response) => {            
                console.log(response.data)
                setPosts(response.data.post)            
                setProfile(response.data.profile)
                setFriends(response.data.profile.friend_profile)
                setFriendStatus(response.data.friend_status)            
                setImagepf(response.data.profile.profile)

                setTimeout(()=> {
                    setIsLoading(false)
                }, 300)
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
        }else{
            axios.get( server.url + '/post/profile/' + username)
            .then((response) => {            
                console.log(response.data)
                setPosts(response.data.post)            
                setProfile(response.data.profile)
                setFriends(response.data.profile.friend_profile)            
                setFriendStatus(response.data.friend_status)
                setImagepf(response.data.profile.profile)

                setTimeout(()=> {
                    setIsLoading(false)
                }, 300)
            })
            .catch((err) => {
                console.log(err)
                setError(true)
            })
        }   
    }
                        
    React.useEffect(() => {                              
        setTimeout(()=> {
            getProfile(username)        
        }, 300)
    },[])

    const movePage = (user_name) => {
        navigate('/' + user_name, { replace: true })
        location.reload();
        // return navigate("/" + user_name, { replace: true });
        // history.push('/dresses?color=blue')
        // SetUsername(user_name)
        // setIsLoading(true)        
        // setTimeout(()=> {
        //     getProfile(user_name)        
        // }, 300)
    }

    const addFriend = () => {        
        if(user.user === ''){
            return navigate("/login", {replace: true}) 
        }

        let data = new FormData()
        data.append('id_friend', userProfile._id)
        data.append('id', user.user._id)

        axios.post(server.url + '/user/addFriend/' + user.user._id, data)
        
        .then((response) => {
            console.log(response.data);
            location.reload()
        })
        .catch((error) => {
            console.log(error);
            location.reload()
        })
    }
    
    const checkFriend = () => {        
        var check = false;                
        
        if(friendStatus !== ''){
            if(friendStatus.friend === 1){
                check = true
            }
        }

        if(check){
            return(
                <Button  variant="outlined" color="inherit" fullWidth={true} onClick={deleteFriend}>Delete Friend</Button>
            )
        }else{
            return(
                <Button  variant="contained" color="primary" size='large' fullWidth={true} onClick={addFriend}>Add Friend</Button>
            )
        }        
    }

    const deleteFriend = () => {
        let data = new FormData()        
        data.append('id', user.user._id)
        data.append('friend_id', userProfile._id)

        axios.post(server.url + '/user/deletefriend/' + user.user._id, data)
        
        .then((response) => {
            console.log(response.data);
            location.reload()
        })
        .catch((error) => {
            console.log(error);
            location.reload()
        })
    }

  return (
    <div>        
        {
            
        !isLoading ?
            <Box sx={{ mt: 1, backgroundColor: '#fff', borderRadius: 1.5, minHeight: '100vh' }}>                                
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', py: {xs: 5, md: 10}}}>
                    <Avatar 
                            alt={userProfile.username}
                            src={imagepf.image_path}
                            sx={{ mb: 3, height: {xs: 120, md: 170}, width: {xs: 120, md: 170} }}
                    />
                    <Typography variant="h4" component="div" sx={{ mb: 1}}>{userProfile.username}</Typography>
                    {/* <Typography variant="body1" component="div">Tokyo</Typography>                 */}
                    <Box sx={{ mt: 5, minWidth: '100%', px: {xs: 5, md: 30}}}>
                    {
                        user.user.username === userProfile.username ? 
                            ''
                        : checkFriend()                    
                    }                       

                    { user.user.username === userProfile.username ? 
                        <Button color="warning" variant="text" sx={{ my: 3}} onClick={logout} fullWidth={true}>Logout</Button>
                        :
                        ''
                    }
                    </Box>
            </Box>
            <Box>
                <TabContext value={value}>
                    <Box sx={{ borderColor: 'divider', display: 'flex', justifyContent: 'center', }}>
                        <TabList 
                            onChange={handleChange} 
                            aria-label="lab API tabs example" 
                            sx={{ display: 'flex', justifyContent: 'center'}}>
                            <Tab label={"Posts " + posts.length } value="1" sx={{ mx: {xs: 0, md: 5}}}/>
                            <Tab label={"Friend " + friends.length} value="2" sx={{ mx: {xs: 0, md: 5}}}/>
                            <Tab label="Circle" value="3" sx={{ mx: {xs: 0, md: 5}}}/>
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ px: {xs: 1 , md: 3}, minHeight: '100vh' }}>
                        <Grid 
                            container
                            direction="row"
                            // justifyContent="space-between"                        
                            spacing={{xs : 0.5, md: 1}}
                            sx={{ minHeight : 'auto', pb: 15 }}
                        >
                            {
                                posts.map((post, index) => {
                                    return(
                                        <Grid item xs={4} md={4} key={index} 
                                        sx={{  p: 0, mb: { xs : 0}  }} 
                                        component={Links} to={'/detail/' + post._id}>                                            
                                            <Card
                                                component="img"
                                                sx={{
                                                height: 240,   
                                                minWidth: '100%',
                                                maxHeight: {xs: 110, md: '100%'},
                                                maxWidth: {xs: 70, md: '100%'},
                                                p: 0,                                                
                                                backgroundRepeat: 'no-repeat',
                                                backgroundSize: 'cover',                                                
                                                // maxHeight: { xs: 233, md: 167 },
                                                // maxWidth: { xs: 350, md: 250 },
                                                }}
                                                alt={post.username}
                                                src={post.image_path}
                                                loading="lazy"
                                            />   
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
                                        <Box sx={{display: 'flex', alignItems:'center', mb: 5,  textDecoration: 'none', color: 'black'}} key={index} onClick={() => movePage(friend.username)}>
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
            : 
            
            <Box sx={{ px: {xs: 1, md: 3}, mt: 1, backgroundColor: '#fff', borderRadius: 1.5, minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
                { error ? 
                    <Typography variant='h5' sx={{ mt: 10}}>User tidak ditemukan</Typography>
                    :
                    <Box sx={{ minWidth: '100%'}} display='flex' justifyContent='center' pt={15} >
                        <Loader />
                    </Box>
                }
            </Box>
                
        }
    </div>
  )
}
