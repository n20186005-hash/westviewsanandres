import { places, labels } from '@/lib/nearby';
import type { Locale } from '@/i18n/routing';
export default function NearbyDirectory({locale}:{locale:Locale}) {
  const t=labels[locale];
  return <section id="nearby" className="section-padding"><div className="max-w-6xl mx-auto px-4 sm:px-6">
    <h2 className="font-display text-3xl sm:text-4xl font-bold mb-8"><a href={`/${locale}/nearby`}>{t.directory}</a></h2>
    {['san-andres','providencia'].map(region=><div key={region} className="mb-10">
      <h3 className="font-display text-2xl mb-3">{region==='san-andres'?t.san:t.prov}</h3>
      {region==='providencia'&&<p className="mb-5">{t.transfer}</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{places.filter(p=>p.region===region).map(p=>
        <a key={p.slug} href={`/${locale}/nearby/${p.slug}`} style={{background:'var(--card-bg)',border:'1px solid var(--border-color)'}} className="rounded-xl overflow-hidden">
          <img src={`/nearby/${p.slug}.webp`} alt={p.content[locale].name} loading="lazy" width="600" height="400" className="w-full aspect-[3/2] object-cover"/>
          <span className="block p-4 font-display text-lg">{p.content[locale].name}</span>
        </a>)}</div></div>)}
  </div></section>
}
