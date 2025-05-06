# 👶🎵 Soothing Baby App

A responsive, React-based web app to help parents and caregivers soothe babies using calming tools like music, GIFs, timers, and personalized content.  
Built with ❤️ for my daughter — and submitted as the final capstone project for TripleTen’s Software Engineering program.

---

## 🌟 Features

- 🎵 Embedded **Spotify lullaby playlist** (auto-hides when the timer ends)
- 🎞️ Calming visuals powered by the **GIPHY API** with search
- 🕒 Soothing **timer** with pause/resume/reset
- 🔁 **White noise** toggle that syncs with the timer
- 📸 Upload a **personal baby photo**
- 📺 Save and display **favorite YouTube videos**
- ✅ **Hide and restore** feature cards (stored in `localStorage`)
- 📱 **Mobile-first** design with soft colors and real-world usability

---

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **APIs**: GIPHY API, Spotify Embed, YouTube iFrame API
- **Styling**: CSS using BEM methodology
- **Version Control**: Git + GitHub

---

## 📁 Project Structure

soothing-baby-app/
├── components/
│ ├── ToolCard.jsx
│ ├── GifSearch.jsx
│ ├── Timer.jsx
│ ├── WhiteNoise.jsx
│ ├── PersonalImage.jsx
│ ├── FavoriteVideos.jsx
│ └── RestorePanel.jsx
├── assets/
├── App.jsx
├── index.css
├── .env # For GIPHY API key (not committed)

yaml
Copy
Edit

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/kmazza-hub/soothing-baby-app.git
cd soothing-baby-app
2. Install dependencies
bash
Copy
Edit
npm install
3. Add your .env file with a GIPHY API key
env
Copy
Edit
VITE_GIPHY_API_KEY=your_giphy_api_key_here
4. Run the app locally
bash
Copy
Edit
npm run dev
Then open http://localhost:3001 in your browser.

🔗 Live Demo
👉 https://kmazza-hub.github.io/soothing-baby-app

✅ Project Status
Stage 1 complete — all functionality is responsive and working as intended.
Ready for review and merge to main.

🙌 Acknowledgments
Spotify Embed

GIPHY API

YouTube iFrame Player API

⚠️ Known Console Warnings:
This app embeds YouTube videos using <iframe>. You may see CORS errors in the console related to `googleads.g.doubleclick.net`. These originate from YouTube's internal ad scripts and do not affect functionality or user experience.


TripleTen Software Engineering Bootcamp