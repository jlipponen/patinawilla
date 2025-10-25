import ServiceCard from '../components/ServiceCard';

interface ServicesProps { language: 'fi' | 'en'; }

const serviceData = {
	fi: [
		{ t: 'Verhoilu', d: 'Kalusteiden uudelleenverhoilu, korjaus ja pintakäsittely.' },
		{ t: 'Entisöinti', d: 'Huonekalujen kunnostus perinteisin menetelmin.' },
		{ t: 'Tekstiilityöt', d: 'Sisustustekstiilit, tyynyt, verhot mittatilauksena.' },
		{ t: 'Projektit', d: 'Hotellit, ravintolat ja julkiset tilat – kokonaisuuksien hallinta.' }
	],
	en: [
		{ t: 'Upholstery', d: 'Reupholstering, repairs and surface finishing for furniture.' },
		{ t: 'Restoration', d: 'Furniture restoration using traditional techniques.' },
		{ t: 'Textiles', d: 'Interior textiles, cushions and curtains made to measure.' },
		{ t: 'Projects', d: 'Hotels, restaurants and public spaces – full project coordination.' }
	]
} as const;

export function Services({ language }: ServicesProps) {
	const list = serviceData[language];
	return (
		<section id="services" aria-labelledby="services-heading" className="alt">
			<div className="container">
				<h2 id="services-heading">{language === 'fi' ? 'Palvelut' : 'Services'}</h2>
				<div className="services-grid">
					{list.map(item => (
						<ServiceCard key={item.t} title={item.t} description={item.d} />
					))}
				</div>
			</div>
		</section>
	);
}

export default Services;

