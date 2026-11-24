import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NearbyDirectory from '@/components/NearbyDirectory';
import {setRequestLocale} from 'next-intl/server';
import {labels,meta} from '@/lib/nearby';
import type {Locale} from '@/i18n/routing';
type Props={params:Promise<{locale:Locale}>};
export async function generateMetadata({params}:Props){const {locale}=await params;return {title:labels[locale].directory,alternates:meta(locale)};}
export default async function Directory({params}:Props){const {locale}=await params;setRequestLocale(locale);return <><Header/><main><div className="bg-[var(--color-nature-900)] text-white pt-28 pb-12 px-6"><h1 className="max-w-6xl mx-auto font-display text-4xl">{labels[locale].directory}</h1></div><NearbyDirectory locale={locale}/></main><Footer/></>}
