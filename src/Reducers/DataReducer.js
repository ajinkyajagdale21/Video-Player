export const reducer=(state,action)=>{
   
    switch(action.type){
        case "ADD_NOTE": return {...state,notes:[...state.notes,{videoId:action.payload.id,note:action.payload.notes}]}
        case "DELETE_NOTE": return{...state,notes:[state.notes.filter(note=>note.playId!==action.payload)]}
        case "VIDEO_LIKED": return {...state,likedVideo:[...state.likedVideo,action.payload]}
        default: return {state}
    }
}