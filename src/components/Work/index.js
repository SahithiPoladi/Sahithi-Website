import React, { useMemo } from "react";
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

    return (
        <>
            <h1 className="kaushan-script-regular section-title">Professional Work Experience</h1>
            <div style={{ position: "relative", maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
                <div
                    className="work-timeline"
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: 0,
                        bottom: 0,
                        width: "4px",
                        background: "linear-gradient(45deg, #a81c66, #b82152, #de3f52, #ee5b48)",
                        transform: "translateX(-50%)",
                        zIndex: 0
                    }}
                />

                {experiencesItems.map((exp) => (
                    <WorkItem key={exp._id} exp={exp} />
                ))}
            </div>
        </>
    );
};

export default Work;