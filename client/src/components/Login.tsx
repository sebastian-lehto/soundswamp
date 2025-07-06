import { useState, MouseEvent } from "react";
import "../App.css";
import "./styles.css";
import { useNavigate } from "react-router-dom";




interface Props {

}
const Login: React.FC<Props> = () => {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const navigate = useNavigate();

    const handleClick: (e: MouseEvent) => void = (e: MouseEvent) => {
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
                    await localStorage.setItem('token', data.token);
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
            <form>
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
                            type="text"
                            placeholder="Enter Password"
                            autoComplete="off"
                            className="password-input"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="button">
                        <a type="submit" onClick={(e) => handleClick(e)}>Log In</a>
                    </div>
                    <div className="button" onClick={() => navigate("/signup")}>
                        <p>Back To Sign Up</p>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;