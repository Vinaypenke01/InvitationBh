import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, CalendarDays, CalendarPlus, Clock3, Globe, MapPin, Menu, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { artwork } from '@/assets/wedding/artwork';
import { getCountdown, weddingDetails as details } from '@/config/weddingDetails';

type Lang = 'en' | 'te';

const translations = {
  en: {
    groom: details.groom,
    bride: details.bride,
    monogram: ['V', 'B'] as const,
    nav: {
      home: 'Home',
      invitation: 'Invitation',
      schedule: 'Schedule',
      location: 'Location',
      dateBadge: '02 — 03 DEC 2026',
    },
    opening: {
      almightyBlessing: 'With the blessings of the Almighty',
      cordiallyInvite: 'We cordially invite you',
      dateText: '02 & 03 DECEMBER 2026',
      openButton: 'Open invitation',
      footnote: 'A celebration of love, family & togetherness',
    },
    hero: {
      eyebrow: 'Celebrating the union of',
      message: 'Together with our families, we cordially invite you to celebrate our wedding.',
      receptionBadge: '01 · Reception',
      receptionShortDate: details.reception.shortDate,
      receptionTime: details.reception.time,
      muhurthamBadge: '02 · Muhurtham',
      muhurthamShortDate: details.wedding.shortDate,
      muhurthamTime: details.wedding.time,
      countdownComplete: 'Today marks the beginning of forever',
      countdownHeading: 'Counting down to the auspicious Muhurtham',
      units: {
        days: 'days',
        hours: 'hours',
        minutes: 'minutes',
        seconds: 'seconds',
      },
      countdownSubtext: `${details.wedding.date} · ${details.wedding.time}`,
      viewSchedule: 'View Schedule',
      venueMap: 'Venue Map',
    },
    invitation: {
      coupleCaption: 'Two souls · One sacred bond',
      eyebrow: 'An invitation from our hearts',
      heading: 'Your presence is our greatest blessing',
      intro:
        'With the divine blessings of the Almighty and the warm wishes of our parents and elders, we joyfully invite you to join us as',
      outro:
        'begin their new life together in sacred matrimony. Your gracious presence and blessings will make this celebration truly memorable.',
      rituals: ['Jeelakarra Bellam', 'Mangalya Dharanam', 'Talambralu'],
    },
    events: {
      eyebrow: 'Two Auspicious Occasions · Schedule of Events',
      heading: 'Wedding Celebrations',
      reception: {
        step: 'Event 01 · Evening Celebration',
        title: 'Reception',
        date: details.reception.date,
        time: details.reception.time,
        description:
          'Join us for a joyful evening of music, festive dinner, and warm wishes with family and friends.',
        addCalendar: 'Add Reception to Calendar',
      },
      muhurtham: {
        step: 'Event 02 · Sacred Ceremony',
        title: 'Wedding Muhurtham',
        date: details.wedding.date,
        time: details.wedding.time,
        description:
          'Witness the sacred Vedic rituals, Mangalya Dharanam, and Talambralu at the auspicious Muhurtham hour.',
        addCalendar: 'Add Muhurtham to Calendar',
      },
    },
    venue: {
      eyebrow: 'Venue & Navigation',
      heading: 'We Would Love to See You',
      defaultName: 'Our Celebration Location',
      defaultAddress:
        'Both the Reception and Wedding Muhurtham will take place at our celebration venue. Tap below for live Google Maps navigation.',
      directionsButton: 'Get Google Maps Directions',
      signoffEyebrow: 'Awaiting your auspicious presence',
      footerDate: '02 & 03 DECEMBER 2026 · VENKAT & BHAVYA · WITH LOVE & BLESSINGS',
    },
  },
  te: {
    groom: 'వెంకట్',
    bride: 'భవ్య',
    monogram: ['వె', 'భ'] as const,
    nav: {
      home: 'ముఖపుట',
      invitation: 'ఆహ్వానం',
      schedule: 'వేడుకలు',
      location: 'వేదిక',
      dateBadge: '02 — 03 డిసెంబర్ 2026',
    },
    opening: {
      almightyBlessing: 'భగవంతుని ఆశీస్సులతో మరియు పెద్దల దీవెనలతో',
      cordiallyInvite: 'మా వివాహ వేడుకకు సాదర ఆహ్వానం',
      dateText: '02 & 03 డిసెంబర్ 2026',
      openButton: 'ఆహ్వాన పత్రిక తెరవండి',
      footnote: 'ప్రేమ, కుటుంబం మరియు ఆత్మీయతల కలయిక',
    },
    hero: {
      eyebrow: 'శుభ వివాహ ఆహ్వాన పత్రిక',
      message: 'మా కుటుంబ సభ్యులతో కలిసి మా వివాహ మహోత్సవానికి మిమ్మల్ని సాదరంగా ఆహ్వానిస్తున్నాము.',
      receptionBadge: '01 · రిసెప్షన్',
      receptionShortDate: '02 డిసెంబర్ 2026',
      receptionTime: 'రాత్రి 7:00 గంటల నుండి',
      muhurthamBadge: '02 · శుభ ముహూర్తం',
      muhurthamShortDate: '03 డిసెంబర్ 2026',
      muhurthamTime: 'తెల్లవారుజామున 4:42 ని.లకు',
      countdownComplete: 'నేటితో మా కొత్త జీవిత ప్రయాణం ప్రారంభం',
      countdownHeading: 'శుభ ముహూర్తానికి మిగిలి ఉన్న సమయం',
      units: {
        days: 'రోజులు',
        hours: 'గంటలు',
        minutes: 'నిమిషాలు',
        seconds: 'సెకన్లు',
      },
      countdownSubtext: 'గురువారం, 3 డిసెంబర్ 2026 · తెల్లవారుజామున 4:42 IST',
      viewSchedule: 'వేడుకల వివరాలు',
      venueMap: 'వేదిక మ్యాప్',
    },
    invitation: {
      coupleCaption: 'రెండు మనసులు · ఒకే పవిత్ర బంధం',
      eyebrow: 'మా హృదయపూర్వక ఆహ్వానం',
      heading: 'మీ ఆగమనమే మాకు గొప్ప ఆశీర్వాదం',
      intro:
        'భగవంతుని కృపతో, మా తల్లిదండ్రులు మరియు పెద్దల ఆశీస్సులతో నూతన జీవితంలోకి అడుగుపెడుతున్న',
      outro:
        'వివాహ మహోత్సవానికి మీరు సకుటుంబ సపరివార సమేతంగా విచ్చేసి, నూతన వధూవరులను ఆశీర్వదించాలని కోరుకుంటున్నాము.',
      rituals: ['జీలకర్ర బెల్లం', 'మాంగళ్య ధారణ', 'తలంబ్రాలు'],
    },
    events: {
      eyebrow: 'రెండు శుభ సందర్భాలు · వేడుకల వివరాలు',
      heading: 'వివాహ వేడుకలు',
      reception: {
        step: 'వేడుక 01 · సాయంత్రం వేడుక',
        title: 'రిసెప్షన్',
        date: 'బుధవారం, 2 డిసెంబర్ 2026',
        time: 'రాత్రి 7:00 గంటల నుండి',
        description:
          'బంధుమిత్రుల సమక్షంలో సంతోషకరమైన సంగీతం, విందు మరియు ఆత్మీయ వేడుకలో మాతో పాలుపంచుకోండి.',
        addCalendar: 'క్యాలెండర్‌లో చేర్చుకోండి',
      },
      muhurtham: {
        step: 'వేడుక 02 · పవిత్ర వివాహ క్రతువు',
        title: 'శుభ ముహూర్తం',
        date: 'గురువారం, 3 డిసెంబర్ 2026',
        time: 'తెల్లవారుజామున 4:42 IST',
        description:
          'వేద మంత్రోచ్ఛారణల మధ్య జరిగే మాంగళ్య ధారణ మరియు తలంబ్రాల వేడుకలో పాల్గొని వధూవరులను ఆశీర్వదించండి.',
        addCalendar: 'క్యాలెండర్‌లో చేర్చుకోండి',
      },
    },
    venue: {
      eyebrow: 'వేదిక & మార్గదర్శకత్వం',
      heading: 'మీ రాక కోసం ఎదురుచూస్తుంటాము',
      defaultName: 'మా వేడుక జరిగే వేదిక',
      defaultAddress:
        'రిసెప్షన్ మరియు వివాహ ముహూర్తం రెండూ ఇదే వేదిక వద్ద జరుగుతాయి. గూగుల్ మ్యాప్స్ డైరెక్షన్స్ కోసం క్రింది బటన్‌ను నొక్కండి.',
      directionsButton: 'గూగుల్ మ్యాప్స్ డైరెక్షన్స్',
      signoffEyebrow: 'మీ శుభ ఆశీస్సులను కోరుతూ',
      footerDate: '02 & 03 డిసెంబర్ 2026 · వెంకట్ & భవ్య · ప్రేమతో మీ ఆగమనాన్ని కోరుతూ',
    },
  },
} as const;

