
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { useAuth } from '../auth/useAuth';

interface Props {

}

const NavBar: React.FC<Props> = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    return (
        <div>
            <nav className="navbar">
                <ul className="nav">
                    <li className="navitem">X</li>
                    <li className="navitem">X</li>
                    <li className="navitem title" >SOUNDSWAMP</li>
                    <li className="navitem" onClick={() => navigate('/users')}>Users</li>
                    <li className="navitem" onClick={() => { logout() }}>Log Out</li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;