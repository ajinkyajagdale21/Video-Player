import './App.css';
import {Routes,Route} from 'react-router-dom';
import { VideoList } from './components/videoList';
import {Home} from './components/Home'

function App() {
 
  return (
    <div className="App">
    <Routes>
     
      <Route path="/" element={<Home/>} />
      <Route path="/products" element={<VideoList/>} />  
      
    </Routes>  
    </div>
  );
}

export default App;
