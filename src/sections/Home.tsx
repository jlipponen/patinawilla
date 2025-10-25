// Moved from routes/Home.tsx
interface HomeProps { language: 'fi' | 'en'; }

export function Home({ language }: HomeProps) {
	return (
		<section id="home" className="hero" aria-labelledby="home-heading">
			<div className="container">
				<h1 id="home-heading">PatinaWilla</h1>
				<p>{language === 'fi' ? 'Verhoilu- ja entisöintipalvelut laadukkaasti sekä yrityksille että yksityisasiakkaille.' : 'High-quality upholstery and restoration services for businesses and private clients.'}</p>
			</div>
		</section>
	);
}

export default Home;
