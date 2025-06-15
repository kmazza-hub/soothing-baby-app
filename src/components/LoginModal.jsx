import React, { useState, useContext } from "react";
import { loginUser } from "../utils/api";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/UserContext";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useContext(UserContext);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, token } = await loginUser({ email, password });

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      handleLogin(user);

      toast.success("Signed in successfully!");
      onClose();
    } catch (err) {
      console.error("❌ Login error:", err);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Sign In</h2>
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
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
