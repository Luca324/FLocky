import "../styles/Chat.css";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, push, onValue } from "firebase/database";
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  console.log("Chat loaded");
const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useSelector((state) => state.auth);

  useEffect(() => {
    // при загрузке чата
    const messagesRef = ref(db, "messages");
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Data from Firebase:", data);
      const loadedMessages = data ? Object.values(data) : [];
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (input.trim()) {
      await push(ref(db, "messages"), {
        text: input,
        timestamp: Date.now(),
      });
      setInput("");
    }
  };

const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="chat-container">
    <p>{username}</p>
      <h1 className="chat-title">Realtime Chat</h1>
      <button onClick={handleLogout}>Log out</button>
      <div className="chat-messages scrollable">
        {messages.map((msg, index) => (
          <div key={index} className="chat-message">
            <div className="sender">Sender</div>
            <div className="msg-text">{msg.text}</div>
          </div>
        ))}
        
      </div>
      <div className="chat-input-area">
        <div className="chat-input-container">
          <div className="chat-input-wrapper">
            <textarea
              className="chat-input"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                // Автоматическое изменение высоты
                e.target.style.height = "auto";
                e.target.style.height = `${Math.min(
                  e.target.scrollHeight,
                  200
                )}px`;
              }}
              placeholder="Type your message..."
              onKeyPress={(e) =>
                e.key === "Enter" && !e.shiftKey && sendMessage()
              }
              rows="1" /* Начальное количество строк */
            />
          </div>
          <button className="chat-send-button" onClick={sendMessage}>
            <svg
              width="14"
              height="16"
              viewBox="0 0 14 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7 16c-.595 0-1.077-.462-1.077-1.032V1.032C5.923.462 6.405 0 7 0s1.077.462 1.077 1.032v13.936C8.077 15.538 7.595 16 7 16z"
                fill="currentColor"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M.315 7.44a1.002 1.002 0 0 1 0-1.46L6.238.302a1.11 1.11 0 0 1 1.523 0c.421.403.421 1.057 0 1.46L1.838 7.44a1.11 1.11 0 0 1-1.523 0z"
                fill="currentColor"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.685 7.44a1.11 1.11 0 0 1-1.523 0L6.238 1.762a1.002 1.002 0 0 1 0-1.46 1.11 1.11 0 0 1 1.523 0l5.924 5.678c.42.403.42 1.056 0 1.46z"
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
