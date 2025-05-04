import React, { useState } from "react";

function PersonalImage() {
  const [imageSrc, setImageSrc] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
    }
  };

  return (
    <div className="personal-image">
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Personal Baby"
          style={{ width: "100%", borderRadius: "10px", marginBottom: "10px" }}
        />
      )}
      <input type="file" accept="image/*" onChange={handleImageUpload} />
    </div>
  );
}

export default PersonalImage;
