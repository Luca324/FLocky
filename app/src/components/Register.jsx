// components/Login.js
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { useState } from 'react';
import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';


function Register() {
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
    <div className="Register">
      <MyInput
        placeholder="your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <MyButton onClick={handleLogin}>Login</MyButton>
    </div>
  );
}

export default Register