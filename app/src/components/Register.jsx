// components/Register.jsx
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "@/store/authSlice.js";
import { useState } from "react";
import MyLink from "@/components/UI/link/MyLink.jsx";
import MyButton from "@/components/UI/button/MyButton.jsx";
import MyInput from "@/components/UI/input/MyInput.jsx";
import { registerWithEmail } from "@/firebase.js";
import "@/styles/Login.css";
import {
  Message,
  useToaster
} from "rsuite";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toaster = useToaster();

  const handleRegister = async (e) => {
    e.preventDefault();

    registerWithEmail(email, password, username)
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
  const handleMoveToLogin = () => {
    navigate("/login");
  };

  return (
    <form className="Register Login" onSubmit={handleRegister}>
      <MyInput
        placeholder="your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
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
      />
      <MyButton type="submit">Register</MyButton>
      <MyLink onClick={handleMoveToLogin}>Already have an account?</MyLink>
    </form>
  );
}

export default Register;
