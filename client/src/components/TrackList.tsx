import React from "react";
import { Track } from "../model";
import TrackCard from "./TrackCard";

interface Props {
  tracks: Track[];
  setTracks: React.Dispatch<React.SetStateAction<Track[]>>;
}

const TrackList: React.FC<Props> = ({ tracks, setTracks }) => {
  return (
    <div
      className="
        w-full flex flex-col items-center justify-start
        gap-4 py-8 px-4
        bg-gradient-to-b from-forest-950 via-onyx to-forest-900/60
        rounded-md border border-forest-900/50
        shadow-inner shadow-forest-800/30
        backdrop-blur-sm
        overflow-y-auto max-h-[70vh]
        scrollbar-thin scrollbar-thumb-forest-700 scrollbar-track-onyx/50
      "
    >
      {tracks.length === 0 ? (
        <p className="text-forest-400 italic text-sm">The swamp is silent...</p>
      ) : (
        tracks.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            tracks={tracks}
            setTracks={setTracks}
          />
        ))
      )}
    </div>
  );
};

export default TrackList;