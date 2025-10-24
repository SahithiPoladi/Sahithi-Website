import React from 'react';
import './index.css';

// Palette per request
const COLORS = ['#a81c66', '#b82152', '#de3f52', '#ee5b48'];

/**
 * DecoratedSection wraps content and renders large accent rectangles inside the same container
 * sized relative to the container, not the full page background.
 *
 * props:
 * - id?: string (forwarded to section)
 * - side?: 'left' | 'right' | 'both' (default 'both')
 * - className?: string (appended)
 * - style?: React.CSSProperties
 * - children: React.ReactNode
 */
export default function DecoratedSection({ id, side = 'both', className = '', style, children }) {
    const leftPrimary = COLORS[0];
    const leftSecondary = COLORS[1];
    const rightPrimary = COLORS[2];
    const rightSecondary = COLORS[3];

    return (
        <section id={id} className={`decorated-section ${className}`} style={style}>
            {(side === 'left' || side === 'both') && (
                <>
                    <span className="accent-rect left-primary" style={{
                        ['--rect-color']: leftPrimary,
                        ['--glow']: hexToRgba(leftPrimary, 0.42)
                    }} />
                    <span className="accent-rect left-secondary" style={{
                        ['--rect-color']: leftSecondary,
                        ['--glow']: hexToRgba(leftSecondary, 0.36)
                    }} />
                </>
            )}

            {(side === 'right' || side === 'both') && (
                <>
                    <span className="accent-rect right-primary" style={{
                        ['--rect-color']: rightPrimary,
                        ['--glow']: hexToRgba(rightPrimary, 0.42)
                    }} />
                    <span className="accent-rect right-secondary" style={{
                        ['--rect-color']: rightSecondary,
                        ['--glow']: hexToRgba(rightSecondary, 0.36)
                    }} />
                </>
            )}

            <div className="decorated-section-content">
                {children}
            </div>
        </section>
    );
}

function hexToRgba(hex, alpha = 1) {
    const h = hex.replace('#', '');
    const bigint = parseInt(h, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
