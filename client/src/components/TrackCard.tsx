import React, { useEffect, useRef, useState } from "react";
import { Track } from "../model";
import {
  AiTwotonePlayCircle,
  AiTwotonePauseCircle,
  AiTwotoneDelete,
  AiTwotoneEdit,
  AiOutlineUndo,
} from "react-icons/ai";

interface Props {
  track: Track;
  tracks: Track[];
  setTracks: React.Dispatch<React.SetStateAction<Track[]>>;
}

const TrackCard: React.FC<Props> = ({ track, tracks, setTracks }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(track.name);
  const audioRef = useRef<HTMLAudioElement>(null);
  const token: string = localStorage.getItem("token") || "";

  const handlePlay = (id: number) => {
    if (!track.isPlaying) audioRef.current?.play();
    setTracks(
      tracks.map((track) =>
        track.id === id
          ? { ...track, isPlaying: !track.isPlaying }
          : { ...track, isPlaying: false }
      )
    );
  };

  useEffect(() => {
    if (!track.isPlaying) {
      audioRef.current?.pause();
      if (audioRef.current) audioRef.current.currentTime = 0;
    }
  }, [track.isPlaying]);

  const handleDelete = (id: number) => {
    setTracks(tracks.filter((track) => track.id !== id));
    const trackname = track.name;

    fetch("http://localhost:5000/tracks/track", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ trackname }),
    });
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTracks(
      tracks.map((track) =>
        track.id === id ? { ...track, name: editName } : track
      )
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditName(track.name);
    inputRef.current?.focus();
  }, [edit, track.name]);

  return (
    <form
      onSubmit={(e) => handleEdit(e, track.id)}
      id={track.isPlaying ? "trackPlaying" : ""}
      className={`group relative flex items-center justify-between gap-4 w-full max-w-xl 
        px-4 py-3 rounded-md border transition-all
        ${
          track.isPlaying
            ? "bg-forest-800/60 border-vermilion shadow-[0_0_15px_rgba(227,66,52,0.3)]"
            : "bg-forest-900/40 border-forest-800 hover:border-vermilion/60 hover:bg-forest-800/40"
        }`}
    >
      {/* Track name / edit input */}
      {edit ? (
        <input
          ref={inputRef}
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          className="flex-1 bg-transparent border-b border-forest-700 text-forest-100 
                     focus:outline-none focus:border-vermilion placeholder-forest-500"
        />
      ) : (
        <span
          className={`flex-1 truncate tracking-wide ${
            track.isPlaying
              ? "text-vermilion font-semibold"
              : "text-forest-200 group-hover:text-forest-100"
          }`}
        >
          {track.name}
        </span>
      )}

      {/* Audio element */}
      <audio ref={audioRef} src={track.file}></audio>

      {/* Control icons */}
      <div className="flex items-center space-x-3 text-xl">
        <span
          className="text-forest-400 hover:text-vermilion cursor-pointer transition-transform transform hover:scale-110"
          onClick={() => handlePlay(track.id)}
        >
          {track.isPlaying ? <AiTwotonePauseCircle /> : <AiTwotonePlayCircle />}
        </span>
        <span
          className="text-forest-500 hover:text-vermilion cursor-pointer transition-transform transform hover:scale-110"
          onClick={() => handleDelete(track.id)}
        >
          <AiTwotoneDelete />
        </span>
        <span
          className="text-forest-500 hover:text-forest-300 cursor-pointer transition-transform transform hover:scale-110"
          onClick={() => setEdit(!edit)}
        >
          {edit ? <AiOutlineUndo /> : <AiTwotoneEdit />}
        </span>
      </div>

      {/* Subtle green glow when active */}
      {track.isPlaying && (
        <div className="absolute inset-0 rounded-md blur-md bg-vermilion/10 -z-10"></div>
      )}
    </form>
  );
};

export default TrackCard;