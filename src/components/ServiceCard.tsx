interface ServiceCardProps {
	title: string;
	description: string;
	image: string;
	imageAlt: string;
}

export function ServiceCard({ title, description, image, imageAlt }: Readonly<ServiceCardProps>) {
	return (
		<article className="service-card">
			<div className="service-card-inner">
				<div className="service-card-front">
					<h3>{title}</h3>
					<p>{description}</p>
				</div>
				<div className="service-card-back">
					<img src={image} alt={imageAlt} loading="eager" />
				</div>
			</div>
		</article>
	);
}

export default ServiceCard;

