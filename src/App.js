import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Work from './components/Work';
import Skills from './components/Skills';
import StarsBackground from './common/StarsBackground';
import Projects from './components/Projects';

// Landing page sections (original single-page layout)
function LandingPage() {
  return (
    <main>
      <section id="home" style={{ minHeight: '80vh', padding: '48px 24px' }}>
        <Home />
      </section>
      <section id="about" style={{ minHeight: '80vh', padding: '48px 24px' }}>
        <About />
      </section>
      <section id="work" style={{ minHeight: '80vh', padding: '48px 24px' }}>
        <Work />
      </section>
      <section id="skills" style={{ minHeight: '80vh', padding: '48px 24px' }}>
        <Skills />
      </section>
    </main>
  );
}

function App() {
  return (
    <div className="App">
      <StarsBackground />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
        <Layout.Footer style={{ textAlign: 'center', borderTop: '1px solid #3e424b' }}>
          ©2025 Sahithi. All rights reserved.
        </Layout.Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
