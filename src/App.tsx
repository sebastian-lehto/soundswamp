import './App.css';
import { useState, useEffect } from "react";
import AudioUploader from './components/AudioUploader';
import { Track } from './model';


const App: React.FC = () => {
  const [track, setTrack] = useState<Track>();
  const [tracks, setTracks] = useState<Track[]>([]);

  const handleChange = (fileList:any) => {
    const newTrack:Track = {id: Date.now(), file: fileList[0], name: fileList[0].name}
    setTrack(newTrack);
  };

  useEffect(() => {
    if (track) {
      setTracks([track, ...tracks])
    }
  }, [track]);

  return (
    <div className="App">
      <span className='heading'>soundswamp</span>
      <AudioUploader handleChange={handleChange}/>
      <p>{track ? `File name: ${track.file.name}` : "no files uploaded yet"}</p>
      <div className='tracklist'>
        <ul>{tracks.map(track => <li>{track.name}</li>)}</ul>
      </div>
    </div>
  );
}

export default App;
