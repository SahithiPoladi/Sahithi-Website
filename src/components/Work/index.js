import React, { useMemo } from "react";
import { Card } from 'antd';
import { experiences } from '../../config';

const WorkItem = React.memo(({ exp }) => {
    return (
        <div style={{ minHeight: 120, display: 'flex', alignItems: 'center' }}>
            {exp ? (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        margin: '0 auto',
                        position: "relative",
                        zIndex: 1,
                        width: '100%'
                    }}
                    className="work-item"
                >
                    {/* Left side: title, company, duration */}
                    <div className="unna-regular work-left" style={{ width: "45%", textAlign: "right", paddingRight: "40px" }}>
                        <h2 style={{ marginBottom: '5px', color: '#000000' }}>{exp.title}</h2>
                        <h3 style={{ marginBottom: '5px', color: '#000000' }}>{exp.company}</h3>
                        <p style={{ marginBottom: '5px', color: '#000000' }}><strong>Duration:</strong> {exp.duration}</p>
                    </div>
                    {/* Timeline dot */}
                    <div
                        style={{
                            width: 0,
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            margin: "0 20px",
                        }}
                    >
                        <span
                            style={{
                                display: "block",
                                width: "18px",
                                height: "18px",
                                background: "#ff9657",
                                border: "4px solid #de3f52",
                                borderRadius: "50%",
                                position: "relative",
                                zIndex: 3,
                                boxShadow: "linear-gradient(45deg, #1c1026, #c6bbb9, #4c1e3c, #21242b, #7a748c) 0 0 8px #000",
                            }}
                        />
                    </div>
                    {/* Right side: applications, description */}
                    <div className="unna-regular work-right" style={{ width: "45%", textAlign: "left", paddingLeft: "40px" }}>
                        <p style={{ marginBottom: '10px' }}><strong>Applications:</strong> {exp.applications}</p>
                        <p style={{ margin: 0 }}>{exp.description}</p>
                    </div>
                </div>
            ) : (
                // lightweight placeholder keeps layout while avoiding heavy render work
                <div style={{ width: '100%', opacity: 0.6 }}>
                    <div style={{ height: 12, background: 'rgba(255,255,255,0.03)', marginBottom: 8, width: '60%' }} />
                    <div style={{ height: 8, background: 'rgba(255,255,255,0.02)', width: '40%' }} />
                </div>
            )}
        </div>
    );
});

const Work = () => {

    const experiencesItems = useMemo(() => {
        if (!experiences) return [];
        return [...experiences].sort((a, b) => (a._id < b._id ? 1 : -1));
    }, [experiences]);

    // Same palette and glow helpers as Projects
    const CARD_COLORS = ['#de3f52', '#a81c66', '#ee5b48', '#b82152'];
    const hashToIndex = (str, mod) => {
        if (!str) return 0;
        let h = 0;
        for (let i = 0; i < str.length; i++) {
            h = (h * 31 + str.charCodeAt(i)) >>> 0;
        }
        return h % mod;
    };
    const hexToRgba = (hex, alpha = 0.4) => {
        const h = hex.replace('#', '');
        const bigint = parseInt(h, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };
    const buildGlowBackground = (hex) => {
        const whiteCenter = 'rgba(255,255,255,0.18)';
        const strong = hexToRgba(hex, 0.18);
        const soft = hexToRgba(hex, 0.10);
        return [
            `radial-gradient(110% 110% at 50% 50%, ${whiteCenter} 0%, rgba(255,255,255,0) 55%)`,
            `radial-gradient(140% 100% at 50% 120%, ${soft} 0%, rgba(0,0,0,0) 60%)`,
            `radial-gradient(120% 95% at 0% 0%, ${strong} 0%, rgba(0,0,0,0) 60%)`,
            `radial-gradient(120% 95% at 100% 0%, ${soft} 0%, rgba(0,0,0,0) 62%)`
        ].join(', ');
    };

    const topThree = experiencesItems.slice(0, 3);

    return (
        <>
            <h1 className="kaushan-script-regular section-title">Professional Work Experience</h1>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
                <div
                    className="work-cards-grid"
                    style={{
                        display: 'grid',
                        gap: 24,
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        alignItems: 'stretch'
                    }}
                >
                    {topThree.map((exp) => {
                        const color = CARD_COLORS[hashToIndex(exp._id || exp.company || exp.title || '', CARD_COLORS.length)];
                        const glowStrong = hexToRgba(color, 0.55);
                        const glowSoft = hexToRgba(color, 0.28);
                        return (
                            <Card
                                key={exp._id}
                                className="card-border-gradient unna-regular"
                                style={{
                                    padding: 24,
                                    position: 'relative',
                                    color: '#000000',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'stretch',
                                    backgroundColor: color,
                                    backgroundImage: buildGlowBackground(color),
                                    boxShadow: `inset 0 0 44px ${glowStrong}, inset 0 0 120px ${glowSoft}`,
                                    borderRadius: 12,
                                    minHeight: 220
                                }}
                            >
                                <h2 style={{ marginTop: 0, marginBottom: 8 }}>{exp.title}</h2>
                                <h3 style={{ marginTop: 0, marginBottom: 8, opacity: 0.95 }}>{exp.company}</h3>
                                <p style={{ marginTop: 0, marginBottom: 12, opacity: 0.9 }}><strong>Duration:</strong> {exp.duration}</p>
                                {exp.applications && (
                                    <p style={{ marginTop: 0, marginBottom: 8, opacity: 0.95 }}><strong>Applications:</strong> {exp.applications}</p>
                                )}
                                {exp.description && (
                                    <p style={{ marginTop: 0, marginBottom: 0, lineHeight: 1.5 }}>{exp.description}</p>
                                )}
                            </Card>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Work;