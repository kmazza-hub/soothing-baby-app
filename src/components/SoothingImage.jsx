import React, { useState } from "react";

function SoothingImage() {
  const [imageUrl, setImageUrl] = useState("https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setImageUrl(localUrl);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Soothing Image</h2>
      <p>Upload a photo of your baby to personalize the experience</p>
      <img
        src={imageUrl}
        alt="Soothing Baby"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "10px" }}
      />
      <br />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ marginTop: "10px" }}
      />
    </div>
  );
}

export default SoothingImage;
