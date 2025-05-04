import React from "react";
import Header from "./components/Header";
import ToolCard from "./components/ToolCard";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />

      {/* Soothing GIF Feature */}
      <ToolCard
        title="Soothing GIF"
        description="Relax your baby with a calming default visual"
      >
        <img
          src="https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif"
          alt="Soothing GIF"
          style={{ width: "100%", borderRadius: "10px" }}
        />
      </ToolCard>

      {/* Soothing Audio Feature */}
      <ToolCard
        title="Soothing Sounds"
        description="Play gentle lullabies or white noise to calm your baby"
      >
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0DxcHtn4Hwo?utm_source=generator"
          width="100%"
          height="352"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </ToolCard>
    </div>
  );
}

export default App;

