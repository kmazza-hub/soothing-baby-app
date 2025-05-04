import React, { useRef, useState, useEffect } from "react";
import "./WhiteNoise.css";

function WhiteNoise({ timerActive }) {
  const iframeRef = useRef(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Message handler for YouTube ready event
  useEffect(() => {
    const handleMessage = (event) => {
      if (typeof event.data === "string" && event.data.includes("onReady")) {
        setPlayerReady(true);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Auto-stop white noise when timer ends
  useEffect(() => {
    if (!timerActive && isPlaying && iframeRef.current) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "stopVideo", args: [] }),
        "*"
      );
      setIsPlaying(false);
    }
  }, [timerActive]);

  const handlePlay = () => {
    if (playerReady && iframeRef.current) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "playVideo", args: [] }),
        "*"
      );
      setIsPlaying(true);
    }
  };

  return (
    <div className="white-noise">
      <div className="white-noise__content">
        <iframe
          ref={iframeRef}
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/nMfPqeZjc2c?enablejsapi=1"
          title="White Noise"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
      <button
        onClick={handlePlay}
        disabled={!playerReady || isPlaying}
        style={{
          marginTop: "10px",
          padding: "10px 16px",
          fontSize: "16px",
          backgroundColor: "#60a5fa",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        ▶️ Play White Noise
      </button>
    </div>
  );
}

export default WhiteNoise;
