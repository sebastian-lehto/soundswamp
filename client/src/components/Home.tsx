import '../App.css';
import { useState, useEffect } from 'react';
import AudioUploader from './AudioUploader';
import { Track } from '../model';
import TrackList from './TrackList';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [track, setTrack] = useState<Track>();
  const [tracks, setTracks] = useState<Track[]>([]);
  const token:string = localStorage.getItem("token") || "";
  const navigate = useNavigate();

  const handleChange = (fileList:any) => {
    const formData = new FormData()
    formData.append("file", fileList[0])
    fetch('http://localhost:5000/api/upload', {
      method: 'POST',
      headers: {'Authorization': token},
      body: formData
    })
    .then((res) => console.log(res))
    .catch((err) => console.log('Error occurred', err))
  };

  useEffect(() => {
    setTracks([]);
    fetch('http://localhost:5000/tracks/tracklist', {
      headers: {'Authorization': token}
    })
    .then(res => res.json())
    .then(data => {
      data.forEach((trackname: string) => {
        fetch(`http://localhost:5000/tracks/track?track=${trackname}`, {
          headers: {'Authorization': token},
        })
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
  }, [track, tracks]);

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

export default Home;