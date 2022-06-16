import React, { useState, createContext } from 'react';

export const TimelineContext = createContext({    
    // Timeline : [],
    // page : 1,    
    // likePost : () => {},
    // unlikePost : () => {},
    // addToTimeline : () => {},   
    // refreshTimeline : () => {}
})

const TimelineProvider = (props) => {
    const [Timeline, setTimeline] = useState([])   
    const [page,setPage] = React.useState(localStorage.getItem("page") ? parseInt(localStorage.getItem("page")) : 1)
    const [alertType, setAlert] = useState(false) 

    const addToTimeline = postItem => {setTimeline(addItems(Timeline,postItem,setAlert))}            
    const refreshTimeline = () => { setTimeline([])}
    const likePost = id => { return likePosts(Timeline,id)}
    const unlikePost = id => { return unlikePosts(Timeline,id)}

    React.useEffect(() => {

        return () => {
            setTimeline([])
            setPage(1)
            setAlert(false)
        }        
    },[])

    return(
        <TimelineContext.Provider 
        value={{
            Timeline,
            page,
            setPage,
            likePost,
            unlikePost,
            addToTimeline,   
            refreshTimeline                     
        }}>
            {props.children}
        </TimelineContext.Provider>
    )
}

const addItems = (Timeline, postItem, setAlert) => {    

    Timeline = [...Timeline, ...postItem]    
    
    setAlert('success')
    setTimeout(() => {
        setAlert('false')
    }, 1500);
            
    return Timeline
}

const likePosts = (Timeline,id) => {
    const checkTimeline = Timeline.find(
        Timeline => Timeline._id === id
    )

    if(checkTimeline){
        Timeline.map( post => 
            post._id === id ?
            (
                post['is_liked'] = true,
                post['like'].push([{user_id : id}])
            )
            :
            post            
        )        
    }
}

const unlikePosts = (Timeline,id) => {
    const checkTimeline = Timeline.find(
        Timeline => Timeline._id === id
    )

    if(checkTimeline){
        Timeline.map( post => 
            post._id === id ?
            (
                post['is_liked'] = false,
                post['like'].pop()
            )
            :
            post            
        )        
    }
}


export default TimelineProvider;