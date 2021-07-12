export const reducer=(state,action)=>{
   
    switch(action.type){
        case "ADD_NOTE": return {...state,notes:[...state.notes,{videoId:action.payload.id,note:action.payload.notes}]}
        default: return {state}
    }
}