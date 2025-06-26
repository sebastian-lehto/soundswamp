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
    const formData = new FormData()
    formData.append("file", fileList[0])

    fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      body: formData
    })
    .then((res) => console.log(res))
    .catch((err) => console.log('Error occurred', err))
  };

  useEffect(() => {
    fetch('http://localhost:5000/tracklist')
    .then(res => res.json())
    .then(data => {
      data.forEach((trackname: any) => {
        fetch(`http://localhost:5000/track?track=${trackname}`)
        .then(res => res.blob())
        .then(trackBlob => {
          const objectURL = URL.createObjectURL(trackBlob);
          const newTrack:Track = {id: Date.now(), file: objectURL, isPLaying: false, name: trackname}
          setTrack(newTrack);
        })
      });
    })
  }, []);
  
  useEffect(() => {
    if (track && !tracks.map(t => t.name).includes(track.name)) {
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
