import './App.css';
import {Routes,Route} from 'react-router-dom';
import { VideoList } from './components/videoList';
import {Home} from './components/Home'
import {VideoPlayer} from './components/VideoPlayer'
import { WatchLater } from './components/WatchLater';
import { LikedVideo } from './components/LikedVideo';
import {User} from './components/User'
import { Login } from './components/login';
import {Signup} from './components/Signup';
import {PrivateRoute} from './util';
function App() {
 
  return (
    <div className="App">
    <Routes>
     
      <Route path="/" element={<Home/>} />
      <Route path="/videos" element={<VideoList/>} />  
      <Route path="/videos/:videoId" element={<VideoPlayer/>} />
      <PrivateRoute path="/watchlater" element={<WatchLater/>}/>
      <PrivateRoute path="/likedvideos" element={<LikedVideo/>}/>
      <Route path="/user" element={<User/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>} />
    </Routes>  
    </div>
  );
}

export default App;
