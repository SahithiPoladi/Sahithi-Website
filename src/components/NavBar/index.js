import React, { useState, useEffect, useRef } from 'react';
import { Layout, Menu, Button, Row, Col } from 'antd';
import spLogo from '../../common/images/sp.png';
import { DownloadOutlined } from '@ant-design/icons';
import './index.css';
const resumePath = '/Sahithi_Poladi.pdf';

const { Header } = Layout;

const NavBar = () => {
  const [selectedKey, setSelectedKey] = useState('home');

  // Header height used for scrolling offset and spacer when header is fixed
  const HEADER_HEIGHT = 70;
  const tickingRef = useRef(false);

  // Smooth-scroll to an element id. Subtract a small offset for the header.
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = HEADER_HEIGHT; // keep in sync with the fixed header height
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    } else {
      // fallback: scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const items = [
    {
      key: 'home',
      value: 'Home',
    },
    {
      key: 'about',
      value: 'About',
    },
    {
      key: 'work',
      value: 'Work',
    },
    {
      key: 'skills',
      value: 'Skills',
    },
    {
      key: 'contact',
      value: 'Contact',
    }
  ];

  const onItemSelect = (e) => {
    setSelectedKey(e.key);
    // navigate within the single page app
    scrollToId(e.key);
  }

  // Auto-highlight menu item based on scroll position
  useEffect(() => {
    const sectionIds = items.map(i => i.key);

    // Use IntersectionObserver to observe which section is visible. This is
    // cheaper than calling getBoundingClientRect on every scroll frame.
    const observerOptions = {
      root: null,
      rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px`,
      threshold: [0.1, 0.5, 0.9],
    };

    const observer = new IntersectionObserver((entries) => {
      // Pick the entry with the largest intersectionRatio that's intersecting
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        const id = visible.target.id;
        setSelectedKey(prev => (prev === id ? prev : id));
      }
    }, observerOptions);

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // run once on mount to set initial menu state based on current viewport
    // find the first observed element that intersects
    // cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Header
        className='headers card-border-gradient'
        style={{ borderImage: 'linear-gradient(90deg, #1c1026, #c6bbb9, #4c1e3c, #21242b, #7a748c) 1', }}
      >
        <Row justify="space-between" align="middle" style={{ height: '100%' }}>
          <Col>
            <Button
              type="text"
              onClick={() => { setSelectedKey('home'); scrollToId('home'); }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 'bold', fontSize: 18, color: '#d9dddc' }}
            >
              <img src={spLogo} alt="logo" style={{ height: 45, width: 45, objectFit: 'contain' }} />
            </Button>
          </Col>
          <Col style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Menu
              mode="horizontal"
              onClick={onItemSelect}
              selectedKeys={selectedKey && [selectedKey]}
              style={{
                flexGrow: 1,
                borderBottom: 'none',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {items.map(item => (
                <Menu.Item key={item.key}>
                  {item.value}
                </Menu.Item>
              ))}
            </Menu>
          </Col>
          <Col>
            <Button
              className='resume-button unna-bold'
              icon={<DownloadOutlined />}
              href={resumePath}
              download
            >
              Resume
            </Button>
          </Col>
        </Row>
      </Header>
      {/* spacer so page content isn't hidden behind the fixed header */}
      <div style={{ height: HEADER_HEIGHT }} />
    </>
  );
};
export default NavBar;