import logosPng from '../assets/images/ui/logos.png';
import svmlLogo from '../assets/images/ui/svml-jasen-logo.png';
import { useTranslation } from 'react-i18next';

export function Footer() {
	const { t } = useTranslation();
	return (
		<footer>
			<div className="container">
				<h2>{t('footer.partners')}</h2>
				<div className="logos" aria-label={t('footer.partners')}>
					<img src={logosPng} alt="Vendor brand logos" />
					<img src={svmlLogo} alt="Suomen Verhoilijamestarien Liitto jäsenlogo" />
				</div>
				<small>{t('footer.copyright', { year: new Date().getFullYear() })}</small>
			</div>
		</footer>
	);
}

export default Footer;

