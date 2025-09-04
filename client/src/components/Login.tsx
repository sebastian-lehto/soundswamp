import { useState, FormEvent } from "react";
import "../App.css";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";




interface Props {

}
const Login: React.FC<Props> = () => {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit: (e: FormEvent) => void = (e: FormEvent) => {
        e.preventDefault();

        const data = { username, password };
        fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then(async (data) => {
                if (data.token) {
                    login(data.token);
                    navigate("/");
                } else {
                    console.error(data.message);
                }
            })
            .catch((err) => {
                console.log(err.message);
                window.location.reload();
            });
    }



    return (
        <div className="App">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
                <div className="login-container">
                    <div className="login">
                        <strong>Username: </strong>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            autoComplete="off"
                            className="username-input"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="login">
                        <strong>Password: </strong>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            className="password-input"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="button">
                        <button type="submit">Log In</button>
                    </div>
                    <div className="button">
                        <button onClick={() => navigate("/signup")}>To Sign Up</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;