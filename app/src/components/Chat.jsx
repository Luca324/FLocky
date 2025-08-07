import "@/styles/Chat.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { db } from "@/firebase.js";
import { ref, push, onValue, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";
import {  setLastChat } from "@/store/authSlice.js";
import Message from "@/components/UI/message/Message.jsx";
import defaultChatImg from "@/img/default-chat-img.png";
import humburger from "@/img/humburger.svg";
import MyTextarea from "@/components/UI/textarea/MyTextarea.jsx";
import ChatsList from "@/components/UI/chatsList/ChatsList.jsx";
import ContextMenu from "@/components/UI/contextmenu/ContextMenu.jsx";
import SearchInput from "@/components/UI/searchInput/SearchInput.jsx";
import { copyToClipboard } from "@/utils/clipboard.js";

function Chat() {
  const [messageInput, setMessageInput] = useState("");
  const { username, lastChatId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentMessages, setCurrentMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Состояние контекстного меню
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [menuTargetMessage, setmenuTargetMessage] = useState(null);

  // Подписка на сообщения текущего чата
  useEffect(() => {
    if (!lastChatId) return;

    const messagesRef = ref(db, `chats/${lastChatId}/messages`);
    const unsubscribeMessages = onValue(messagesRef, (snapshot) => {
      const loadedMessages = snapshot.val();
      if (loadedMessages) {
        // Сохраняем как массив объектов с id
        const messagesWithIds = Object.entries(loadedMessages).map(([id, message]) => ({
          id,
          ...message
        }));
        setMessages(messagesWithIds);
        setCurrentMessages(messagesWithIds);
      } else {
        setMessages([]);
        setCurrentMessages([]);
      }
    });

    return () => unsubscribeMessages();
  }, [lastChatId]);

  const openChat = (chat, id) => {
    if (chat) {
      
      setCurrentChat(chat);
      dispatch(setLastChat(id));
    }
  };

  const sendMessage = async () => {
    if (messageInput.trim() && lastChatId) {
      try {
        await push(ref(db, `chats/${lastChatId}/messages`), {
          sender: username,
          text: messageInput,
          timestamp: Date.now(),
        });
        setMessageInput("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  // Прокрутка к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [currentMessages]);

  // Обработчик контекстного меню
  const handleContextMenu = (event, message) => {
    event.preventDefault();
    setMenuPosition({ x: event.clientX, y: event.clientY });
    setMenuVisible(true);
    setmenuTargetMessage(message);
  };

  // Удаление сообщения
  const handleMenuItemSelect = async (value) => {
    setMenuVisible(false);
    if (value === "delete" && menuTargetMessage.id && (currentChat.owner === username || menuTargetMessage.sender === username)) {
      try {
        await remove(ref(db, `chats/${lastChatId}/messages/${menuTargetMessage.id}`));
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
    else if (value === "copy") {
      await copyToClipboard(menuTargetMessage.text);
    }
  };

  // Закрытие меню при клике вне его
  const handleOutsideClick = (event) => {
    if (menuVisible && !event.target.closest(".context-menu")) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    if (menuVisible) {
      document.addEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [menuVisible]);

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
          <div className="chat-header__right">

          <SearchInput
          searchData={messages}
          showResult={setCurrentMessages}
          placeholder="Поиск сообщений"
          getValForFilter={(el) => el.text}
          ></SearchInput>
          <button className="opn-settings">
            <img className="opn-settings__img" src={humburger} alt="" />
          </button>
          </div>
        </div>
        
        <ContextMenu
          onSelect={handleMenuItemSelect}
          visible={menuVisible}
          position={menuPosition}
          className="context-menu"
        />
        
        <div className="chat-messages scrollable">
          {currentChat ? (
            currentMessages.length > 0 ? (
              currentMessages.map((msg, index, arr) => {
                const currentDate = new Date(msg.timestamp).toDateString();
                const prevDate = index > 0
                  ? new Date(arr[index - 1].timestamp).toDateString()
                  : null;
                const isNewDay = currentDate !== prevDate;

                return (
                  <Message
                    key={msg.id}
                    id={msg.id}
                    msg={msg}
                    username={username}
                    isNewDay={isNewDay}
                    handleContextMenu={(e) => handleContextMenu(e, msg)}
                  />
                );
              })
            ) : (
              <div className="empty-messages">No messages yet</div>
            )
          ) : (
            <div className="empty-messages">Select a chat to start messaging</div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="chat-input-area">
          <MyTextarea
            value={messageInput}
            setValue={setMessageInput}
            action={sendMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default Chat;