export const reducer=(state,action)=>{
   
    switch(action.type){
        case "ADD_NOTE": return {...state,notes:[...state.notes,{videoId:action.payload.id,note:action.payload.notes}]}
        case "DELETE_NOTE": return{...state,notes:[state.notes.filter(note=>note.playId!==action.payload)]}
        case "VIDEO_LIKED": return {...state,likedVideo:[...state.likedVideo,action.payload]}
        case "VIDEO_DISLIKED": return {...state,likedVideo:state.likedVideo.filter(video=>video.playId!==action.payload)}
        case "DISLIKED_VIDEO": return{...state,dislikedVideo:[...state.dislikedVideo,action.payload]}
        case "REMOVE_DISLIKED_VIDEO": return {...state,dislikedVideo:state.dislikedVideo.filter(video=>video.playId!==action.payload)}
        case "WATCH_LATER": return {...state,watchLater:[...state.watchLater,action.payload]}
        case "REMOVE_WATCH_LATER": return {...state,watchLater:state.watchLater.filter(video=>video.playId!==action.payload)}
        default: return {state}
    }
}