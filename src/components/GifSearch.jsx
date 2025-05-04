import React, { useState } from "react";

function GifSearch() {
  const [query, setQuery] = useState("soothing baby");
  const [gifs, setGifs] = useState([]);

  const apiKey = import.meta.env.VITE_GIPHY_API_KEY;

  const handleSearch = async () => {
    try {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=5&rating=g`
      );
      const data = await res.json();
      setGifs(data.data);
    } catch (err) {
      console.error("GIF fetch failed:", err);
    }
  };

  return (
    <div className="gif-search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search calming GIFs..."
      />
      <button onClick={handleSearch}>Search</button>

      <div className="gif-results">
        {gifs.map((gif) => (
          <img
            key={gif.id}
            src={gif.images.fixed_height.url}
            alt={gif.title}
            style={{ margin: "10px", borderRadius: "8px" }}
          />
        ))}
      </div>
    </div>
  );
}

export default GifSearch;
