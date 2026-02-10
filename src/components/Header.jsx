import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ChevronDown, Menu, X } from 'lucide-react';
import { useLang } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { NAV_ITEMS } from '../data/categories';

export default function Header() {
  const { lang, toggleLang, t } = useLang();
  const { cart, setIsCartOpen } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const totalItems = cart.reduce((a, b) => a + b.qty, 0);

  return (
    <>
      <div className="header-anchor px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
          <div className="flex items-center gap-8">
            <Link to="/">
              <img src="/assets/ecotone-gatineau-logo-clean.png" className="h-7 cursor-pointer" alt="Ecotone Gatineau" />
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-[11px] font-medium uppercase tracking-[0.1em] text-ecotone-dark hover:text-ecotone-green transition-colors">{t.nav.home}</Link>

              <div className="megamenu-item relative py-5">
                <Link to="/boutique" className="text-[11px] font-medium uppercase tracking-[0.1em] text-ecotone-dark hover:text-ecotone-green transition-colors flex items-center gap-1.5">
                  {t.nav.shop} <ChevronDown className="w-3 h-3" />
                </Link>
                <div className="megamenu-panel">
                  <div className="max-w-7xl mx-auto px-8 grid grid-cols-3 gap-16">
                    {NAV_ITEMS[0].megamenu.map(menu => (
                      <div key={menu.category}>
                        <h4 className="text-ecotone-green font-bold uppercase text-[11px] tracking-[0.2em] mb-6 border-b border-gray-100 pb-3">{menu.category}</h4>
                        <ul className="space-y-4">
                          {menu.sub.map(sub => (
                            <li key={sub}>
                              <Link to={`/boutique/${menu.category}`} className="text-sm font-semibold text-gray-400 hover:text-ecotone-dark transition-colors duration-300 uppercase tracking-tight">{sub}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Link to="/boutique/hunting" className="text-[11px] font-medium uppercase tracking-[0.1em] text-ecotone-dark hover:text-ecotone-green transition-colors">{t.nav.hunting}</Link>
              <Link to="/boutique/fishing" className="text-[11px] font-medium uppercase tracking-[0.1em] text-ecotone-dark hover:text-ecotone-green transition-colors">{t.nav.fishing}</Link>
              <Link to="/intel" className="text-[11px] font-medium uppercase tracking-[0.1em] text-ecotone-dark hover:text-ecotone-green transition-colors">{t.nav.blog}</Link>
              <Link to="/a-propos" className="text-[11px] font-medium uppercase tracking-[0.1em] text-ecotone-dark hover:text-ecotone-green transition-colors">{t.nav.about}</Link>
              <Link to="/contact" className="text-[11px] font-medium uppercase tracking-[0.1em] text-ecotone-dark hover:text-ecotone-green transition-colors">{t.nav.contact}</Link>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button onClick={toggleLang} className="text-[10px] font-medium px-2 py-0.5 border border-gray-200 rounded bg-gray-50 hover:bg-gray-100 transition-colors">{lang.toUpperCase()}</button>
            <div onClick={() => setIsCartOpen(true)} className="relative cursor-pointer text-ecotone-dark hover:text-ecotone-green transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && <span className="absolute -top-2 -right-2 bg-ecotone-green text-white text-[10px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold">{totalItems}</span>}
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-ecotone-dark">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-[88px] left-0 w-full bg-white z-[9999998] shadow-xl border-b border-gray-100 py-8 px-8 md:hidden flex flex-col gap-6">
          {[
            { to: '/', label: t.nav.home },
            { to: '/boutique', label: t.nav.shop },
            { to: '/boutique/hunting', label: t.nav.hunting },
            { to: '/boutique/fishing', label: t.nav.fishing },
            { to: '/intel', label: t.nav.blog },
            { to: '/a-propos', label: t.nav.about },
            { to: '/contact', label: t.nav.contact },
          ].map(item => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setIsMenuOpen(false)}
              className="text-sm font-bold uppercase tracking-[0.15em] text-ecotone-dark border-b border-gray-50 pb-5"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
