import { describe, it, expect } from 'vitest';
import { getCountdown, weddingDetails } from '@/config/weddingDetails';

describe('Confirmed wedding details', () => {
  it('keeps reception on 2 December at 7 PM IST', () => {
    expect(weddingDetails.reception.startsAt).toBe('2026-12-02T19:00:00+05:30');
    expect(new Date(weddingDetails.reception.startsAt).toISOString()).toBe('2026-12-02T13:30:00.000Z');
  });
  it('targets 3 December 2026 at 4:42 AM IST', () => {
    expect(new Date(weddingDetails.wedding.startsAt).toISOString()).toBe('2026-12-02T23:12:00.000Z');
    expect(weddingDetails.timezone).toBe('Asia/Kolkata');
  });
  it('calculates exact remaining days, hours, minutes, and seconds', () => {
    expect(getCountdown(Date.parse('2026-12-01T02:40:55+05:30'))).toEqual({ days: 2, hours: 2, minutes: 1, seconds: 5, complete: false });
  });
  it('never returns negative values after the wedding', () => {
    expect(getCountdown(Date.parse('2026-12-04T00:00:00+05:30'))).toEqual({ days: 0, hours: 0, minutes: 0, seconds: 0, complete: true });
  });
  it('marks the exact Muhurtham as complete', () => {
    expect(getCountdown(Date.parse('2026-12-03T04:42:00+05:30')).complete).toBe(true);
  });
  it('preserves the confirmed directions link and S.S. Venue details from the wedding card', () => {
    expect(weddingDetails.mapsUrl).toBe('https://maps.app.goo.gl/61CpE1BoD5ughb18A');
    expect(weddingDetails.venueName).toBe('S.S. Venue');
    expect(weddingDetails.venueAddress).toBe('Kesavaram Road, Rajavolu, Rajamahendravaram Rural, East Godavari Dist.');
    expect(weddingDetails.groomFull).toBe('Chi. Kadali Venkateswara Rao (Venkat)');
    expect(weddingDetails.brideFull).toBe('Chi.La.Sow. Mattaparthi Bhavyasri');
  });
});