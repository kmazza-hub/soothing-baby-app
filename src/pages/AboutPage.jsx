// src/pages/AboutPage.jsx
import React from "react";
import "./AboutPage.css";

function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-page__section">
        <h1 className="about-page__title">About Soothing Baby App</h1>
        <p className="about-page__text">
          This app was created with love to help parents and caregivers calm their little ones
          through soothing visuals, gentle lullabies, white noise, timers, and personalized content.
        </p>
        <p className="about-page__text">
          Built with React and real parenting inspiration as a final capstone for TripleTen’s
          Software Engineering program.
        </p>
      </section>
    </main>
  );
}

export default AboutPage;
