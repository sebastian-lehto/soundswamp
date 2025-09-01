import { Track, User } from "../model";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TrackList from "./TrackList";

const UserPage: React.FC = () => {

  const { id } = useParams();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [user, setUser] = useState<User>();
  const token: string = localStorage.getItem("token") || "";

  useEffect(() => {
    setTracks([]);

    fetch(`http://localhost:5000/users/user/${id}`, {
      headers: { 'Authorization': token }
    })
      .then(res => res.json())
      .then((user) => {
        setUser(user)
      })
      .catch(err => console.log(err.message))

    fetch(`http://localhost:5000/tracks/tracksFor/${id}`, {
      headers: { 'Authorization': token }
    })
      .then(res => res.json())
      .then(data => {
        data.forEach((track: Track) => {
          fetch(`http://localhost:5000/tracks/track?track=${track.name}`, {
            headers: { 'Authorization': token },
          })
            .then(res => res.blob())
            .then(trackBlob => {
              const objectURL = URL.createObjectURL(trackBlob);
              const newTrack: Track = { id: Date.now(), file: objectURL, isPlaying: false, name: track.name }
              setTracks(tracks => [newTrack, ...tracks]);
            })
        });
      })
      .catch(err => console.log(err.message))
  }, []);

  return (
    <div className="App">
      <h1>User: {user?.username}</h1>
      <div className='tracklist'>
        <TrackList tracks={tracks} setTracks={setTracks} />
      </div>
    </div>
  )

}

export default UserPage;