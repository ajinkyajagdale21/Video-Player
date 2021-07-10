import React from 'react'
import {useData} from '../Contexts/dataContext'
import {Nav} from './nav'
import { VideoCard } from './VideoCard';

export function VideoList() {

    const {state} =useData();
    return (
        <div >
            <Nav/>
            {state.videos.map((video)=>
              <VideoCard video={video} key={video.playId} />
            )}
        </div>
    )
}


