import React from 'react';
import { Nav } from './nav';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'

export const Signup=()=>{
    return(
        <>
        <Nav/>
        <h1>signup</h1>
        <form className="login"> 
        <TextField
          required
          id="outlined-required"
          label="enter FirstName"
        />
        <TextField
          required
          id="outlined-required"
          label="enter LastName"
        />
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
        <div>
        <TextField
          required
          id="outlined-required"
          label=" Re-enter Password"
        />
        </div>
        <Button variant="contained" style={{margin:"2rem"}} color="secondary">Sign up</Button>
        <small>Already have an Account?</small>
        <Link  to="/login"><Button variant="contained" className="submit-button" color="secondary">login</Button> </Link>
        </form>
        </>
    )
}