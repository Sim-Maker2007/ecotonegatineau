import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { subscribeNewsletter } from '../lib/supabase';

export default function Newsletter() {
  const { t } = useLang();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async () => {
    if (email.includes('@')) {
      await subscribeNewsletter(email);
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto mb-8 pb-8 border-b border-white/5">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-white font-bold font-oswald uppercase text-sm">{t.newsletter.title}</h3>
          <p className="text-gray-500 text-xs mt-1">{t.newsletter.desc}</p>
        </div>
        {subscribed ? (
          <p className="text-ecotone-green text-xs font-semibold flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" /> {t.newsletter.thanks}
          </p>
        ) : (
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={t.newsletter.placeholder}
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 flex-1 md:w-64 focus:outline-none focus:border-ecotone-green"
            />
            <button onClick={handleSubscribe} className="bg-ecotone-green text-white px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-ecotone-green-light transition-colors flex-shrink-0">
              {t.newsletter.subscribe}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
