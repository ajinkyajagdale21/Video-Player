import React from 'react'
import {useData} from '../Contexts/dataContext'
import {Nav} from './Nav'
import { VideoCard } from './VideoCard';
import {Sidebar} from './Sidebar';
import {Link} from 'react-router-dom'


export function VideoList() {
    const {state,loader} =useData();
    return (
      <div>
      <Nav/>
      <div className="video-grid">    
            <div>
              <Sidebar/>      
            </div>
            <div> 
            {loader ?<h1>Loading...</h1>: state.videos.map((video)=>
            <Link to = {`/videos/${video._id}`} key={video._id}>
              <VideoCard  video={video} />
            </Link>
            )}
            </div>
        </div>
        </div>
    )
}


