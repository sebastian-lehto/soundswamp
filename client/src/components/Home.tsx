import '../App.css';
import { useState, useEffect } from 'react';
import AudioUploader from './AudioUploader';
import { Track } from '../model';
import TrackList from './TrackList';
import NavBar from './NavBar';

const Home: React.FC = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token: string = localStorage.getItem("token") || "";

  const fetchTracks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/tracks/tracklist', {
        headers: { 'Authorization': token }
      });
      const trackNames: string[] = await res.json();
      const trackPromises = trackNames.map(async (trackname) => {
        const blobRes = await fetch(`http://localhost:5000/tracks/track?track=${trackname}`, {
          headers: { 'Authorization': token },
        });
        const trackBlob = await blobRes.blob();
        return {
          id: Date.now() + Math.random(), // Temporary ID generation
          file: URL.createObjectURL(trackBlob),
          isPlaying: false,
          name: trackname
        } as Track;
      });
      const trackObjs = await Promise.all(trackPromises);
      setTracks([]);
      setTracks(trackObjs);
    } catch (err) {
      setError('Failed to load tracks.');
      console.error('Error occurred', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (fileList: FileList) => {
    if (!fileList.length) return;
    const formData = new FormData();
    const name = fileList[0].name;
    formData.append("file", fileList[0]);
    formData.append("name", name);
    try {
      await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: { 'Authorization': token },
        body: formData
      });
      fetchTracks(); // Refresh track list
    } catch (err) {
      console.error('Error occurred', err);
    }
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  return (
    <div className="App">
      <NavBar />
      <AudioUploader handleChange={handleChange} />
      <div className='tracklist'>
        {loading && <div>Loading tracks...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {!loading && !error && <TrackList tracks={tracks} setTracks={setTracks} />}
      </div>
    </div>
  );
}

export default Home;