import { Navigate, useNavigate } from "react-router-dom";
import { User } from "../model";
import './styles.css';

interface Props {
    data: User;
}

const UserCard: React.FC<Props> = ({ data }) => {
    const navigate = useNavigate();
    return (
        <div className="usercard">
            <p onClick={() => navigate(`/user/${data.id}`)}>{data.username}</p>
        </div>

    )
}

export default UserCard;