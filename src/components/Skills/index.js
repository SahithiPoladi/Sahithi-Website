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

    const skillsArray = useMemo(() => {
        if (!skillsResponse) return [];
        return skillsResponse.skills?.[0]?.skills || [];
    }, [skillsResponse]);

    const tags = useMemo(() => skillsArray.map((skill, index) => <SkillTag key={index} skill={skill} />), [skillsArray]);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }} id="skills">
            <h1 className="kaushan-script-regular" style={{ fontSize: '50px', textAlign: 'center' }}>My Skill Set</h1>

            {isLoading ? (
                <div>Loading skills…</div>
            ) : isError ? (
                <div>Failed to load skills information</div>
            ) : <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "16px",
                    justifyItems: "center",
                }}
            >
                {tags}
            </div>}

        </div>
    );
};

export default Skills;