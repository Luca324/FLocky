// components/Login.js
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { useState } from 'react';
import MyButton from './UI/button/MyButton';
import MyLink from './UI/link/MyLink';
import MyInput from './UI/input/MyInput';
import { loginWithEmail } from '../firebase';

import '../styles/Login.css'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    loginWithEmail(email, password).then((userCredential) => {
        dispatch(login(userCredential.user.displayName));
        navigate("/");
      }).catch(e => {
        console.log(e)
      })

  };
const handleMoveToRegister = () => {
      navigate('/register');
  };

  return (
    <div className="Login">
      <MyInput
        placeholder="your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <MyInput
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <MyButton onClick={handleLogin}>Login</MyButton>
      <MyLink onClick={handleMoveToRegister}>Don't have account?</MyLink>
    </div>
  );
}

export default Login;