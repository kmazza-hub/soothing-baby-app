// src/utils/api.js

// ✅ Use HTTPS API base from environment (crabdance domain via Netlify)
const API_BASE = import.meta.env.VITE_API_URL;
console.log("🔍 Using API:", API_BASE);

// 🔐 Retrieve token from localStorage
const getToken = () => localStorage.getItem("token");

// ✅ Generic authenticated fetch wrapper
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

export const signupUser = async (formData) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Signup failed:", errorText);
    throw new Error("Signup failed: " + errorText);
  }

  return res.json(); // { user, token }
};

export const loginUser = async (formData) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const text = await res.text();
  if (!res.ok) {
    console.error("Login failed:", text);
    throw new Error("Login failed: " + text);
  }

  return JSON.parse(text);
};

//
// 🎥 VIDEOS
//

export const getVideos = () => {
  return fetchWithAuth("/videos");
};

export const addVideo = (videoData) => {
  return fetchWithAuth("/videos", {
    method: "POST",
    body: JSON.stringify(videoData),
  });
};

export const deleteVideo = (videoId) => {
  return fetchWithAuth(`/videos/${videoId}`, {
    method: "DELETE",
  });
};
