import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Website/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Users from './pages/Dashbord/Users';
import GoogleCallBack from './pages/Auth/GoogleCallBack';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/users' element={<Users/>}></Route>
        <Route path='/auth/google/callback' element={<GoogleCallBack/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
