import { useState } from "react";
import "../App.css";
import "./styles.css";
import { redirect, useNavigate } from "react-router-dom";




interface Props {

}
const Login: React.FC<Props> = () => {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const navigate = useNavigate();

    const handleClick: any = (e:MouseEvent) => {
        e.preventDefault();

        const data = {username, password};
        fetch('http://localhost:5000/user', {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((data) => {
          if (data.username) navigate("/");
        })
        .catch((err) => {
            console.log('Error occurred', err)
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
                    <div className="login submit">
                        <button type="submit" onClick={(e) => handleClick(e)}>Log In</button>

                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;