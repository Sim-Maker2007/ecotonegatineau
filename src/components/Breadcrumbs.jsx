import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ items }) {
  return (
    <nav className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-gray-400 mb-4 flex-wrap">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-2.5 h-2.5 text-gray-300" />}
          {item.href && !item.active ? (
            <Link to={item.href} className="hover:text-ecotone-green transition-colors">{item.label}</Link>
          ) : (
            <span className={item.active ? 'text-ecotone-dark font-semibold truncate max-w-[200px]' : ''}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
