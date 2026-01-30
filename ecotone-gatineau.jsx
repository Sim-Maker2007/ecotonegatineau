import React, { useState, useMemo } from 'react';

// Ecotone Logo SVG Component
const EcotoneLogo = ({ variant = 'dark', size = 'normal' }) => {
  const isDark = variant === 'dark';
  const scale = size === 'small' ? 0.7 : size === 'large' ? 1.3 : 1;

  return (
    <svg width={180 * scale} height={50 * scale} viewBox="0 0 180 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tree Icon */}
      <g transform="translate(5, 5)">
        {/* Tree trunk */}
        <rect x="17" y="28" width="6" height="12" fill={isDark ? "#2D5016" : "#8BC34A"} />
        {/* Tree layers */}
        <polygon points="20,2 35,18 28,18 38,28 5,28 15,18 5,18" fill={isDark ? "#3D6B1E" : "#8BC34A"} />
        <polygon points="20,8 30,18 25,18 33,26 7,26 15,18 10,18" fill={isDark ? "#4A7F24" : "#A5D660"} />
      </g>
      {/* ECOTONE Text */}
      <text x="50" y="28" fontFamily="'Helvetica Neue', Arial, sans-serif" fontSize="22" fontWeight="700" letterSpacing="3" fill={isDark ? "#1a1a1a" : "#ffffff"}>
        ECOTONE
      </text>
      {/* Gatineau Text */}
      <text x="50" y="42" fontFamily="'Helvetica Neue', Arial, sans-serif" fontSize="11" fontWeight="500" letterSpacing="4" fill={isDark ? "#4A7F24" : "#8BC34A"}>
        GATINEAU
      </text>
    </svg>
  );
};

// Sample product data - Hunting & Fishing
const productsData = [
  // Fishing Products
  { id: 1, name: "Canne à lancer léger Pro", category: "fishing", subcategory: "Cannes et moulinets", price: 149.99, originalPrice: 189.99, image: "🎣", rating: 4.8, reviews: 124, description: "Canne professionnelle en fibre de carbone.", inStock: true, featured: true },
  { id: 2, name: "Moulinet Baitcaster Titanium", category: "fishing", subcategory: "Cannes et moulinets", price: 229.99, originalPrice: null, image: "🎣", rating: 4.9, reviews: 89, description: "Système à 10 roulements avec frein magnétique.", inStock: true, featured: true },
  { id: 3, name: "Coffre à pêche Bass Pro", category: "fishing", subcategory: "Équipement", price: 49.99, originalPrice: 64.99, image: "🧰", rating: 4.6, reviews: 256, description: "Coffre à 3 plateaux avec 50+ compartiments.", inStock: true, featured: false },
  { id: 4, name: "Ensemble de leurres (25 pcs)", category: "fishing", subcategory: "Équipement", price: 34.99, originalPrice: null, image: "🪱", rating: 4.7, reviews: 178, description: "Leurres souples réalistes pour toutes conditions.", inStock: true, featured: false },
  { id: 5, name: "Cuissardes Néoprène", category: "fishing", subcategory: "Vêtements", price: 179.99, originalPrice: 219.99, image: "👢", rating: 4.5, reviews: 67, description: "Cuissardes isolées avec genoux renforcés.", inStock: true, featured: true },
  { id: 6, name: "Lunettes polarisées pêche", category: "fishing", subcategory: "Accessoires", price: 89.99, originalPrice: null, image: "🕶️", rating: 4.8, reviews: 203, description: "Réduisez les reflets et repérez les poissons.", inStock: true, featured: false },
  { id: 7, name: "Kit débutant mouche", category: "fishing", subcategory: "Cannes et moulinets", price: 299.99, originalPrice: 379.99, image: "🎣", rating: 4.7, reviews: 45, description: "Kit complet avec canne, moulinet et mouches.", inStock: true, featured: true },
  { id: 8, name: "Siège kayak de pêche", category: "fishing", subcategory: "Accessoires", price: 124.99, originalPrice: null, image: "🪑", rating: 4.4, reviews: 92, description: "Siège ajustable pour longues journées.", inStock: false, featured: false },

  // Hunting Products
  { id: 9, name: "Arc à poulies Pro Series", category: "hunting", subcategory: "Arcs et arbalètes", price: 599.99, originalPrice: 749.99, image: "🏹", rating: 4.9, reviews: 156, description: "330 FPS avec tension réglable 50-70 lbs.", inStock: true, featured: true },
  { id: 10, name: "Arbalète Elite Package", category: "hunting", subcategory: "Arcs et arbalètes", price: 849.99, originalPrice: null, image: "🏹", rating: 4.8, reviews: 78, description: "Arbalète 400 FPS avec lunette et carquois.", inStock: true, featured: true },
  { id: 11, name: "Manteau de chasse camo", category: "hunting", subcategory: "Vêtements", price: 189.99, originalPrice: 229.99, image: "🧥", rating: 4.7, reviews: 312, description: "Imperméable avec contrôle des odeurs.", inStock: true, featured: true },
  { id: 12, name: "Bottes de chasse isolées", category: "hunting", subcategory: "Vêtements", price: 219.99, originalPrice: null, image: "🥾", rating: 4.6, reviews: 189, description: "Thinsulate 1000g, imperméable jusqu'à -40°C.", inStock: true, featured: false },
  { id: 13, name: "Mirador Deluxe", category: "hunting", subcategory: "Affûts et caches", price: 274.99, originalPrice: 324.99, image: "🌲", rating: 4.5, reviews: 134, description: "Siège rembourré et plateforme complète.", inStock: true, featured: false },
  { id: 14, name: "Cache au sol Camo", category: "hunting", subcategory: "Affûts et caches", price: 199.99, originalPrice: null, image: "⛺", rating: 4.6, reviews: 87, description: "Cache style hub avec mailles de tir.", inStock: true, featured: false },
  { id: 15, name: "Jumelles chasse 10x42", category: "hunting", subcategory: "Optiques", price: 349.99, originalPrice: 429.99, image: "🔭", rating: 4.8, reviews: 223, description: "Verre ED avec prismes corrigés.", inStock: true, featured: true },
  { id: 16, name: "Lunette de visée 3-9x40", category: "hunting", subcategory: "Optiques", price: 279.99, originalPrice: null, image: "🎯", rating: 4.7, reviews: 167, description: "Traitement multicouche avec réticule BDC.", inStock: true, featured: false },
  { id: 17, name: "Caméra de chasse 24MP", category: "hunting", subcategory: "Accessoires", price: 149.99, originalPrice: 179.99, image: "📷", rating: 4.5, reviews: 298, description: "Vision nocturne infrarouge, déclenchement 0.2s.", inStock: true, featured: false },
  { id: 18, name: "Ensemble couteaux de chasse", category: "hunting", subcategory: "Accessoires", price: 79.99, originalPrice: null, image: "🔪", rating: 4.8, reviews: 445, description: "Acier inoxydable avec crochet et lame.", inStock: true, featured: false },
  { id: 19, name: "Casque antibruit électronique", category: "hunting", subcategory: "Accessoires", price: 69.99, originalPrice: 89.99, image: "🎧", rating: 4.6, reviews: 178, description: "Amplifie les sons, bloque les tirs.", inStock: true, featured: false },
  { id: 20, name: "Kit éliminateur d'odeurs", category: "hunting", subcategory: "Accessoires", price: 44.99, originalPrice: null, image: "🧴", rating: 4.4, reviews: 234, description: "Spray, savon corporel et détergent.", inStock: true, featured: false },
];

