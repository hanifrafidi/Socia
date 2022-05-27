import React, { useState, createContext } from 'react';
import { useNavigate } from "react-router-dom"

export const UserContext = createContext({
    user : {
        userData : '',
        accessToken: '',
        photo: '',
    },    
    login : () => {},
    logout : () => {},
})

const UserProvider = (props) => {
    const [user, setUser] = useState({
        userData : localStorage.getItem("user") != null ? localStorage.getItem("user") : '',
        accessToken : localStorage.getItem("token") != null ? localStorage.getItem("token") : '',
        photo : localStorage.getItem("photo") != null ? localStorage.getItem("photo") : ''
        // userData : '',
        // accessToken : ''
    })    
    const navigate = useNavigate()

    const login = response => {loginUser(user,response,setUser,navigate)}
    const logout = () => {logoutUser(user,setUser,navigate)}

    return(
        <UserContext.Provider 
        value={{
            user,
            login,
            logout
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

const loginUser = (user,response,setUser,navigate) => {        
    
    if(response.error != null){
        console.log(user)
        return console.log('error : ', response)
    }else{            
        localStorage.setItem("token", response.accessToken)
        localStorage.setItem("user", response.user.username)
        localStorage.setItem("photo", response.user.profile.image_path)
        setUser( {
                ...user,
                userData : localStorage.getItem("user"),
                accessToken : localStorage.getItem("token"),    
                photo : localStorage.getItem("photo")        
        })    
        return navigate("/", {replace: true})    
    }
}

const logoutUser = (user,setUser,navigate) => {    
    localStorage.clear();
    setUser(  {
        ...user,
        userData : '',
        accessToken : ''
    })

    return navigate('/login', {replace : true})
}

export default UserProvider;
