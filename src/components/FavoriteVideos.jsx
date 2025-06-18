import React, { useState, useEffect, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { fetchWithAuth } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import "./FavoriteVideos.css";

const DEFAULT_VIDEOS = [
  {
    id: "default-msrachel",
    title: "Ms. Rachel – Learning Songs",
    videoUrl: "https://www.youtube.com/embed/M8wXe3DW7bg",
    tag: "YouTube",
  },
];

const getEmbeddedUrl = (url) => {
  try {
    const urlObj = new URL(url);
    const videoId = urlObj.searchParams.get("v");
    if (videoId) return `https://www.youtube.com/embed/${videoId}`;
    if (url.includes("youtu.be/")) {
      return `https://www.youtube.com/embed/${url.split("youtu.be/")[1]}`;
    }
    return "";
  } catch {
    return "";
  }
};

function FavoriteVideos() {
  const { isLoggedIn } = useContext(UserContext);
  const [videos, setVideos] = useState([]);
  const [tagFilter, setTagFilter] = useState("All");
  const [videoUrl, setVideoUrl] = useState("");
  const [tag, setTag] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      setVideos(DEFAULT_VIDEOS);
      return;
    }

    fetchWithAuth("/videos")
      .then((data) => {
        if (Array.isArray(data)) setVideos(data);
        else setVideos(DEFAULT_VIDEOS);
      })
      .catch(() => setVideos(DEFAULT_VIDEOS));
  }, [isLoggedIn]);

  const handleAddVideo = () => {
    const embedUrl = getEmbeddedUrl(videoUrl);
    if (!embedUrl) return;

    const payload = {
      title: `Video ${videos.length + 1}`,
      videoUrl: embedUrl,
      tag: tag.trim() || "Untagged",
    };

    fetchWithAuth("/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((newVideo) => {
        setVideos((prev) => [...prev, newVideo]);
        setVideoUrl("");
        setTag("");
      })
      .catch((err) => console.error("❌ Failed to add video:", err));
  };

  const handleDelete = (videoId) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    fetchWithAuth(`/videos/${videoId}`, {
      method: "DELETE",
    })
      .then(() => {
        setVideos((prev) => prev.filter((v) => v.id !== videoId));
      })
      .catch((err) => {
        console.error("❌ Failed to delete video:", err);
        alert("Failed to delete video");
      });
  };

  const handleFilterChange = (e) => setTagFilter(e.target.value);

  const filteredVideos = videos.filter((v) =>
    tagFilter === "All" ? true : v.tag === tagFilter
  );

  const uniqueTags = Array.from(new Set(videos.map((v) => v.tag))).filter(Boolean);

  return (
    <div className="favorite-videos" style={{ textAlign: "center" }}>
      <h2>Favorite Videos</h2>
      <p>Store and watch your child’s favorite YouTube videos</p>

      {isLoggedIn && (
        <>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Enter YouTube URL"
            aria-label="YouTube URL"
            style={{ padding: "8px", width: "80%" }}
          />
          <br />
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Tag (e.g., Ms. Rachel)"
            aria-label="Video Tag"
            style={{ padding: "8px", width: "80%", marginTop: "8px" }}
          />
          <br />
          <button onClick={handleAddVideo} style={{ marginTop: "10px" }}>Add Video</button>
        </>
      )}

      <div style={{ marginTop: "20px" }}>
        <label htmlFor="tagFilter">Filter by Tag: </label>
        <select
          id="tagFilter"
          value={tagFilter}
          onChange={handleFilterChange}
          aria-label="Filter videos by tag"
        >
          <option value="All">All</option>
          {uniqueTags.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="video-list">
        {filteredVideos.map((video) => (
          <div key={video.id} className="video-card">
            <h4>{video.title}</h4>
            <iframe
              width="100%"
              height="215"
              src={video.videoUrl}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
              <p style={{ fontSize: "0.9em", margin: 0 }}>
                Tag: <strong>{video.tag}</strong>
              </p>
              {isLoggedIn && (
                <button
                  onClick={() => handleDelete(video.id)}
                  style={{
                    background: "#ff4d4f",
                    color: "#fff",
                    border: "none",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteVideos;
