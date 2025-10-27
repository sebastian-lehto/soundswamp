import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { Track } from '../model';

const Home: React.FC = () => {
  const [track, setTrack] = useState<Track | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token: string = localStorage.getItem('token') || '';

  const fetchRandomTrack = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/tracks/random', {
        headers: { Authorization: token },
      });

      if (!res.ok) throw new Error('Failed to fetch random track');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const newTrack: Track = {
        id: Date.now(),
        file: url,
        isPlaying: false,
        name: 'Random Track',
      };

      setTrack(newTrack);
    } catch (err) {
      console.error('Error fetching random track:', err);
      setError('Failed to load track.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRandomTrack();
  }, []);

  return (
    <div className="min-h-screen bg-forest-50 text-forest-100 flex flex-col">
      <NavBar />

      <div className="flex flex-col items-center justify-start flex-grow px-6 pt-20 space-y-10">
        {/* Header */}
        {/* <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-lg ">
          SOUNDSWAMP
        </h1> */}

        {/* Button */}
        <div className="relative">
          <button
            onClick={fetchRandomTrack}
            disabled={loading}
            className={`
              px-8 py-3 rounded-full font-bold uppercase tracking-wider transition-all
              ${loading
                ? 'bg-forest-300/50 text-forest-300 cursor-not-allowed'
                : 'bg-forest-300 hover:bg-forest-400 active:bg-forest-50 text-forest-50 shadow-[0_0_15px_rgba(20,60,20,0.4)]'}
              border-2 border-forest-100 hover:border-vermilion
              focus:outline-none focus:ring-2 focus:ring-vermilion/50
            `}
          >
            {loading ? 'Gathering Tracks from the Woods...' : 'Summon a Random Track'}
          </button>
          {!loading && (
            <div className="absolute inset-0 rounded-full blur-sm bg-forest-100/20 -z-10"></div>
          )}
        </div>

        {/* Track Player */}
        <div className="w-full max-w-md bg-forest-100/80 border border-forest-600 rounded-3xl shadow-lg p-6 backdrop-blur-sm">
          {error && <p className="text-vermilion font-medium mb-3">{error}</p>}

          {track && !loading ? (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-vermilion text-lg tracking-wide">{track.name}</p>
              <audio
                controls
                src={track.file}
                className="w-full accent-vermilion bg-forest-200 rounded-md"
              />
            </div>
          ) : (
            !error && (
              <p className="text-forest-300 italic text-sm text-center">
                Waiting for the forest to whisper a tune...
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;