import { Card } from "antd";
import React from "react";

const About = () => {
    return (
        <div>
            <h1 className="kaushan-script-regular" style={{fontSize: '50px', textAlign: 'center'}}>About Me</h1>
            <Card
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    textAlign: 'left',
                }}
                className="unna-regular card-border-gradient"
            >
                <p>
                    Passionate software engineer with over 5 years of experience specializing in the MERN stack, 
                    while continuously exploring new technologies.
                    <br />
                    I enjoy being challenged — when given a new feature, I dive deep into the domain knowledge to 
                    understand the purpose before implementing it.
                    <br />
                    Known as a problem solver, attentive listener, and an extroverted introvert who enjoys organizing 
                    events and collaborating with teams.
                </p>
                <p>
                    Enthusiastic traveler and nature lover — I enjoy hiking, exploring scenic trails, kayaking, and fishing. 
                    My friends and I are on a mission to visit every national park in the U.S.  
                    <br />
                    Big music fan who loves attending live concerts and discovering new artists.           
                </p>
                <p>
                    Passionate about home design and woodworking, always adding personal touches and character to my living space.
                </p>
                <p>
                    Creative by nature — I paint portraits, abstracts, landscapes, and textured pieces, and share them on 
                    Instagram as a visual journal of my art journey.
                </p>
            </Card>
        </div>
    );
};

export default About;