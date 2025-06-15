import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header({
  isLoggedIn,
  currentUser,
  onLoginClick,
  onSignUpClick,
  onLogout,
  onToggleDarkMode,
}) {
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

        <button
          className="header__toggle-dark"
          onClick={onToggleDarkMode}
          title="Switch between light and dark mode"
        >
          Toggle Dark Mode 🌙
        </button>

        {isLoggedIn ? (
          <>
            <span className="header__welcome">
              Welcome, {currentUser?.email || "Parent"} 👋
            </span>
            <button className="header__logout-btn" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="header__login-btn" onClick={onLoginClick}>
              Login
            </button>
            <button className="header__signup-btn" onClick={onSignUpClick}>
              Sign Up
            </button>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
