import React from 'react'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router';
import {useData} from '../Contexts/dataContext'
import { Nav } from './nav';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';



export function VideoPlayer() {
 const [input,setInput] = React.useState("");
 const {state:{videos,notes}} = useData();
 const {videoId} = useParams();

 const findVideo=(videos,id)=>{
  return videos.find(video=>video.playId===id) 
}
 const viewVideo= findVideo(videos,videoId)

 
const submitForm=(e)=>{
  e.preventDefault();
  console.log(input)
  setInput("");
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
              <ThumbUpIcon style={{margin:"0rem 0.5rem 0rem 4rem"}}/>
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
        <Button variant="contained" type="submit" color="secondary">ADD</Button>
       </form>
       {notes.map(note=>
        note.videoId===videoId && 
       <Card style={{margin:"1rem"}}>
        <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
           
             {note.note}
           
          </Typography>
        </CardContent>
      </CardActionArea>
      </Card>

    )}
       </div>        
      </div>
  </>)
}

