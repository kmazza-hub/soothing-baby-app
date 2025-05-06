import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header({ isLoggedIn, onLoginClick }) {
  return (
    <header className="header">
      <div className="header__text">
        <h1 className="header__title">
          <Link to="/" className="header__home-link">
            Soothing Baby
          </Link>
        </h1>
        <p className="header__subtitle">Calm moments, anytime.</p>
      </div>

      <nav className="header__nav">
        <Link to="/about" className="header__nav-link">
          About
        </Link>
        {isLoggedIn ? (
          <span className="header__welcome">Welcome, Parent 👋</span>
        ) : (
          <button className="header__login-btn" onClick={onLoginClick}>
            Login
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
