👶🎵 Soothing Baby App
A responsive React-based web app to help parents and caregivers soothe babies using calming tools like music, GIFs, timers, and personalized content.
Built with ❤️ for my daughter — and submitted as the final capstone project for the TripleTen Software Engineering program.

🌟 Features
🎵 Embedded Spotify lullaby playlist (auto-hides when the timer ends)

🎞️ Calming visuals powered by the GIPHY API (with search and pagination)

🕒 Soothing timer with pause/resume/reset

🔁 White noise toggle that syncs with the timer

📸 Upload and display a personal baby photo

📺 Save and display favorite YouTube videos

✅ Hide and restore any feature card (state saved in localStorage)

📱 Mobile-first, fully responsive UI designed for real-world usability

🛠️ Tech Stack
Frontend: React + Vite

APIs: GIPHY API, Spotify Embed, YouTube IFrame

Styling: CSS with BEM methodology

Version Control: Git + GitHub

📁 Project Structure
pgsql
Copy
Edit
soothing-baby-app/
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── ToolCard.jsx
│   ├── GifSearch.jsx
│   ├── Timer.jsx
│   ├── WhiteNoise.jsx
│   ├── PersonalImage.jsx
│   ├── FavoriteVideos.jsx
│   ├── RestorePanel.jsx
│   ├── LoginModal.jsx
├── pages/
│   └── AboutPage.jsx
├── assets/
├── App.jsx
├── index.css
├── .env            # (For GIPHY API key - not committed)
🚀 Getting Started
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/kmazza-hub/soothing-baby-app.git
cd soothing-baby-app
2. Install dependencies
bash
Copy
Edit
npm install
3. Create a .env file
ini
Copy
Edit
VITE_GIPHY_API_KEY=your_giphy_api_key_here
4. Run the app locally
bash
Copy
Edit
npm run dev
Then visit: http://localhost:3001

🔗 Live Demo
👉 https://kmazza-hub.github.io/soothing-baby-app

✅ Project Status
✅ Stage 1 complete – all core functionality is implemented and responsive
🚀 Ready for code review and merge to main

🙌 Acknowledgments
Spotify Embed

GIPHY API

YouTube IFrame API

TripleTen Software Engineering Bootcamp

⚠️ Console Notes
This app embeds YouTube videos via <iframe>. You may see CORS warnings (e.g. from googleads.g.doubleclick.net) in the console. These originate from YouTube ad scripts and do not affect functionality.