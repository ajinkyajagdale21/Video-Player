import React,{useState} from 'react';
import { Nav } from './nav';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {Visibility,VisibilityOff} from '@material-ui/icons';

export const Login=()=>{
  const [showPassword,setShowPassword] = useState(false)
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
        <div class="text-password">
        <TextField
          required
          id="outlined-required"
          type={showPassword?"text":"password"}
          label="enter Password"
        />
        <span onClick={()=>setShowPassword(prev=>!prev)}>{showPassword?<Visibility/>:<VisibilityOff/>}</span>
        </div>
        <Button variant="contained" style={{margin:"2rem"}} className="submit-button" color="secondary">Login</Button>
        <small>Don't have an Account?</small>
        <Link  to="/signup"><Button variant="contained" className="submit-button" color="secondary">SignUp</Button> </Link>
        </form>
        </>
    )
}