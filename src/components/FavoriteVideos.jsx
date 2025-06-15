import React, { useState, useEffect, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { fetchWithAuth } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import "./FavoriteVideos.css";

const DEFAULT_VIDEO = {
  title: "Welcome! Ms. Rachel",
  videoUrl: "https://www.youtube.com/embed/ad8oHipEa0E",
  tags: ["default"],
};

function FavoriteVideos() {
  const [videoUrl, setVideoUrl] = useState("");
  const [tag, setTag] = useState("");
  const [videos, setVideos] = useState([]);
  const { handleLogout } = useContext(UserContext);

  useEffect(() => {
    fetchWithAuth("/videos")
      .then((data) => {
        if (data.length === 0) {
          // Add default video if none exists
          return fetchWithAuth("/videos", {
            method: "POST",
            body: JSON.stringify(DEFAULT_VIDEO),
          }).then((defaultVideo) => setVideos([defaultVideo]));
        } else {
          setVideos(data);
        }
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
          tags: tag ? [tag] : [],
        }),
      });
      setVideos([newVideo, ...videos]);
      setVideoUrl("");
      setTag("");
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

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = [...videos];
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setVideos(reordered);
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
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Tag (optional)"
        />
        <button type="submit" disabled={!videoUrl.trim()}>Add Video</button>
      </form>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="videos">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="favorites__videos">
              {videos.map((vid, index) => (
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
                      {vid.tags?.length > 0 && (
                        <div className="favorites__tags">
                          {vid.tags.map((tag, i) => (
                            <span key={i} className="favorites__tag">{tag}</span>
                          ))}
                        </div>
                      )}
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
