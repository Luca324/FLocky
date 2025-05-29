import classes from "./ContextMenu.module.css";
import CopyImg from "../../../img/Copy.svg"
import DeleteImg from "../../../img/delete.svg"

function ContextMenu({ onSelect, visible, targetId, position, ...props }) {
  const handleMenuItemClick = (value) => {
    onSelect(value, targetId); // Вызываем функцию, переданную из родительского компонента
    // Можно добавлять и другую логику здесь
    
  };

  return (
    visible && (
      <div
        className={classes.ContextMenu}
        style={{
          position: "absolute",
          left: position.x,
          top: position.y,
          zIndex: 1000,
        }}
      >
        <button
          className={classes.MenuItem}
          onClick={() => handleMenuItemClick("copy")}
        >
          <img src={CopyImg} alt="" />
          <span>Копировать</span>
        </button>

        <button
          className={classes.MenuItem}
          onClick={() => handleMenuItemClick("delete")}
        >
          <img src={DeleteImg} alt="" />
          <span>Удалить</span>
          
        </button>
      </div>
    )
  );
}

export default ContextMenu;
