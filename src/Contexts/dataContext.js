import React,{useState,useEffect} from 'react'
import { createContext,useReducer,useContext } from "react"
import { data } from "../data";
import { reducer } from "../Reducers/DataReducer";

const DataContext= createContext();

const initialState={
    videos:data(),
    notes:[],
    likedVideo:[],
    dislikedVideo:[],
    watchLater:[],
}



export const DataProvider=({children})=>{
    const [state, dispatch] = useReducer(reducer, initialState)
    const [width, setWidth]   = useState(window.innerWidth);
    const [toggleSidebar,setToggleSidebar] =useState(width>640?true:false);
             
    const updateDimensions = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);
    return(
    <DataContext.Provider value={{state,dispatch,toggleSidebar,setToggleSidebar,width}}>
     {children}
    </DataContext.Provider>        
    )
}

export const useData=()=>{
    return useContext(DataContext)
}