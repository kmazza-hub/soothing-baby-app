import React from "react";
import "./ToolCard.css";

function ToolCard({ title, description, children }) {
  return (
    <div className="tool-card">
      <h2 className="tool-card__title">{title}</h2>
      <p className="tool-card__desc">{description}</p>
      <div className="tool-card__content">{children}</div>
    </div>
  );
}

export default ToolCard;
