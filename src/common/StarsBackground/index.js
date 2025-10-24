import React, { useMemo, useEffect, useRef } from "react";
import "./index.css";

const StarsBackground = ({ palette }) => {
  // Palette (can be provided by parent). Defaults to the site's requested palette if not given.
  const PALETTE = Array.isArray(palette) && palette.length > 0
    ? palette
    : ["#de3f52", "#a81c66", "#ee5b48", "#b82152"]; // default to requested reds palette
  // Reduced default star count to improve performance on low-end devices
  const STAR_COUNT = (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 768px)').matches) ? 60 : 120;

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
      const glow = hexToRgba(color, 0.6);

      // Use CSS variables to control per-star visuals (size, glow, halo)
      const style = {
        left: `${left}vw`,
        top: `${top}vh`,
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        backgroundColor: hexToRgba(color, 1),
        '--star-size': `${size}px`,
        '--glow-color': glow,
        '--glow-radius': `${Math.max(8, size * 6)}px`,
        '--halo-alpha': `${Math.max(0.03, Math.min(0.18, 0.03 + size * 0.03))}`,
        boxShadow: `0 0 ${Math.max(6, size * 5)}px ${Math.max(1.5, size * 1.2)}px ${hexToRgba(color, 0.45)}`,
        opacity: 1,
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

  // Pause star animations while the user is actively scrolling quickly to
  // reduce expensive repaints/paints that can cause blank frames. We
  // respect prefers-reduced-motion and do nothing if the user requests
  // reduced motion.
  const overlayRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timeout = null;
    const onScroll = () => {
      const el = overlayRef.current;
      if (!el) return;
      // add class that will pause CSS animations
      el.classList.add('is-scrolling');
      if (timeout) clearTimeout(timeout);
      // resume animations shortly after scrolling stops
      timeout = setTimeout(() => {
        el.classList.remove('is-scrolling');
        timeout = null;
      }, 150);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  // On small screens or if reduced-motion is preferred, render nothing to avoid jank
  const isSmall = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 480px)').matches;
  const reduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isSmall || reduced) {
    return null;
  }

  // Expose palette to CSS via custom properties for ::before/::after decorative dots
  const overlayStyle = {
    "--palette-1": PALETTE[0] || '#de3f52',
    "--palette-2": PALETTE[1] || '#a81c66',
    "--palette-3": PALETTE[2] || '#ee5b48',
    "--palette-4": PALETTE[3] || '#b82152',
  };

  return (
    <div ref={overlayRef} className="stars-overlay" aria-hidden="true" style={overlayStyle}>
      {stars}
    </div>
  );
};

export default React.memo(StarsBackground);
