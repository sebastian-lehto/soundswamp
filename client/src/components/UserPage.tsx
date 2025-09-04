import { Track, User } from "../model";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TrackList from "./TrackList";

const UserPage: React.FC = () => {

  const { id } = useParams();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token: string = localStorage.getItem("token") || "";

  const fetchTracks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:5000/tracks/tracklist/${id}`, {
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

  useEffect(() => {
    fetch(`http://localhost:5000/users/user/${id}`, {
      headers: { 'Authorization': token }
    })
      .then(res => res.json())
      .then((user) => {
        setUser(user)
      })
      .catch(err => console.log(err.message))

    fetchTracks();
  }, []);

  return (
    <div className="App">
      <h1>User: {user?.username}</h1>
      <div className='tracklist'>
        {loading && <div>Loading tracks...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {!loading && !error && <TrackList tracks={tracks} setTracks={setTracks} />}
      </div>
    </div>
  )

}

export default UserPage;