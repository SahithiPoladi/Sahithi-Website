import React, { useMemo } from "react";
import { Tag } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { fetchSkillsQuery } from '../../apiService';

const SkillTag = React.memo(({ skill }) => (
    <Tag
        className="unna-regular"
        style={{
            fontSize: "16px",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "30px",
            background:
                "linear-gradient(60deg, #073b41, #2a655e, #235c4b, #040b14, #445454)",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
            width: "fit-content",
            textAlign: "center",
        }}
    >
        {skill}
    </Tag>
));

const Skills = () => {
    const { data: skillsResponse, isLoading, isError } = useQuery({ queryKey: ['skills'], queryFn: fetchSkillsQuery });

    // Derive the skills array from the API shape: skillsResponse.skills[0].skills
    const skillsArray = useMemo(() => {
        if (!skillsResponse) return [];
        // safe navigation: skillsResponse.skills is an array containing objects with a 'skills' array
        return skillsResponse.skills?.[0]?.skills || [];
    }, [skillsResponse]);

    const tags = useMemo(() => skillsArray.map((skill, index) => <SkillTag key={index} skill={skill} />), [skillsArray]);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }} id="skills">
            <h1 className="kaushan-script-regular" style={{ fontSize: '50px', textAlign: 'center' }}>My Skill Set</h1>

            {isLoading && (
                <div style={{ textAlign: 'center', padding: 24 }}>Loading skills…</div>
            )}

            {isError && (
                <div style={{ textAlign: 'center', padding: 24, color: 'var(--danger, #ff6b6b)' }}>Failed to load skills.</div>
            )}

            {!isLoading && !isError && (
                <>
                    <div style={{ textAlign: 'center', marginBottom: 12 }} className="unna-regular">
                        Showing {skillsArray.length} skills
                    </div>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "16px",
                            justifyItems: "center",
                        }}
                    >
                        {tags}
                    </div>
                </>
            )}
        </div>
    );
};

export default Skills;