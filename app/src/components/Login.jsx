// components/Login.js
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { useState } from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

import '../styles/Login.css'

function Login() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      dispatch(login(username));
      navigate('/');
    }
  };

  return (
    <div className="Login">
      <MyInput
        placeholder="your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <MyButton onClick={handleLogin}>Login</MyButton>
    </div>
  );
}

export default Login;