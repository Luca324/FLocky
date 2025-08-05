import { useState } from 'react';
import "./SidePanel.module.css";

function SidePanel({ isOpen, onClose, username, currentChat }) {
  if (!isOpen) return null;

  return (
    <div className="side-panel-overlay" onClick={onClose}>
      <div className="side-panel" onClick={(e) => e.stopPropagation()}>
        <div className="side-panel-header">
          <h3>Боковая панель</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="side-panel-content">
          <div className="side-panel-text">
            <p>Боковая панель</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidePanel; 