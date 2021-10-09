import React,{useState,useEffect} from 'react'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom';
import {useData} from '../Contexts/dataContext'
import { Nav } from './Nav';
import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import axios from 'axios';
import { useAuth } from '../Contexts/authContext';



export function VideoPlayer() {
 const [input,setInput] = React.useState("");
 const {state:{notes,likedVideo,watchLater,dislikedVideo},dispatch} = useData();
 const [viewVideo,setViewVideo]= useState({})
 const {videoId} = useParams();
 const {state:{userId}} = useAuth()
 const findVideo=async(id)=>{
  try{
  const {data:{video}} = await axios.get(`https://swiftflix.herokuapp.com/videos/${id}`) 
  setViewVideo(video)
  }
  catch(error){
    console.log(error);
  }
}
useEffect(() => {
  findVideo(videoId)   
},[videoId])
 
 useEffect(()=>{
  (async()=>{
    try{
    const {data:{notes,success}} = await axios.get(`https://swiftflix.herokuapp.com/notes/${userId}`)
    if(success){
    dispatch({type:"LOAD_NOTES",payload:notes.notes})
    }   
  }
  catch(error){
    console.log({message:error.message})
  }
  })()
 },[dispatch,userId])
 
const submitForm=async(e)=>{
  e.preventDefault();
  try{
    const {data:{note,success}} = await axios.post(`https://swiftflix.herokuapp.com/notes/${userId}`,{playId:videoId,text:input}) 
    if(success){
      dispatch({type:"ADD_NOTE",payload:note})
      setInput("");
    }
  }
  catch(error){
    console.log({message:error.message})
  } 
}
const deleteNote=async(id)=>{
  try{
  const {data:{success,note}} = await axios.delete(`https://swiftflix.herokuapp.com/notes/${userId}/${id}`)
  if(success){
  dispatch({type:"DELETE_NOTE",payload:note._id})
  }  
}
  catch(error){
    console.log({message:error.message})
  }
}
const likedButtonHandler=async()=>{
  try{
   
    if(isVideoDisliked(videoId)){
      const {data:{success,video}}= await axios.delete(`https://swiftflix.herokuapp.com/unlikedvideos/${userId}/${videoId}`)
      if(success){
        dispatch({type:"REMOVE_FROM_DISLIKED_VIDEO",payload:video._id});
      }
    }
    const {data:{video,success}} = await axios.post(`https://swiftflix.herokuapp.com/likedvideos/${userId}`,{playId:videoId})
    if(success){
      dispatch({type:"VIDEO_LIKED",payload:video})
    }    
  }
  catch(error){
    console.log({message:error.message})
  }
  
}
const dislikeButtonHandler=async()=>{
  try{
    if(isVideoLiked(videoId)){
      const {data:{success,video}}= await axios.delete(`https://swiftflix.herokuapp.com/likedvideos/${userId}/${videoId}`)
      if(success){
        dispatch({type:"VIDEO_DISLIKED",payload:video._id})
      }
    }
    const {data:{video,success}} = await axios.post(`https://swiftflix.herokuapp.com/unlikedvideos/${userId}`,{playId:videoId})
    if(success){
      dispatch({type:"ADD_TO_DISLIKED_VIDEO",payload:video})
    }
  }
  catch(error){
    console.log({message:error.message})
  }
}
const watchLaterClicked=async(id)=>{
    try{
      const {data:{video}} = await axios.post(`https://swiftflix.herokuapp.com/watchlater/${userId}`,{playId:id})
      dispatch({type:"WATCH_LATER",payload:video})
    }
    catch(error){
      console.log({message:error.message})
    }
}
const watchLaterUnClicked=async(id)=>{
    try {
      const {data:{video}} = await axios.delete(`https://swiftflix.herokuapp.com/watchlater/${userId}/${id}`)
      dispatch({type:"REMOVE_WATCH_LATER",payload:video._id})
    }
    catch(error){
      console.log({message:error.message})
    }
}
const onlyRemoveFromLikedVideos=async()=>{
      const {data:{success,video}}= await axios.delete(`https://swiftflix.herokuapp.com/likedvideos/${userId}/${videoId}`)
      if(success){
        dispatch({type:"VIDEO_DISLIKED",payload:video._id})
      }
}
const onlyRemoveFromUnLikedVideos=async()=>{
  const {data:{success,video}}= await axios.delete(`https://swiftflix.herokuapp.com/unlikedvideos/${userId}/${videoId}`)
      if(success){
        dispatch({type:"REMOVE_FROM_DISLIKED_VIDEO",payload:video._id});
      }
}
const isVideoLiked=()=>{
  if(likedVideo.some(video=>video._id===videoId))
  {
    return true;
  }
  return false;
}
function isVideoDisliked(){
  return dislikedVideo.some(video=>video._id===videoId)
}
const isWatchlater=()=>{
  if( watchLater.some(item=>item._id===videoId)){
    return true;
  }
  return false;
}
return (
  <>
      <Nav/>
      { viewVideo &&
     <div className="video-player-grid">
        <div >
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            controls
            width="100%"
            playing
          />
          <div className="video-player-description">
          {viewVideo.title}
            <div className="video-player-flex">
              <p> {viewVideo.timestamp}</p>
              {likedVideo && isVideoLiked()?<ThumbUpIcon onClick={onlyRemoveFromLikedVideos} />:<ThumbUpAltOutlinedIcon onClick={likedButtonHandler}/>}
              {dislikedVideo && isVideoDisliked()?<ThumbDownIcon onClick={onlyRemoveFromUnLikedVideos} />:<ThumbDownOutlinedIcon onClick={dislikeButtonHandler}/>}
              {watchLater && isWatchlater()?<WatchLaterIcon onClick={()=>watchLaterUnClicked(videoId)} />:<WatchLaterOutlinedIcon onClick={()=>watchLaterClicked(videoId)} />} 
             </div> 
             <div className="video-player-channel">
              <Avatar >
                <img src={viewVideo.image} style={{width:"4rem",height:"2.5rem"}} alt="channel"/>
              </Avatar>
              {viewVideo.channel}
            </div>
          </div>
        </div>
        <div>
        <form className="notes" onSubmit={submitForm}>
        <TextField id="standard-basic" value={input} className="input" label="Notes" color="secondary" onChange={(e)=>setInput(e.target.value)} />
        <Button variant="contained" type="submit" color="secondary" >ADD</Button>
       </form>
       { notes.map(note=>
                note.playId===videoId && 
        <List key = {note._id}>
                <ListItem style={{backgroundColor:"white"}}>
                  <ListItemText
                    primary={note.text}
                  />
                  <DeleteIcon onClick={()=>deleteNote(note._id)}/>
                  
                 </ListItem> 
        </List>     
       )}
       </div>        
      </div>
          }    </>)
}

