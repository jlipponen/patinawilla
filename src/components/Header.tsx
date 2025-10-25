import { useState, useEffect } from 'react';
import { FaLightbulb, FaRegLightbulb } from 'react-icons/fa';
import { FaGlobe } from 'react-icons/fa';

type NavItem = { id: string; labelFi: string; labelEn: string; };
const navItems: NavItem[] = [
	{ id: 'home', labelFi: 'Etusivu', labelEn: 'Home' },
	{ id: 'services', labelFi: 'Palvelut', labelEn: 'Services' },
	{ id: 'portfolio', labelFi: 'Portfolio', labelEn: 'Portfolio' },
	{ id: 'about', labelFi: 'Meistä', labelEn: 'About Us' },
	{ id: 'contact', labelFi: 'Yhteys', labelEn: 'Contact' }
];

interface HeaderProps { language: 'fi' | 'en'; onLanguageChange(lang: 'fi' | 'en'): void; }

export function Header({ language, onLanguageChange }: HeaderProps) {
    const [dark, setDark] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' ? window.matchMedia('(max-width:760px)').matches : false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    }, [dark]);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Update isMobile when viewport crosses the breakpoint
        if (typeof window === 'undefined' || !window.matchMedia) return;
        const mq = window.matchMedia('(max-width:760px)');
        const handleChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        // set initial state (in case render happened before constructor value)
        setIsMobile(mq.matches);
        // add listener
        if (mq.addEventListener) mq.addEventListener('change', handleChange);
        else mq.addListener && mq.addListener((ev: MediaQueryListEvent) => handleChange(ev));
        return () => {
            if (mq.removeEventListener) mq.removeEventListener('change', handleChange);
            else mq.removeListener && mq.removeListener((ev: MediaQueryListEvent) => handleChange(ev));
        };
    }, []);

    const threshold = isMobile ? 80 : 200; // reach full opacity faster on mobile
    const headerStyle = {
        backgroundColor: `rgba(255, 255, 255, ${Math.min(scrollY / threshold, 1)})`,
        transition: 'background-color 0.22s ease',
    };

    return (
        <header style={!dark ? headerStyle : undefined}>
            <div className="container header-inner">
                <div className="brand-block">
                    <a href="#home" className="brand">PatinaWilla</a>
                    <span className="brand-tagline">{language === 'fi' ? 'Verhoilu ja entisöinti Ulvilassa' : 'Upholstery & restoration in Ulvila'}</span>
                </div>
                {/* Removed mobile hamburger: show navigation tabs inline on all viewport sizes */}
                <nav id="site-nav" aria-label={language === 'fi' ? 'Päävalikko' : 'Main navigation'}>
                    <ul>
                        {navItems.map(item => (
                            <li key={item.id}><a href={`#${item.id}`}>{(language === 'fi' ? item.labelFi : item.labelEn).toUpperCase()}</a></li>
                        ))}
                    </ul>
                </nav>
                <div className="toolbar">
                    <button className="toggle-btn" onClick={() => setDark(d => !d)} aria-label={dark ? (language === 'fi' ? 'Vaihda vaaleaan tilaan' : 'Switch to light mode') : (language === 'fi' ? 'Vaihda tummaan tilaan' : 'Switch to dark mode')}>
                        {dark ? <FaLightbulb size={15} /> : <FaRegLightbulb size={15} />}
                    </button>
                    <button className="toggle-btn" onClick={() => onLanguageChange(language === 'fi' ? 'en' : 'fi')} aria-label={language === 'fi' ? 'Vaihda englanniksi' : 'Switch to Finnish'}>
                        <FaGlobe size={15} /> {language === 'fi' ? 'EN' : 'FIN'}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;

