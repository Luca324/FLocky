import classes from "./MyTextarea.module.css";
import arrow from "./arrow.svg";

function MyTextarea({ value, setValue, action }) {
  return (
    <div className={classes.MyTextarea}>
      <div className={classes.inputWrapper}>
        <textarea
          className={classes.input}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            // Автоматическое изменение высоты
            e.target.style.height = "auto";
            e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
          }}
          placeholder="Type your message..."
          onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && action()}
          rows="1" /* Начальное количество строк */
        />
      </div>
      <button className={classes.sendButton} onClick={action}>
        <img src={arrow} alt="" />
      </button>
    </div>
  );
}

export default MyTextarea;
