import React from 'react';
import './index.css';

// Color palette requested
const COLORS = ['#a81c66', '#b82152', '#de3f52', '#ee5b48'];

function hexToRgba(hex, alpha = 1) {
    const h = hex.replace('#', '');
    const bigint = parseInt(h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Two large overlapping rectangles on each side with radiant glow.
 * Positioned to frame content while staying behind it.
 */
const RectanglesBackground = () => {
    // Choose colors deterministically for consistency across renders
    const leftPrimary = COLORS[0];
    const leftSecondary = COLORS[1];
    const rightPrimary = COLORS[2];
    const rightSecondary = COLORS[3];

    return (
        <div className="rectangles-overlay" aria-hidden="true">
            {/* Left group */}
            <span
                className="rect-shape"
                style={{
                    left: '-10vw',
                    top: '8vh',
                    width: '52vw',
                    height: '56vh',
                    transform: 'rotate(-8deg)',
                    '--rect-color': leftPrimary,
                    '--glow': hexToRgba(leftPrimary, 0.4),
                }}
            />
            <span
                className="rect-shape"
                style={{
                    left: '-6vw',
                    top: '24vh',
                    width: '44vw',
                    height: '48vh',
                    transform: 'rotate(-3deg)',
                    '--rect-color': leftSecondary,
                    '--glow': hexToRgba(leftSecondary, 0.38),
                }}
            />

            {/* Right group */}
            <span
                className="rect-shape"
                style={{
                    right: '-10vw',
                    top: '12vh',
                    width: '52vw',
                    height: '56vh',
                    transform: 'rotate(10deg)',
                    '--rect-color': rightPrimary,
                    '--glow': hexToRgba(rightPrimary, 0.4),
                }}
            />
            <span
                className="rect-shape"
                style={{
                    right: '-6vw',
                    top: '30vh',
                    width: '44vw',
                    height: '48vh',
                    transform: 'rotate(4deg)',
                    '--rect-color': rightSecondary,
                    '--glow': hexToRgba(rightSecondary, 0.38),
                }}
            />
        </div>
    );
};

export default React.memo(RectanglesBackground);
