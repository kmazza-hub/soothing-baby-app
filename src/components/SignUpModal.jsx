// src/components/SignUpModal.jsx
import React, { useState } from "react";
import { signupUser } from "../utils/api";
import { toast } from "react-toastify";
import "./LoginModal.css";

function SignUpModal({ isOpen, onClose, onSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, token } = await signupUser({ email, password });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Account created! You're now signed in.");

      if (typeof onSignUp === "function") {
        onSignUp(); // ✅ Updates context
      }

      onClose();
    } catch (err) {
      console.error("❌ Signup error:", err.message || err);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;