function Art({ src, alt, className = '', eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  return <img className={`wedding-art ${className}`} src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />;
}

function Divider() {
  return <Art src={artwork.divider} alt="Golden lotus and jasmine ornamental divider" className="ornamental-divider" />;
}

function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduced ? 0 : 0.65 }}
    >
      {children}
    </motion.div>
  );
}

function LanguageSwitcher({
  lang,
  onToggle,
  floating = false,
}: {
  lang: Lang;
  onToggle: (next: Lang) => void;
  floating?: boolean;
}) {
  return (
    <div
      className={floating ? 'lang-switcher lang-switcher-floating' : 'lang-switcher'}
      role="group"
      aria-label="Language selector / భాష ఎంపిక"
    >
      <Globe size={13} className="lang-icon" aria-hidden="true" />
      <button
        type="button"
        className={lang === 'en' ? 'lang-btn is-active' : 'lang-btn'}
        onClick={() => onToggle('en')}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
      <button
        type="button"
        className={lang === 'te' ? 'lang-btn is-active telugu' : 'lang-btn telugu'}
        onClick={() => onToggle('te')}
        aria-pressed={lang === 'te'}
      >
        తెలుగు
      </button>
    </div>
  );
}

function getGoogleCalendarUrl(title: string, startIso: string, durationMinutes: number, description: string) {
  const startMs = Date.parse(startIso);
  const endMs = startMs + durationMinutes * 60 * 1000;
  const fmt = (ms: number) => new Date(ms).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${fmt(startMs)}/${fmt(endMs)}`,
    details: `${description}\n\nVenue Directions: ${details.mapsUrl}`,
    location: details.mapsUrl,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function Opening({
  onOpen,
  lang,
  onToggleLang,
}: {
  onOpen: () => void;
  lang: Lang;
  onToggleLang: (next: Lang) => void;
}) {
  const reduced = useReducedMotion();
  const t = translations[lang];
  const isTe = lang === 'te';

  return (
    <motion.section
      className={`opening ${isTe ? 'lang-te' : ''}`}
      aria-label="Open the wedding invitation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.75 }}
    >
      <LanguageSwitcher lang={lang} onToggle={onToggleLang} floating />
      <Art src={artwork.toranam} alt="Traditional mango leaf toranam with jasmine garlands and brass bell" className="opening-toranam" eager />
      <div className="opening-content">
        <div className="telugu-auspicious-row">
          <span>శ్రీరస్తు</span>
          <span className="dot">·</span>
          <span>శుభమస్తు</span>
          <span className="dot">·</span>
          <span>అవిఘ్నమస్తు</span>
        </div>
        <motion.div
          initial={{ opacity: reduced ? 1 : 0, scale: reduced ? 1 : 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: reduced ? 0 : 0.85 }}
        >
          <Art src={artwork.ganesha} alt="Golden Lord Ganesha surrounded by jasmine flowers and glowing traditional deepams" className="opening-ganesha" eager />
        </motion.div>
        <p className="telugu blessing">శ్రీ గణేశాయ నమః</p>
        <p className={`opening-blessing ${isTe ? 'telugu' : ''}`}>{t.opening.almightyBlessing}</p>
        <Divider />
        <p className={`eyebrow ${isTe ? 'telugu eyebrow-te' : ''}`}>{t.opening.cordiallyInvite}</p>
        <h1 className={`opening-names ${isTe ? 'telugu names-te' : ''}`}>
          {t.groom}
          <span>&</span>
          {t.bride}
        </h1>
        <p className={`opening-date ${isTe ? 'telugu' : ''}`}>{t.opening.dateText}</p>
        <Button variant="invitation" onClick={onOpen} className={isTe ? 'telugu' : ''}>
          {t.opening.openButton} <ArrowUpRight aria-hidden="true" size={16} />
        </Button>
        <p className={`opening-footnote ${isTe ? 'telugu' : ''}`}>{t.opening.footnote}</p>
      </div>
      <p className="opening-bottom telugu">శుభమస్తు</p>
    </motion.section>
  );
}

function Navigation({ lang, onToggleLang }: { lang: Lang; onToggleLang: (next: Lang) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = translations[lang];
  const isTe = lang === 'te';

  const links = [
    [t.nav.home, 'home'],
    [t.nav.invitation, 'invitation'],
    [t.nav.schedule, 'celebrations'],
    [t.nav.location, 'venue'],
  ];
  return (
    <header className="wedding-header">
      <a className={`monogram ${isTe ? 'telugu' : ''}`} href="#home" aria-label="Venkat and Bhavya, home">
        {t.monogram[0]} <span>&</span> {t.monogram[1]}
      </a>
      <nav className={menuOpen ? 'wedding-navigation is-open' : 'wedding-navigation'} aria-label="Wedding navigation">
        {links.map(([label, id]) => (
          <a href={`#${id}`} key={id} className={isTe ? 'telugu nav-link-te' : ''} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      <div className="header-right-controls">
        <p className={`nav-date ${isTe ? 'telugu' : ''}`}>{t.nav.dateBadge}</p>
        <LanguageSwitcher lang={lang} onToggle={onToggleLang} />
        <Button
          className="mobile-menu"
          variant="weddingNav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
      </div>
    </header>
  );
}

