import React, { useState } from "react";
import "./SoothingImage.css"; // Optional: move inline styles here

function SoothingImage() {
  const defaultImage =
    "https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif";
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...urls]);
  };

  const removeImage = (urlToRemove) => {
    setImages((prev) => prev.filter((url) => url !== urlToRemove));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Soothing Image</h2>
      <p>Upload a photo of your baby to personalize the experience</p>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        {images.length === 0 ? (
          <img
            src={defaultImage}
            alt="Default soothing"
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "10px",
            }}
          />
        ) : (
          images.map((url, index) => (
            <div
              key={index}
              style={{ position: "relative", display: "inline-block" }}
            >
              <img
                src={url}
                alt={`Uploaded ${index}`}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <button
                onClick={() => removeImage(url)}
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "22px",
                  height: "22px",
                  cursor: "pointer",
                }}
              >
                ✖
              </button>
            </div>
          ))
        )}
      </div>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        style={{ marginTop: "10px" }}
      />
    </div>
  );
}

export default SoothingImage;
