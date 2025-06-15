import React, { useState, useContext } from "react";
import { signupUser } from "../utils/api";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/UserContext";
import "./LoginModal.css";

function SignUpModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useContext(UserContext);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user, token } = await signupUser({ email, password });

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      handleLogin(user);

      toast.success("Account created! You're now signed in.");
      onClose();
    } catch (err) {
      console.error("❌ Signup error:", err);
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
