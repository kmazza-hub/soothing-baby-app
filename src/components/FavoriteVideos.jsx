import React, { useState } from "react";
import "./FavoriteVideos.css";

function FavoriteVideos() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videos, setVideos] = useState([]);

  const extractVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&?]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleAddVideo = (e) => {
    e.preventDefault();
    const videoId = extractVideoId(videoUrl);
    if (videoId) {
      setVideos([...videos, videoId]);
      setVideoUrl("");
    } else {
      alert("Invalid YouTube URL");
    }
  };

  return (
    <div className="favorites">
      <h2 className="tool-card__title">Favorite YouTube Videos</h2>
      <p className="tool-card__desc">Add calming videos your baby loves</p>

      <form onSubmit={handleAddVideo} className="favorites__form">
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Enter YouTube URL"
        />
        <button type="submit">Add Video</button>
      </form>

      <div className="favorites__videos">
        {videos.map((id, index) => (
          <div key={index} className="favorites__video">
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${id}`}
              title={`Favorite Video ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteVideos;
