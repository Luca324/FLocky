// components/Login.js
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { useState } from "react";
import MyLink from './UI/link/MyLink';
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import { registerWithEmail } from "../firebase";
import "../styles/Login.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (username.trim()) {
      registerWithEmail(email, password, username).then((userCredential) => {
        dispatch(login(userCredential.user.displayName));
        console.log(userCredential)
        console.log(userCredential.user.displayName)
        navigate("/");
console.log(username)
      }).catch(e => {
        console.log(e)
      })
    }
  };
  const handleMoveToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="Registe Login">
      <MyInput
        placeholder="your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
      <MyButton onClick={handleRegister}>Register</MyButton>
      <MyLink onClick={handleMoveToLogin}>Already have an account?</MyLink>
    </div>
  );
}

export default Register;
