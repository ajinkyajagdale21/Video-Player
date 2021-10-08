import React,{useState,useEffect} from 'react'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router';
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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import WatchLaterOutlinedIcon from '@material-ui/icons/WatchLaterOutlined';
import axios from 'axios';



export function VideoPlayer() {
 const [input,setInput] = React.useState("");
 const {state:{notes,likedVideo,watchLater,dislikedVideo},dispatch} = useData();
 const [viewVideo,setViewVideo]= useState({})
 const {videoId} = useParams();

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
 
 
 
const submitForm=(e)=>{
  e.preventDefault();
  dispatch({type:"ADD_NOTE",payload:{id:videoId,notes:input}})
  setInput("");
}
const deleteNote=()=>{
  dispatch({type:"DELETE_NOTE",payload:{videoId}})
}
const likedButtonHandler=()=>{
  dispatch({type:"VIDEO_LIKED",payload:viewVideo})
  dispatch({type:"REMOVE_DISLIKED_VIDEO",payload:viewVideo.playId});
}
const dislikeButtonHandler=()=>{
  dispatch({type:"VIDEO_DISLIKED",payload:viewVideo.playId})
}
const isVideoLiked=(id)=>{
  return likedVideo.some(video=>video.playId===id)
}
const isVideoDisliked=(id)=>{
  return dislikedVideo.some(video=>video.playId===id)
}
const isWatchlater=(id)=>{
  return watchLater.some(video=>video.playId===id)
}
return (
  <>
      <Nav/>
      <div className="video-player-grid">
        <div>
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
              {isVideoLiked(viewVideo.playId)?<ThumbUpIcon onClick={dislikeButtonHandler} />:<ThumbUpAltOutlinedIcon onClick={likedButtonHandler}/>}
              {isVideoDisliked(viewVideo.playId)?<ThumbDownIcon onClick={()=>{dispatch({type:"REMOVE_DISLIKED_VIDEO",payload:viewVideo.playId})}} />:<ThumbDownOutlinedIcon onClick={()=>{dispatch({type:"DISLIKED_VIDEO",payload:viewVideo});dispatch({type:"VIDEO_DISLIKED",payload:viewVideo.playId})}}/>}
              {isWatchlater(viewVideo.playId)?<WatchLaterIcon onClick={()=>dispatch({type:"REMOVE_WATCH_LATER",payload:viewVideo.playId})} />:<WatchLaterOutlinedIcon onClick={()=>dispatch({type:"WATCH_LATER",payload:viewVideo})} />} 
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
       {notes.map(note=>
        note.videoId===videoId && 
        <List >
                <ListItem style={{backgroundColor:"white"}}>
                  <ListItemText
                    primary={note.note}
                  />
                    <IconButton >
                      <DeleteIcon onClick={deleteNote}/>
                    </IconButton>
                 </ListItem>
        </List>     
           

    )}
       </div>        
      </div>
  </>)
}

