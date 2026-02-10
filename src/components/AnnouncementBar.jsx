import { useLang } from '../context/LanguageContext';

export default function AnnouncementBar() {
  const { t } = useLang();
  return (
    <div className="announcement-bar px-4">
      <p className="text-[10px] text-gray-300 font-medium tracking-wider uppercase">
        {t.announcement.shipping}
        <span className="text-ecotone-green font-semibold ml-1">{t.announcement.pickup}</span>
      </p>
    </div>
  );
}
