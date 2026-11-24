import PhotoHero from './PhotoHero';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');
  const mapsUrl = "https://maps.app.goo.gl/yUsqkGAHwLbrpgsr8";

  return <PhotoHero src="/gallery/westviewsanandres (9).jpg" alt="Eco Parque West View" title={t('title')} subtitle={t('subtitle')}>
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#f0b429" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span className="text-white text-sm font-medium">{t('rating')}</span>
              <span className="text-white/60 text-xs">({t('reviewCount')})</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span className="text-white text-sm">{t('hours')}</span>
            </div>
            {/* Dynamic Weather Widget Placeholder */}
            <div className="flex items-center gap-1.5 bg-blue-500/30 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-400/50">
              <span className="text-white text-sm">🌊 {t('snorkeling')}</span>
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/25 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <span className="text-white text-sm">{t('openMaps')}</span>
            </a>
  </PhotoHero>;
}
