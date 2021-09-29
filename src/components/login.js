import React,{useState} from 'react';
import { Nav } from './nav';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core'
import {Link} from 'react-router-dom'
import {Visibility,VisibilityOff} from '@material-ui/icons';
import {validation} from '../util'

export const Login=()=>{
  const [showPassword,setShowPassword] = useState(false)
  const [email,setEmail]= useState("");
  const [password,setPassword] = useState("");
  const [error, setError] = useState("");
  const loginFormHandler=async(e)=>{
    e.preventDefault()
    if(validation(email,setError)){
      
    }
  }
  return(
        <>
        <Nav/>
        <h1>Login</h1>
        <form onSubmit={loginFormHandler} className="login"> 
        <TextField
          value={email}
          required
          id="outlined-required"
          label="enter E-mail"
          onChange={(e)=>setEmail(e.target.value)}
        />
        <small>{error}</small>
        <div className="text-password">
        <TextField
          required
          value={password}
          id="outlined-required"
          type={showPassword?"text":"password"}
          label="enter Password"
          onChange={(e)=>setPassword(e.target.value)}
        />
        <span onClick={()=>setShowPassword(prev=>!prev)}>{showPassword?<Visibility/>:<VisibilityOff/>}</span>
        </div>
        <Button type="submit" variant="contained" style={{margin:"2rem"}} className="submit-button" color="secondary">Login</Button>
        <small>Don't have an Account?</small>
        <Link  to="/signup"><Button variant="contained" className="submit-button" color="secondary">SignUp</Button> </Link>
        </form>
        </>
    )
}