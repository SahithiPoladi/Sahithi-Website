import React from "react";
import "./index.css";

const StarsBackground = () => {
  // Palette requested by the user
  const PALETTE = ["#1c1026", "#c6bbb9", "#4c1e3c", "#21242b", "#7a748c"];
  const STAR_COUNT = 180;

  // helper to convert hex to rgba string with alpha
  const hexToRgba = (hex, alpha = 1) => {
    const h = hex.replace('#', '');
    const bigint = parseInt(h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const stars = Array.from({ length: STAR_COUNT }).map((_, i) => {
    const left = Math.random() * 100; // vw
    const top = Math.random() * 100; // vh
    const size = Math.random() * 2 + 0.8; // px
    const delay = Math.random() * 6; // s
    const duration = 1.5 + Math.random() * 4; // s
    const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    const glow = hexToRgba(color, 0.98);

    const style = {
      left: `${left}vw`,
      top: `${top}vh`,
      width: `${size}px`,
      height: `${size}px`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      backgroundColor: color,
      boxShadow: `0 0 ${Math.max(6, size * 6)}px ${Math.max(2, size + 1)}px ${glow}`,
      opacity: 1,
    };

    return <span key={`star-${i}`} className="star" style={style} aria-hidden="true" />;
  });

  return <div className="stars-overlay">{stars}</div>;
};

export default StarsBackground;
