import React,{useState} from 'react';
import { Nav } from './nav';
import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core'
import {Link, useNavigate} from 'react-router-dom'
import {Visibility,VisibilityOff} from '@material-ui/icons';
import {validation} from '../util'
import axios from 'axios';
import {useAuth} from '../Contexts/authContext'
import { setupAuthHeaderForServiceCalls } from '../util';

export const Login=()=>{
  const [showPassword,setShowPassword] = useState(false)
  const [email,setEmail]= useState("");
  const [password,setPassword] = useState("");
  const [error, setError] = useState("");
  const {authDispatch} = useAuth();
  const navigate = useNavigate();
  
  const loginFormHandler=async(e)=>{
    e.preventDefault()
    if(validation(email,setError)){
      try{
        const {data:{name,token,userId},status} = await axios.post(`https://swiftflix.herokuapp.com/auth/login`,{email,password})
        if(status===200){
          authDispatch({type:'LOGIN',payload:{name,token,userId}})
          localStorage?.setItem("userDetails",JSON.stringify({name,token,userId,login:true}))
          setupAuthHeaderForServiceCalls(token);
          navigate("/videos")
        }
      }
      catch(error){
        console.log(error.response);
      }
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