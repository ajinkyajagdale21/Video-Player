import React from 'react'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router';
import {useData} from '../Contexts/dataContext'
import { Nav } from './nav';
import { Button } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';



export function VideoPlayer() {
 const [input,setInput] = React.useState("");
 const {state:{videos,notes},dispatch} = useData();
 const {videoId} = useParams();

 const findVideo=(videos,id)=>{
  return videos.find(video=>video.playId===id) 
}
 const viewVideo= findVideo(videos,videoId)

 
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
              <p> {viewVideo.views} views .  {viewVideo.timestamp}</p>
              <ThumbUpIcon onClick={likedButtonHandler} style={{margin:"0rem 0.5rem 0rem 4rem"}}/>
              <ThumbDownIcon style={{margin:"0.5rem"}}/>
              <WatchLaterIcon style={{margin:"0.5rem"}}/>
              <PlaylistAddIcon style={{margin:"0.5rem"}}/> 
             </div> 
             <div className="video-player-flex">
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

