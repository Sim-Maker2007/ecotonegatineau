export const products = [
  { 
    id: 1, 
    name: "Canne à lancer Pro Series", 
    category: "fishing", 
    subcategory: "Cannes", 
    price: 149.99, 
    originalPrice: 189.99, 
    sku: "EC-FSH-001",
    rating: 4.8, 
    reviews: 124, 
    featured: true,
    image: "assets/products/rod.avif"
  },
  { 
    id: 2, 
    name: "Moulinet Titanium Elite", 
    category: "fishing", 
    subcategory: "Moulinets", 
    price: 229.99, 
    sku: "EC-FSH-002",
    rating: 4.9, 
    reviews: 89, 
    featured: true,
    image: "assets/products/knife.webp" 
  },
  { 
    id: 9, 
    name: "Arc Compound Predator", 
    category: "hunting", 
    subcategory: "Arcs", 
    price: 599.99, 
    originalPrice: 749.99, 
    sku: "EC-HNT-001",
    rating: 4.9, 
    reviews: 156, 
    featured: true,
    image: "assets/products/hunting-jacket.webp"
  },
  { 
    id: 10, 
    name: "Arbalète Phantom X", 
    category: "hunting", 
    subcategory: "Arbalètes", 
    price: 849.99, 
    sku: "EC-HNT-002",
    rating: 4.8, 
    reviews: 78, 
    featured: true,
    image: "assets/products/hunting-boots.webp"
  }
];

export const categories = [
  { id: 'fishing', name: 'PÊCHE', icon: 'Fish', description: 'Cannes, moulinets, leurres & plus', color: '#0891b2' },
  { id: 'hunting', name: 'CHASSE', icon: 'Crosshair', description: 'Arcs, optiques, vêtements & équipement', color: '#8BC34A' }
];
