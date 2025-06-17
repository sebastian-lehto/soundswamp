import React from "react";
import { Track } from "../model";
import './styles.css'
import TrackCard from "./TrackCard";


interface Props {
    tracks: Track[];
    setTracks: React.Dispatch<React.SetStateAction<Track[]>>;
}

const TrackList:React.FC<Props> = ({tracks, setTracks}) => {
    return (
        <div className="tracklist">
            {tracks.map((track) => (
                <TrackCard track={track} tracks={tracks} setTracks={setTracks}/>
            ))}
        </div>
    );
}

export default TrackList;