import "../styles/Chat.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, push, onValue, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { logout, setLastChat } from "../store/authSlice";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";

function Chat() {
  const [chats, setChats] = useState([]);
  const [newChatInput, setNewChatInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, lastChatId } = useSelector((state) => state.auth);
  const [messagesRef, setMessagesRef] = useState(
    ref(db, "chats/" + lastChatId + "/messages")
  );
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // при загрузке чата
    const chatsRef = ref(db, "chats");

    const unsubscribe = onValue(chatsRef, (snapshot) => {
      const chatsData = snapshot.val();
      console.log("Data from Firebase:", chatsData);
      const loadedChats = chatsData ? Object.values(chatsData) : [];
      setChats(loadedChats);
    });

    onValue(messagesRef, (snapshot) => {
      const loadedMessages = snapshot.val();
      console.log("messages Firebase:", loadedMessages);
      setMessages(loadedMessages || []);
    });

    openChat(lastChatId);

    return () => unsubscribe();
  }, []);

  const openChat = (id) => {
    console.log("opening chat...", id);
    dispatch(setLastChat(id));
    setMessagesRef(ref(db, "chats/" + lastChatId + "/messages"));
  };

  const sendMessage = async () => {
    if (messageInput.trim()) {
      await push(ref(db, "chats/" + lastChatId + "/messages"), {
        sender: username,
        text: messageInput,
        timestamp: Date.now(),
      });
      setMessageInput("");
    }
  };

  const createChat = async () => {
    if (newChatInput.trim()) {
      const chatId = Date.now();
      set(ref(db, "chats/" + chatId), {
        owner: username,
        name: newChatInput,
        chatId,
        messages: [],
      });
      setNewChatInput("");

      openChat(chatId);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="Chat">
      <div className="chats-contaiter">
        <div className="chats">
          {chats.map((chat, index) => (
            <div className="chat-item">
              <button onClick={
                () => openChat(chat.chatId)
              }>
<h3>{chat.name}</h3>
              <p>{chat.chatId}</p>
              </button>
              
            </div>
          ))}
        </div>
        <div className="create-chat-wrapper">
          <p>Create your own chat</p>
          <MyInput
            className="create-chat-input"
            placeholder="Your chat's name"
            value={newChatInput}
            onChange={(e) => {
              setNewChatInput(e.target.value);
            }}
          ></MyInput>
          <MyButton className="create-chat" onClick={createChat}>
            Create chat
          </MyButton>
        </div>
      </div>
      <div className="chat-container">
        <div className="chat-header">
          <h1 className="chat-title">Realtime Chat</h1>
          <p>{username}</p>

          <MyButton onClick={handleLogout}>Log out</MyButton>
        </div>
        <div className="chat-messages scrollable">
          {messages.map((msg, index) => (
            <div
              className={`message-wrapper ${
                msg.sender === username ? "own-message" : ""
              }`}
            >
              <div key={index} className={`chat-message`}>
                <div className="sender">{msg.sender}</div>
                <div className="msg-text">{msg.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-input-area">
          <div className="chat-input-container">
            <div className="chat-input-wrapper">
              <textarea
                className="chat-input"
                value={messageInput}
                onChange={(e) => {
                  setMessageInput(e.target.value);
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
    </div>
  );
}

export default Chat;
