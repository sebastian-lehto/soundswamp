import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <header className="w-full bg-forest-500/40 border-b border-vermilion shadow-moss backdrop-blur-sm relative z-10">
        <nav className="max-w-6xl mx-auto px-6 py-3">
        <ul className="flex items-center justify-between text-forest-200 font-medium tracking-wide">
            {/* Center title */}
            <li
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-2xl tracking-widest text-forest-700 hover:text-vermilion cursor-pointer select-none"
                onClick={() => navigate('/')}
                >
                SOUNDSWAMP
            </li>

            {/* Right controls */}
            <div className="flex items-center space-x-6">
            <li
                className="cursor-pointer text-forest-800 hover:text-vermilion transition-colors"
                onClick={() => navigate('/users')}
            >
                Users
            </li>
            <li
                className="cursor-pointer text-forest-800 hover:text-vermilion transition-colors absolute right-80"
                onClick={() => logout()}
            >
                Log Out
            </li>
            </div>
        </ul>
        </nav>

        {/* Bottom gradient underline */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-forest-800 via-vermilion/40 to-forest-800"></div>
    </header>
  );
};

export default NavBar;