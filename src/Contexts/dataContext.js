import React,{useState,useEffect} from 'react'
import { createContext,useReducer,useContext } from "react"
//import { data } from "../data";
import axios from 'axios';
import { reducer } from "../Reducers/DataReducer";
import { useAuth } from '../Contexts/authContext';


const DataContext= createContext();

const initialState={
    videos:[],
    notes:[],
    likedVideo:[],
    dislikedVideo:[],
    watchLater:[],
}

export const DataProvider=({children})=>{
    const [state, dispatch] = useReducer(reducer, initialState)
    const [width, setWidth]   = useState(window.innerWidth);
    const [toggleSidebar,setToggleSidebar] =useState(width>640?true:false);
    const [loader,setLoader]= useState(false)         
    const authState= useAuth()
    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);
    useEffect(()=>{
        (async()=>{
            try{
            setLoader(true);
            const {data:{videos}}= await axios.get(`https://swiftflix.herokuapp.com/videos`)
            setLoader(false);
            dispatch({type:'DATA',payload:videos})
            }
            catch(error){
                console.log({message:error.message})
            }
        })()
    },[])
    useEffect(()=>{
        if(authState.state.token){
        (async()=>{
          try{    
          const {data:{watchLater}}= await axios.get(`https://swiftflix.herokuapp.com/watchlater/${authState.state.userId}`)
          dispatch({type:'LOAD_WATCHLATER',payload:watchLater})
          }
          catch(error){
            console.log({message:error.message})
          }
        })()
    }
      },[authState.state.userId,authState.state.token,dispatch])
    return(
    <DataContext.Provider value={{state,dispatch,loader,toggleSidebar,setToggleSidebar,width}}>
     {children}
    </DataContext.Provider>        
    )
}

export const useData=()=>{
    return useContext(DataContext)
}