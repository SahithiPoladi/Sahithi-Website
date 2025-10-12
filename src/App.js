import { Layout } from 'antd';
import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Work from './components/Work';
import Skills from './components/Skills';
import Contacts from './components/Contacts';
import StarsBackground from './common/StarsBackground';

function App() {
  return (
    <div className="App">
      <StarsBackground />
      <NavBar />

      {/* Page sections for single-page navigation. IDs must match NavBar menu keys. */}
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
        <section id="contact" style={{ minHeight: '80vh', padding: '48px 24px' }}>
          <Contacts />
        </section>
      </main>
      <Layout.Footer style={{ textAlign: 'center', borderTop: '1px solid #3e424b' }}>
        ©2025 Sahithi. All rights reserved.
      </Layout.Footer>
    </div>
  );
}

export default App;
