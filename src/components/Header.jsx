import React from "react";
import "./Header.css";

function Header({ isLoggedIn, onLoginClick }) {
  return (
    <header className="header">
      <div className="header__text">
        <h1 className="header__title">Soothing Baby</h1>
        <p className="header__subtitle">Calm moments, anytime.</p>
      </div>

      <div className="header__auth">
        {isLoggedIn ? (
          <p className="header__welcome">Welcome, Parent! 👋</p>
        ) : (
          <button className="header__login-btn" onClick={onLoginClick}>
            Login
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
