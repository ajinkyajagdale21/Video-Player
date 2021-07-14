import './App.css';
import {Routes,Route} from 'react-router-dom';
import { VideoList } from './components/videoList';
import {Home} from './components/Home'
import {VideoPlayer} from './components/VideoPlayer'
import { WatchLater } from './components/WatchLater';

function App() {
 
  return (
    <div className="App">
    <Routes>
     
      <Route path="/" element={<Home/>} />
      <Route path="/videos" element={<VideoList/>} />  
      <Route path="/videos/:videoId" element={<VideoPlayer/>} />
      <Route path="/watchlater" element={<WatchLater/>}/>
    </Routes>  
    </div>
  );
}

export default App;
