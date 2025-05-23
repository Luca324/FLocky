import "../styles/Chat.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, push, onValue, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { logout, setLastChat } from "../store/authSlice";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/input/MyInput";
import Message from "./UI/message/Message";
import arrow from '../img/arrow.svg'

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
  const [currentChat, setCurrentChat] = useState(null);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const chatsRef = ref(db, "chats");

    const unsubscribeChats = onValue(chatsRef, (snapshot) => {
      const chatsData = snapshot.val();
      console.log("chatsData", chatsData);
      const loadedChats = chatsData ? Object.values(chatsData) : [];
      setChats(loadedChats);
    });

    // Открываем чат при загрузке
    openChat(lastChatId);

    return () => {
      unsubscribeChats();
      // Отписываемся от старых сообщений при размонтировании
      if (messagesRef) {
        onValue(messagesRef, () => {}, { onlyOnce: true });
      }
    };
  }, []); // Зависимости пустые - выполняется только при монтировании

  // Отдельный эффект для подписки на сообщения текущего чата
  useEffect(() => {
    if (!currentChat) return;

    const messagesRef = ref(db, `chats/${currentChat.chatId}/messages`);
    const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
      const loadedMessages = snapshot.val();
      console.log("loadedMessages", loadedMessages);
      setMessages(loadedMessages ? Object.values(loadedMessages) : []);
    });

    return () => unsubscribeMessages();
  }, [currentChat]);

  const openChat = (id) => {
    console.log("opening chat", id);
    const chat = chats.find((c) => c.chatId === id);
    if (chat) {
      setCurrentChat(chat);
      console.log("current chat", chat);
      console.log("messages", chat.messages);
      dispatch(setLastChat(id));
    }
  };

  const sendMessage = async () => {
    console.log("sending message...");
    if (messageInput.trim()) {
      console.log("lastChatId", lastChatId);
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
              <button onClick={() => openChat(chat.chatId)}>
                <h3>{chat.name}</h3>
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
          <h1 className="chat-title">
            {currentChat ? currentChat.name : "Select a chat"}
          </h1>
          <p> Вы: {username}</p>

          <MyButton onClick={handleLogout}>Log out</MyButton>
        </div>
        <div className="chat-messages scrollable">
          {currentChat
            ? messages
              ? Object.values(messages).map((msg, index, arr) => {
                  const currentDate = new Date(msg.timestamp).toDateString();
                  const prevDate =
                    index > 0
                      ? new Date(arr[index - 1].timestamp).toDateString()
                      : null;

                  const isNewDay = currentDate !== prevDate;

                  return (
                    <Message
                      key={msg.timestamp}
                      msg={msg}
                      username={username}
                      isNewDay={isNewDay}
                    ></Message>
                  );
                })
              : "empty"
            : "empty"}
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
              <img src={arrow} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
