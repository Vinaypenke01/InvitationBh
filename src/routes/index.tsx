import { createFileRoute } from "@tanstack/react-router";
import { WeddingInvitation } from '@/components/wedding-invitation';

// The home route ships no og:image, so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: 'Venkat & Bhavya | Wedding Invitation · 2 & 3 December 2026' },
    { name: 'description', content: 'With love and blessings, join Venkat and Bhavya for their reception on 2 December and wedding Muhurtham on 3 December 2026 at 4:42 AM IST.' },
    { property: 'og:title', content: 'Venkat & Bhavya — A beautiful beginning' },
    { property: 'og:description', content: 'You are cordially invited. Reception: 2 December 2026, 7 PM onwards. Wedding: 3 December 2026, 4:42 AM IST.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: WeddingInvitation,
});
