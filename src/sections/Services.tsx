// Moved from routes/Services.tsx
import ServiceCard from '../components/ServiceCard';
import { useTranslation } from 'react-i18next';

interface ServicesProps {}

export function Services(_: ServicesProps) {
	const { t } = useTranslation();
	// read structured array from locale JSON
	const list = t('services.list', { returnObjects: true }) as Array<{ title: string; desc: string }>;
	return (
		<section id="services" aria-labelledby="services-heading" className="alt">
			<div className="container">
				<h2 id="services-heading">{t('services.title')}</h2>
				<div className="services-grid">
					{list.map(item => (
						<ServiceCard key={item.title} title={item.title} description={item.desc} />
					))}
				</div>
			</div>
		</section>
	);
}

export default Services;
