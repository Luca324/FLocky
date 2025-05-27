import "../styles/Chat.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import { ref, push, onValue, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { logout, setLastChat } from "../store/authSlice";
import Message from "./UI/message/Message";
import defaultChatImg from "../img/default-chat-img.png";
import humburger from "../img/humburger.svg";
import MyTextarea from "./UI/textarea/MyTextarea";
import ChatsList from "./UI/chatsList/ChatsList";

function Chat() {
  const [messageInput, setMessageInput] = useState("");
  const { username, lastChatId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  
  const [messagesRef, setMessagesRef] = useState(
    ref(db, "chats/" + lastChatId + "/messages")
  );
  const [currentChat, setCurrentChat] = useState(null);

  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Открываем чат при загрузке
    openChat(lastChatId);

    return () => {
      if (messagesRef) {
        // Отписываемся от старых сообщений при размонтировании
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

  const openChat = (chat, id) => {
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

  useEffect(() => {
    // Прокрутка к последнему сообщению при изменении messages
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  return (
    <div className="chat">
      <ChatsList
        username={username}
        openChat={openChat}
        dispatch={dispatch}
        navigate={navigate}
      />
      <div className="chat-container">
        <div className="chat-header">
          <div className="chat-header__left">
            <img className="chats__img" src={defaultChatImg} alt="" />
            <span className="chat-title">
              {currentChat ? currentChat.name : "Select a chat"}
            </span>
          </div>
          <button className="opn-settings">
            <img className="opn-settings__img" src={humburger} alt="" />
          </button>
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
          {/* Элемент-заглушка для скролла в конец */}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input-area">
          <MyTextarea
            value={messageInput}
            setValue={setMessageInput}
            action={sendMessage}
          ></MyTextarea>
        </div>
      </div>
    </div>
  );
}

export default Chat;
