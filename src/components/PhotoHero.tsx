import type { ReactNode } from 'react';
type Props = {src:string;alt:string;title:string;subtitle:string;children:ReactNode};
export default function PhotoHero({src,alt,title,subtitle,children}:Props) {
  return (
    <section className="relative min-h-screen flex items-end pb-16 sm:pb-24 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={src} loading="eager" fetchPriority="high"
          alt={alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'var(--hero-overlay)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 animate-fade-in-up">
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-8 animate-fade-in-up animation-delay-100 font-light">
            {subtitle}
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 mb-8 animate-fade-in-up animation-delay-200">
            {children}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" opacity="0.5">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </section>
  );
}
