import React from "react";
import { experience } from "../config";

const Work = () => {
  // Sort experience by descending id
  const sortedExperience = [...experience].sort((a, b) => b.id - a.id);
  return (
    <div style={{ margin: "40px 0", position: "relative" }}>
      <div style={{
        position: "absolute",
        left: "50%",
        top: 0,
        bottom: 0,
        width: "4px",
        background: "black",
        transform: "translateX(-50%)",
        zIndex: 0,
      }} />
      {sortedExperience.map((exp, idx) => (
        <div
          key={exp.id}
          style={{
            display: "flex",
            alignItems: "center",
            margin: "40px 0",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Left side: title, company, duration */}
          <div style={{ width: "45%", textAlign: "right", paddingRight: "40px" }}>
            <h2 style={{ marginBottom: '5px' }}>{exp.title}</h2>
            <h3 style={{ marginBottom: '5px', color: 'black' }}>{exp.company}</h3>
            <p style={{ marginBottom: '5px' }}><strong>Duration:</strong> {exp.duration}</p>
          </div>
          {/* Timeline dot */}
          <div style={{
            width: 0,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "0 20px",
          }}>
            <span style={{
              display: "block",
              width: "18px",
              height: "18px",
              background: "#fff",
              border: "4px solid black",
              borderRadius: "50%",
              position: "relative",
              zIndex: 2,
              boxShadow: "0 0 0 4px #e3eafc"
            }} />
          </div>
          {/* Right side: applications, description */}
          <div style={{ width: "45%", textAlign: "left", paddingLeft: "40px" }}>
            <p style={{ marginBottom: '5px' }}><strong>Applications:</strong> {exp.applications}</p>
            <p style={{ margin: 0 }}>{exp.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Work