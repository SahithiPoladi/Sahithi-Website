import React, { useMemo } from "react";
import "./index.css";

const StarsBackground = () => {
  // Palette requested by the user
  const PALETTE = ["#B1D4EF", "#BEDBF0", "#C7EBF2", "#D7EDEB", "#EBF8F5"];
  // Reduced default star count to improve performance on low-end devices
  const STAR_COUNT = 120;

  // helper to convert hex to rgba string with alpha
  const hexToRgba = (hex, alpha = 1) => {
    const h = hex.replace('#', '');
    const bigint = parseInt(h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Memoize star generation so it only runs once per mount. This avoids
  // regenerating random positions on every parent re-render which can be
  // expensive and also cause layout churn.
  const stars = useMemo(() => {
    return Array.from({ length: STAR_COUNT }).map((_, i) => {
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
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        backgroundColor: hexToRgba(color, 0.95),
        '--star-size': `${size}px`,
        '--glow-color': glow,
        '--glow-radius': `${Math.max(8, size * 6)}px`,
        '--halo-alpha': `${Math.max(0.03, Math.min(0.18, 0.03 + size * 0.03))}`,
        boxShadow: `0 0 ${Math.max(4, size * 4)}px ${Math.max(1, size)}px ${hexToRgba(color, 0.22)}`,
        opacity: 0.9,
        // hint to the browser this element will only be transformed/opacity-changed
        willChange: 'opacity, transform',
        pointerEvents: 'none',
      };

      return (
        <span
          key={`star-${i}`}
          className="star"
          style={style}
          aria-hidden="true"
        />
      );
    });
  }, []);

  return <div className="stars-overlay" aria-hidden="true">{stars}</div>;
};

export default React.memo(StarsBackground);
