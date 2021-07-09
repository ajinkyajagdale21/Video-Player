import './App.css';
import {useData} from './Contexts/dataContext'

function App() {
  const {state} =useData();
  console.log(state)
  return (
    <div className="App">
      <h1>Video Library</h1>
      {state.videos.map(({playId,thumbnail,title,channel,views,timestamps})=>
        <>
          <img src={thumbnail} alt="thumbnail"/>
          { title} 
          {channel}
          {views}
          {timestamps}
        </>
      )}
    </div>
  );
}

export default App;
