import React from "react";
import { Track } from "../model";
import './styles.css'
import TrackCard from "./TrackCard";


interface Props {
    tracks: Track[];
}

const TrackList:React.FC<Props> = ({tracks}) => {
    return (
        <div className="tracklist">
            {tracks.map((track) => (
                <TrackCard track={track}/>
            ))}
        </div>
    );
}

export default TrackList;