import React from 'react';
import { Nav } from './Nav';
import { useAuth } from '../Contexts/authContext';
import { setupAuthHeaderForServiceCalls } from '../util';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';

export const User=()=>{
    const {state:{name},authDispatch}= useAuth();
    const navigate= useNavigate()
    const logoutHandler=()=>{
        authDispatch({type:"LOGOUT"})
        localStorage.removeItem("userDetails");
        setupAuthHeaderForServiceCalls(null);
        navigate('/videos')
    }
    return(
        <> 
            <Nav/>
            <h1>Welcome {name}!!</h1>
            <Button onClick={logoutHandler}  variant="contained" color="secondary" size="large">LOGOUT</Button>
        </>
    )
}
