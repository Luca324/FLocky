import classes from './Message.module.css'

function Message({ msg, isNewDay, username, ...props }) {
  const time = new Date(msg.timestamp);
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");

  return (
    <>
      {isNewDay && (
        <div className="date-divider">
          {time.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      )}
      <div
        className={`message-wrapper ${
          msg.sender === username ? "own-message" : ""
        }`} {...props}
      >
        <div className={classes.chatMessage}>
          <div className={classes.sender}>{msg.sender}</div>
          <div className="msg-text">{msg.text}</div>
          <div className={classes.msgTime}>
            {hours}:{minutes}
          </div>
        </div>
      </div>
    </>
  );
}

export default Message;
