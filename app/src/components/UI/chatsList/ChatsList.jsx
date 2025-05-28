import classes from "./ChatsList.module.css";

import { useEffect, useState, useRef } from "react";
import { db } from "../../../firebase";
import { ref, push, onValue, set } from "firebase/database";
import { logout, setLastChat } from "../../../store/authSlice";
import defaultChatImg from "../../../img/default-chat-img.png";

import MyButton from "../button/MyButton";
import MyInput from "../input/MyInput";
import logOutImg from "../../../img/Log out.svg";
import defaultProfileImg from "../../../img/default-profile-img.png";

function ChatsList({ username, openChat, dispatch, navigate }) {
  const [chats, setChats] = useState([]);
  const [newChatInput, setNewChatInput] = useState("");

  useEffect(() => {
    const chatsRef = ref(db, "chats");

    const unsubscribeChats = onValue(chatsRef, (snapshot) => {
      const chatsData = snapshot.val();
      console.log("chatsData", chatsData);
      const loadedChats = chatsData ? Object.values(chatsData) : [];
      setChats(loadedChats);
    });

    return () => {
      unsubscribeChats();
    };
  }, []); // Зависимости пустые - выполняется только при монтировании

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
  
  const handleOpenChat = (id) => {
    console.log("opening chat", id);
    const chat = chats.find((c) => c.chatId === id);
    openChat(chat, id);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="chats__container">
      <div className="chats">
        <div className="profile">
          <div className="profile__left">
            <img className="profile__img" src={defaultProfileImg} alt="" />
            <span>{username}</span>
          </div>
          <button onClick={handleLogout}>
            <img className="logout__img" src={logOutImg} alt="" />
          </button>
        </div>
        {chats.map((chat, index) => (
          <>
            <input
              type="radio"
              name="chats"
              id={`chat-${index}`}
              className="chats__button"
              onClick={() => handleOpenChat(chat.chatId)}
            />

            <label htmlFor={`chat-${index}`} className="chats__item">
              <img className="chats__img" src={defaultChatImg} alt="" />
              <span className="chats__name">{chat.name}</span>
            </label>
          </>
        ))}
      </div>

      <div className="create-chat">
        <p className="create-chat__title">Create your own chat</p>
        <MyInput
          className="create-chat__input"
          placeholder="Your chat's name"
          value={newChatInput}
          onChange={(e) => setNewChatInput(e.target.value)}
        />
        <MyButton className="create-chat__button" onClick={createChat}>
          Create chat
        </MyButton>
      </div>
    </div>
  );
}

export default ChatsList;
