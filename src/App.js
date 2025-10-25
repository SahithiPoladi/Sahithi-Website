import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
// Centralized lazy imports and prefetch helpers
import { About, Work, Skills, Projects, prefetchAll } from './lazyImports';

// Landing page sections (original single-page layout)
function LandingPage() {
  return (
    <main>
      <section id="home" style={{ minHeight: '80vh', padding: '48px 24px' }}>
        <Home />
      </section>
      <Suspense fallback={<section id="about" style={{ minHeight: '60vh', padding: '32px 24px' }} />}>
        <section id="about" style={{ minHeight: '80vh', padding: '48px 24px' }}>
          <About />
        </section>
      </Suspense>
      <Suspense fallback={<section id="work" style={{ minHeight: '60vh', padding: '32px 24px' }} />}>
        <section id="work" style={{ minHeight: '80vh', padding: '48px 24px' }}>
          <Work />
        </section>
      </Suspense>
      <Suspense fallback={<section id="skills" style={{ minHeight: '60vh', padding: '32px 24px' }} />}>
        <section id="skills" style={{ minHeight: '80vh', padding: '48px 24px' }}>
          <Skills />
        </section>
      </Suspense>
    </main>
  );
}

function App() {
  // Warm up code-split chunks on idle so section switches feel instant
  useEffect(() => {
    prefetchAll();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/projects" element={
            <Suspense fallback={<main style={{ padding: '64px 24px', minHeight: '60vh' }} />}>
              <Projects />
            </Suspense>
          } />
        </Routes>
        <Layout.Footer className="app-footer" style={{ textAlign: 'center' }}>
          ©2025 Sahithi. All rights reserved.
        </Layout.Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
