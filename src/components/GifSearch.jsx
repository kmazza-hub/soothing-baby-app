import React, { useState } from "react";
import "./GifSearch.css";

function GifSearch() {
  const [query, setQuery] = useState("");
  const [allGifs, setAllGifs] = useState([]);
  const [displayCount, setDisplayCount] = useState(6);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false); // NEW

  const fetchGifs = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    setSearched(true); // NEW
    try {
      const apiKey = import.meta.env.VITE_GIPHY_API_KEY;
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(query)}&api_key=${apiKey}&limit=30`
      );
      if (!res.ok) throw new Error("Failed to fetch GIFs");
      const data = await res.json();
      setAllGifs(data.data);
      setDisplayCount(6);
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

      {loading && <p className="loading">Loading GIFs...</p>}
      {error && <p className="error">{error}</p>}
      {searched && !loading && allGifs.length === 0 && !error && (
        <p className="error">Nothing found</p>
      )}

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
