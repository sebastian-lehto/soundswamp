import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './components/Home';
import Signup from './components/SignUp';
import Login from './components/Login';

const App: React.FC = () => {
  // token not updated after login/signup before redirect to signup
  let token: () => string = () => localStorage.getItem("token") || "";

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={token() ? <Home /> : <Navigate to="/signup" />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
