import React from 'react'
import {useData} from '../Contexts/dataContext'
import {Nav} from './nav'
import { VideoCard } from './VideoCard';
import {Link} from 'react-router-dom'

export function VideoList() {

    const {state} =useData();
    return (
        <div >
            <Nav/>
          {state.videos.map((video)=>
            <Link to = {`/videos/${video.playId}`}>
              <VideoCard video={video} key={video.playId} />
            </Link>
            )}
          
        </div>
    )
}


