import React, { useMemo } from "react";
import { skills } from '../utils';
import { Tag } from 'antd';
import { fetchSkillsQuery } from '../../apiService';
import { useQuery } from '@tanstack/react-query';


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
    const {
        data: skillsResponse,
        isLoading: skillsLoading
    } = useQuery({ queryKey: ['skills'], queryFn: fetchSkillsQuery });

    const skillsArray = useMemo(() => {
        if (!skillsResponse) return [];
        if (Array.isArray(skillsResponse)) return skillsResponse;
        if (Array.isArray(skillsResponse.skills) && skillsResponse.skills.length > 0) {
            const first = skillsResponse.skills[0];
            if (first && Array.isArray(first.skills)) return first.skills;
        }
        if (Array.isArray(skillsResponse.skills) && skillsResponse.skills.every(s => typeof s === 'string')) {
            return skillsResponse.skills;
        }
        return [];
    }, [skillsResponse]);

    const tags = useMemo(() => skillsArray.map((skill, index) => <SkillTag key={index} skill={skill} />) || [], [skillsArray]);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }} id="skills">
            <h1 className="kaushan-script-regular" style={{ fontSize: '50px', textAlign: 'center' }}>My Skill Set</h1>
            {
                skillsLoading ?
                    <p style={{ textAlign: 'center', color: '#d9dddc' }}>Loading skills...</p> :
                    skillsResponse?.length === 0 ?
                        <p style={{ textAlign: 'center', color: '#d9dddc' }}>No skills found.</p> :
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
            }

        </div>
    );
};

export default Skills;