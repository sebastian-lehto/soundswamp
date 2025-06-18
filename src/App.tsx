import './App.css';
import { useState, useEffect } from "react";
import AudioUploader from './components/AudioUploader';
import { Track } from './model';
import TrackList from './components/TrackList';
import NavBar from './components/NavBar';


const App: React.FC = () => {
  const [track, setTrack] = useState<Track>();
  const [tracks, setTracks] = useState<Track[]>([]);

  const handleChange = (fileList:any) => {
    const newTrack:Track = {id: Date.now(), file: fileList[0], isPLaying: false, name: fileList[0].name}
    setTrack(newTrack);
  };

  useEffect(() => {
    if (track) {
      setTracks(t => [track, ...t])
    }
  }, [track]);

  return (
    <div className="App">
      <NavBar></NavBar>
      <AudioUploader handleChange={handleChange}/>
      <div className='tracklist'>
        <TrackList tracks={tracks} setTracks={setTracks}/>
      </div>
    </div>
  );
}

export default App;
