// 🏹 ECOTONE GATINEAU - TACTICAL INVENTORY
export const products = [
  // FISHING UNIT
  { 
    id: 1, 
    name: "Canne à lancer Pro Series", 
    category: "fishing", 
    subcategory: "Cannes", 
    price: 149.99, 
    originalPrice: 189.99, 
    image: "🎣", 
    rating: 4.8, 
    reviews: 124, 
    featured: true 
  },
  { 
    id: 2, 
    name: "Moulinet Titanium Elite", 
    category: "fishing", 
    subcategory: "Moulinets", 
    price: 229.99, 
    originalPrice: null, 
    image: "🎣", 
    rating: 4.9, 
    reviews: 89, 
    featured: true 
  },
  { 
    id: 3, 
    name: "Coffre à pêche XL", 
    category: "fishing", 
    subcategory: "Équipement", 
    price: 49.99, 
    originalPrice: 64.99, 
    image: "🧰", 
    rating: 4.6, 
    reviews: 256, 
    featured: false 
  },
  { 
    id: 4, 
    name: "Kit leurres (25 pcs)", 
    category: "fishing", 
    subcategory: "Leurres", 
    price: 34.99, 
    originalPrice: null, 
    image: "🪱", 
    rating: 4.7, 
    reviews: 178, 
    featured: false 
  },
  { 
    id: 5, 
    name: "Cuissardes Néoprène Pro", 
    category: "fishing", 
    subcategory: "Vêtements", 
    price: 179.99, 
    originalPrice: 219.99, 
    image: "👢", 
    rating: 4.5, 
    reviews: 67, 
    featured: true 
  },
  { 
    id: 6, 
    name: "Lunettes Polarisées HD", 
    category: "fishing", 
    subcategory: "Accessoires", 
    price: 89.99, 
    originalPrice: null, 
    image: "🕶️", 
    rating: 4.8, 
    reviews: 203, 
    featured: false 
  },
  { 
    id: 7, 
    name: "Kit Mouche Complet", 
    category: "fishing", 
    subcategory: "Cannes", 
    price: 299.99, 
    originalPrice: 379.99, 
    image: "🎣", 
    rating: 4.7, 
    reviews: 45, 
    featured: true 
  },
  { 
    id: 8, 
    name: "Siège Kayak Confort", 
    category: "fishing", 
    subcategory: "Accessoires", 
    price: 124.99, 
    originalPrice: null, 
    image: "🪑", 
    rating: 4.4, 
    reviews: 92, 
    featured: false 
  },

  // HUNTING UNIT
  { 
    id: 9, 
    name: "Arc Compound Predator", 
    category: "hunting", 
    subcategory: "Arcs", 
    price: 599.99, 
    originalPrice: 749.99, 
    image: "🏹", 
    rating: 4.9, 
    reviews: 156, 
    featured: true 
  },
  { 
    id: 10, 
    name: "Arbalète Phantom X", 
    category: "hunting", 
    subcategory: "Arbalètes", 
    price: 849.99, 
    originalPrice: null, 
    image: "🏹", 
    rating: 4.8, 
    reviews: 78, 
    featured: true 
  },
  { 
    id: 11, 
    name: "Manteau Camo Tactique", 
    category: "hunting", 
    subcategory: "Vêtements", 
    price: 189.99, 
    originalPrice: 229.99, 
    image: "🧥", 
    rating: 4.7, 
    reviews: 312, 
    featured: true 
  },
  { 
    id: 12, 
    name: "Bottes Isolées -40°C", 
    category: "hunting", 
    subcategory: "Vêtements", 
    price: 219.99, 
    originalPrice: null, 
    image: "🥾", 
    rating: 4.6, 
    reviews: 189, 
    featured: false 
  },
  { 
    id: 13, 
    name: "Mirador Deluxe Pro", 
    category: "hunting", 
    subcategory: "Affûts", 
    price: 274.99, 
    originalPrice: 324.99, 
    image: "🌲", 
    rating: 4.5, 
    reviews: 134, 
    featured: false 
  },
  { 
    id: 14, 
    name: "Cache Ground Blind", 
    category: "hunting", 
    subcategory: "Affûts", 
    price: 199.99, 
    originalPrice: null, 
    image: "⛺", 
    rating: 4.6, 
    reviews: 87, 
    featured: false 
  },
  { 
    id: 15, 
    name: "Jumelles 10x42 HD", 
    category: "hunting", 
    subcategory: "Optiques", 
    price: 349.99, 
    originalPrice: 429.99, 
    image: "🔭", 
    rating: 4.8, 
    reviews: 223, 
    featured: true 
  },
  { 
    id: 16, 
    name: "Lunette Visée 3-9x40", 
    category: "hunting", 
    subcategory: "Optiques", 
    price: 279.99, 
    originalPrice: null, 
    image: "🎯", 
    rating: 4.7, 
    reviews: 167, 
    featured: false 
  },
];

export const categories = [
  { id: 'fishing', name: 'PÊCHE PRO', stats: '8,400+ ARTICLES' },
  { id: 'hunting', name: 'CHASSE ÉLITE', stats: '12,000+ ARTICLES' }
];
