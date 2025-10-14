import React, { useMemo } from "react";
import { useQuery } from '@tanstack/react-query';
import { fetchExperienceQuery } from '../../apiService';

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
                >
                    {/* Left side: title, company, duration */}
                    <div className="unna-regular" style={{ width: "45%", textAlign: "right", paddingRight: "40px" }}>
                        <h2 style={{ marginBottom: '5px' }}>{exp.title}</h2>
                        <h3 style={{ marginBottom: '5px' }}>{exp.company}</h3>
                        <p style={{ marginBottom: '5px' }}><strong>Duration:</strong> {exp.duration}</p>
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
                                background: "#cccccc",
                                border: "4px solid #222",
                                borderRadius: "50%",
                                position: "relative",
                                zIndex: 3,
                                boxShadow: "linear-gradient(45deg, #1c1026, #c6bbb9, #4c1e3c, #21242b, #7a748c) 0 0 8px #000",
                            }}
                        />
                    </div>
                    {/* Right side: applications, description */}
                    <div className="unna-regular" style={{ width: "45%", textAlign: "left", paddingLeft: "40px" }}>
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
    // fetch experiences once at the parent level
    const { data: experienceResponse, isLoading, isError, error } = useQuery({ queryKey: ['experience'], queryFn: fetchExperienceQuery });

    const experiences = useMemo(() => {
        if (!experienceResponse?.experiences) return [];
        return [...experienceResponse.experiences].sort((a, b) => (a._id < b._id ? 1 : -1));
    }, [experienceResponse]);

    return (
        <>
            <h1 className="kaushan-script-regular" style={{ fontSize: '50px', textAlign: 'center' }}>Professional Work Experience</h1>
            {isLoading ? (
                <div>Loading experiences…</div>
            ) : isError ? (
                <div>Failed to load experiences information</div>
            ) : (
                <div style={{ position: "relative", maxWidth: '1200px', margin: '0 auto' }}>
                    <div
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: 0,
                            bottom: 0,
                            width: "4px",
                            background: "linear-gradient(180deg, #1c1026, #c6bbb9, #4c1e3c, #21242b, #7a748c)",
                            transform: "translateX(-50%)",
                            zIndex: 0
                        }}
                    />

                    {experiences.map((exp) => (
                        <WorkItem key={exp._id} exp={exp} />
                    ))}
                </div>
            )}
        </>
    );
};

export default Work;