import React from "react";
import "./index.css";

const StarsBackground = () => {
  // Palette requested by the user
  const PALETTE = ["#B1D4EF", "#BEDBF0", "#C7EBF2", "#D7EDEB", "#EBF8F5"];
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
    const glow = hexToRgba(color, 0.35);

    // Use CSS variables to control per-star visuals (size, glow, halo)
    const style = {
      left: `${left}vw`,
      top: `${top}vh`,
      // base element is a small bright core; spikes are created in CSS pseudo-elements
      width: `${size}px`,
      height: `${size}px`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      // use the palette color for the core (less glaring than pure white)
      backgroundColor: hexToRgba(color, 0.95),
      // expose variables for the CSS to consume
      '--star-size': `${size}px`,
      '--glow-color': glow,
      // Larger glow radius for a softer halo (improves 'beautiful' look)
      // smaller, subtler glow radius for a softer, less-bright look
      '--glow-radius': `${Math.max(8, size * 6)}px`,
      // control halo alpha separately (reduced)
      '--halo-alpha': `${Math.max(0.03, Math.min(0.18, 0.03 + size * 0.03))}`,
      // reduced box-shadow fallback using a lower-alpha glow color
      boxShadow: `0 0 ${Math.max(4, size * 4)}px ${Math.max(1, size)}px ${hexToRgba(color, 0.22)}`,
      opacity: 0.9,
    };

    return <span key={`star-${i}`} className="star" style={style} aria-hidden="true" />;
  });

  return <div className="stars-overlay">{stars}</div>;
};

export default StarsBackground;
