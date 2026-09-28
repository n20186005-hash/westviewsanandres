import { redirect } from 'next/navigation';

// This page only renders as a fallback for `/`. The middleware intercepts
// requests to `/` and redirects to the default locale (e.g. `/zh`).
export default function RootPage() {
  redirect('/zh');
}