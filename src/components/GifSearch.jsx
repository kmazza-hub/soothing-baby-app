// src/components/GifSearch.jsx
import React, { useState } from "react";
import "./GifSearch.css";

function GifSearch() {
  const [query, setQuery] = useState("");
  const [allGifs, setAllGifs] = useState([]);
  const [displayCount, setDisplayCount] = useState(6);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchGifs = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    try {
      const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(
          query
        )}&api_key=${apiKey}&limit=30`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch GIFs");
      }
      const data = await res.json();
      setAllGifs(data.data);
      setDisplayCount(6); // reset display count
    } catch (err) {
      console.error("GIF fetch error:", err);
      setError("Oops! Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = () => {
    setDisplayCount((prev) => prev + 6);
  };

  return (
    <div className="gif-search">
      <input
        type="text"
        placeholder="Search soothing GIFs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={fetchGifs}>Search</button>

      {loading && <p>Loading GIFs...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="gif-results">
        {allGifs.slice(0, displayCount).map((gif) => (
          <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} />
        ))}
      </div>

      {displayCount < allGifs.length && (
        <div className="gif-show-more">
          <button onClick={handleShowMore}>Show More</button>
        </div>
      )}
    </div>
  );
}

export default GifSearch;
