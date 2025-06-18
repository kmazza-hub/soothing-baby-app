import React, { useState, useEffect, useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { fetchWithAuth } from "../utils/api";
import { UserContext } from "../contexts/UserContext";
import "./FavoriteVideos.css";

const DEFAULT_VIDEOS = [
  {
    id: "default-msrachel",
    title: "Ms. Rachel – Learning Songs",
    url: "https://www.youtube.com/embed/M8wXe3DW7bg",
    tag: "YouTube",
  },
];

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
        if (Array.isArray(data)) {
          setVideos(data);
        } else {
          setVideos(DEFAULT_VIDEOS);
        }
      })
      .catch((err) => {
        console.error("❌ Failed to fetch videos:", err);
        setVideos(DEFAULT_VIDEOS);
      });
  }, [isLoggedIn]);

  const handleAddVideo = () => {
    if (!videoUrl.trim()) return;

    const payload = {
      title: "Custom Video",
      videoUrl,
      tag,
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
      .catch((err) => {
        console.error("❌ Failed to add video:", err);
      });
  };

  const handleFilterChange = (e) => setTagFilter(e.target.value);

  const filteredVideos = videos.filter((video) =>
    tagFilter === "All" ? true : video.tag === tagFilter
  );

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(videos);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    setVideos(reordered);

    fetchWithAuth("/videos/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reorderedVideos: reordered }),
    })
      .then(() => console.log("✅ Order saved"))
      .catch((err) => console.error("❌ Failed to save order:", err));
  };

  const uniqueTags = Array.from(new Set(videos.map((v) => v.tag))).filter(Boolean);

  return (
    <div className="favorite-videos" style={{ textAlign: "center" }}>
      <h2>Favorite Videos</h2>
      <p>Save and organize calming YouTube videos your baby loves.</p>

      {isLoggedIn && (
        <>
          <h3 style={{ marginTop: "20px" }}>Add a New Video</h3>
          <p>Paste the YouTube link and optionally add a tag (e.g., Ms. Rachel)</p>

          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Enter YouTube URL"
            style={{ width: "80%", padding: "8px", marginBottom: "10px" }}
          />
          <br />
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Tag (e.g., Ms. Rachel)"
            style={{ width: "80%", padding: "8px", marginBottom: "10px" }}
          />
          <br />
          <button onClick={handleAddVideo} style={{ padding: "10px 20px" }}>
            Add Video
          </button>
        </>
      )}

      <div style={{ marginTop: "20px" }}>
        <label htmlFor="tagFilter" style={{ fontWeight: "bold" }}>
          Filter by Tag:
        </label>
        <select
          id="tagFilter"
          value={tagFilter}
          onChange={handleFilterChange}
          title="Filter videos by tag"
          aria-label="Filter videos by tag"
        >
          <option value="All">All</option>
          {uniqueTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="videos">
          {(provided) => (
            <div
              className="video-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ marginTop: "20px" }}
            >
              {filteredVideos.map((video, index) => (
                <Draggable key={video.id} draggableId={video.id} index={index}>
                  {(provided) => (
                    <div
                      className="video-card"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        background: "#fff",
                        borderRadius: "8px",
                        padding: "10px",
                        marginBottom: "15px",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                      }}
                    >
                      <h4>{video.title}</h4>
                      <iframe
                        width="100%"
                        height="215"
                        src={video.url}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      <p style={{ fontSize: "0.9em", marginTop: "4px" }}>
                        Tag: <strong>{video.tag}</strong>
                      </p>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default FavoriteVideos;
