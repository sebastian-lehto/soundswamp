
import { useNavigate } from 'react-router-dom';
import './styles.css';

interface Props {

}

const NavBar: React.FC<Props> = () => {
    const navigate = useNavigate();
    return (
        <div>
            <nav className="navbar">
                <ul className="nav">
                    <li className="navitem">X</li>
                    <li className="navitem">X</li>
                    <li className="navitem title" >SOUNDSWAMP</li>
                    <li className="navitem" onClick={() => navigate('/users')}>Users</li>
                    <li className="navitem">X</li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;