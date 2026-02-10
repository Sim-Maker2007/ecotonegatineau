export const CATEGORIES = [
  { id: 'winter', key: 'winter', img: '/assets/categories/winter.jpg' },
  { id: 'men', key: 'men', img: '/assets/categories/men.jpg' },
  { id: 'women', key: 'women', img: '/assets/categories/women.jpg' },
  { id: 'kids', key: 'kids', img: '/assets/categories/kids.jpg' },
  { id: 'hunting', key: 'hunting', img: '/assets/categories/hunting.jpg' },
  { id: 'fishing', key: 'fishing', img: '/assets/categories/fishing.jpg' }
];

export const NAV_ITEMS = [
  {
    id: 'shop',
    label: { fr: 'Boutique', en: 'Shop' },
    megamenu: [
      { category: 'hunting', sub: ['Arcs & Arbalètes', 'Optiques', 'Vêtements', 'Munitions'] },
      { category: 'fishing', sub: ['Cannes & Moulinets', 'Leurres', 'Électronique', 'Pêche Blanche'] },
      { category: 'camping', sub: ['Tentes', 'Sacs à Dos', 'Survie', 'Cuisine'] }
    ]
  },
  { id: 'hunting', label: { fr: 'Chasse', en: 'Hunting' } },
  { id: 'fishing', label: { fr: 'Pêche', en: 'Fishing' } },
  { id: 'intel', label: { fr: 'Intel', en: 'Intel' } }
];

export const SERVICES = [
  { id: 1, icon: 'Target', title: "Ajustement d'Arc", titleEn: 'Bow Tuning', desc: 'Précision chirurgicale par nos experts certificateurs.', descEn: 'Surgical precision by our certified experts.' },
  { id: 2, icon: 'Anchor', title: 'Remplissage de Moulinet', titleEn: 'Line Spooling', desc: 'Pose professionnelle de tresse et monofilament.', descEn: 'Professional braid and monofilament spooling.' },
  { id: 3, icon: 'ShieldCheck', title: "Entretien d'Armes", titleEn: 'Gun Maintenance', desc: 'Nettoyage et inspection pour une sécurité totale.', descEn: 'Cleaning and inspection for total safety.' },
  { id: 4, icon: 'Map', title: 'Conseil Expédition', titleEn: 'Expedition Advice', desc: 'Cartographie et planification gratuite en magasin.', descEn: 'Free mapping and planning in-store.' }
];

export const BRANDS = ["Shimano", "Browning", "Minn Kota", "Bushnell", "Connec", "Sportchief"];
