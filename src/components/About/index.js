import { Card } from "antd";
import React from "react";
import { aboutMe } from "../../config";

const About = () => {
    // Palette used across the site
    const BLEND_COLORS = ['#a81c66', '#b82152', '#de3f52', '#ee5b48'];

    const hexToRgba = (hex, alpha = 0.2) => {
        const h = hex.replace('#', '');
        const bigint = parseInt(h, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    // Build a professional, soft multi-layer glow blending the 4 colors
    const buildAboutGlowBackground = () => {
        const [c1, c2, c3, c4] = BLEND_COLORS;
        return [
            // Subtle white center highlight for readability
            `radial-gradient(110% 110% at 50% 45%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 55%)`,
            // Gentle vignettes from edges using palette hues
            `radial-gradient(140% 100% at 50% 115%, ${hexToRgba(c3, 0.10)} 0%, rgba(0,0,0,0) 60%)`,
            `radial-gradient(120% 95% at 0% 0%, ${hexToRgba(c1, 0.14)} 0%, rgba(0,0,0,0) 58%)`,
            `radial-gradient(120% 95% at 100% 0%, ${hexToRgba(c2, 0.12)} 0%, rgba(0,0,0,0) 60%)`,
            // Base 4-color blend
            `linear-gradient(135deg, ${c1} 0%, ${c2} 33%, ${c3} 66%, ${c4} 100%)`
        ].join(', ');
    };
    const renderWithLineBreaks = (text) => {
        if (!text && text !== 0) return null;
        const parts = String(text).split(/<br\s*\/?\s*>/gi);
        return parts.map((part, i) => (
            <React.Fragment key={i}>
                {part}
                {i < parts.length - 1 && <br />}
            </React.Fragment>
        ));
    };

    const points = aboutMe?.[0]?.data ?? [];

    return (
        <div style={{ padding: '0 16px' }}>
            <h1 className="kaushan-script-regular section-title">About Me</h1>
            <Card
                style={{
                    maxWidth: '1000px',
                    margin: '0 auto',
                    textAlign: 'left',
                    // Professional 4-color blended glow background
                    backgroundImage: buildAboutGlowBackground(),
                    backgroundBlendMode: 'overlay',
                    // Inward soft glow for depth and polish
                    boxShadow: [
                        `inset 0 0 40px ${hexToRgba(BLEND_COLORS[0], 0.28)}`,
                        `inset 0 0 80px ${hexToRgba(BLEND_COLORS[1], 0.20)}`,
                        `inset 0 0 120px ${hexToRgba(BLEND_COLORS[2], 0.16)}`,
                        `inset 0 0 160px ${hexToRgba(BLEND_COLORS[3], 0.12)}`
                    ].join(', '),
                    borderRadius: 12,
                    color: '#000000'
                }}
                className="unna-regular card-border-gradient"
            >
                {points.map(point => (
                    <p key={point.id} className="unna-regular">
                        {renderWithLineBreaks(point.points)}
                    </p>
                ))}
            </Card>
        </div>
    );
};

export default About;