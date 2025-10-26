// Moved from routes/Portfolio.tsx
import entrepreneurPhoto from '../assets/images/ui/entrepreneur.jpg';
import { useS3Gallery } from '../lib/useS3Gallery';
import { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from '../lib/useMediaQuery';
import { useTranslation } from 'react-i18next';

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
	// Responsive: determine if viewport is mobile width
	const isMobile = useMediaQuery('(max-width: 760px)');
	const VISIBLE = isMobile ? 3 : 4; // number of thumbnails to render
	const [index, setIndex] = useState(0);
	const [activeKey, setActiveKey] = useState<string | null>(null);
	const prevFocusRef = useRef<Element | null>(null);
	const lightboxImgRef = useRef<HTMLImageElement | null>(null);
	const bodyOverflowRef = useRef<string>('');

	useEffect(() => {
		if (index > items.length - 1) setIndex(0);
	}, [items, index]);

	const cycle = (dir: 1 | -1) => {
		if (!items.length) return;
		setIndex(i => {
			const max = items.length;
			return (i + dir + max) % max;
		});
	};

	const openLightbox = (key: string) => {
		prevFocusRef.current = document.activeElement;
		setActiveKey(key);
	};

	const closeLightbox = () => {
		setActiveKey(null);
		// restore scroll
		if (bodyOverflowRef.current) document.body.style.overflow = bodyOverflowRef.current;
		if (prevFocusRef.current instanceof HTMLElement) prevFocusRef.current.focus();
	};

	// key listener + scroll lock + focus management
	useEffect(() => {
		if (!activeKey) return;
		const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox(); };
		document.addEventListener('keydown', onKey);
		// lock scroll
		bodyOverflowRef.current = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		// focus image after render
		requestAnimationFrame(() => { lightboxImgRef.current?.focus(); });
		return () => {
			document.removeEventListener('keydown', onKey);
			// ensure cleanup if effect early
			document.body.style.overflow = bodyOverflowRef.current;
		};
	}, [activeKey]);

	const visibleItems = !items.length ? [] : Array.from({ length: Math.min(VISIBLE, items.length) }, (_, idx) => items[(index + idx) % items.length]);
	const activeItem = items.find(i => i.key === activeKey) || null;

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
				<div className="carousel" aria-live="polite">
					<div className="carousel-top-controls">
						<button
							className="carousel-btn carousel-btn--prev toggle-btn"
							type="button"
							aria-label={t('portfolio.prev')}
							onClick={() => cycle(-1)}
						>
							←
						</button>
						<button
							className="carousel-btn carousel-btn--next toggle-btn"
							type="button"
							aria-label={t('portfolio.next')}
							onClick={() => cycle(1)}
						>
							→
						</button>
					</div>
					<div
						className="carousel-track"
						style={{ gridTemplateColumns: `repeat(${VISIBLE}, minmax(0,1fr))` }}
					>
						{loading && items.length === 0 && Array.from({ length: VISIBLE }).map((_, i) => <div key={i} className="portfolio-item" aria-hidden="true" />)}
						{!loading && visibleItems.map(img => (
							<button
								key={img.key}
								className="portfolio-item"
								type="button"
								aria-label={`${img.alt} – ${t('portfolio.openLarge')}`}
								onClick={() => openLightbox(img.key)}
							>
								<img src={img.url} alt={img.alt} loading="lazy" />
							</button>
						))}
					</div>
				</div>
				{activeItem && (
					<div className="lightbox" role="dialog" aria-modal="true" aria-label={activeItem.alt} onClick={closeLightbox}>
						<div className="lightbox-inner" onClick={e => e.stopPropagation()}>
							<img
								ref={lightboxImgRef}
								src={activeItem.url}
								alt={activeItem.alt}
								tabIndex={-1}
								className="lightbox-img"
							/>
							<button type="button" className="toggle-btn lightbox-close" onClick={closeLightbox} aria-label={t('portfolio.close')}>×</button>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}

export default Portfolio;
