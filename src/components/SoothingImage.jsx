import React, { useState, useEffect, useContext } from "react";
import { fetchWithAuth } from "../utils/api";
import { UserContext } from "../contexts/UserContext";

const DEFAULT_IMAGE = "/baby.jpg"; // ✅ Correct public path for Vite

function SoothingImage() {
  const { isLoggedIn } = useContext(UserContext);
  const [imageUrl, setImageUrl] = useState(DEFAULT_IMAGE);
  const [loading, setLoading] = useState(false);

  // 🔁 Load image from backend if logged in, otherwise show default
  useEffect(() => {
    console.log("🔍 isLoggedIn:", isLoggedIn);

    if (!isLoggedIn) {
      setImageUrl(DEFAULT_IMAGE);
      return;
    }

    fetchWithAuth("/images")
      .then((data) => {
        console.log("📡 Fetched image from backend:", data?.imageUrl);
        if (data?.imageUrl && data.imageUrl.trim() !== "") {
          setImageUrl(data.imageUrl);
        } else {
          setImageUrl(DEFAULT_IMAGE);
        }
      })
      .catch((err) => {
        console.error("❌ Failed to fetch image:", err);
        setImageUrl(DEFAULT_IMAGE);
      });
  }, [isLoggedIn]);

  // 📤 Upload a new soothing image
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setLoading(true);

    try {
      const res = await fetchWithAuth("/images", {
        method: "POST",
        body: formData,
        headers: {}, // Allow multipart auto-handling
      });

      if (res.imageUrl && res.imageUrl.trim() !== "") {
        setImageUrl(res.imageUrl);
      } else {
        alert("Server did not return a valid image URL.");
      }
    } catch {
      alert("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="soothing-image" style={{ textAlign: "center" }}>
      <h2>Soothing Image</h2>
      <p>
        {isLoggedIn
          ? "Upload a photo of your baby to personalize the experience"
          : "Default image shown until login"}
      </p>

      <img
        src={imageUrl}
        alt="Soothing baby"
        style={{
          width: "100%",
          maxWidth: "300px",
          borderRadius: "12px",
          marginBottom: "10px",
        }}
      />

      {isLoggedIn && (
        <>
          <br />
          <label
            htmlFor="soothing-upload"
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "4px",
            }}
          >
            Upload New Image
          </label>
          <input
            id="soothing-upload"
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={loading}
            title="Upload soothing baby photo"
            aria-label="Upload soothing baby photo"
          />
          {loading && <p>Uploading...</p>}
        </>
      )}
    </div>
  );
}

export default SoothingImage;
