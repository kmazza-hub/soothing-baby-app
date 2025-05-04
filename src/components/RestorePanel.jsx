// src/components/RestorePanel.jsx
import React from "react";
import "./RestorePanel.css"; // Create this file or style inline

function RestorePanel({ visibleCards, onRestore }) {
  const hiddenCards = Object.entries(visibleCards).filter(
    ([_, isVisible]) => !isVisible
  );

  if (hiddenCards.length === 0) return null;

  return (
    <div className="restore-panel">
      <h3>Restore Hidden Features</h3>
      <div className="restore-panel__buttons">
        {hiddenCards.map(([key]) => (
          <button key={key} onClick={() => onRestore(key)}>
            🔄 {formatKey(key)}
          </button>
        ))}
      </div>
    </div>
  );
}

function formatKey(key) {
  switch (key) {
    case "gifSearch":
      return "GIF Search";
    case "music":
      return "Music";
    case "whiteNoise":
      return "White Noise";
    case "personalImage":
      return "Personal Image";
    case "favoriteVideos":
      return "Favorite Videos";
    default:
      return key;
  }
}

export default RestorePanel;
