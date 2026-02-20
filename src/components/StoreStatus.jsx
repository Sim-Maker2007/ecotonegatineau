import { useState, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';

const HOURS = {
  1: { open: 9, close: 18 },  // Monday
  2: { open: 9, close: 18 },  // Tuesday
  3: { open: 9, close: 18 },  // Wednesday
  4: { open: 9, close: 18 },  // Thursday
  5: { open: 9, close: 18 },  // Friday
  6: { open: 9, close: 17 },  // Saturday
  0: null                      // Sunday — closed
};

function getStatus(lang) {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Toronto' }));
  const day = now.getDay();
  const hour = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hour + minutes / 60;
  const schedule = HOURS[day];

  if (!schedule) return { open: false, label: lang === 'fr' ? 'Fermé' : 'Closed' };
  if (currentTime >= schedule.open && currentTime < schedule.close) {
    const closesAt = schedule.close > 12 ? `${schedule.close - 12}PM` : `${schedule.close}AM`;
    return { open: true, label: lang === 'fr' ? `Ouvert · Ferme à ${closesAt}` : `Open · Closes at ${closesAt}` };
  }
  return { open: false, label: lang === 'fr' ? 'Fermé' : 'Closed' };
}

export default function StoreStatus() {
  const { lang } = useLang();
  const [status, setStatus] = useState(() => getStatus(lang));

  useEffect(() => {
    setStatus(getStatus(lang));
    const interval = setInterval(() => setStatus(getStatus(lang)), 60000);
    return () => clearInterval(interval);
  }, [lang]);

  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider ${status.open ? 'text-ecotone-green' : 'text-red-400'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status.open ? 'bg-ecotone-green animate-pulse' : 'bg-red-400'}`} />
      {status.label}
    </span>
  );
}
