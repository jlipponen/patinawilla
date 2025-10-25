import logosPng from '../assets/images/ui/logos.png';
import svmlLogo from '../assets/images/ui/svml-jasen-logo.png';

export function Footer() {
	return (
		<footer>
			<div className="container">
				<h2 style={{ marginTop: 0, fontSize: '1.35rem' }}>Yhteistyössä / Partners</h2>
				<div className="logos" aria-label="Partner logos">
					<img src={logosPng} alt="Vendor brand logos" style={{ maxHeight: '80px', width: 'auto' }} />
					<img src={svmlLogo} alt="Suomen Verhoilijamestarien Liitto jäsenlogo" style={{ maxHeight: '80px', width: 'auto' }} />
				</div>
				<small>© {new Date().getFullYear()} PatinaWilla. Kaikki oikeudet pidätetään.</small>
			</div>
		</footer>
	);
}

export default Footer;

