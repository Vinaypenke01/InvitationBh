import { useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, CalendarDays, CalendarPlus, Clock3, Globe, MapPin, Menu, Phone, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { artwork } from '@/assets/wedding/artwork';
import { getCountdown, weddingDetails as details } from '@/config/weddingDetails';

type Lang = 'en' | 'te';

const translations = {
  en: {
    groom: details.groom,
    groomFull: details.groomFull,
    groomQualification: details.groomQualification,
    groomParents: details.groomParents,
    bride: details.bride,
    brideFull: details.brideFull,
    brideQualification: details.brideQualification,
    brideParents: details.brideParents,
    monogram: ['V', 'B'] as const,
    nav: {
      home: 'Home',
      invitation: 'Invitation',
      schedule: 'Schedule',
      location: 'Venue',
      dateBadge: '02 — 03 DEC 2026',
    },
    opening: {
      familyTitle: 'Mattaparthi Family Wedding Invitation',
      almightyBlessing: 'With the blessings of Late Sri Mattaparthi Kumaraswamy...',
      cordiallyInvite: 'We cordially invite you to the wedding of',
      dateText: '02 & 03 DECEMBER 2026 · S.S. VENUE, RAJAVOLU',
      openButton: 'Open invitation',
      footnote: 'Mattaparthi Brothers, Reddy Brothers & Relatives',
    },
    hero: {
      eyebrow: 'Mattaparthi Family Wedding Invitation',
      message:
        'In the pearl canopy and joyous celebration, we invite you to bless Bhavyasri & Venkat as they unite in sacred matrimony.',
      receptionBadge: '01 · Dinner (Vindu)',
      receptionShortDate: details.reception.shortDate,
      receptionTime: '7:00 PM onwards at Venue',
      muhurthamBadge: '02 · Sumuhurtham',
      muhurthamShortDate: '03 Dec 2026 (Thu)',
      muhurthamTime: '4:42 AM IST (Tula Lagnam)',
      countdownComplete: 'Today marks the beginning of forever',
      countdownHeading: 'Counting down to the auspicious Sumuhurtham',
      units: {
        days: 'days',
        hours: 'hours',
        minutes: 'minutes',
        seconds: 'seconds',
      },
      countdownSubtext: 'Wednesday night 2 Dec (Early morning Thursday 3 Dec 2026) · 4:42 AM · Uttara Nakshatra Yukta Tula Lagnam',
      viewSchedule: 'View Schedule',
      venueMap: 'S.S. Venue Map',
    },
    invitation: {
      coupleCaption: 'Saptapadi · Seven Sacred Steps Together',
      eyebrow: 'Subhalekha · Wedding Invitation',
      heading: 'Sri Mattaparthi Kalikumar & Smt. Shakunthala',
      subHeading: 'cordially invite you to the marriage of my brother Late Sri Mattaparthi Kumaraswamy & Smt. Sujatha’s only daughter',
      BrideLabel: 'Bride',
      GroomLabel: 'Groom',
      withLabel: 'with',
      abhilashaTitle: 'Abhilasha (Our Wish)',
      abhilashaText:
        '“In the pearl canopy and amidst joyful celebrations, we request your gracious presence and blessings for Bhavyasri & Venkat as they unite with the sacred three knots.”',
      hostsHeading: 'Invited By',
      hostsList: [
        {
          role: 'Yours Truly (Bhavadeeyulu)',
          names: 'Late Sri Mattaparthi Kumaraswamy & Smt. Sujatha',
        },
        {
          role: 'Awaiting Your Presence (Agamanabhilashulu)',
          names: 'Annayya: Mattaparthi Saikiran',
        },
      ],
      compliments:
        'With best compliments from: Mattaparthi Brothers, Reddy Brothers, Elders, Relatives & Friends.',
      saptapadiTitle: 'Saptapadi · The Seven Sacred Steps',
      rituals: [
        '1st Step: Nourishment',
        '2nd Step: Happiness & Strength',
        '3rd Step: Sacred Vows',
        '4th Step: Progeny & Family',
        '5th Step: Lifelong Friendship',
        '6th Step: Abundant Prosperity',
        '7th Step: Eternal Wealth & Harmony',
      ],
    },
    events: {
      eyebrow: 'Two Auspicious Occasions · Schedule of Events',
      heading: 'Wedding Celebrations',
      reception: {
        step: 'Event 01 · Wedding Feast (Vindu)',
        title: 'Vindu (Reception & Dinner)',
        date: 'Wednesday, 2 December 2026',
        time: '7:00 PM onwards at Kalyana Vedika',
        description:
          'Join us at S.S. Venue, Kesavaram Road, Rajavolu for the celebratory dinner and warm wishes with family and friends.',
        addCalendar: 'Add Vindu to Calendar',
      },
      muhurtham: {
        step: 'Event 02 · Sacred Sumuhurtham',
        title: 'Wedding Sumuhurtham',
        date: 'Wednesday night 2 Dec / Early Thu, 3 Dec 2026',
        time: '4:42 AM IST (Uttara Nakshatra · Tula Lagnam)',
        description:
          'Swasthi Sri Chandramana Sri Parabhava Nama Samvatsara Karthika Masa Bahula Navami / Dasami — witness the sacred Mangalya Dharanam.',
        addCalendar: 'Add Sumuhurtham to Calendar',
      },
    },
    venue: {
      eyebrow: 'Kalyana Vedika · Venue & Navigation',
      heading: 'S.S. Venue, Rajavolu',
      defaultName: 'S.S. Venue (Kalyana Vedika)',
      defaultAddress: 'Kesavaram Road, Rajavolu, Rajamahendravaram Rural, East Godavari Dist.',
      contactLabel: 'Host Residence & Contact: Rajavolu, Rajamahendravaram Rural',
      directionsButton: 'Get Google Maps Directions',
      signoffEyebrow: 'Mattaparthi Vari Pelli Pilupu · Awaiting Your Presence',
      footerDate: '02 & 03 DECEMBER 2026 · VENKAT & BHAVYASRI · S.S. VENUE, RAJAVOLU',
    },
  },
  te: {
    groom: 'వెంకట్',
    groomFull: 'చి|| కడలి వెంకటేశ్వరరావు (వెంకట్)',
    groomQualification: 'B.P.Ed., M.Sc. (Yoga)',
    groomParents:
      '(డా|| బి.ఆర్ అంబేద్కర్ కోనసీమ జిల్లా, మామిడికుదురు మండలం, పాశర్లపూడి (కొట్టుమెరక) వాస్తవ్యులు శ్రీ కడలి అప్పారావు (లేటు), శ్రీమతి నాగమణి దంపతుల కనిష్ఠ కుమారుడు)',
    bride: 'భవ్యశ్రీ',
    brideFull: 'చి||ల||సౌ|| మట్టపర్తి భవ్యశ్రీ',
    brideQualification: "B.S.C",
    brideParents: '(నా సోదరుడు మట్టపర్తి కుమారస్వామి (లేటు), శ్రీమతి సుజాత దంపతుల ఏకైక కుమార్తె)',
    monogram: ['వె', 'భ'] as const,
    nav: {
      home: 'ముఖపుట',
      invitation: 'శుభలేఖ',
      schedule: 'వేడుకలు',
      location: 'కళ్యాణ వేదిక',
      dateBadge: '02 — 03 డిసెంబర్ 2026',
    },
    opening: {
      familyTitle: 'మట్టపర్తి వారి వివాహ మహోత్సవ ఆహ్వాన పత్రిక',
      almightyBlessing: 'కీ||శే|| మట్టపర్తి కుమార స్వామి ఆశీస్సులతో...',
      cordiallyInvite: 'మట్టపర్తి వారి పెండ్లి పిలుపు',
      dateText: 'ది. 02 & 03 డిసెంబర్ 2026 · ఎస్.ఎస్. వెన్యూ, రాజవోలు',
      openButton: 'ఆహ్వాన పత్రిక తెరవండి',
      footnote: 'మట్టపర్తి బ్రదర్స్, రెడ్డి బ్రదర్స్ మరియు బంధుమిత్రుల అభినందనలతో',
    },
    hero: {
      eyebrow: 'మట్టపర్తి వారి వివాహ మహోత్సవ ఆహ్వాన పత్రిక',
      message:
        'ముత్యాల పందిరిలో మురిపాల సందడిలో మూడుముళ్ళ బంధంతో ఏకమవుతున్న “భవ్యశ్రీ - వెంకట్” లను ఆశీర్వదించ కోరుచున్నాము.',
      receptionBadge: '01 · విందు',
      receptionShortDate: 'ది. 2-12-2026 బుధవారం',
      receptionTime: 'రాత్రి 7:00 గం||ల నుండి కళ్యాణవేదిక వద్ద',
      muhurthamBadge: '02 · సుముహూర్తం',
      muhurthamShortDate: 'ది. 2-12-2026 రాత్రి (తెల్లవారితే గురువారం)',
      muhurthamTime: 'రాత్రి గం|| 4:42 ని||లకు (తులా లగ్నం)',
      countdownComplete: 'నేటితో మా కొత్త జీవిత ప్రయాణం ప్రారంభం',
      countdownHeading: 'సుముహూర్తానికి మిగిలి ఉన్న సమయం',
      units: {
        days: 'రోజులు',
        hours: 'గంటలు',
        minutes: 'నిమిషాలు',
        seconds: 'సెకన్లు',
      },
      countdownSubtext:
        'స్వస్తిశ్రీ చాంద్రమాన శ్రీ పరాభవ నామ సంవత్సర కార్తీకమాస బహుళ నవమి తత్కాల దశమి · ది. 2-12-2026 బుధవారం రాత్రి గం|| 4:42 ని||లకు (తెల్లవారితే గురువారం) ఉత్తరా నక్షత్రయుక్త తులాలగ్నమునందు',
      viewSchedule: 'వేడుకల వివరాలు',
      venueMap: 'కళ్యాణ వేదిక మ్యాప్',
    },
    invitation: {
      coupleCaption: 'సప్తపది · ఏడు అడుగుల పవిత్ర బంధం',
      eyebrow: 'కీ||శే|| మట్టపర్తి కుమార స్వామి ఆశీస్సులతో...',
      heading: 'మట్టపర్తి కాళీకుమార్, శ్రీమతి శకుంతల దంపతులు వ్రాయు శుభలేఖార్థములు',
      subHeading: 'నా సోదరుడు మట్టపర్తి కుమారస్వామి (లేటు), శ్రీమతి సుజాత దంపతుల ఏకైక కుమార్తెకు ఇచ్చి వివాహము జరిపించుటకు పెద్దలు నిశ్చయించినారు.',
      BrideLabel: 'వధువు',
      GroomLabel: 'వరుడు',
      withLabel: 'వివాహము',
      abhilashaTitle: 'అభిలాష :',
      abhilashaText:
        '“ముత్యాల పందిరిలో మురిపాల సందడిలో మూడుముళ్ళ బంధంతో ఏకమవుతున్న ‘భవ్యశ్రీ - వెంకట్’ లను ఆశీర్వదించ కోరుచున్నాము.”',
      hostsHeading: 'ఆహ్వానించువారు',
      hostsList: [
        {
          role: 'భవదీయులు',
          names: 'మట్టపర్తి కుమారస్వామి (లేటు), శ్రీమతి సుజాత',
        },
        {
          role: 'ఆగమనాభిలాషులు',
          names: 'అన్నయ్య : మట్టపర్తి సాయికిరణ్',
        },
      ],
      compliments:
        'మట్టపర్తి బ్రదర్స్, రెడ్డి బ్రదర్స్, పెద్దనాన్నలు-పెద్దమ్మలు, చిన్నాన్నలు-చిన్నమ్మలు, అత్తయ్యలు-మావయ్యలు, అక్కలు-బావలు, చెల్లెళ్లు-బావలు, అన్నయ్యలు-వదినలు మరియు బంధుమిత్రుల అభినందనలతో',
      saptapadiTitle: '// సప్తపది //',
      rituals: [
        'మొదటి అడుగు: అన్న పానీయాల కోసం',
        'రెండవ అడుగు: సుఖ సంతోషాల కోసం',
        'మూడవ అడుగు: వ్రతాల కోసం',
        'నాలుగవ అడుగు: సంతానం కోసం',
        'ఐదవ అడుగు: సఖ్యత కోసం',
        'ఆరవ అడుగు: పాడిపంటల కోసం',
        'ఏడవ అడుగు: సంపద కోసం',
      ],
    },
    events: {
      eyebrow: 'రెండు శుభ సందర్భాలు · వేడుకల వివరాలు',
      heading: 'వివాహ మహోత్సవ వేడుకలు',
      reception: {
        step: 'వేడుక 01 · విందు భోజనం',
        title: 'విందు',
        date: 'ది. 2-12-2026 బుధవారం',
        time: 'రాత్రి 7:00 గం||ల నుండి కళ్యాణవేదిక వద్ద',
        description:
          'ఎస్.ఎస్. వెన్యూ, కేశవరం రోడ్, రాజవోలు వద్ద జరిగే విందు వేడుకలో బంధుమిత్రులతో కలిసి పాల్గొనాలని కోరుచున్నాము.',
        addCalendar: 'క్యాలెండర్‌లో చేర్చుకోండి',
      },
      muhurtham: {
        step: 'వేడుక 02 · పవిత్ర సుముహూర్తం',
        title: 'సుముహూర్తం',
        date: 'ది. 2-12-2026 బుధవారం రాత్రి (తెల్లవారితే గురువారం)',
        time: 'రాత్రి గం|| 4:42 ని||లకు (ఉత్తరా నక్షత్రయుక్త తులాలగ్నం)',
        description:
          'స్వస్తిశ్రీ చాంద్రమాన శ్రీ పరాభవ నామ సంవత్సర కార్తీకమాస బహుళ నవమి తత్కాల దశమి నాడు జరిగే శుభ ముహూర్తమున వధూవరులను ఆశీర్వదించండి.',
        addCalendar: 'క్యాలెండర్‌లో చేర్చుకోండి',
      },
    },
    venue: {
      eyebrow: 'కళ్యాణ వేదిక & మార్గదర్శకత్వం',
      heading: 'ఎస్.ఎస్. వెన్యూ, రాజవోలు',
      defaultName: 'ఎస్.ఎస్. వెన్యూ (S.S. Venue)',
      defaultAddress: 'కేశవరం రోడ్, రాజవోలు, రాజమహేంద్రవరం రూరల్, తూ||గో|| జిల్లా.',
      contactLabel: 'ఆహ్వానించువారు: రాజవోలు, రాజమహేంద్రవరం రూరల్, తూ||గో|| జిల్లా.',
      directionsButton: 'గూగుల్ మ్యాప్స్ డైరెక్షన్స్',
      signoffEyebrow: 'మట్టపర్తి వారి పెండ్లి పిలుపు · మీ ఆగమనాన్ని కోరుతూ',
      footerDate: '02 & 03 డిసెంబర్ 2026 · వెంకట్ & భవ్యశ్రీ · ఎస్.ఎస్. వెన్యూ, రాజవోలు',
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
      initial={false}
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
    details: `${description}\n\nVenue: ${details.venueName}, ${details.venueAddress}\nDirections: ${details.mapsUrl}`,
    location: `${details.venueName}, ${details.venueAddress}`,
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
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.75 }}
    >
      <LanguageSwitcher lang={lang} onToggle={onToggleLang} floating />
      <Art src={artwork.toranam} alt="Traditional mango leaf toranam with jasmine garlands and brass bell" className="opening-toranam" eager />
      <div className="opening-content">
        <div className="telugu-auspicious-row">
          <span>|| శ్రీరస్తు ||</span>
          <span className="dot">·</span>
          <span>|| శుభమస్తు ||</span>
          <span className="dot">·</span>
          <span>|| అవిఘ్నమస్తు ||</span>
        </div>
        <motion.div
          initial={false}
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
      <a className={`monogram ${isTe ? 'telugu' : ''}`} href="#home" aria-label="Venkat and Bhavyasri, home">
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
            <h1 className={`hero-names-compact ${isTe ? 'telugu hero-names-te' : ''}`}>
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
            <span>|| శ్రీరస్తు ||</span>
            <span className="dot">·</span>
            <span>|| శుభమస్తు ||</span>
            <span className="dot">·</span>
            <span>|| అవిఘ్నమస్తు ||</span>
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
            <blockquote className="telugu-slokam telugu">
              శ్లో|| జానక్యాః కమలామలాంజలి పుటేయాః పద్మరాగాయితాః
              <br />
              న్యస్తా రాఘవ మస్తకేచ విలసత్కుంద ప్రసూనాయితాః
              <br />
              స్రస్తాశ్యామల కాయకాంతి కలితాః యా ఇంద్రనీలాయితాః
              <br />
              ముక్తాస్తాశ్శుభదా భవంతు భవతాం శ్రీరామ వైవాహికాః
            </blockquote>
          </div>
        </Reveal>

        <Reveal className="invitation-copy">
          <p className={`eyebrow ${isTe ? 'telugu eyebrow-te' : ''}`}>{t.invitation.eyebrow}</p>
          <h2 className={isTe ? 'telugu heading-te' : ''}>{t.invitation.heading}</h2>
          <p className={isTe ? 'telugu body-te' : ''}>{t.invitation.subHeading}</p>
          <Divider />

          <div className="couple-formal-names">
            <div className="person-block">
              <span className={`person-role ${isTe ? 'telugu' : ''}`}>{t.invitation.BrideLabel}</span>
              <h3 className={isTe ? 'telugu names-inline-te' : ''}>{t.brideFull}</h3>
              <span className="groom-qual">{t.brideQualification}</span>
              <p className={`parent-detail ${isTe ? 'telugu' : ''}`}>{t.brideParents}</p>
            </div>

            <p className={`with-conjunction ${isTe ? 'telugu' : ''}`}>&</p>

            <div className="person-block">
              <span className={`person-role ${isTe ? 'telugu' : ''}`}>{t.invitation.GroomLabel}</span>
              <h3 className={isTe ? 'telugu names-inline-te' : ''}>{t.groomFull}</h3>
              <span className="groom-qual">{t.groomQualification}</span>
              <p className={`parent-detail ${isTe ? 'telugu' : ''}`}>{t.groomParents}</p>
            </div>
          </div>

          <blockquote className={`telugu-mantra ${isTe ? 'telugu' : ''}`}>
            <strong>{t.invitation.abhilashaTitle}</strong> {t.invitation.abhilashaText}
          </blockquote>

          <div className="hosts-block">
            <p className={`eyebrow ${isTe ? 'telugu eyebrow-te' : ''}`}>{t.invitation.hostsHeading}</p>
            <div className="hosts-grid">
              {t.invitation.hostsList.map((host) => (
                <div className="host-pair" key={host.role}>
                  <small className={isTe ? 'telugu' : ''}>{host.role}</small>
                  <strong className={isTe ? 'telugu' : ''}>{host.names}</strong>
                </div>
              ))}
            </div>
            <p className={`compliments-line ${isTe ? 'telugu' : ''}`}>{t.invitation.compliments}</p>
          </div>

          <div className="ritual-section">
            <p className={`eyebrow saptapadi-heading ${isTe ? 'telugu eyebrow-te' : ''}`}>{t.invitation.saptapadiTitle}</p>
            <div className="ritual-highlights">
              {t.invitation.rituals.map((ritual) => (
                <div className={`ritual-pill ${isTe ? 'telugu' : ''}`} key={ritual}>
                  <Sparkles size={12} />
                  <span>{ritual}</span>
                </div>
              ))}
            </div>
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
    `Bhavyasri & Venkat — Wedding Vindu (Dinner)`,
    details.reception.startsAt,
    180,
    `Wedding Vindu (Reception & Dinner) of Chi.La.Sow. Mattaparthi Bhavyasri & Chi. Kadali Venkateswara Rao (Venkat) at S.S. Venue, Kesavaram Road, Rajavolu.`
  );
  const weddingCalUrl = getGoogleCalendarUrl(
    `Bhavyasri & Venkat — Wedding Sumuhurtham`,
    details.wedding.startsAt,
    120,
    `Sacred Wedding Sumuhurtham (Uttara Nakshatra Yukta Tula Lagnam) of Chi.La.Sow. Mattaparthi Bhavyasri & Chi. Kadali Venkateswara Rao (Venkat) at 4:42 AM IST at S.S. Venue, Kesavaram Road, Rajavolu.`
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
            {!isTe && <p className="telugu event-telugu">విందు · కళ్యాణవేదిక వద్ద</p>}
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
            {!isTe && <p className="telugu event-telugu">సుముహూర్తం · తులాలగ్నమునందు</p>}
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
          <p className={`venue-name ${isTe ? 'telugu' : ''}`}>{t.venue.defaultName}</p>
          <p className={`venue-address ${isTe ? 'telugu body-te' : ''}`}>{t.venue.defaultAddress}</p>

          <div className="venue-contacts">
            <p className={`contact-residence ${isTe ? 'telugu' : ''}`}>{t.venue.contactLabel}</p>
            <div className="phone-links">
              {details.invitedBy.contacts.map((phone) => (
                <a href={`tel:+91${phone}`} className="phone-pill" key={phone}>
                  <Phone size={13} />
                  <span>{phone}</span>
                </a>
              ))}
            </div>
          </div>

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
            <span>|| శ్రీరస్తు ||</span>
            <span className="dot">·</span>
            <span>|| శుభమస్తు ||</span>
            <span className="dot">·</span>
            <span>|| అవిఘ్నమస్తు ||</span>
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
