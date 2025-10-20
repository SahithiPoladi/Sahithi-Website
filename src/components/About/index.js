import { Card } from "antd";
import React from "react";
import { aboutMe } from "../../config";

const About = () => {
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