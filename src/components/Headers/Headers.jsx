import React, {useState} from 'react';
import { Layout, Menu, Flex, Button } from 'antd';
import './headers.css'
import Work from '../Work/Work';
import About from '../About/About';
import Contact from '../Contact/Contact';
import spLogo from '../../common/images/sp.png';

const { Header, Content } = Layout;

const Headers = () => {
  const [selectedKey, setSelectedKey] = useState('about');

  const items = [
    {
      key: 'work',
      value: 'Work',
      component: <Work/>
    },
    {
      key: 'about',
      value: 'About',
      component: <About />
    },
    {
      key: 'contact',
      value: 'Contact',
      component: <Contact/>
    },
  ];

  const onItemSelect = (e) => {
    setSelectedKey(e.key);
  }

  const selectedComponent = items.find(item => item.key === selectedKey)?.component;

  return (
    <Layout className='app-background'>
      <Header className='headers-background' style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          type="text"
          onClick={() => setSelectedKey('about')}
          style={{ marginRight: 16, display: 'flex', alignItems: 'center', gap: 8, fontWeight: 'bold', fontSize: 18 }}
        >
          <img src={spLogo} alt="logo" style={{ height: 45, width: 45, objectFit: 'contain' }} />
          SAHITHI POLADI
        </Button>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Menu
            mode="horizontal"
            className='transparent-menu'
            onClick={onItemSelect}
            selectedKeys={selectedKey && [selectedKey]}
            style={{ minWidth: 0 }}
          >
            {items.map(item => (
              <Menu.Item key={item.key}>
                {item.value}
              </Menu.Item>
            ))}
          </Menu>
        </div>
      </Header>
      <Content className="full-screen-image-content" >
        {selectedComponent}
      </Content>
    </Layout>
  );
};
export default Headers;