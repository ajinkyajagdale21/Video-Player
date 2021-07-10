import React from 'react';
import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom'

export function Home() {
    return (
        <div className="home">
            <h1 >Welcome To SWIFTFLIX</h1>
           <Link to = "/products" style= {{textDecoration: 'none'}}> <Button  variant="contained" color="secondary" size="large">Lets Go...</Button> </Link>
        </div>
    )
}

