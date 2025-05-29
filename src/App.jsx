import React, { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ToolCard from "./components/ToolCard";
import GifSearch from "./components/GifSearch";
import Timer from "./components/Timer";
import WhiteNoise from "./components/WhiteNoise";
import PersonalImage from "./components/PersonalImage";
import FavoriteVideos from "./components/FavoriteVideos";
import RestorePanel from "./components/RestorePanel";
import LoginModal from "./components/LoginModal";
import SignUpModal from "./components/SignUpModal";
import AboutPage from "./pages/AboutPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserProvider, UserContext } from "./contexts/UserContext";

import "./App.css";

function AppContent() {
  const { isLoggedIn, currentUser, handleLogout, setCurrentUser, setIsLoggedIn } = useContext(UserContext);

  const [visibleCards, setVisibleCards] = useState({
    gifSearch: true,
    music: true,
    whiteNoise: true,
    personalImage: true,
    favoriteVideos: true,
  });

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("visibleCards");
    if (stored) {
      setVisibleCards(JSON.parse(stored));
    }
  }, []);

  const updateVisibility = (key, isVisible) => {
    const updated = { ...visibleCards, [key]: isVisible };
    setVisibleCards(updated);
    localStorage.setItem("visibleCards", JSON.stringify(updated));
  };

  const handleHide = (key) => updateVisibility(key, false);
  const handleShow = (key) => updateVisibility(key, true);

  const handleTimerStart = () => setIsTimerRunning(true);
  const handleTimerFinish = () => {
    setIsTimerRunning(false);
    handleHide("music");
    handleHide("whiteNoise");
  };

  // ✅ Updates context when login/signup succeeds
  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  return (
    <div className="app">
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLoginClick={() => setIsLoginOpen(true)}
        onSignUpClick={() => setIsSignUpOpen(true)}
        onLogout={handleLogout}
      />
<LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLogin={handleLogin} />
<SignUpModal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} onSignUp={handleLogin} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              {visibleCards.personalImage && (
                <ToolCard
                  title="Soothing Image"
                  description="Upload a photo of your baby to personalize the experience"
                  onClose={() => handleHide("personalImage")}
                >
                  <PersonalImage />
                </ToolCard>
              )}
              {visibleCards.gifSearch && (
                <ToolCard
                  title="Soothing GIF Search"
                  description="Find and display calming GIFs for your baby"
                  onClose={() => handleHide("gifSearch")}
                >
                  <GifSearch />
                </ToolCard>
              )}
              {visibleCards.music && (
                <ToolCard
                  title="Soothing Sounds"
                  description="Play gentle lullabies to calm your baby"
                  onClose={() => handleHide("music")}
                >
                  <iframe
                    style={{ borderRadius: "12px" }}
                    src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0DxcHtn4Hwo?utm_source=generator"
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title="Spotify Playlist"
                  ></iframe>
                </ToolCard>
              )}
              {visibleCards.whiteNoise && (
                <ToolCard
                  title="White Noise"
                  description="Gentle audio to help soothe your baby"
                  onClose={() => handleHide("whiteNoise")}
                >
                  <WhiteNoise timerActive={isTimerRunning} />
                </ToolCard>
              )}
              {visibleCards.favoriteVideos && (
                <ProtectedRoute>
                  <ToolCard
                    title="Favorite Videos"
                    description="Store and watch your child’s favorite YouTube videos"
                    onClose={() => handleHide("favoriteVideos")}
                  >
                    <FavoriteVideos />
                  </ToolCard>
                </ProtectedRoute>
              )}
              <ToolCard
                title="Soothing Timer"
                description="Use the timer for calming sessions, hair brushing, or quiet moments"
              >
                <Timer onStart={handleTimerStart} onFinish={handleTimerFinish} />
              </ToolCard>
              <RestorePanel visibleCards={visibleCards} onRestore={handleShow} />
            </>
          }
        />
        <Route path="/about" element={<AboutPage />} />
      </Routes>

      <Footer />
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
