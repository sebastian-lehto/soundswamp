import { useNavigate } from "react-router-dom";
import { User } from "../model";
import { FaUserAstronaut } from "react-icons/fa6";

interface Props {
  data: User;
}

const UserCard: React.FC<Props> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
        onClick={() => navigate(`/user/${data.id}`)}
        className="
        group flex items-center gap-4 px-5 py-3 w-full max-w-sm
        bg-forest-600/40 border border-forest-800 rounded-md
        text-forest-200 cursor-pointer select-none
        hover:bg-forest-800/50 hover:border-vermilion/60
        transition-all duration-300
        shadow-inner shadow-forest-950/40
        hover:shadow-[0_0_10px_rgba(227,66,52,0.25)]
        "
    >
        {/* Icon */}
        <FaUserAstronaut
        className="
            text-2xl text-forest-500
            group-hover:text-vermilion
            transition-transform duration-300
            transform group-hover:scale-110
        "
        />

        {/* Username */}
        <p
        className="
            text-lg font-medium tracking-wide
            group-hover:text-vermilion
            transition-colors duration-300
        "
        >
        {data.username}
        </p>
    </div>
    );
};

export default UserCard;