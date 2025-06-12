import React from "react";
import { Track } from "../model";
import './styles.css';
import { AiTwotonePlayCircle, AiOutlineDelete } from "react-icons/ai";


interface Props {
    track: Track;
}

const TrackCard:React.FC<Props> = ({track}) => {
    return (
        <form className="trackcard">
            <span className="trackname">{track.name}</span>
            <div>
                <span className="icon">
                    <AiTwotonePlayCircle />
                </span>
                <span className="icon">
                    <AiOutlineDelete />
                </span>
            </div>
        </form>
    );
};

export default TrackCard;