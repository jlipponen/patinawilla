// Moved from routes/Portfolio.tsx
import entrepreneurPhoto from '../assets/images/ui/entrepreneur.jpg';
import { useS3Gallery } from '../lib/useS3Gallery';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// This file hosts both Portfolio and About sections to keep bundle small.
export function About() {
	const { t } = useTranslation();
	return (
		<section id="about" aria-labelledby="about-heading">
			<div className="container about-wrapper">
				<div>
					<h2 id="about-heading">{t('about.title')}</h2>
					<p>{t('about.p')}</p>
				</div>
				<div className="about-photo">
					<img src={entrepreneurPhoto} alt={t('about.ownerAlt')} />
				</div>
			</div>
		</section>
	);
}

export interface PortfolioProps { }

export function Portfolio() {
	const { t } = useTranslation();
	const { items, loading, error, retry } = useS3Gallery({ bucket: 'patinawilla-gallery', region: 'eu-north-1', limit: 12 });
	const [lightboxImage, setLightboxImage] = useState<{ url: string; alt: string } | null>(null);

	const openLightbox = (url: string, alt: string) => {
		setLightboxImage({ url, alt });
		document.body.style.overflow = 'hidden';
	};

	const closeLightbox = () => {
		setLightboxImage(null);
		document.body.style.overflow = '';
	};

	// Close lightbox on Escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && lightboxImage) {
				closeLightbox();
			}
		};
		
		window.addEventListener('keydown', handleEscape);
		return () => window.removeEventListener('keydown', handleEscape);
	}, [lightboxImage]);

	return (
		<section id="portfolio" aria-labelledby="portfolio-heading" className="alt">
			<div className="container">
				<h2 id="portfolio-heading">{t('portfolio.title')}</h2>
				{error && (
					<p role="alert" style={{ color: '#b00' }}>
						{t('portfolio.loadFailed')}
						<button onClick={retry} className="toggle-btn" style={{ marginLeft: '.75rem' }}>{t('portfolio.retry')}</button>
					</p>
				)}
				
				{loading && items.length === 0 && (
					<div className="portfolio-loading" aria-live="polite">
						{t('portfolio.loading', 'Loading gallery...')}
					</div>
				)}

				{!loading && items.length > 0 && (
					<Swiper
						modules={[Navigation, Pagination, Keyboard, A11y]}
						spaceBetween={12}
						slidesPerView={3}
						slidesPerGroup={1}
						navigation
						pagination={{ 
							clickable: true,
							dynamicBullets: true,
						}}
						keyboard={{
							enabled: true,
							onlyInViewport: true,
						}}
						breakpoints={{
							760: { slidesPerView: 4, spaceBetween: 12, slidesPerGroup: 1 },
						}}
						a11y={{
							enabled: true,
							prevSlideMessage: t('portfolio.prev', 'Previous slide'),
							nextSlideMessage: t('portfolio.next', 'Next slide'),
							paginationBulletMessage: t('portfolio.goToSlide', 'Go to slide {{index}}'),
						}}
						watchOverflow={false}
						className="portfolio-swiper"
						loop={true}
						grabCursor={true}
					>
						{items.map(img => (
							<SwiperSlide key={img.key}>
								<button
									className="portfolio-slide-button"
									onClick={() => openLightbox(img.url, img.alt)}
									aria-label={`${img.alt} – ${t('portfolio.openLarge', 'Click to enlarge')}`}
									type="button"
								>
									<img src={img.url} alt={img.alt} loading="lazy" />
								</button>
							</SwiperSlide>
						))}
					</Swiper>
				)}

				{lightboxImage && (
					<div 
						className="lightbox" 
						role="dialog" 
						aria-modal="true" 
						aria-label={lightboxImage.alt}
						onClick={closeLightbox}
					>
						<div className="lightbox-inner" onClick={e => e.stopPropagation()}>
							<img
								src={lightboxImage.url}
								alt={lightboxImage.alt}
								className="lightbox-img"
							/>
							<button 
								type="button" 
								className="toggle-btn lightbox-close" 
								onClick={closeLightbox} 
								aria-label={t('portfolio.close', 'Close')}
							>
								×
							</button>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}

export default Portfolio;
