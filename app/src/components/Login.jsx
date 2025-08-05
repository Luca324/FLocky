// components/Login.jsx
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice.js";
import { useState } from "react";
import MyButton from "./UI/button/MyButton.jsx";
import MyLink from "./UI/link/MyLink.jsx";
import MyInput from "./UI/input/MyInput.jsx";
import { loginWithEmail } from "../firebase.js";
import "../styles/Login.css";

import {
  Message,
  useToaster
} from "rsuite";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toaster = useToaster();

  const handleLogin = (e) => {
    e.preventDefault();

    loginWithEmail(email, password)
      .then((userCredential) => {
        dispatch(login(userCredential.user.displayName));
        navigate("/");
      })
      .catch((e) => {
        toaster.push(
          <Message showIcon type="error" closable>
            An Error Occured: {e.message}
          </Message>,
          {
            container: document.body,
            placement: "topCenter",
            duration: 5000,
          }
        );
      });
  };
  const handleMoveToRegister = () => {
    navigate("/register");
  };

  return (
    <form className="Login" onSubmit={handleLogin}>
      <MyInput
        placeholder="your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        type="email"
      />
      <MyInput
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        type="password"
        minLength={6}
    title="Password must be at least 6 characters long"
      />
      <MyButton>Login</MyButton>
      <MyLink onClick={handleMoveToRegister}>Don't have account?</MyLink>
    </form>
  );
}

export default Login;
