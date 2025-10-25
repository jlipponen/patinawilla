import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './sections/Home';
import Services from './sections/Services';
import Portfolio, { About } from './sections/Portfolio';
import Contact from './sections/Contact';
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
