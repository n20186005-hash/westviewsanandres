import {getBaseUrl} from '@/lib/env';
import type {ReactNode} from 'react';
import type {Locale} from '@/i18n/routing';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PhotoHero from '@/components/PhotoHero';
import {places,labels,mapLink,meta,hours} from '@/lib/nearby';

type Props={params:Promise<{locale:Locale;slug:string}>};
export function generateStaticParams(){return places.map(({slug})=>({slug}));}
export async function generateMetadata({params}:Props){
  const {locale,slug}=await params,p=places.find(item=>item.slug===slug);if(!p)notFound();
  const c=p.content[locale];return {title:c.name+' · Eco Parque West View',description:c.lead,alternates:meta(locale,slug),openGraph:{title:c.name,description:c.lead,url:meta(locale,slug).canonical,images:[`${getBaseUrl()}/nearby/${slug}.webp`]}};
}
function Section({title,children}:{title:string;children:ReactNode}){
  return <section className="mb-9"><h2 className="font-display text-2xl sm:text-3xl font-semibold mb-3">{title}</h2>{children}</section>
}
export default async function Guide({params}:Props){
  const {locale,slug}=await params;setRequestLocale(locale);
  const index=places.findIndex(p=>p.slug===slug),p=places[index];if(!p)notFound();
  const t=labels[locale],c=p.content[locale],map=mapLink(p),open=hours(p,locale),region=p.region==='providencia'?t.prov:t.san;
  const duration=`${p.minutes} ${t.minutes}`;
  const stay=p.region==='providencia'?t.stayProv:p.kind==='cay'?t.staySea:t.stayRoad;
  const group=places.filter(other=>other.region===p.region);
  const next=group[(group.findIndex(other=>other.slug===slug)+1)%group.length];
  const normalHours=slug==='crab-cay'?open:duration;
  const faqs=[[c.question,c.practical],[t.q1,c.steps[0]],[t.q2,c.management]];
  const facts=[[t.name,c.name],[t.country,t.countryValue],[t.island,region],[t.entrance,p.address],[t.time,duration],[t.opening,open]];
  const bodyLink='text-[var(--accent)] underline underline-offset-2';
  return <><Header/><main>
    <PhotoHero src={`/nearby/${slug}.webp`} alt={c.name} title={c.name} subtitle={c.lead}>
      <a href={map} className="text-white bg-white/15 px-4 py-2 rounded-full">{t.reviews}</a>
      <a href="#opening" className="text-white bg-white/15 px-4 py-2 rounded-full">{t.opening}</a>
      <a href={map} className="text-white bg-white/15 px-4 py-2 rounded-full">{t.location}</a>
    </PhotoHero>
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10 leading-relaxed">
      <nav className="mb-8 text-sm"><a href={`/${locale}`} className={bodyLink}>Eco Parque West View</a> / <a className={bodyLink} href={`/${locale}/nearby`}>{t.directory}</a> / {c.name}</nav>
      <Section title={t.intro}><p>{c.detail}</p></Section>
      <Section title={t.advice}><p>{p.region==='providencia'?t.transfer:c.steps[0]}</p><p className="mt-2">{t.time} · {normalHours}</p></Section>
      <Section title={t.about}><p>{c.management}</p><a className={bodyLink} href={p.source}>{t.sources}</a></Section>
      <Section title={t.facts}><table className="w-full text-left"><tbody>{facts.map(([k,v])=><tr key={k} className="border-b border-[var(--border-color)]"><th scope="row" className="p-3 w-1/3">{k}</th><td className="p-3">{v}</td></tr>)}<tr><th scope="row" className="p-3">{t.map}</th><td className="p-3"><a className={bodyLink} href={map}>{p.address}</a></td></tr></tbody></table></Section>
      <div id="opening"><Section title={t.opening}><p>{open}</p></Section></div>
      <Section title={t.fee}><p>{c.management}</p></Section>
      <Section title={t.walk}><ol className="list-decimal pl-6 space-y-3">{c.steps.map(step=><li key={step}>{step}</li>)}</ol></Section>
      <Section title={t.notes}><p>{c.practical}</p>
        <figure className="mt-5"><img src={`/nearby/${slug}.webp`} alt={c.name} className="w-full rounded-xl" loading="lazy"/>
        <figcaption className="text-sm mt-2">{c.name} · <a className={bodyLink} href={p.photoSource}>{t.photo}</a> · <a className={bodyLink} href={p.photoPage}>{slug==='old-point'?'Colombia Travel':'SanAndresIslas.com.co'}</a></figcaption></figure>
      </Section>
      <Section title={t.stay}><p>{stay}</p></Section>
      <Section title={t.reviews}><a className={bodyLink} href={map}>{c.name} · Google Maps</a></Section>
      <Section title="FAQ">{faqs.map(([q,a])=><details key={q} className="border-b border-[var(--border-color)] py-3"><summary className="font-semibold cursor-pointer">{q}</summary><p className="mt-2">{a}</p></details>)}</Section>
      <Section title={t.map}><p>{p.address}</p><a href={map} className={bodyLink}>{t.location}</a></Section>
      <Section title={t.next}><a className={bodyLink} href={`/${locale}/nearby/${next.slug}`}>{next.content[locale].name}</a><span> · </span><a className={bodyLink} href={`/${locale}/nearby`}>{t.directory}</a></Section>
    </article></main><Footer/></>
}
