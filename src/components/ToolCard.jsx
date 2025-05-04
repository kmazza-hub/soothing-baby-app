// src/components/ToolCard.jsx
import React, { useState, useEffect } from "react";
import "./ToolCard.css";

function ToolCard({ title, description, children, onClose }) {
  const [visible, setVisible] = useState(true);

  const handleCloseClick = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (!visible) {
      const timeout = setTimeout(() => {
        onClose(); // Trigger the unmount in App.jsx after fade out
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [visible, onClose]);

  return (
    <div className={`tool-card ${!visible ? "tool-card--hidden" : ""}`}>
      <div className="tool-card__header">
        <h2 className="tool-card__title">{title}</h2>
        {onClose && (
          <button className="tool-card__close-btn" onClick={handleCloseClick}>
            ✖
          </button>
        )}
      </div>
      <p className="tool-card__desc">{description}</p>
      <div className="tool-card__body">{children}</div>
    </div>
  );
}

export default ToolCard;
