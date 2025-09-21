import React, {useState} from 'react';
import { Layout, Menu, Flex, Button } from 'antd';
import { LinkedinOutlined, GithubOutlined, InstagramOutlined } from '@ant-design/icons';
import './headers.css'
import Profile from '../pages/Profile';
import Experience from '../pages/Experience';
import Skills from '../pages/Skills';
import Projects from '../pages/Projects';
import Contact from '../pages/Contact';
const { Header, Content } = Layout;

const Headers = () => {
  const [selectedItem, setSelectedItem] = useState('');

  const items = [
    {
      key: 'profile',
      value: 'Profile',
      component: <Profile/>
    },
    {
      key: 'experience',
      value: 'Experience',
      component: <Experience />
    },
    {
      key: 'skills',
      value: 'Skills',
      component: <Skills/>
    },
    {
      key: 'projects',
      value: 'Projects',
      component: <Projects/>
    },
    {
      key: 'contact',
      value: 'Contact',
      component: <Contact/>
    },
  ]

  const onItemSelect = (e) => {
    setSelectedItem(e.component)
  }

  console.log(selectedItem);

  return (
    <Layout className='app-background'>
      <Header className='headers-background'>
        <Menu mode="horizontal" className='transparent-menu'>
          {items.map(item => (
            <Menu.Item 
              key={item.key}      
              onClick={onItemSelect}
              selectedKeys={selectedItem}
            >
              {item.value}
            </Menu.Item>
          ))}
      </Menu>
      </Header>
      <Content className="full-screen-image-content" >
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
      </Content>
    </Layout>
  );
};
export default Headers;