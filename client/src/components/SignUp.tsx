import { useState } from "react";
import "../App.css";
import "./styles.css";
import { useNavigate } from "react-router-dom";

interface Props {

}

const Signup: React.FC<Props> = () => {
    
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordAgain, setPasswordAgain] = useState<string>("");
    const navigate = useNavigate();
    
    const handleClick: any = (e:any) => {
        e.preventDefault()
        var data = {username, email, password}

        fetch('http://localhost:5000/auth/signup', {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token) 
                navigate("/login") 
            } else window.location.reload()
        })
        .catch((err) => {
            console.log('Error occurred', err);
            window.location.reload();
        })


    };

    return (
        <div className="App">
            <h2>Sign Up</h2>
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
                        <strong>Email: </strong>
                        <input 
                            type="text"
                            placeholder="Enter Email"
                            autoComplete="off"
                            className="username-input"
                            onChange={(e) => setEmail(e.target.value)}
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
                    <div className="login">
                        <strong>Password Again: </strong>
                        <input 
                            type="text"
                            placeholder="Enter Password Again"
                            autoComplete="off"
                            className="password-again-input"
                            onChange={(e) => setPasswordAgain(e.target.value)}
                            />
                    </div>
                    <div className="button">
                        <a type="submit" onClick={(e) => handleClick(e)}>Sign Up</a>
                    </div>
                    <div className="button" onClick={() => navigate("/login")}>
                        <p>Back To Log In</p>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Signup;