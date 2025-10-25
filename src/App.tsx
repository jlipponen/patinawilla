import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './routes/Home';
import Services from './routes/Services';
import Portfolio, { About } from './routes/Portfolio';
import Contact from './routes/Contact';
import './styles/global.css';

export default function App() {
  const [language, setLanguage] = useState<'fi' | 'en'>('fi');

  return (
    <>
      <Header language={language} onLanguageChange={setLanguage} />
      <main>
        <Home language={language} />
        <Services language={language} />
        <Portfolio language={language} />
        <About language={language} />
        <Contact language={language} />
      </main>
      <Footer />
    </>
  );
}
