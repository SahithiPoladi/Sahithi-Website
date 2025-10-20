import React from "react";
import { contactMe } from '../../config';
import { LinkedinOutlined, GithubOutlined, InstagramOutlined } from '@ant-design/icons';

const Home = () => {
    return (
        <div className="kaushan-script-regular" style={{ textAlign: 'center', marginTop: '12vh', padding: '0 16px' }}>
            <h1 className="hero-title">SAHITHI POLADI</h1>
            <h2 className="hero-subtitle unna-bold" style={{ marginBottom: '8vh', marginTop: '8vh' }}>Software Engineer</h2>
            <p className="unna-regular" style={{ maxWidth: '900px', margin: '0 auto' }}>Whether crafting clean code at Cisco or shaping wood and canvases in the studio,
                the process of bringing ideas to life drives, balancing the logic of software with
                the creative expression of artistic and woodworking endeavors.</p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5vh' }}>
                {contactMe.map((item) => {
                    const iconsMap = {
                        LinkedinOutlined: LinkedinOutlined,
                        GithubOutlined: GithubOutlined,
                        InstagramOutlined: InstagramOutlined,
                    };
                    const IconComp = iconsMap[item.icon] || GithubOutlined;
                    return (
                        <a
                            key={item._id}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                textAlign: "center",
                                textDecoration: "none",
                                color: "inherit",
                                margin: '0 12px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <div className="contact-icons"><IconComp style={{ fontSize: 24 }} /></div>
                            <p className="unna-regular">{item.name}</p>
                        </a>
                    );
                })}
            </div>

        </div>
    );
};

export default Home;