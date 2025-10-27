interface ServiceCardProps {
	title: string;
	description: string;
}

export function ServiceCard({ title, description }: Readonly<ServiceCardProps>) {
	return (
		<article className="service-card">
			<h3>{title}</h3>
			<p>{description}</p>
		</article>
	);
}

export default ServiceCard;

