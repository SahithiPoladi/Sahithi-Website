import React, { useMemo } from "react";
import { Tag } from 'antd';
import { skills } from '../../config';

const SkillTag = React.memo(({ skill }) => (
    <Tag
        className="unna-regular"
        style={{
            fontSize: "16px",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "30px",
            background: "linear-gradient(45deg, #a81c66, #b82152, #de3f52, #ee5b48)",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
            width: "fit-content",
            textAlign: "center",
        }}
    >
        {skill}
    </Tag>
));

const Skills = () => {
    const skillsArray = useMemo(() => {
        if (!skills) return [];
        return skills?.[0]?.skills || [];
    }, [skills]);

    const tags = useMemo(() => skillsArray.map((skill, index) => <SkillTag key={index} skill={skill} />), [skillsArray]);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }} id="skills">
            <h1 className="kaushan-script-regular section-title">My Skill Set</h1>
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

        </div>
    );
};

export default Skills;