// Moved from routes/Services.tsx
import ServiceCard from '../components/ServiceCard';
import { useTranslation } from 'react-i18next';
import corporateImg from '../assets/images/ui/services-corporate.jpg';
import industrialImg from '../assets/images/ui/services-industrial.jpg';
import upholsteryImg from '../assets/images/ui/services-upholstery.jpg';
import surfaceImg from '../assets/images/ui/services-surface.jpg';

interface ServicesProps {}

// Map service indices to images
const serviceImages = [corporateImg, industrialImg, upholsteryImg, surfaceImg] as const;

export function Services(_: ServicesProps) {
	const { t } = useTranslation();
	// read structured array from locale JSON
	const list = t('services.list', { returnObjects: true }) as Array<{ title: string; desc: string }>;
	return (
		<section id="services" aria-labelledby="services-heading" className="alt">
			<div className="container">
				<h2 id="services-heading">{t('services.title')}</h2>
				<div className="services-grid">
					{list.map((item, index) => (
						<ServiceCard 
							key={item.title} 
							title={item.title} 
							description={item.desc}
							image={serviceImages[index]}
							imageAlt={item.title}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

export default Services;
