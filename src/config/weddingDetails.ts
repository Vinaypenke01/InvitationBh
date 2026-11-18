export const weddingDetails = {
  familyTitle: "Mattaparthi Family Wedding Invitation",
  memorialBlessing: "With the blessings of Late Sri Mattaparthi Kumaraswamy...",
  groom: "Venkat",
  groomFull: "Chi. Kadali Venkateswara Rao (Venkat)",
  groomQualification: "B.P.Ed., M.Sc. (Yoga)",
  groomParents:
    "Youngest S/o. Late Sri Kadali Apparao & Smt. Nagaveni, Residents of Pasarlapudi (Kottumeraka), Mamidikuduru Mandal, Dr. B.R. Ambedkar Konaseema Dist.",
  bride: "Bhavyasri",
  brideFull: "Chi.La.Sow. Mattaparthi Bhavyasri",
  brideQualification: "B.S.C(Computers)",
  brideParents: "Only D/o. Late Sri Mattaparthi Kumaraswamy & Smt. Sujatha",
  invitedBy: {
    elderHosts: "Sri Mattaparthi Kalikumar & Smt. Shakunthala",
    parents: "Late Sri Mattaparthi Kumaraswamy & Smt. Sujatha",
    brother: "Annayya: Mattaparthi Saikiran",
    residence: "Rajavolu, Rajamahendravaram Rural, East Godavari Dist.",
    contacts: ["9704334723", "9160075624"],
  },
  timezone: "Asia/Kolkata",
  reception: {
    date: "Wednesday, 2 December 2026",
    shortDate: "02 December 2026",
    time: "7:00 PM onwards",
    startsAt: "2026-12-02T19:00:00+05:30",
  },
  wedding: {
    date: "Thursday, 3 December 2026",
    shortDate: "03 December 2026",
    traditionalDate: "Wednesday night, 2 Dec 2026 at 4:42 AM (Early Morning Thursday, 3 Dec 2026)",
    panchangam: "Sri Parabhava Nama Samvatsara Karthika Masa Bahula Navami / Dasami, Uttara Nakshatra Yukta Tula Lagnam",
    time: "4:42 AM IST",
    startsAt: "2026-12-03T04:42:00+05:30",
  },
  mapsUrl: "https://maps.app.goo.gl/61CpE1BoD5ughb18A",
  venueName: "S.S. Venue",
  venueAddress: "Kesavaram Road, Rajavolu, Rajamahendravaram Rural, East Godavari Dist.",
} as const;

export function getCountdown(now: number) {
  const seconds = Math.max(0, Math.floor((Date.parse(weddingDetails.wedding.startsAt) - now) / 1000));
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
    complete: now >= Date.parse(weddingDetails.wedding.startsAt),
  };
}
