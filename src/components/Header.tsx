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
    const [collapsed, setCollapsed] = useState(true); // true = nav hidden on mobile

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    }, [dark]);

    const toggleLabel = collapsed
        ? (language === 'fi' ? 'Avaa valikko' : 'Open menu')
        : (language === 'fi' ? 'Sulje valikko' : 'Close menu');

    return (
        <header className={collapsed ? 'nav-collapsed' : ''}>
            <div className="container header-inner">
                <div className="brand-block">
                    <a href="#home" className="brand">PatinaWilla</a>
                    <span className="brand-tagline">{language === 'fi' ? 'Verhoilu ja entisöinti Ulvilassa' : 'Upholstery & restoration in Ulvila'}</span>
                </div>
                <button
                    aria-label={toggleLabel}
                    aria-controls="site-nav"
                    aria-expanded={!collapsed}
                    className="mobile-nav-toggle toggle-btn"
                    onClick={() => setCollapsed(c => !c)}
                >
                    {collapsed ? '☰' : '×'}
                </button>
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

