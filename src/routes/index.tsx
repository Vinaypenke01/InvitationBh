import { createFileRoute } from "@tanstack/react-router";
import { WeddingInvitation } from '@/components/wedding-invitation';

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: 'Venkat & Bhavyasri | Wedding Invitation · 2 & 3 December 2026' },
    { name: 'description', content: 'Mattaparthi Family Wedding Invitation — join us for the wedding of Chi.La.Sow. Mattaparthi Bhavyasri and Chi. Kadali Venkateswara Rao (Venkat) at S.S. Venue, Kesavaram Road, Rajavolu.' },
    { property: 'og:title', content: 'Venkat & Bhavyasri — Mattaparthi Family Wedding Invitation' },
    { property: 'og:description', content: 'Vindu: 2 December 2026, 7 PM onwards. Sumuhurtham: 3 December 2026, 4:42 AM IST at S.S. Venue, Rajavolu.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: WeddingInvitation,
});
