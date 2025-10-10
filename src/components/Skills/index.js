import React from "react";
import { skills } from '../utils';
import { Tag } from 'antd';  

const Skills = () => {
    return (
        <div style={{maxWidth: '1200px', margin: '0 auto'}} id="skills">
            <h1 className="kaushan-script-regular" style={{fontSize: '50px', textAlign: 'center'}}>My Skill Set</h1>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "16px",
                    justifyItems: "center",
                }}
            >
            {skills.map((skill, index) => (
                <Tag
                    className="unna-regular"
                    key={index}
                    style={{
                    fontSize: "16px",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "30px",
                    background:
                        "linear-gradient(-45deg, #073b41, #2a655e, #235c4b, #040b14, #445454)",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
                    width: "fit-content",
                    textAlign: "center",
                    }}
                >
                    {skill}
                </Tag>
            ))}
            </div>
        </div>
    );
};

export default Skills;