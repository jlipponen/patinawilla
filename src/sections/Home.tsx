// Moved from routes/Home.tsx
interface HomeProps { language: 'fi' | 'en'; }

export function Home({ language }: HomeProps) {
	const heading = language === 'fi' ? 'Verhoilupalvelut ammattitaidolla' : 'Upholstery with proficiency';
	const sub = language === 'fi'
		? 'Laadukkaat verhoilu- ja entisöintipalvelut yrityksille ja yksityisasiakkaille.'
		: 'Quality upholstery & restoration for businesses and private clients.';
	const ctaLabel = language === 'fi' ? 'Ota yhteyttä' : 'Contact Us';

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
