export const weddingDetails = {
  groom: "Venkat",
  bride: "Bhavya",
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
    time: "4:42 AM IST",
    startsAt: "2026-12-03T04:42:00+05:30",
  },
  mapsUrl: "https://maps.app.goo.gl/61CpE1BoD5ughb18A",
  venueName: "",
  venueAddress: "",
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