import React from 'react';
import { Nav } from './nav';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'

export const Login=()=>{
    return(
        <>
        <Nav/>
        <h1>Login</h1>
        <form className="login"> 
        <TextField
          required
          id="outlined-required"
          label="enter E-mail"
        />
        <div>
        <TextField
          required
          id="outlined-required"
          label="enter Password"
        />

        </div>
        <Button variant="contained" style={{margin:"2rem"}} className="submit-button" color="secondary">Login</Button>
        <small>Don't have an Account?</small>
        <Link  to="/signup"><Button variant="contained" className="submit-button" color="secondary">SignUp</Button> </Link>
        </form>
        </>
    )
}