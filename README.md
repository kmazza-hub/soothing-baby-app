:

👶🎵 Soothing Baby App
A responsive, React-based web app to help parents and caregivers soothe babies using calming tools like music, GIFs, timers, and personalized content.
Built with ❤️ for my daughter — and submitted as the final capstone project for TripleTen’s Software Engineering program.

🌟 Features
🎵 Embedded Spotify lullaby playlist (auto-hides when the timer ends)

🎞️ Calming visuals powered by the GIPHY API (with search)

🕒 Soothing timer with pause/resume/reset

🔁 White noise toggle that syncs with timer

📸 Upload a personal baby photo

📺 Save and display favorite YouTube videos

✅ Hide and restore feature cards (stored in localStorage)

📱 Mobile-first design with soft colors and real-world usability

🛠️ Tech Stack
Frontend: React + Vite

APIs: GIPHY API, Spotify Embed, YouTube iFrame

Styling: CSS (BEM methodology)

Version Control: Git + GitHub

📁 Project Structure
bash
Copy
Edit
soothing-baby-app/
├── components/
│   ├── ToolCard.jsx
│   ├── GifSearch.jsx
│   ├── Timer.jsx
│   ├── WhiteNoise.jsx
│   ├── PersonalImage.jsx
│   ├── FavoriteVideos.jsx
│   └── RestorePanel.jsx
├── assets/
├── App.jsx
├── index.css
├── .env         # For GIPHY API key (not committed)
🚀 Getting Started
Clone the repo

bash
Copy
Edit
git clone https://github.com/kmazza-hub/soothing-baby-app.git
cd soothing-baby-app
Install dependencies

bash
Copy
Edit
npm install
Create a .env file

ini
Copy
Edit
VITE_GIPHY_API_KEY=your_giphy_api_key_here
Run the app locally

bash
Copy
Edit
npm run dev
Then visit: http://localhost:3001

✅ Project Status
This project is currently in Stage 1 development as part of a full-stack portfolio build. All core functionality is complete and responsive.

🙌 Acknowledgments
Spotify Embed

GIPHY API

TripleTen Software Engineering Bootcamp

server: Netlify