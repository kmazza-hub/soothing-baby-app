import React, { useState, useEffect } from "react";

function SoothingImage() {
  const [images, setImages] = useState([]);

  // Load saved base64 images from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("soothingImages");
    if (saved) {
      setImages(JSON.parse(saved));
    }
  }, []);

  // Save images to localStorage when they change
  useEffect(() => {
    localStorage.setItem("soothingImages", JSON.stringify(images));
  }, [images]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    Promise.all(
      files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result); // base64 string
          reader.readAsDataURL(file);
        });
      })
    ).then((base64Images) => {
      setImages((prev) => [...prev, ...base64Images]);
    });
  };

  const handleRemoveImage = (indexToRemove) => {
    const updated = images.filter((_, index) => index !== indexToRemove);
    setImages(updated);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Soothing Image</h2>
      <p>Upload a photo of your baby to personalize the experience</p>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
        {images.map((url, index) => (
          <div key={index} style={{ position: "relative", display: "inline-block" }}>
            <img
              src={url}
              alt={`Soothing Baby ${index}`}
              style={{ width: "100%", maxWidth: "200px", borderRadius: "10px" }}
            />
            <button
              onClick={() => handleRemoveImage(index)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                backgroundColor: "rgba(255, 0, 0, 0.8)",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                cursor: "pointer",
              }}
              title="Remove"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <br />
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        style={{ marginTop: "10px" }}
      />
    </div>
  );
}

export default SoothingImage;
