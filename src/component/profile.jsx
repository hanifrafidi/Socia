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
import Stack from '@mui/material/Stack';

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


    const [userProfile,setProfile] = React.useState({        
        is_friend : false,
        total_posts : ''
    });
    const [friendStatus, setFriendStatus] = React.useState(false);
    const [posts,setPosts] = React.useState({
        posts : [],
        totalCount : '',
        loader : true,
        page: 1,
        next: true
    });    
    const [friends, setFriends] = React.useState({
        friends : [],
        totalCount : '',
    });        
    

    const [error, setError] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)

    const { username } = useParams()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };    

    const getProfile = (user_name) => { 
        let data = new FormData()
        var user_id = ''
        
        if(user.user._id !== undefined){ 
            user_id = user.user._id
        }                       
            data.append('user_id', user_id)
            
            axios.post( server.url + '/user/profile/' + user_name, data)
            .then((response) => {     
                // console.log(response.data)
                setProfile({
                    ...response.data.user_profile,
                    is_friend : response.data.is_friend,
                    total_posts : response.data.total_posts
                })                
                setFriendStatus(response.data.is_friend)
                setIsLoading(false)
                
            })
            .catch((err) => {
                console.log(err)
                setError(true)
            })          
    }   

    const getPost = (user_name) => {                                
        axios.get( server.url + '/post/user/' + user_name + '/' + posts.page)
        .then((res) => {        
            // console.log(res.data)
            var res = res.data
            setTimeout(() => {                        
                setPosts({
                    posts : [...posts.posts, ...res.posts],
                    totalCount : res.totalCount.value,
                    page: posts.page + 1,                                
                    next: res.posts.length === 0 || res.posts.length < 9 ? false : true,
                    loader : false,
                })                                        
            },300)            
        })
        .catch((err) => {
            console.log(err.response.data.message)
            setError(true)
        })          
    
    }

    const getFriends = (user_name) => {                            
        axios.get( server.url + '/user/profile/friends/' + user_name)
        .then((response) => {       
            // console.log(response.data)   
            setFriends({
                friends : response.data.friends,
                totalCount : response.data.totalCount.value
            })                                        
        })
        .catch((err) => {
            console.log(err.response.data.message)
            setError(true)
        })          
}
                        
    React.useEffect(() => {                           
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;           
        getProfile(username)            
        
        return () => {
            null
        }
    },[])
    

    React.useEffect(() => {
        if(value === '1'){
            getPost(username)                 
        }
        if(value === '2'){
            getFriends(username)
        }
    },[value])

    const movePage = (user_name) => {
        navigate('/' + user_name, { replace: true })
        location.reload();        
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
                        
        if(userProfile.is_friend){
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

    window.onscroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
          // if(!noData) {
          //   loadUserList(page);
          // }
          if(value === '1' && posts.next){            
            getPost(username)
          }        
        }
      }

  return (
    <div>        
        {
            
        !isLoading ?
            <Box sx={{ mt: 0, backgroundColor: '#fff', borderRadius: 1.5, minHeight: '100vh' }}>                                
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', py: {xs: 5, md: 10}}}>
                    <Avatar 
                            alt={userProfile.username}
                            src={userProfile.image_url}
                            sx={{ mb: 3, height: {xs: 120, md: 170}, width: {xs: 120, md: 170}, border: '0.5px solid #F2F2F2' }}

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
                        <Stack direction='row'>
                            <Button color="inherit" variant="text" sx={{ my: 0}} fullWidth={true} component={Links} to={'/profile/edit/' + userProfile.username}>Edit Profile </Button>
                            <Button color="warning" variant="text" onClick={logout} fullWidth={true}>Logout</Button>
                        </Stack>
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
                            <Tab label={"Posts " + userProfile.total_posts } value="1" sx={{ mx: {xs: 0, md: 5}}}/>
                            <Tab label={"Friend " + userProfile.friend.length} value="2" sx={{ mx: {xs: 0, md: 5}}}/>
                            <Tab label="Circle" value="3" sx={{ mx: {xs: 0, md: 5}}}/>
                        </TabList>
                    </Box>
                    <TabPanel value="1" sx={{ px: {xs: 1 , md: 3}, minHeight: 'auto' }}>
                        {
                            posts.posts.length === 0 ?
                            <Box display='flex' justifyContent='center' mt={3}>
                                <Loader />
                            </Box>
                            :
                            <>
                                <Grid 
                            container
                            direction="row"
                            // justifyContent="space-between"                        
                            spacing={{xs : 0.5, md: 1}}                            
                        >
                            {
                                posts.posts.map((post, index) => {
                                    return(
                                        <Grid item xs={4} md={4} key={index} 
                                        sx={{  p: 0, mb: { xs : 0}  }} 
                                        component={Links} to={'/detail/' + post._id}>                                            
                                            <Card
                                                component="img"
                                                sx={{
                                                height: 240,   
                                                minWidth: '100%',
                                                maxHeight: {xs: 125, md: '100%'},
                                                maxWidth: {xs: 70, md: '100%'},
                                                p: 0,                                                
                                                backgroundRepeat: 'no-repeat',
                                                objectFit: 'cover',                                                
                                                // maxHeight: { xs: 233, md: 167 },
                                                // maxWidth: { xs: 350, md: 250 },
                                                }}
                                                alt={post.username}
                                                src={post.media_path}
                                                loading="lazy"
                                            />   
                                        </Grid>
                                    )
                                })
                            }                        
                                </Grid> 
                                { posts.next ? 
                                    <Box py={5} display='flex' justifyContent='center'>
                                        <Loader />
                                    </Box>
                                    : 
                                    <Box py={3}></Box>
                                }
                            </>
                        
                        }
                        
                    </TabPanel>
                    <TabPanel value="2" sx={{ px: {xs: 1 , md: 15}, minHeight: '100vh' }}>
                        
                            {
                                friends.friends.map((friend, index) => {
                                    return(
                                        <Box sx={{display: 'flex', alignItems:'center', mb: 5,  textDecoration: 'none', color: 'black'}} key={index} onClick={() => movePage(friend.friend.username)}>
                                            <Avatar alt={friend.friend.username} src={friend.friend.image_url} sx={{ mr: 3, border: '0.5px solid #F2F2F2'}} />
                                            <Typography variant='body1'>{friend.friend.username}</Typography>                                    
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
            
            <Box sx={{ px: {xs: 1, md: 3}, mt: 0, backgroundColor: '#fff', borderRadius: 1.5, minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>                
                { error ? 
                    <Typography variant='h5' sx={{ mt: 10}}>User tidak ditemukan</Typography>
                    :
                    <Box sx={{ minWidth: '100%'}} display='flex' justifyContent='center' pt={15} >
                        
                    </Box>
                }
            </Box>
                
        }
    </div>
  )
}
