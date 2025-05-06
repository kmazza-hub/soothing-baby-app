// src/components/LoginModal.jsx
import React from "react";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(); // Simulate login
    onClose(); // Close modal
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
