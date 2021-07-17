import React from 'react'
import { Nav } from './nav'
import { Sidebar } from './Sidebar'

export function Playlists() {
    return (
        <>
        <Nav/>
        <div className="video-grid">
            <div>
                <Sidebar/>
            </div>
            <div>
                Coming soon.....
            </div>
        </div>
        </>
    )
} 