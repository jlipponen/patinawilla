// Moved from routes/Contact.tsx
interface ContactProps { language: 'fi' | 'en'; }

export function Contact({ language }: ContactProps) {
	return (
		<section id="contact" aria-labelledby="contact-heading">
			<div className="container">
				<h2 id="contact-heading">{language === 'fi' ? 'Yhteys' : 'Contact'}</h2>
				<div className="contact-columns">
					<div className="contact-card">
						<h3>{language === 'fi' ? 'Sähköposti' : 'Email'}</h3>
						<p><a href="mailto:patinawilla@gmail.com">patinawilla@gmail.com</a></p>
					</div>
					<div className="contact-card">
						<h3>{language === 'fi' ? 'Puhelin' : 'Phone'}</h3>
						<p><a href="tel:0407554691">0407554691</a></p>
					</div>
					<div className="contact-card">
						<h3>{language === 'fi' ? 'Sijainti' : 'Location'}</h3>
						<p>Ulvila, Finland</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Contact;
