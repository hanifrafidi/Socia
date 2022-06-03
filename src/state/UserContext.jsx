import React, { useState, createContext } from 'react';
import { useNavigate } from "react-router-dom"

export const UserContext = createContext({
    user : {
        user : '',
        accessToken: '',
        photo: '',
    },    
    login : () => {},
    logout : () => {},
})

const UserProvider = (props) => {
    const [user, setUser] = useState({
        user : localStorage.getItem("user") != null ? JSON.parse(localStorage.getItem("user")) : '',
        accessToken : localStorage.getItem("token") != null ? localStorage.getItem("token") : '',
        photo : localStorage.getItem("photo") != null ? localStorage.getItem("photo") : ''
        // user : '',
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
        localStorage.setItem("user", JSON.stringify(response.user))        
        localStorage.setItem("photo", response.user.profile.image_path)
        setUser( {
                ...user,
                user : JSON.parse(localStorage.getItem("user")),
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
        user : '',
        accessToken : ''
    })

    return navigate('/login', {replace : true})
}

export default UserProvider;
