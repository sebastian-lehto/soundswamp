import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './auth/AuthProvider';
import PrivateRoute from './routes/PrivateRoute';
import Home from './components/Home';
import Signup from './components/SignUp';
import Login from './components/Login';
import UserList from './components/UserList';
import UserPage from './components/UserPage';

const App: React.FC = () => {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path="/" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
          <Route path='/users' element={
            <PrivateRoute>
              <UserList />
            </PrivateRoute>
          } />
          <Route path='/user/:id' element={
            <PrivateRoute>
              <UserPage />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
