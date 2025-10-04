import React from "react";
import { Flex, Button } from 'antd';
import { LinkedinOutlined, GithubOutlined, InstagramOutlined } from '@ant-design/icons';

const About = () => (
  <div className="overlay-text">
    <h1>Sahithi Poladi</h1>
    <h6>Whether crafting clean code at Cisco or shaping wood and canvases in the studio, the process of bringing ideas to life drives, balancing the logic of software with the creative expression of artistic and woodworking endeavors.</h6>
    <Flex gap="large" wrap justify="center" align="center">
      <a href="https://www.linkedin.com/in/sahithipoladi/" alt="linkedin" target="_blank" rel="noopener noreferrer">
        <Button className="black-button" icon={<LinkedinOutlined />} />
      </a>
      <a href="https://github.com/SahithiPoladi" alt="github" target="_blank" rel="noopener noreferrer">
        <Button className="black-button" icon={<GithubOutlined />} />
      </a>
      <a href="https://www.instagram.com/sahiatelier?igsh=MW5sNXRnZ29jN256Mw%3D%3D&utm_source=qr" alt="insta" target="_blank" rel="noopener noreferrer">
        <Button className="black-button" icon={<InstagramOutlined />} />
      </a>
    </Flex>
  </div>
);

export default About;
