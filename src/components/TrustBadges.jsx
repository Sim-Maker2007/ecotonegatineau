import { Truck, Store, ShieldCheck, Award } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const icons = { Truck, Store, ShieldCheck, Award };

export default function TrustBadges() {
  const { t } = useLang();
  const badges = [
    { Icon: Truck, label: t.trust.shipping },
    { Icon: Store, label: t.trust.pickup },
    { Icon: ShieldCheck, label: t.trust.guarantee },
    { Icon: Award, label: t.trust.experts }
  ];

  return (
    <section className="py-4 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {badges.map((b, i) => (
          <div key={i} className="flex items-center gap-2 py-1">
            <b.Icon className="w-4 h-4 text-ecotone-green flex-shrink-0" />
            <span className="text-[10px] font-medium text-gray-500 uppercase tracking-wider">{b.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