// Star Rating Component
const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} style={{ color: star <= rating ? '#4A7F24' : '#D1D5DB' }}>
          ★
        </span>
      ))}
    </div>
  );
};

// Header Component
const Header = ({ cartCount, onCartClick, onNavigate, currentPage, searchQuery, setSearchQuery }) => {
  return (
    <header style={{
      background: '#ffffff',
      borderBottom: '3px solid #4A7F24',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      {/* Top Bar */}
      <div style={{ backgroundColor: '#2D5016', padding: '8px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#ffffff', fontSize: '14px' }}>🚚 Livraison gratuite sur les commandes de 99$ et plus</span>
          <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#ffffff' }}>
            <span>📞 819-555-HUNT</span>
            <span>📍 Gatineau, QC</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
          {/* Logo */}
          <div onClick={() => onNavigate('home')} style={{ cursor: 'pointer' }}>
            <EcotoneLogo variant="dark" />
          </div>

          {/* Search Bar */}
          <div style={{ flex: 1, maxWidth: '500px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Rechercher équipement, vêtements, accessoires..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 48px 12px 16px',
                  borderRadius: '8px',
                  border: '2px solid #e5e7eb',
                  backgroundColor: '#f9fafb',
                  color: '#1a1a1a',
                  fontSize: '14px'
                }}
              />
              <button style={{
                position: 'absolute',
                right: '4px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: '#4A7F24',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer'
              }}>
                🔍
              </button>
            </div>
          </div>

          {/* Navigation & Cart */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <button
              onClick={() => onNavigate('home')}
              style={{
                color: currentPage === 'home' ? '#4A7F24' : '#4b5563',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              Accueil
            </button>
            <button
              onClick={() => onNavigate('shop')}
              style={{
                color: currentPage === 'shop' ? '#4A7F24' : '#4b5563',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              Boutique
            </button>
            <button
              onClick={() => { onNavigate('shop'); }}
              style={{
                color: '#4b5563',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              Pêche
            </button>
            <button
              onClick={() => { onNavigate('shop'); }}
              style={{
                color: '#4b5563',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              Chasse
            </button>

            {/* Account */}
            <button style={{
              color: '#4b5563',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '24px'
            }}>
              👤
            </button>

            {/* Cart */}
            <button
              onClick={onCartClick}
              style={{
                position: 'relative',
                color: '#4b5563',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '24px'
              }}
            >
              🛒
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: '#DC2626',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

// Hero Section
const HeroSection = ({ onNavigate }) => {
  return (
    <section style={{
      position: 'relative',
      height: '600px',
      background: 'linear-gradient(135deg, #1a3d0c 0%, #2D5016 50%, #3D6B1E 100%)',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.08,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L35 20 L30 15 L25 20 Z' fill='%23ffffff'/%3E%3Cpath d='M30 25 L40 35 L30 30 L20 35 Z' fill='%23ffffff'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />

      <div style={{
        position: 'relative',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 16px',
        height: '100%',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div style={{ maxWidth: '600px' }}>
          <p style={{
            color: '#8BC34A',
            fontSize: '14px',
            fontWeight: '600',
            letterSpacing: '3px',
            marginBottom: '16px'
          }}>
            VENTE D'OUVERTURE DE SAISON
          </p>
          <h1 style={{
            color: '#ffffff',
            fontSize: '52px',
            fontWeight: 'bold',
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            lineHeight: '1.1',
            marginBottom: '24px'
          }}>
            Équipez-vous pour votre prochaine
            <span style={{ color: '#8BC34A', display: 'block' }}>Aventure</span>
          </h1>
          <p style={{
            color: '#c5e1a5',
            fontSize: '18px',
            marginBottom: '32px',
            lineHeight: '1.6'
          }}>
            Équipement de chasse et de pêche de qualité supérieure, approuvé par les passionnés de plein air depuis plus de 15 ans au Québec.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={() => onNavigate('shop')}
              style={{
                backgroundColor: '#8BC34A',
                color: '#1a3d0c',
                padding: '16px 32px',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '16px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Magasiner →
            </button>
            <button
              style={{
                backgroundColor: 'transparent',
                color: '#ffffff',
                padding: '16px 32px',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '16px',
                border: '2px solid rgba(255,255,255,0.3)',
                cursor: 'pointer'
              }}
            >
              Voir le catalogue
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          right: '5%',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '220px',
          opacity: 0.15
        }}>
          🦌
        </div>
      </div>

      {/* Bottom Wave */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '80px',
        background: 'linear-gradient(to top, #f9fafb, transparent)'
      }} />
    </section>
  );
};

// Category Cards
const CategorySection = ({ onNavigate, setActiveCategory }) => {
  const categories = [
    { id: 'fishing', name: 'Pêche', icon: '🎣', description: 'Cannes, moulinets, équipement et plus', color: '#0369A1' },
    { id: 'hunting', name: 'Chasse', icon: '🏹', description: 'Arcs, optiques, vêtements et équipement', color: '#2D5016' }
  ];

  return (
    <section style={{
      backgroundColor: '#f9fafb',
      padding: '80px 16px'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{
            color: '#1a1a1a',
            fontSize: '36px',
            fontWeight: 'bold',
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            marginBottom: '16px'
          }}>
            Magasiner par catégorie
          </h2>
          <p style={{ color: '#6b7280', fontSize: '18px' }}>Trouvez l'équipement parfait pour vos activités en plein air</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); onNavigate('shop'); }}
              style={{
                background: '#ffffff',
                border: `2px solid ${cat.color}22`,
                borderRadius: '16px',
                padding: '48px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '32px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{
                fontSize: '80px',
                backgroundColor: `${cat.color}11`,
                borderRadius: '20px',
                padding: '20px'
              }}>{cat.icon}</div>
              <div>
                <h3 style={{ color: '#1a1a1a', fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
                  {cat.name}
                </h3>
                <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '16px' }}>{cat.description}</p>
                <span style={{ color: '#4A7F24', fontWeight: '600' }}>Parcourir la collection →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Featured Products
const FeaturedProducts = ({ products, addToCart, onNavigate }) => {
  const featured = products.filter(p => p.featured).slice(0, 4);

  return (
    <section style={{
      backgroundColor: '#ffffff',
      padding: '80px 16px'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
          <div>
            <h2 style={{
              color: '#1a1a1a',
              fontSize: '36px',
              fontWeight: 'bold',
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              marginBottom: '8px'
            }}>
              Équipement vedette
            </h2>
            <p style={{ color: '#6b7280', fontSize: '16px' }}>Nos meilleurs choix par nos experts</p>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            style={{
              backgroundColor: 'transparent',
              color: '#4A7F24',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: '600',
              border: '2px solid #4A7F24',
              cursor: 'pointer'
            }}
          >
            Voir tous les produits
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Product Card Component
const ProductCard = ({ product, addToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #e5e7eb',
        transition: 'all 0.3s',
        transform: isHovered ? 'translateY(-4px)' : 'none',
        boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.1)' : '0 2px 10px rgba(0,0,0,0.05)'
      }}
    >
      {/* Image */}
      <div style={{
        height: '200px',
        backgroundColor: '#f3f4f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <span style={{ fontSize: '80px' }}>{product.image}</span>

        {/* Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {product.originalPrice && (
            <span style={{
              backgroundColor: '#DC2626',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              SOLDE
            </span>
          )}
          {!product.inStock && (
            <span style={{
              backgroundColor: '#9ca3af',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px'
            }}>
              Rupture de stock
            </span>
          )}
        </div>

        {/* Quick Add Button */}
        {isHovered && product.inStock && (
          <button
            onClick={() => addToCart(product)}
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#4A7F24',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: '6px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            + Ajouter au panier
          </button>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '16px' }}>
        <p style={{ color: '#9ca3af', fontSize: '12px', textTransform: 'uppercase', marginBottom: '4px' }}>
          {product.subcategory}
        </p>
        <h3 style={{ color: '#1a1a1a', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
          {product.name}
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <StarRating rating={product.rating} />
          <span style={{ color: '#9ca3af', fontSize: '12px' }}>({product.reviews})</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#4A7F24', fontSize: '20px', fontWeight: 'bold' }}>
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span style={{ color: '#9ca3af', fontSize: '14px', textDecoration: 'line-through' }}>
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

// Shop Page
const ShopPage = ({ products, addToCart, activeCategory, setActiveCategory, searchQuery }) => {
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');

  const subcategories = useMemo(() => {
    const subs = [...new Set(products.filter(p => activeCategory === 'all' || p.category === activeCategory).map(p => p.subcategory))];
    return ['all', ...subs];
  }, [products, activeCategory]);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    if (selectedSubcategory !== 'all') {
      filtered = filtered.filter(p => p.subcategory === selectedSubcategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(p => p.price >= min && (max ? p.price <= max : true));
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        filtered.sort((a, b) => b.featured - a.featured);
    }

    return filtered;
  }, [products, activeCategory, selectedSubcategory, searchQuery, priceRange, sortBy]);

  return (
    <section style={{ backgroundColor: '#f9fafb', minHeight: '100vh', padding: '40px 16px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Page Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ color: '#1a1a1a', fontSize: '36px', fontWeight: 'bold', fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
            {activeCategory === 'all' ? 'Tous les produits' : activeCategory === 'fishing' ? 'Équipement de pêche' : 'Équipement de chasse'}
          </h1>
          <p style={{ color: '#6b7280', marginTop: '8px' }}>
            {filteredProducts.length} produits trouvés
          </p>
        </div>

        <div style={{ display: 'flex', gap: '32px' }}>
          {/* Sidebar Filters */}
          <div style={{ width: '250px', flexShrink: 0 }}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #e5e7eb',
              position: 'sticky',
              top: '140px'
            }}>
              <h3 style={{ color: '#1a1a1a', fontSize: '18px', fontWeight: 'bold', marginBottom: '24px' }}>
                Filtres
              </h3>

              {/* Category Filter */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: '#4b5563', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                  Catégorie
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[{id: 'all', label: 'Toutes les catégories'}, {id: 'fishing', label: 'Pêche'}, {id: 'hunting', label: 'Chasse'}].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { setActiveCategory(cat.id); setSelectedSubcategory('all'); }}
                      style={{
                        backgroundColor: activeCategory === cat.id ? '#4A7F24' : 'transparent',
                        color: activeCategory === cat.id ? '#ffffff' : '#6b7280',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subcategory Filter */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: '#4b5563', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                  Type
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubcategory(sub)}
                      style={{
                        backgroundColor: selectedSubcategory === sub ? '#4A7F24' : 'transparent',
                        color: selectedSubcategory === sub ? '#ffffff' : '#6b7280',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      {sub === 'all' ? 'Tous les types' : sub}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: '#4b5563', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                  Gamme de prix
                </h4>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb',
                    backgroundColor: '#ffffff',
                    color: '#1a1a1a'
                  }}
                >
                  <option value="all">Tous les prix</option>
                  <option value="0-50">Moins de 50$</option>
                  <option value="50-100">50$ - 100$</option>
                  <option value="100-250">100$ - 250$</option>
                  <option value="250-500">250$ - 500$</option>
                  <option value="500-9999">500$+</option>
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSelectedSubcategory('all');
                  setPriceRange('all');
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #e5e7eb',
                  backgroundColor: 'transparent',
                  color: '#6b7280',
                  cursor: 'pointer'
                }}
              >
                Effacer les filtres
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div style={{ flex: 1 }}>
            {/* Sort Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              backgroundColor: '#ffffff',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}>
              <span style={{ color: '#6b7280' }}>
                Affichage de {filteredProducts.length} résultats
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#6b7280' }}>Trier par:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #e5e7eb',
                    backgroundColor: '#ffffff',
                    color: '#1a1a1a'
                  }}
                >
                  <option value="featured">Vedette</option>
                  <option value="price-low">Prix: Bas à élevé</option>
                  <option value="price-high">Prix: Élevé à bas</option>
                  <option value="rating">Mieux notés</option>
                  <option value="name">Nom A-Z</option>
                </select>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '80px 20px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <p style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</p>
                <p style={{ color: '#1a1a1a', fontSize: '18px', marginBottom: '8px' }}>Aucun produit trouvé</p>
                <p style={{ color: '#6b7280' }}>Essayez d'ajuster vos filtres ou termes de recherche</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Shopping Cart Sidebar
const CartSidebar = ({ cart, isOpen, onClose, updateQuantity, removeFromCart, onCheckout }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 99 ? 0 : 9.99;
  const tax = subtotal * 0.14975; // Quebec tax (GST + QST)
  const total = subtotal + shipping + tax;

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 100
        }}
      />

      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        right: 0,
        top: 0,
        bottom: 0,
        width: '420px',
        backgroundColor: '#ffffff',
        borderLeft: '1px solid #e5e7eb',
        zIndex: 101,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ color: '#1a1a1a', fontSize: '20px', fontWeight: 'bold' }}>
            Votre panier ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </h2>
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#6b7280',
              fontSize: '24px',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</p>
              <p style={{ color: '#6b7280' }}>Votre panier est vide</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '16px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '40px',
                    border: '1px solid #e5e7eb'
                  }}>
                    {item.image}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ color: '#1a1a1a', fontSize: '14px', marginBottom: '4px' }}>{item.name}</h4>
                    <p style={{ color: '#4A7F24', fontWeight: 'bold' }}>${item.price.toFixed(2)}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          backgroundColor: '#e5e7eb',
                          border: 'none',
                          borderRadius: '4px',
                          color: '#1a1a1a',
                          cursor: 'pointer'
                        }}
                      >
                        -
                      </button>
                      <span style={{ color: '#1a1a1a', width: '30px', textAlign: 'center' }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          backgroundColor: '#e5e7eb',
                          border: 'none',
                          borderRadius: '4px',
                          color: '#1a1a1a',
                          cursor: 'pointer'
                        }}
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          marginLeft: 'auto',
                          backgroundColor: 'transparent',
                          border: 'none',
                          color: '#DC2626',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Retirer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '24px', borderTop: '1px solid #e5e7eb' }}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#6b7280' }}>Sous-total</span>
                <span style={{ color: '#1a1a1a' }}>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#6b7280' }}>Livraison</span>
                <span style={{ color: shipping === 0 ? '#22C55E' : '#1a1a1a' }}>
                  {shipping === 0 ? 'GRATUIT' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#6b7280' }}>Taxes (TPS+TVQ)</span>
                <span style={{ color: '#1a1a1a' }}>${tax.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #e5e7eb' }}>
                <span style={{ color: '#1a1a1a', fontWeight: 'bold' }}>Total</span>
                <span style={{ color: '#4A7F24', fontWeight: 'bold', fontSize: '20px' }}>${total.toFixed(2)}</span>
              </div>
            </div>
            {subtotal < 99 && (
              <p style={{ color: '#22C55E', fontSize: '12px', textAlign: 'center', marginBottom: '12px' }}>
                Ajoutez ${(99 - subtotal).toFixed(2)} pour la livraison GRATUITE!
              </p>
            )}
            <button
              onClick={onCheckout}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: '#4A7F24',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Passer à la caisse
            </button>
          </div>
        )}
      </div>
    </>
  );
};

// Checkout Page
const CheckoutPage = ({ cart, onPlaceOrder, onNavigate }) => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    province: 'QC',
    postalCode: '',
    phone: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [step, setStep] = useState(1);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 99 ? 0 : 9.99;
  const tax = subtotal * 0.14975;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      onPlaceOrder();
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{
        backgroundColor: '#f9fafb',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '64px', marginBottom: '24px' }}>🛒</p>
          <h2 style={{ color: '#1a1a1a', fontSize: '24px', marginBottom: '16px' }}>Votre panier est vide</h2>
          <button
            onClick={() => onNavigate('shop')}
            style={{
              backgroundColor: '#4A7F24',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Continuer vos achats
          </button>
        </div>
      </div>
    );
  }

  return (
    <section style={{ backgroundColor: '#f9fafb', minHeight: '100vh', padding: '40px 16px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h1 style={{
          color: '#1a1a1a',
          fontSize: '32px',
          fontWeight: 'bold',
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          Paiement
        </h1>

        {/* Progress Steps */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '48px',
          marginBottom: '48px'
        }}>
          {['Livraison', 'Paiement', 'Révision'].map((label, index) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: step > index + 1 ? '#22C55E' : step === index + 1 ? '#4A7F24' : '#e5e7eb',
                color: step >= index + 1 ? '#ffffff' : '#9ca3af',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                {step > index + 1 ? '✓' : index + 1}
              </div>
              <span style={{ color: step >= index + 1 ? '#1a1a1a' : '#9ca3af' }}>{label}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '48px' }}>
          {/* Form Section */}
          <div style={{ flex: 1 }}>
            <form onSubmit={handleSubmit}>
              {/* Step 1: Shipping */}
              {step === 1 && (
                <div style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '32px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h2 style={{ color: '#1a1a1a', fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>
                    Informations de livraison
                  </h2>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ color: '#6b7280', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                      Adresse courriel
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb',
                        backgroundColor: '#ffffff',
                        color: '#1a1a1a'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ color: '#6b7280', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                        Prénom
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '6px',
                          border: '1px solid #e5e7eb',
                          backgroundColor: '#ffffff',
                          color: '#1a1a1a'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ color: '#6b7280', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                        Nom de famille
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '6px',
                          border: '1px solid #e5e7eb',
                          backgroundColor: '#ffffff',
                          color: '#1a1a1a'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ color: '#6b7280', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                      Adresse
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb',
                        backgroundColor: '#ffffff',
                        color: '#1a1a1a'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ color: '#6b7280', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                        Ville
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '6px',
                          border: '1px solid #e5e7eb',
                          backgroundColor: '#ffffff',
                          color: '#1a1a1a'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ color: '#6b7280', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                        Province
                      </label>
                      <select
                        name="province"
                        value={formData.province}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '6px',
                          border: '1px solid #e5e7eb',
                          backgroundColor: '#ffffff',
                          color: '#1a1a1a'
                        }}
                      >
                        <option value="QC">Québec</option>
                        <option value="ON">Ontario</option>
                        <option value="NB">Nouveau-Brunswick</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ color: '#6b7280', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                        Code postal
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="J8Y 1A1"
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '6px',
                          border: '1px solid #e5e7eb',
                          backgroundColor: '#ffffff',
                          color: '#1a1a1a'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ color: '#6b7280', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb',
                        backgroundColor: '#ffffff',
                        color: '#1a1a1a'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '16px',
                      backgroundColor: '#4A7F24',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      cursor: 'pointer'
                    }}
                  >
                    Continuer au paiement
                  </button>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '32px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h2 style={{ color: '#1a1a1a', fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>
                    Informations de paiement
                  </h2>

                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '24px',
                    padding: '16px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px'
                  }}>
                    {['💳 Visa', '💳 Mastercard', '💳 Amex', '🅿️ PayPal'].map((method) => (
                      <span key={method} style={{ color: '#6b7280', fontSize: '14px' }}>{method}</span>
                    ))}
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ color: '#6b7280', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                      Nom sur la carte
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb',
                        backgroundColor: '#ffffff',
                        color: '#1a1a1a'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ color: '#6b7280', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                      Numéro de carte
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      required
                      style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '6px',
                        border: '1px solid #e5e7eb',
                        backgroundColor: '#ffffff',
                        color: '#1a1a1a'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                    <div>
                      <label style={{ color: '#6b7280', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                        Date d'expiration
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/AA"
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '6px',
                          border: '1px solid #e5e7eb',
                          backgroundColor: '#ffffff',
                          color: '#1a1a1a'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ color: '#6b7280', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '6px',
                          border: '1px solid #e5e7eb',
                          backgroundColor: '#ffffff',
                          color: '#1a1a1a'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '16px' }}>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      style={{
                        flex: 1,
                        padding: '16px',
                        backgroundColor: 'transparent',
                        color: '#6b7280',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      ← Retour
                    </button>
                    <button
                      type="submit"
                      style={{
                        flex: 2,
                        padding: '16px',
                        backgroundColor: '#4A7F24',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        cursor: 'pointer'
                      }}
                    >
                      Réviser la commande
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '32px',
                  border: '1px solid #e5e7eb'
                }}>
                  <h2 style={{ color: '#1a1a1a', fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>
                    Réviser votre commande
                  </h2>

                  {/* Shipping Info */}
                  <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                    <h3 style={{ color: '#4A7F24', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                      Livraison à:
                    </h3>
                    <p style={{ color: '#1a1a1a' }}>
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.province} {formData.postalCode}
                    </p>
                  </div>

                  {/* Payment Info */}
                  <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                    <h3 style={{ color: '#4A7F24', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                      Mode de paiement:
                    </h3>
                    <p style={{ color: '#1a1a1a' }}>
                      💳 Carte se terminant par {formData.cardNumber.slice(-4) || '****'}
                    </p>
                  </div>

                  {/* Order Items */}
                  <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ color: '#4A7F24', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                      Articles:
                    </h3>
                    {cart.map((item) => (
                      <div key={item.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '12px 0',
                        borderBottom: '1px solid #e5e7eb'
                      }}>
                        <span style={{ color: '#1a1a1a' }}>
                          {item.image} {item.name} × {item.quantity}
                        </span>
                        <span style={{ color: '#4A7F24' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '16px' }}>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      style={{
                        flex: 1,
                        padding: '16px',
                        backgroundColor: 'transparent',
                        color: '#6b7280',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      ← Retour
                    </button>
                    <button
                      type="submit"
                      style={{
                        flex: 2,
                        padding: '16px',
                        backgroundColor: '#22C55E',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        cursor: 'pointer'
                      }}
                    >
                      🔒 Commander - ${total.toFixed(2)}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div style={{ width: '350px' }}>
            <div style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #e5e7eb',
              position: 'sticky',
              top: '140px'
            }}>
              <h3 style={{ color: '#1a1a1a', fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
                Sommaire de la commande
              </h3>

              {cart.map((item) => (
                <div key={item.id} style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #e5e7eb'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                  }}>
                    {item.image}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#1a1a1a', fontSize: '14px' }}>{item.name}</p>
                    <p style={{ color: '#9ca3af', fontSize: '12px' }}>Qté: {item.quantity}</p>
                  </div>
                  <span style={{ color: '#4A7F24' }}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <div style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#6b7280' }}>Sous-total</span>
                  <span style={{ color: '#1a1a1a' }}>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#6b7280' }}>Livraison</span>
                  <span style={{ color: shipping === 0 ? '#22C55E' : '#1a1a1a' }}>
                    {shipping === 0 ? 'GRATUIT' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ color: '#6b7280' }}>Taxes</span>
                  <span style={{ color: '#1a1a1a' }}>${tax.toFixed(2)}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '16px',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  <span style={{ color: '#1a1a1a', fontWeight: 'bold', fontSize: '18px' }}>Total</span>
                  <span style={{ color: '#4A7F24', fontWeight: 'bold', fontSize: '20px' }}>${total.toFixed(2)}</span>
                </div>
              </div>

              <div style={{
                marginTop: '20px',
                padding: '12px',
                backgroundColor: '#f0fdf4',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>🔒</span>
                <span style={{ color: '#6b7280', fontSize: '12px' }}>
                  Paiement sécurisé par chiffrement SSL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Order Confirmation
const OrderConfirmation = ({ onNavigate }) => {
  const orderNumber = `ECO${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

  return (
    <section style={{
      backgroundColor: '#f9fafb',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 16px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '48px',
        maxWidth: '500px',
        textAlign: 'center',
        border: '1px solid #e5e7eb',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#dcfce7',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          fontSize: '40px'
        }}>
          ✓
        </div>

        <h1 style={{
          color: '#1a1a1a',
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '12px'
        }}>
          Commande confirmée!
        </h1>

        <p style={{ color: '#6b7280', marginBottom: '24px' }}>
          Merci pour votre achat. Votre commande a été reçue et est en cours de traitement.
        </p>

        <div style={{
          backgroundColor: '#f9fafb',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '24px'
        }}>
          <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '4px' }}>Numéro de commande</p>
          <p style={{ color: '#4A7F24', fontSize: '24px', fontWeight: 'bold', fontFamily: 'monospace' }}>
            {orderNumber}
          </p>
        </div>

        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '32px' }}>
          Un courriel de confirmation a été envoyé à votre adresse avec les détails de la commande et les informations de suivi.
        </p>

        <button
          onClick={() => onNavigate('home')}
          style={{
            backgroundColor: '#4A7F24',
            color: '#ffffff',
            padding: '14px 32px',
            borderRadius: '8px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Continuer vos achats
        </button>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#1a3d0c',
      borderTop: '4px solid #4A7F24',
      padding: '60px 16px 30px'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px', marginBottom: '48px' }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <EcotoneLogo variant="light" />
            </div>
            <p style={{ color: '#a7f3d0', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
              Votre destination pour l'équipement de chasse et de pêche de qualité supérieure depuis 2007. Expertise et passion pour les amateurs de plein air.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['📘', '📸', '🐦', '📺'].map((icon, i) => (
                <span key={i} style={{
                  fontSize: '20px',
                  cursor: 'pointer',
                  opacity: 0.8
                }}>
                  {icon}
                </span>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>Magasiner</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Équipement de pêche', 'Équipement de chasse', 'Vêtements', 'Accessoires', 'Nouveautés', 'Soldes'].map((item) => (
                <li key={item} style={{ marginBottom: '8px' }}>
                  <a href="#" style={{ color: '#a7f3d0', textDecoration: 'none', fontSize: '14px' }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Nous contacter', 'FAQ', 'Info livraison', 'Retours', 'Guide des tailles', 'Nos magasins'].map((item) => (
                <li key={item} style={{ marginBottom: '8px' }}>
                  <a href="#" style={{ color: '#a7f3d0', textDecoration: 'none', fontSize: '14px' }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>
              Joignez-vous à nous
            </h4>
            <p style={{ color: '#a7f3d0', fontSize: '14px', marginBottom: '16px' }}>
              Obtenez des offres exclusives, des conseils et un accès anticipé aux soldes.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder="Entrez votre courriel"
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #4A7F24',
                  backgroundColor: '#2D5016',
                  color: '#ffffff',
                  fontSize: '14px'
                }}
              />
              <button style={{
                backgroundColor: '#8BC34A',
                color: '#1a3d0c',
                padding: '10px 16px',
                borderRadius: '6px',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}>
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #2D5016',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <p style={{ color: '#4ade80', fontSize: '14px' }}>
            © 2026 Ecotone Gatineau. Tous droits réservés.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Politique de confidentialité', 'Conditions d\'utilisation', 'Accessibilité'].map((link) => (
              <a key={link} href="#" style={{ color: '#4ade80', fontSize: '14px', textDecoration: 'none' }}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// Promo Banner
const PromoBanner = () => {
  return (
    <section style={{
      backgroundColor: '#2D5016',
      padding: '60px 16px'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <p style={{ color: '#8BC34A', fontSize: '14px', fontWeight: '600', letterSpacing: '2px', marginBottom: '12px' }}>
          OFFRE À DURÉE LIMITÉE
        </p>
        <h2 style={{
          color: '#ffffff',
          fontSize: '36px',
          fontWeight: 'bold',
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          marginBottom: '16px'
        }}>
          Vente d'ouverture de saison - Économisez jusqu'à 40%
        </h2>
        <p style={{ color: '#c5e1a5', fontSize: '18px', marginBottom: '24px' }}>
          Faites le plein de tout ce dont vous avez besoin pour la saison. Livraison gratuite sur les commandes de 99$ et plus.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#ffffff', fontSize: '36px', fontWeight: 'bold' }}>15+</p>
            <p style={{ color: '#c5e1a5', fontSize: '14px' }}>Années d'expérience</p>
          </div>
          <div style={{ width: '1px', backgroundColor: '#4A7F24' }} />
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#ffffff', fontSize: '36px', fontWeight: 'bold' }}>40+</p>
            <p style={{ color: '#c5e1a5', fontSize: '14px' }}>Magasins au Québec</p>
          </div>
          <div style={{ width: '1px', backgroundColor: '#4A7F24' }} />
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#ffffff', fontSize: '36px', fontWeight: 'bold' }}>5000+</p>
            <p style={{ color: '#c5e1a5', fontSize: '14px' }}>Produits</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleCheckout = () => {
    setCartOpen(false);
    setCurrentPage('checkout');
  };

  const handlePlaceOrder = () => {
    setCart([]);
    setOrderPlaced(true);
    setCurrentPage('confirmation');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    setOrderPlaced(false);
    window.scrollTo(0, 0);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Header
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        onNavigate={handleNavigate}
        currentPage={currentPage}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {currentPage === 'home' && (
        <>
          <HeroSection onNavigate={handleNavigate} />
          <CategorySection onNavigate={handleNavigate} setActiveCategory={setActiveCategory} />
          <FeaturedProducts products={productsData} addToCart={addToCart} onNavigate={handleNavigate} />
          <PromoBanner />
        </>
      )}

      {currentPage === 'shop' && (
        <ShopPage
          products={productsData}
          addToCart={addToCart}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          searchQuery={searchQuery}
        />
      )}

      {currentPage === 'checkout' && (
        <CheckoutPage
          cart={cart}
          onPlaceOrder={handlePlaceOrder}
          onNavigate={handleNavigate}
        />
      )}

      {currentPage === 'confirmation' && (
        <OrderConfirmation onNavigate={handleNavigate} />
      )}

      <Footer />

      <CartSidebar
        cart={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
