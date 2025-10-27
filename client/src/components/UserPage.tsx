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
        headers: { Authorization: token },
      });
      const trackNames: string[] = await res.json();
      const trackPromises = trackNames.map(async (trackname) => {
        const blobRes = await fetch(`http://localhost:5000/tracks/track?track=${trackname}`, {
          headers: { Authorization: token },
        });
        const trackBlob = await blobRes.blob();
        return {
          id: Date.now() + Math.random(),
          file: URL.createObjectURL(trackBlob),
          isPlaying: false,
          name: trackname,
        } as Track;
      });
      const trackObjs = await Promise.all(trackPromises);
      setTracks(trackObjs);
    } catch (err) {
      setError("Failed to load tracks.");
      console.error("Error occurred", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/users/user/${id}`, {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((user) => setUser(user))
      .catch((err) => console.log(err.message));

    fetchTracks();
  }, []);

  return (
  <div
    className="
      min-h-screen
      bg-gradient-to-b from-forest-50 via-forest-100 to-onyx
      flex flex-col items-center px-6 pt-16 text-forest-200
    "
  >
    {/* Header */}
    <h1 className="text-4xl font-extrabold mb-8 tracking-wide text-forest-200 drop-shadow-md">
      User: {user?.username || "Unknown"}
    </h1>

    {/* Loading / Error */}
    {loading && (
      <div className="text-forest-300 italic mb-6">Loading tracks...</div>
    )}
    {error && (
      <div className="text-vermilion font-semibold mb-6">{error}</div>
    )}

    {/* Tracks List */}
    {!loading && !error && tracks.length > 0 && (
      <div
        className="
          w-full max-w-4xl
          bg-forest-100/80 border border-forest-200
          rounded-xl shadow-lg shadow-forest-50/40
          p-6 flex flex-col gap-4
          overflow-y-auto max-h-[70vh]
          scrollbar-thin scrollbar-thumb-forest-200 scrollbar-track-onyx/40
        "
      >
        <TrackList tracks={tracks} setTracks={setTracks} />
      </div>
    )}

    {/* No tracks message */}
    {!loading && !error && tracks.length === 0 && (
      <p className="text-forest-300 italic mt-4">
        This user hasn’t uploaded any tracks yet.
      </p>
    )}
  </div>
);
};

export default UserPage;