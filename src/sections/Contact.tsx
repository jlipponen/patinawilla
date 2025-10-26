// Moved from routes/Contact.tsx
import { useTranslation } from 'react-i18next';

interface ContactProps {}

export function Contact(_: ContactProps) {
	const { t } = useTranslation();
	const hours = [
		{ dayKey: 'hours.Monday', time: '10:00–17:00' },
		{ dayKey: 'hours.Tuesday', time: '10:00–17:00' },
		{ dayKey: 'hours.Wednesday', time: '10:00–17:00' },
		{ dayKey: 'hours.Thursday', time: '10:00–17:00' },
		{ dayKey: 'hours.Friday', time: '10:00–17:00' },
		{ dayKey: 'hours.Saturday', time: t('hours.Closed') },
		{ dayKey: 'hours.Sunday', time: t('hours.Closed') },
	];

	const mapQuery = encodeURIComponent('Friitalantie 11 4, 28400 Ulvila');
	const mapSrc = `https://www.google.com/maps?q=${mapQuery}&hl=fi&z=15&output=embed`;

	return (
		<section id="contact" aria-labelledby="contact-heading">
			<div className="container">
				<h2 id="contact-heading">{t('contact.title')}</h2>

				<div className="contact-columns">
					{/* Consolidated contact card: email, phone, social */}
					<div className="contact-card contact-info-card" aria-label={t('contact.contact')}>
						<h3>{t('contact.contact')}</h3>
						<p>
							<strong>{t('contact.email')}: </strong>
							<a href="mailto:patinawilla@gmail.com">patinawilla@gmail.com</a>
						</p>
						<p>
							<strong>{t('contact.phone')}: </strong>
							<a href="tel:0407554691">0407554691</a>
						</p>
						<p className="social-links" aria-label={t('contact.social')}>
							<a className="social-link" href="https://fi-fi.facebook.com/PatinaWilla-837301046326307/" target="_blank" rel="noopener noreferrer">
								<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
									<path fill="currentColor" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.99 3.657 9.128 8.438 9.878v-6.99H7.898v-2.888h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.888h-2.33v6.99C18.343 21.128 22 16.99 22 12z" />
								</svg>
								<span>Facebook</span>
							</a>
							<span className="sep">·</span>
							<a className="social-link" href="https://www.instagram.com/patinawilla/" target="_blank" rel="noopener noreferrer">
								<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
									<path fill="currentColor" d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 3a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 100 10 5 5 0 000-10z" />
								</svg>
								<span>Instagram</span>
							</a>
						</p>
					</div>

					{/* Opening hours as its own card for consistent layout */}
					<div className="contact-card hours-card" aria-labelledby="opening-hours-heading">
						<h3 id="opening-hours-heading">{t('contact.openingHours')}</h3>
						<table className="hours-table" aria-hidden={false}>
							<tbody>
								{hours.map((h) => (
									<tr key={h.dayKey}>
										<td className="day">{t(h.dayKey)}</td>
										<td className="time">{h.time}</td>
									</tr>
								))}
							</tbody>
						</table>
						</div>

						{/* Address/map card: moved into the grid so it can sit beside other cards on wide screens */}
						<div className="contact-card map-card" aria-labelledby="address-heading">
							<h3 id="address-heading">{t('contact.address')}</h3>
							<address>
								{t('address.line1')}
							</address>

							<div className="map-wrapper" style={{ marginTop: '0.75rem' }}>
								<iframe
									title={t('contact.mapTitle')}
									src={mapSrc}
									width="100%"
									height={300}
									style={{ border: 0 }}
									loading="lazy"
									referrerPolicy="no-referrer-when-downgrade"
									aria-label={t('contact.mapTitle')}
									allowFullScreen
								/>
							</div>

							<p style={{ marginTop: '.6rem' }}>
								<a
									className="cta-btn"
									href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={t('contact.openMapsLabel')}
								>
									{t('contact.openInMaps')}
								</a>
							</p>
						</div>

					</div>
				</div>
			</section>
	);
}

export default Contact;
