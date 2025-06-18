// src/components/FavoriteVideos.jsx
import React, { useState, useEffect, useContext } from "react";
import { fetchWithAuth } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./FavoriteVideos.css";

function FavoriteVideos() {
  const [videoUrl, setVideoUrl] = useState("");
  const [tag, setTag] = useState("");
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState("All");
  const { handleLogout } = useContext(UserContext);

  useEffect(() => {
    fetchWithAuth("/videos")
      .then((data) => {
        const savedOrder = JSON.parse(localStorage.getItem("videoOrder")) || [];
        const ordered = savedOrder.length
          ? savedOrder.map((v) => data.find((item) => item._id === v._id)).filter(Boolean)
          : data;
        setVideos(ordered);
      })
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
          tag: tag.trim() || "Untagged",
        }),
      });
      const updated = [newVideo, ...videos];
      setVideos(updated);
      localStorage.setItem("videoOrder", JSON.stringify(updated));
      setVideoUrl("");
      setTag("");
    } catch {
      alert("Failed to save video");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetchWithAuth(`/videos/${id}`, { method: "DELETE" });
      const updated = videos.filter((v) => v._id !== id);
      setVideos(updated);
      localStorage.setItem("videoOrder", JSON.stringify(updated));
    } catch {
      alert("Delete failed");
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(videos);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setVideos(items);
    localStorage.setItem("videoOrder", JSON.stringify(items));
  };

  const filteredVideos = filter === "All" ? videos : videos.filter((v) => v.tag === filter);
  const uniqueTags = ["All", ...new Set(videos.map((v) => v.tag || "Untagged"))];

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
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Tag (e.g., Ms. Rachel)"
        />
        <button type="submit" disabled={!videoUrl.trim()}>Add Video</button>
      </form>

      <div className="favorites__filter">
        <label>Filter by Tag: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          {uniqueTags.map((tagOption) => (
            <option key={tagOption} value={tagOption}>{tagOption}</option>
          ))}
        </select>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="videos">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="favorites__videos">
              {filteredVideos.map((vid, index) => (
                <Draggable key={vid._id} draggableId={vid._id} index={index}>
                  {(provided) => (
                    <div
                      className="favorites__video"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <iframe
                        width="100%"
                        height="315"
                        src={vid.videoUrl}
                        title={vid.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      <p className="video-tag">Tag: {vid.tag || "Untagged"}</p>
                      <button onClick={() => handleDelete(vid._id)}>Remove</button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div className="favorites__logout">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default FavoriteVideos;
