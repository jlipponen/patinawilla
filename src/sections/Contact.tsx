// Moved from routes/Contact.tsx
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

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
					<div className="contact-card contact-info-card" aria-label={t('contact.contact')}>
						<h3 className="card-heading">{t('contact.contact')}</h3>
						<p>
							<span className="card-subheading">{t('contact.email')}:</span>
							<a href="mailto:patinawilla@gmail.com">patinawilla@gmail.com</a>
						</p>
						<p>
							<span className="card-subheading">{t('contact.phone')}:</span>
							<a href="tel:0407554691">0407554691</a>
						</p>
						<p>
							<span className="card-subheading">{t('contact.company')}:</span>
							<a>PatinaWilla Oy</a>
						</p>
						<p>
							<span className="card-subheading">{t('contact.business-id')}:</span>
							<a>3575586-8</a>
						</p>
						<p className="social-links" aria-label={t('contact.social')}>
							<a className="social-link" href="https://fi-fi.facebook.com/PatinaWilla-837301046326307/" target="_blank" rel="noopener noreferrer">
								<FaFacebook aria-hidden="true" />
								<span>Facebook</span>
							</a>
							<span className="sep">·</span>
							<a className="social-link" href="https://www.instagram.com/patinawilla/" target="_blank" rel="noopener noreferrer">
								<FaInstagram aria-hidden="true" />
								<span>Instagram</span>
							</a>
						</p>
					</div>

					<div className="contact-card hours-card" aria-labelledby="opening-hours-heading">
						<h3 id="opening-hours-heading" className="card-heading">{t('contact.openingHours')}</h3>
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

						<div className="contact-card map-card" aria-labelledby="address-heading">
							<h3 id="address-heading" className="card-heading">{t('contact.address')}</h3>
							<span>
								{t('address.line1')}
							</span>

							<div className="map-wrapper">
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
							<p className="map-cta-btn">
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
