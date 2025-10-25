import { useState, useEffect } from 'react';
import useMediaQuery from '../lib/useMediaQuery';
import { FaLightbulb, FaRegLightbulb } from 'react-icons/fa';
import { FaGlobe } from 'react-icons/fa';

type NavItem = { id: string; labelFi: string; labelEn: string; };
const navItems: NavItem[] = [
	{ id: 'services', labelFi: 'Palvelut', labelEn: 'Services' },
	{ id: 'portfolio', labelFi: 'Työnäytteitä', labelEn: 'Work samples' },
	{ id: 'about', labelFi: 'Yrittäjä', labelEn: 'About' },
	{ id: 'contact', labelFi: 'Yhteystiedot', labelEn: 'Contact' }
];

interface HeaderProps { language: 'fi' | 'en'; onLanguageChange(lang: 'fi' | 'en'): void; }

export function Header({ language, onLanguageChange }: HeaderProps) {
    const [dark, setDark] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    // Use the shared hook to determine mobile breakpoint
    const isMobile = useMediaQuery('(max-width:760px)');

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

    const threshold = isMobile ? 50 : 200; // smaller threshold on mobile
    const alpha = Math.min(scrollY / threshold, 1);
    const scrolled = alpha > 0.05;

    return (
        <header
            className={`site-header ${!dark && scrolled ? 'scrolled' : ''}`}
            style={{ ['--header-alpha' as any]: String(alpha) }}
        >
            <div className="container header-inner">
                <div className="brand-block">
                    <a href="#home" className="brand">PatinaWilla</a>
                    <span className="brand-tagline">{language === 'fi' ? 'Verhoilu ja entisöinti Ulvilassa' : 'Upholstery & restoration in Ulvila'}</span>
                </div>
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

