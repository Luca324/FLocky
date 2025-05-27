import { useEffect, useState, useRef } from "react";


function ContextMenu(props) {
  const { onSelect, visible, position } = props;

  const handleMenuItemClick = (value) => {
    onSelect(value); // Вызываем функцию, переданную из родительского компонента
    // Можно добавлять и другую логику здесь
  };

  return (
    visible && (
      <div
        style={{
          position: 'absolute',
          left: position.x,
          top: position.y,
          backgroundColor: 'lightgray',
          padding: '10px',
          border: '1px solid black',
          zIndex: 1000, // Добавляем z-index для отображения поверх других элементов
        }}
      >
        <ul>
          <li>
            <a onClick={() => handleMenuItemClick('copy')}>Копировать</a>
          </li>
          <li>
            <a onClick={() => handleMenuItemClick('paste')}>Вставить</a>
          </li>
          <li>
            <a onClick={() => handleMenuItemClick('delete')}>Удалить</a>
          </li>
        </ul>
      </div>
    )
  );
}

export default ContextMenu;