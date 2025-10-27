import { useState, useEffect } from 'react';
import useMediaQuery from '../lib/useMediaQuery';
import { FaLightbulb, FaRegLightbulb, FaGlobe } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

type NavItem = { id: string; key: string };
const navItems: NavItem[] = [
    { id: 'services', key: 'nav.services' },
    { id: 'portfolio', key: 'nav.portfolio' },
    { id: 'about', key: 'nav.about' },
    { id: 'contact', key: 'nav.contact' }
];

interface HeaderProps { onLanguageChange(lang: 'fi' | 'en'): void; }

export function Header({ onLanguageChange }: Readonly<HeaderProps>) {
    const { t, i18n } = useTranslation();
    const [dark, setDark] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const isMobile = useMediaQuery('(max-width:760px)');

    useEffect(() => {
        document.documentElement.dataset.theme = dark ? 'dark' : 'light';
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
                    <a href="#home" className="brand">{t('brand')}</a>
                    <span className="brand-tagline">{t('brandTagline')}</span>
                </div>
                <nav id="site-nav" aria-label={t('nav.aria', 'Main navigation')}>
                    <ul>
                        {navItems.map(item => (
                            <li key={item.id}><a href={`#${item.id}`}>{t(item.key).toUpperCase()}</a></li>
                        ))}
                    </ul>
                </nav>
                <div className="toolbar">
                    <button className="toggle-btn" onClick={() => setDark(d => !d)} aria-label={dark ? t('theme.switchToLight') : t('theme.switchToDark')}>
                        {dark ? <FaLightbulb className="toolbar-icon" /> : <FaRegLightbulb className="toolbar-icon" />}
                    </button>
                    <button className="toggle-btn" onClick={() => onLanguageChange(i18n.language === 'fi' ? 'en' : 'fi')} aria-label={t('header.languageToggle')}>
                        <FaGlobe className="toolbar-icon" /> {i18n.language === 'fi' ? 'EN' : 'FIN'}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;

