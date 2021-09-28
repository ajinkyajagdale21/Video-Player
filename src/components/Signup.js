import React, { useState } from 'react';
import { Nav } from './nav';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {Visibility,VisibilityOff} from '@material-ui/icons';


export const Signup=()=>{
    const [showPassword,setShowPassword]= useState(false)
    const [showConfirmPassword,setShowConfirmPassword]= useState(false)
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
        <div className="text-password">
        <TextField
          required
          id="outlined-required"
          type={showPassword?"text":"password"}
          label="enter Password"
        />
         <span onClick={()=>setShowPassword(prev=>!prev)}>{showPassword?<Visibility/>:<VisibilityOff/>}</span>
        </div>
        <div className="text-password">
        <TextField
          required
          id="outlined-required"
          type={showConfirmPassword?"text":"password"}
          label=" Re-enter Password"
        />
        <span onClick={()=>setShowConfirmPassword(prev=>!prev)}>{showConfirmPassword?<Visibility/>:<VisibilityOff/>}</span>
        </div>
        <Button variant="contained" style={{margin:"2rem"}} color="secondary">Sign up</Button>
        <small>Already have an Account?</small>
        <Link  to="/login"><Button variant="contained" className="submit-button" color="secondary">login</Button> </Link>
        </form>
        </>
    )
}