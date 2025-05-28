import React, { useState, useEffect, useContext } from "react";
import { fetchWithAuth } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import "./FavoriteVideos.css";

function FavoriteVideos() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videos, setVideos] = useState([]);
  const { handleLogout } = useContext(UserContext);

  useEffect(() => {
    fetchWithAuth("/videos")
      .then(setVideos)
      .catch(() => {
        alert("Auth failed or fetch error");
        handleLogout();
      });
  }, [handleLogout]);

  const extractVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&?]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleAddVideo = async (e) => {
    e.preventDefault();
    const videoId = extractVideoId(videoUrl.trim());
    if (!videoId) return alert("Invalid YouTube URL");

    try {
      const newVideo = await fetchWithAuth("/videos", {
        method: "POST",
        body: JSON.stringify({
          title: `Video ${videos.length + 1}`,
          videoUrl: `https://www.youtube.com/embed/${videoId}`,
        }),
      });
      setVideos([newVideo, ...videos]);
      setVideoUrl("");
    } catch (err) {
      alert("Failed to save video");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetchWithAuth(`/videos/${id}`, { method: "DELETE" });
      setVideos(videos.filter((v) => v._id !== id));
    } catch {
      alert("Delete failed");
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
        <button type="submit" disabled={!videoUrl.trim()}>Add Video</button>
      </form>

      <div className="favorites__videos">
        {videos.map((vid) => (
          <div key={vid._id} className="favorites__video">
            <iframe
              width="100%"
              height="315"
              src={vid.videoUrl}
              title={vid.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button onClick={() => handleDelete(vid._id)}>Remove</button>
          </div>
        ))}
      </div>

      <div className="favorites__logout">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default FavoriteVideos;