function Hero({ lang }: { lang: Lang }) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState<ReturnType<typeof getCountdown> | null>(null);
  const t = translations[lang];
  const isTe = lang === 'te';

  useEffect(() => {
    const update = () => setCount(getCountdown(Date.now()));
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="home" className="hero wedding-section">
      <Art src={artwork.garland} alt="" className="hero-floral hero-floral-left" eager />
      <Art src={artwork.garland} alt="" className="hero-floral hero-floral-right" eager />

      <div className="hero-container">
        <Reveal className="arch-frame">
          <Art src={artwork.arch} alt="Ornate ivory temple arch framed by jasmine garlands and banana leaves" className="temple-arch" eager />
          <div className="hero-names">
            <p className={`eyebrow ${isTe ? 'telugu eyebrow-te' : ''}`}>{t.hero.eyebrow}</p>
            <h1 className={isTe ? 'telugu hero-names-te' : ''}>
              {[t.groom, '&', t.bride].map((name, index) => (
                <motion.span
                  className={name === '&' ? 'hero-ampersand' : undefined}
                  key={name}
                  initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : 0.12 + index * 0.14 }}
                >
                  {name}
                </motion.span>
              ))}
            </h1>
            <p className="telugu">శుభమస్తు</p>
          </div>
        </Reveal>

        <Reveal className="hero-summary-card">
          <div className="telugu-auspicious-row card-auspicious">
            <span>శ్రీ గణేశాయ నమః</span>
            <span className="dot">·</span>
            <span>శ్రీరస్తు</span>
            <span className="dot">·</span>
            <span>శుభమస్తు</span>
          </div>

          <p className={`hero-message ${isTe ? 'telugu hero-message-te' : ''}`}>{t.hero.message}</p>

          <Divider />

          <div className="hero-event-dates">
            <div className="hero-date-item">
              <span className={`event-badge ${isTe ? 'telugu' : ''}`}>{t.hero.receptionBadge}</span>
              <strong className={isTe ? 'telugu' : ''}>{t.hero.receptionShortDate}</strong>
              <small className={isTe ? 'telugu' : ''}>{t.hero.receptionTime}</small>
            </div>
            <span className="date-separator" aria-hidden="true" />
            <div className="hero-date-item">
              <span className={`event-badge ${isTe ? 'telugu' : ''}`}>{t.hero.muhurthamBadge}</span>
              <strong className={isTe ? 'telugu' : ''}>{t.hero.muhurthamShortDate}</strong>
              <small className={isTe ? 'telugu' : ''}>{t.hero.muhurthamTime}</small>
            </div>
          </div>

          <div id="countdown" className="hero-countdown-strip">
            <p className={`eyebrow ${isTe ? 'telugu eyebrow-te' : ''}`}>
              {count?.complete ? t.hero.countdownComplete : t.hero.countdownHeading}
            </p>
            {!count?.complete && (
              <div className="countdown" role="timer" aria-label="Time until the wedding Muhurtham">
                {(['days', 'hours', 'minutes', 'seconds'] as const).map((unit) => (
                  <div className="countdown-unit" key={unit}>
                    <span>{count ? String(count[unit]).padStart(2, '0') : '—'}</span>
                    <small className={isTe ? 'telugu' : ''}>{t.hero.units[unit]}</small>
                  </div>
                ))}
              </div>
            )}
            <p className={`countdown-subtext ${isTe ? 'telugu' : ''}`}>{t.hero.countdownSubtext}</p>
          </div>

          <div className="hero-actions">
            <a href="#celebrations" className={`scroll-cue ${isTe ? 'telugu' : ''}`} aria-label="Scroll to event schedule">
              <span>{t.hero.viewSchedule}</span>
              <ArrowDown size={14} />
            </a>
            <a href="#venue" className={`scroll-cue secondary-cue ${isTe ? 'telugu' : ''}`} aria-label="Scroll to venue directions">
              <MapPin size={14} />
              <span>{t.hero.venueMap}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InvitationAndCouple({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const isTe = lang === 'te';

  return (
    <section id="invitation" className="invitation-section wedding-section">
      <Art src={artwork.corner} alt="" className="invitation-floral-tl" />
      <Art src={artwork.corner} alt="" className="invitation-floral-br" />

      <div className="invitation-layout">
        <Reveal className="couple-frame">
          <div className="couple-arch-card">
            <Art
              src={artwork.couple}
              alt="Watercolor illustration of a Telugu wedding couple in traditional attire"
              className="couple-art"
            />
            <div className="couple-caption">
              <p className={`eyebrow ${isTe ? 'telugu eyebrow-te' : ''}`}>{t.invitation.coupleCaption}</p>
              <p className="telugu">కళ్యాణమస్తు</p>
            </div>
          </div>
        </Reveal>

        <Reveal className="invitation-copy">
          <p className={`eyebrow ${isTe ? 'telugu eyebrow-te' : ''}`}>{t.invitation.eyebrow}</p>
          <h2 className={isTe ? 'telugu heading-te' : ''}>{t.invitation.heading}</h2>
          <Divider />
          <blockquote className="telugu-mantra telugu">
            “మాంగల్యం తంతునానేన మమ జీవన హేతునా
            <br />
            కంఠే బధ్నామి సుభగే త్వం జీవ శరదాం శతమ్”
          </blockquote>
          <p className={isTe ? 'telugu body-te' : ''}>{t.invitation.intro}</p>
          <h3 className={isTe ? 'telugu names-inline-te' : ''}>
            {t.groom} <i>&</i> {t.bride}
          </h3>
          <p className={isTe ? 'telugu body-te' : ''}>{t.invitation.outro}</p>

          <div className="ritual-highlights">
            {t.invitation.rituals.map((ritual) => (
              <div className={`ritual-pill ${isTe ? 'telugu' : ''}`} key={ritual}>
                <Sparkles size={13} />
                <span>{ritual}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function WeddingEvents({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const isTe = lang === 'te';

  const receptionCalUrl = getGoogleCalendarUrl(
    `Venkat & Bhavya — Wedding Reception`,
    details.reception.startsAt,
    180,
    `Join us for the Wedding Reception of Venkat & Bhavya.`
  );
  const weddingCalUrl = getGoogleCalendarUrl(
    `Venkat & Bhavya — Wedding Muhurtham`,
    details.wedding.startsAt,
    120,
    `Sacred Wedding Muhurtham of Venkat & Bhavya at 4:42 AM IST.`
  );

  return (
    <section id="celebrations" className="celebrations-section wedding-section">
      <Reveal className="section-heading">
        <p className={`eyebrow ${isTe ? 'telugu eyebrow-te' : ''}`}>{t.events.eyebrow}</p>
        <h2 className={isTe ? 'telugu heading-te' : ''}>{t.events.heading}</h2>
        <Divider />
      </Reveal>

      <div className="event-grid">
        <Reveal className="event-card">
          <div className="event-card-header">
            <span className={`event-step ${isTe ? 'telugu' : ''}`}>{t.events.reception.step}</span>
          </div>
          <div className="event-art">
            <Art src={artwork.diya} alt="Traditional golden brass lamp surrounded by jasmine flowers" />
          </div>
          <div className="event-body">
            <h3 className={isTe ? 'telugu heading-te' : ''}>{t.events.reception.title}</h3>
            {!isTe && <p className="telugu event-telugu">రిసెప్షన్ వేడుక</p>}
            <div className="event-facts">
              <div className={`event-fact ${isTe ? 'telugu' : ''}`}>
                <CalendarDays size={15} />
                <span>{t.events.reception.date}</span>
              </div>
              <div className={`event-fact ${isTe ? 'telugu' : ''}`}>
                <Clock3 size={15} />
                <span>{t.events.reception.time}</span>
              </div>
            </div>
            <p className={`event-description ${isTe ? 'telugu body-te' : ''}`}>{t.events.reception.description}</p>
            <a href={receptionCalUrl} target="_blank" rel="noopener noreferrer" className={`event-cal-link ${isTe ? 'telugu' : ''}`}>
              <CalendarPlus size={14} />
              <span>{t.events.reception.addCalendar}</span>
            </a>
          </div>
        </Reveal>

        <Reveal className="event-card">
          <div className="event-card-header">
            <span className={`event-step ${isTe ? 'telugu' : ''}`}>{t.events.muhurtham.step}</span>
          </div>
          <div className="event-art">
            <Art src={artwork.mandapam} alt="Traditional South Indian wedding mandapam decorated with jasmine garlands" />
          </div>
          <div className="event-body">
            <h3 className={isTe ? 'telugu heading-te' : ''}>{t.events.muhurtham.title}</h3>
            {!isTe && <p className="telugu event-telugu">శుభ ముహూర్తం</p>}
            <div className="event-facts">
              <div className={`event-fact ${isTe ? 'telugu' : ''}`}>
                <CalendarDays size={15} />
                <span>{t.events.muhurtham.date}</span>
              </div>
              <div className={`event-fact ${isTe ? 'telugu' : ''}`}>
                <Clock3 size={15} />
                <span>{t.events.muhurtham.time}</span>
              </div>
            </div>
            <p className={`event-description ${isTe ? 'telugu body-te' : ''}`}>{t.events.muhurtham.description}</p>
            <a href={weddingCalUrl} target="_blank" rel="noopener noreferrer" className={`event-cal-link ${isTe ? 'telugu' : ''}`}>
              <CalendarPlus size={14} />
              <span>{t.events.muhurtham.addCalendar}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function VenueAndClosing({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const isTe = lang === 'te';

  return (
    <footer id="venue" className="venue-closing-section wedding-section">
      <Art src={artwork.corner} alt="" className="closing-floral-tl" />
      <Art src={artwork.corner} alt="" className="closing-floral-br" />

      <div className="venue-closing-container">
        <Reveal className="venue-card">
          <div className="venue-icon-wrap">
            <MapPin className="venue-pin" size={22} strokeWidth={1.5} />
          </div>
          <p className={`eyebrow ${isTe ? 'telugu eyebrow-te' : ''}`}>{t.venue.eyebrow}</p>
          <h2 className={isTe ? 'telugu heading-te' : ''}>{t.venue.heading}</h2>
          <p className={`venue-name ${isTe ? 'telugu' : ''}`}>{details.venueName || t.venue.defaultName}</p>
          {details.venueAddress ? (
            <p className="venue-address">{details.venueAddress}</p>
          ) : (
            <p className={`venue-address ${isTe ? 'telugu body-te' : ''}`}>{t.venue.defaultAddress}</p>
          )}
          <div className="venue-actions">
            <Button variant="invitation" asChild className={isTe ? 'telugu' : ''}>
              <a href={details.mapsUrl} target="_blank" rel="noopener noreferrer">
                {t.venue.directionsButton} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal className="closing-signoff">
          <Divider />
          <p className={`eyebrow ${isTe ? 'telugu eyebrow-te' : ''}`}>{t.venue.signoffEyebrow}</p>
          <h3 className={isTe ? 'telugu names-inline-te' : ''}>
            {t.groom} <i>&</i> {t.bride}
          </h3>
          <div className="telugu-auspicious-row closing-row">
            <span>శ్రీరస్తు</span>
            <span className="dot">·</span>
            <span>శుభమస్తు</span>
            <span className="dot">·</span>
            <span>కళ్యాణమస్తు</span>
          </div>
        </Reveal>
      </div>

      <p className={`footer-date ${isTe ? 'telugu' : ''}`}>{t.venue.footerDate}</p>
    </footer>
  );
}

export function WeddingInvitation() {
  const [opened, setOpened] = useState(false);
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    if (!opened) return;
    window.scrollTo(0, 0);
  }, [opened]);

  return (
    <>
      <AnimatePresence>
        {!opened && <Opening onOpen={() => setOpened(true)} lang={lang} onToggleLang={setLang} />}
      </AnimatePresence>
      {opened && (
        <motion.div
          className={lang === 'te' ? 'lang-te' : undefined}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <Navigation lang={lang} onToggleLang={setLang} />
          <main>
            <Hero lang={lang} />
            <InvitationAndCouple lang={lang} />
            <WeddingEvents lang={lang} />
          </main>
          <VenueAndClosing lang={lang} />
        </motion.div>
      )}
    </>
  );
}
