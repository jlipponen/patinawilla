import { useState, useEffect } from 'react';

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
			<div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
				<a href="#home" style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '.5px' }}>PatinaWilla</a>
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
							<li key={item.id}><a href={`#${item.id}`}>{language === 'fi' ? item.labelFi : item.labelEn}</a></li>
						))}
					</ul>
				</nav>
				<div className="toolbar">
					<button className="toggle-btn" onClick={() => setDark(d => !d)}>
						{dark ? (language === 'fi' ? 'Vaalea' : 'Light') : (language === 'fi' ? 'Tumma' : 'Dark')}
					</button>
					<button className="toggle-btn" onClick={() => onLanguageChange(language === 'fi' ? 'en' : 'fi')}>
						{language === 'fi' ? 'EN' : 'FI'}
					</button>
				</div>
			</div>
		</header>
	);
}

export default Header;

