import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordAgain, setPasswordAgain] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (password !== passwordAgain) {
      alert('Passwords do not match');
      return;
    }

    const data = { username, email, password };

    fetch('http://localhost:5000/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          navigate('/login');
        } else {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error('Error occurred', err);
        window.location.reload();
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-forest-100 text-forest-100 px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-forest-900/40 border border-forest-800 rounded-lg shadow-moss p-8 space-y-6 backdrop-blur-sm"
      >
        <h2 className="text-2xl font-semibold text-center text-forest-200 tracking-wide mb-6">
          Join the Swamp
        </h2>

        <div className="space-y-4">
          {/* Username */}
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-forest-300 font-medium mb-1 tracking-wide"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Choose your call name..."
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
              className="px-3 py-2 rounded-md bg-forest-800/60 border border-forest-700 text-forest-100
                         placeholder-forest-500 focus:outline-none focus:ring-2 focus:ring-vermilion/50
                         hover:border-vermilion transition"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-forest-300 font-medium mb-1 tracking-wide"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Your echo in the woods..."
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              className="px-3 py-2 rounded-md bg-forest-800/60 border border-forest-700 text-forest-100
                         placeholder-forest-500 focus:outline-none focus:ring-2 focus:ring-vermilion/50
                         hover:border-vermilion transition"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-forest-300 font-medium mb-1 tracking-wide"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create your secret..."
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              className="px-3 py-2 rounded-md bg-forest-800/60 border border-forest-700 text-forest-100
                         placeholder-forest-500 focus:outline-none focus:ring-2 focus:ring-vermilion/50
                         hover:border-vermilion transition"
            />
          </div>

          {/* Password Again */}
          <div className="flex flex-col">
            <label
              htmlFor="passwordAgain"
              className="text-forest-300 font-medium mb-1 tracking-wide"
            >
              Confirm Password
            </label>
            <input
              id="passwordAgain"
              type="password"
              placeholder="Repeat your secret..."
              autoComplete="off"
              onChange={(e) => setPasswordAgain(e.target.value)}
              className="px-3 py-2 rounded-md bg-forest-800/60 border border-forest-700 text-forest-100
                         placeholder-forest-500 focus:outline-none focus:ring-2 focus:ring-vermilion/50
                         hover:border-vermilion transition"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col space-y-3 mt-6">
          <button
            type="submit"
            className="w-full bg-forest-600 hover:bg-forest-700 active:bg-forest-800 
                       border border-forest-700 hover:border-vermilion 
                       text-onyx font-semibold py-2 rounded-md shadow-[0_0_10px_rgba(35,150,85,0.3)]
                       focus:outline-none focus:ring-2 focus:ring-vermilion/50 transition-all"
          >
            Sign Up
          </button>

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full bg-transparent border border-forest-700 hover:border-vermilion 
                       text-forest-300 hover:text-vermilion py-2 rounded-md transition-all"
          >
            To Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;