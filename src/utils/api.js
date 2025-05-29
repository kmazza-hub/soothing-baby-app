// src/utils/api.js

// Base URL for API requests – fallback added for production safety
const API_BASE = import.meta.env.VITE_API_URL || "https://your-backend.onrender.com/api"; // 🔁 Replace with your actual backend URL

// Helper to retrieve token from localStorage
const getToken = () => localStorage.getItem("token");

// Generic authenticated fetch wrapper with debug logging
export const fetchWithAuth = async (endpoint, options = {}) => {
  const token = getToken();

  console.log("🔥 fetchWithAuth called:", endpoint);
  console.log("📦 Token:", token);

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    });

    console.log("📬 Response status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API error: ${res.status} - ${errorText}`);
    }

    const data = await res.json();
    console.log("✅ Response data:", data);
    return data;
  } catch (err) {
    console.error("❌ fetchWithAuth error:", err.message);
    throw err;
  }
};

//
// 🔐 AUTH
//

// Sign up a new user
export const signupUser = async (formData) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error("Signup failed");
  return res.json(); // { user, token }
};

// Log in existing user
export const loginUser = async (formData) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json(); // { user, token }
};

//
// 🎥 VIDEOS
//

// Get all videos for the logged-in user
export const getVideos = () => {
  return fetchWithAuth("/videos");
};

// Add a new favorite video
export const addVideo = (videoData) => {
  return fetchWithAuth("/videos", {
    method: "POST",
    body: JSON.stringify(videoData),
  });
};

// Delete a video by ID
export const deleteVideo = (videoId) => {
  return fetchWithAuth(`/videos/${videoId}`, {
    method: "DELETE",
  });
};
