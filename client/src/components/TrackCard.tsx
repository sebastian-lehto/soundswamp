import React, { useEffect, useRef, useState } from "react";
import { Track } from "../model";
import './styles.css';
import { AiTwotonePlayCircle, AiTwotonePauseCircle, AiTwotoneDelete, AiTwotoneEdit, AiOutlineUndo } from "react-icons/ai";


interface Props {
    track: Track;
    tracks: Track[];
    setTracks: React.Dispatch<React.SetStateAction<Track[]>>;
}

const TrackCard:React.FC<Props> = ({track, tracks, setTracks}) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editName, setEditName] = useState<string>(track.name);
    const audioRef = useRef<HTMLAudioElement>(null);

    const handlePlay = (id: number) => {
        if (!track.isPLaying) audioRef.current?.play();
        setTracks(tracks.map((track) => 
            track.id === id ? {...track, isPLaying: !track.isPLaying} : {...track, isPLaying: false})
        )
        
    }
    useEffect(() => {
        if (!track.isPLaying) {
            audioRef.current?.pause()
            if (audioRef.current) audioRef.current.currentTime = 0;
        }
    }, [track.isPLaying])

    const handleDelete = (id: number) => {
        setTracks(tracks.filter((track) => track.id !== id))
    }
    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTracks(
            tracks.map((track) => track.id === id ? {...track, name: editName} : track)
        );
        setEdit(false)
    }

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => { 
        setEditName(track.name)
        inputRef.current?.focus()
    }, [edit, track.name]);

    return (
        <form className="trackcard" id={track.isPLaying ? "trackPlaying" : ""} onSubmit={(e) => handleEdit(e, track.id)}>
            {edit ? (
                <input 
                    ref= {inputRef}
                    className="trackedit" 
                    value={editName} 
                    onChange={(e) => setEditName(e.target.value)}
                />
            ) : (
                <span className="trackname">{track.name}</span>
            )}
            <audio ref={audioRef} src={track.file}></audio>
            <span className="icon" onClick={() => handlePlay(track.id)}>
                {track.isPLaying ? <AiTwotonePauseCircle /> : <AiTwotonePlayCircle />}
            </span>
            <span className="icon" onClick={() => handleDelete(track.id)}>
                <AiTwotoneDelete />
            </span>
            <span className="icon" onClick={() => setEdit(!edit)}>
                {edit ? <AiOutlineUndo /> : <AiTwotoneEdit />}
            </span>                       
        </form>
    );
};

export default TrackCard;