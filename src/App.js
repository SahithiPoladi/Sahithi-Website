import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
// Lazy-load non-critical sections and routes to shrink initial JS
const About = lazy(() => import('./components/About'));
const Work = lazy(() => import('./components/Work'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import(/* webpackPrefetch: true */ './components/Projects'));
const StarsBackground = lazy(() => import('./common/StarsBackground'));

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
  return (
    <div className="App">
      <Suspense fallback={null}>
        <StarsBackground />
      </Suspense>
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
        <Layout.Footer style={{ textAlign: 'center', borderTop: '1px solid #3e424b' }}>
          ©2025 Sahithi. All rights reserved.
        </Layout.Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
