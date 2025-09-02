/*import React, { useEffect, useState } from "react";

function App() {
  const [particles, setParticles] = useState([]);
  const [showText, setShowText] = useState(false);
  const [glitters, setGlitters] = useState([]);
  const particleCount = 200;
  const text = "Coming Soon";

  useEffect(() => {
    // Create background particles
    let created = 0;
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev,
        {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: Math.random() * 3 + 1,
        },
      ]);
      created++;
      if (created >= particleCount) {
        clearInterval(interval);
        setTimeout(() => setShowText(true), 500);
      }
    }, 15);
  }, []);

  useEffect(() => {
    if (!showText) return;

    // Glitter effect along text
    const glitterInterval = setInterval(() => {
      const newGlitter = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * 0.5 + window.innerHeight * 0.25, // roughly text area
        r: Math.random() * 2 + 0.5,
        opacity: Math.random(),
      };
      setGlitters(prev => [...prev.slice(-50), newGlitter]); // keep last 50 glitters
    }, 100);

    return () => clearInterval(glitterInterval);
  }, [showText]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#01010a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
      }}
    
     
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff00ff" />
            <stop offset="50%" stopColor="#00ffff" />
            <stop offset="100%" stopColor="#ff00ff" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {particles.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.r}
            fill="url(#neonGradient)"
            style={{ filter: "url(#glow)" }}
          />
        ))}

        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {particles.map((p, i) => (
          <circle
            key={i}
            cx={g.x}
            cy={g.y}
            r={g.r}
            fill="white"
            style={{
              opacity: g.opacity,
              filter: "url(#glow)",
              transition: "opacity 0.2s",
            }}
          />
        ))}
      </svg>

      
      {showText && (
        <svg viewBox="0 0 1200 200" style={{ width: "80%", height: "auto" }}>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="'Dancing Script', cursive"
            fontSize="80"
            fill="none"
            stroke="url(#neonGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: "url(#glow)",
              strokeDasharray: 1000,
              strokeDashoffset: 0,
              animation: "flicker 1.5s infinite alternate",
            }}
          >
            {text}
          </text>
        </svg>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap');

        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
          20%, 22%, 24%, 55% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

export default App;
*/


import React from "react";
import FeaturedGames from "./components/FeaturedGames";
import GamingExperience from "./components/GamingExperience"; 
//import Event from "./components/EventsSection"; 
import { EventsSection as Event } from "./components/EventsSection";
 

function App() {
  return (
    <div>
      <FeaturedGames />
      <GamingExperience />
      <Event />
    </div>
  );
}

export default App;

