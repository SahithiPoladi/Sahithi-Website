import React, { useState, useEffect, useRef } from 'react';
import { Layout, Menu, Button, Row, Col } from 'antd';
import spLogo from '../../common/images/sp.png';
import './index.css';

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

    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        let closest = null;
        let closestDistance = Infinity;

        sectionIds.forEach(id => {
          const el = document.getElementById(id);
          if (!el) return;
          const rect = el.getBoundingClientRect();
          // distance from top of viewport to the element top, adjusted by header
          const distance = Math.abs(rect.top - HEADER_HEIGHT);
          // prefer elements that are not far below the viewport
          if (rect.top - HEADER_HEIGHT <= window.innerHeight && distance < closestDistance) {
            closestDistance = distance;
            closest = id;
          }
        });

        if (closest) {
          setSelectedKey(prev => (prev === closest ? prev : closest));
        }
        tickingRef.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // run once on mount to set initial menu state
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Header 
      className='headers card-border-gradient' 
      style={{borderImage: 'linear-gradient(90deg, #1c1026, #c6bbb9, #4c1e3c, #21242b, #7a748c) 1',}}
      >
        <Row justify="space-between" align="middle" style={{ height: '100%' }}>
          <Col>
            <Button
              type="text"
              onClick={() => { setSelectedKey('home'); scrollToId('home'); }}
              style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 'bold', fontSize: 18, color: '#d9dddc'}}
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
        </Row>
      </Header>
      {/* spacer so page content isn't hidden behind the fixed header */}
      <div style={{ height: HEADER_HEIGHT }} />
    </>
  );
};
export default NavBar;