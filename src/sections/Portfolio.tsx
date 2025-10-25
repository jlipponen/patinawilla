// Moved from routes/Portfolio.tsx
import entrepreneurPhoto from '../assets/images/ui/entrepreneur.jpg';
import { useS3Gallery } from '../lib/useS3Gallery';

interface AboutPortfolioProps { language: 'fi' | 'en'; }

// This file hosts both Portfolio and About sections to keep bundle small.
export function About({ language }: AboutPortfolioProps) {
	return (
		<section id="about" aria-labelledby="about-heading">
			<div className="container about-wrapper">
				<div>
					<h2 id="about-heading">{language === 'fi' ? 'Meistä' : 'About Us'}</h2>
					<p>{language === 'fi' ? 'PatinaWilla on erikoistunut laadukkaisiin verhoilu- ja entisöintipalveluihin. Kunnioitamme perinteisiä menetelmiä ja yhdistämme ne moderniin viimeistelyyn.' : 'PatinaWilla specializes in high-quality upholstery and restoration. We honor traditional techniques while combining them with modern finishing.'}</p>
					<p>{language === 'fi' ? 'Yrityksen omistaja työskentelee tinkimättömällä käsityötaidolla ja asiakaslähtöisesti.' : 'The owner works with uncompromising craftsmanship and a customer-focused approach.'}</p>
				</div>
				<div className="about-photo">
					<img src={entrepreneurPhoto} alt={language === 'fi' ? 'Yrityksen omistaja' : 'Company owner'} />
				</div>
			</div>
		</section>
	);
}

export interface PortfolioProps { language: 'fi' | 'en'; }

export function Portfolio({ language }: PortfolioProps) {
	const { items, loading, error, retry } = useS3Gallery({ bucket: 'patinawilla-gallery', region: 'eu-north-1', limit: 12 });

	return (
		<section id="portfolio" aria-labelledby="portfolio-heading" className="alt">
			<div className="container">
				<h2 id="portfolio-heading">Portfolio</h2>
				<p>{language === 'fi' ? 'Työkuvia.' : 'Work gallery.'}</p>
				{error && (
					<p role="alert" style={{ color: '#b00' }}>
						{language === 'fi' ? 'Kuvien lataus epäonnistui.' : 'Failed to load images.'}
						<button onClick={retry} className="toggle-btn" style={{ marginLeft: '.75rem' }}>{language === 'fi' ? 'Yritä uudelleen' : 'Retry'}</button>
					</p>
				)}
				<div className="portfolio-grid" aria-live="polite">
					{loading && items.length === 0 && Array.from({ length: 6 }).map((_, i) => <div key={i} className="portfolio-item" aria-hidden="true" />)}
					{!loading && items.map(img => (
						<a
							key={img.key}
							className="portfolio-item"
							href={img.url}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={img.alt}
						>
							<img src={img.url} alt={img.alt} loading="lazy" />
						</a>
					))}
				</div>
			</div>
		</section>
	);
}

export default Portfolio;
