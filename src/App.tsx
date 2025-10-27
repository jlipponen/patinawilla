import Header from './components/Header';
import Footer from './components/Footer';
import Home from './sections/Home';
import Services from './sections/Services';
import Portfolio, { About } from './sections/Portfolio';
import Contact from './sections/Contact';
import './styles/global.css';
import i18n from './i18n';

export default function App() {
  const onLanguageChange = (lang: 'fi' | 'en') => {
    i18n.changeLanguage(lang);
  };

  return (
    <>
      <Header onLanguageChange={onLanguageChange} />
      <main>
        <Home />
        <Services />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
