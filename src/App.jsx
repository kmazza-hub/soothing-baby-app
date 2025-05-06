// src/App.jsx
import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
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
import AboutPage from "./pages/AboutPage";
import "./App.css";

function App() {
  const [visibleCards, setVisibleCards] = useState({
    gifSearch: true,
    music: true,
    whiteNoise: true,
    personalImage: true,
    favoriteVideos: true,
  });

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("visibleCards");
    if (stored) {
      setVisibleCards(JSON.parse(stored));
    }
  }, []);

  const updateVisibility = (cardKey, isVisible) => {
    const updated = { ...visibleCards, [cardKey]: isVisible };
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

  return (
    <Router>
      <div className="app">
        <Header isLoggedIn={isLoggedIn} onLoginClick={() => setIsLoginOpen(true)} />

        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onLogin={() => {
            setIsLoggedIn(true);
            setIsLoginOpen(false);
          }}
        />

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
                  <ToolCard
                    title="Favorite Videos"
                    description="Store and watch your child’s favorite YouTube videos"
                    onClose={() => handleHide("favoriteVideos")}
                  >
                    <FavoriteVideos />
                  </ToolCard>
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
      </div>
    </Router>
  );
}

export default App;
