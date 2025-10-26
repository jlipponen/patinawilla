// Moved from routes/Home.tsx
import { useTranslation } from 'react-i18next';

interface HomeProps {}

export function Home(_: HomeProps) {
	const { t } = useTranslation();
	const heading = t('home.heading');
	const sub = t('home.sub');
	const ctaLabel = t('home.cta');

	return (
		<section id="home" className="hero" aria-labelledby="home-heading">
			<div className="container hero-inner">
				<div className="hero-content">
					<h1 id="home-heading" className="hero-heading">{heading}</h1>
					<p className="hero-sub">{sub}</p>
					<a href="#contact" className="cta-btn" aria-label={ctaLabel}>{ctaLabel.toUpperCase()}</a>
				</div>
			</div>
		</section>
	);
}

export default Home;
