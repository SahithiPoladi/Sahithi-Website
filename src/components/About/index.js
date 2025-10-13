import { Card } from "antd";
import React from "react";
import { useQuery } from '@tanstack/react-query';
import { fetchAboutQuery } from '../../apiService';

const About = () => {
    const {
        data: aboutResponse, isLoading, isError
    } = useQuery({ queryKey: ['about'], queryFn: fetchAboutQuery });

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

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Failed to load about information.</div>;

    const points = aboutResponse?.aboutMe?.[0]?.data ?? [];

    return (
        <div>
            <h1 className="kaushan-script-regular" style={{ fontSize: '50px', textAlign: 'center' }}>About Me</h1>
            <Card
                style={{
                    maxWidth: '1200px',
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