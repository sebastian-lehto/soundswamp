import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const data = { username, password };
    fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data.token) {
          login(data.token);
          navigate('/');
        } else {
          console.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
        window.location.reload();
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-forest-50 text-forest-100 px-6">
        <form
        onSubmit={handleSubmit}
        className="
            w-full max-w-md
            bg-forest-800/60 border border-forest-800
            rounded-2xl shadow-[0_0_25px_rgba(20,40,20,0.5)]
            p-8 space-y-6 backdrop-blur-md
        "
        >
        <h2 className="text-3xl font-display text-center text-forest-100 tracking-widest mb-6 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            Enter the Grove
        </h2>

        <div className="space-y-5">
            {/* Username Field */}
            <div className="flex flex-col">
            <label
                htmlFor="username"
                className="text-forest-200 font-medium mb-1 tracking-wide"
            >
                Username
            </label>
            <input
                id="username"
                type="text"
                placeholder="Whisper your name..."
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
                className="
                px-4 py-2 rounded-lg
                bg-forest-800/70 border border-forest-700
                text-forest-100 placeholder-forest-500
                focus:outline-none focus:ring-2 focus:ring-vermilion/60
                hover:border-vermilion transition-all
                shadow-inner
                "
            />
            </div>

            {/* Password Field */}
            <div className="flex flex-col">
            <label
                htmlFor="password"
                className="text-forest-200 font-medium mb-1 tracking-wide"
            >
                Password
            </label>
            <input
                id="password"
                type="password"
                placeholder="Secret of the woods..."
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                className="
                px-4 py-2 rounded-lg
                bg-forest-800/70 border border-forest-700
                text-forest-100 placeholder-forest-500
                focus:outline-none focus:ring-2 focus:ring-vermilion/60
                hover:border-vermilion transition-all
                shadow-inner
                "
            />
            </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col space-y-4 mt-6">
            <button
            type="submit"
            className="
                w-full bg-forest-600 hover:bg-forest-700 active:bg-forest-800
                border border-forest-700 hover:border-vermilion
                text-onyx font-bold py-3 rounded-full
                shadow-[0_0_15px_rgba(35,80,40,0.5)] transition-all
                hover:shadow-[0_0_25px_rgba(35,120,60,0.7)]
                focus:outline-none focus:ring-2 focus:ring-vermilion/60
            "
            >
            Log In
            </button>

            <button
            type="button"
            onClick={() => navigate('/signup')}
            className="
                w-full bg-transparent border border-forest-700
                hover:border-vermilion text-forest-300 hover:text-vermilion
                py-3 rounded-full transition-all
            "
            >
            To Sign Up
            </button>
        </div>
        </form>
    </div>
    );
};

export default Login;