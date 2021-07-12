import { createContext,useReducer,useContext } from "react"
import { data } from "../data";
import { reducer } from "../Reducers/DataReducer";

const DataContext= createContext();

const initialState={
    videos:data(),
    notes:[{videoId:"sDFr2Yzd-8s",note:"Type to add note"},{videoId:"GS1Xc0XjoJ8",note:"football"}]
}


export const DataProvider=({children})=>{
    const [state, dispatch] = useReducer(reducer, initialState)
    return(
    <DataContext.Provider value={{state,dispatch}}>
     {children}
    </DataContext.Provider>        
    )
}

export const useData=()=>{
    return useContext(DataContext)
}