export const reducer=(state,action)=>{
   
    switch(action.type){
        case "DATA": return{...state,videos:action.payload}
        case 'LOAD_LIKEDVIDEOS': return {...state,likedVideo:action.payload}
        case 'LOAD_WATCHLATER': return {...state,watchLater:action.payload}
        case "ADD_NOTE": return {...state,notes:[...state.notes,{videoId:action.payload.id,note:action.payload.notes}]}
        case "DELETE_NOTE": return{...state,notes:[state.notes.filter(note=>note.playId!==action.payload)]}
        case "VIDEO_LIKED": return {...state,likedVideo:[...state.likedVideo,action.payload]}
        case "VIDEO_DISLIKED": return {...state,likedVideo:state.likedVideo.filter(video=>video._id!==action.payload)}
        case "ADD_TO_DISLIKED_VIDEO": return{...state,dislikedVideo:[...state.dislikedVideo,action.payload]}
        case "REMOVE_FROM_DISLIKED_VIDEO": return {...state,dislikedVideo:state.dislikedVideo.filter(video=>video._id!==action.payload)}
        case "WATCH_LATER": return {...state,watchLater:[...state.watchLater,action.payload]}
        case "REMOVE_WATCH_LATER": return {...state,watchLater:state.watchLater.filter(video=>video._id!==action.payload)}
        default: return {state}
    }
}