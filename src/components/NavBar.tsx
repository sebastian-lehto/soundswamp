
import './styles.css';

interface Props {

}

const NavBar: React.FC<Props> = () => {
    return (
        <div>
            <nav className="navbar">
                <ul className="nav">
                    <li className="navitem">X</li>
                    <li className="navitem">X</li>
                    <li className="navitem title" >SOUNDSWAMP</li>
                    <li className="navitem">X</li>
                    <li className="navitem">X</li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;