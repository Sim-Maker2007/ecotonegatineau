import React, { useState, useMemo } from 'react';

// Sample product data
const productsData = [
  // Fishing Products
  { id: 1, name: "Pro Cast Spinning Rod", category: "fishing", subcategory: "Rods & Reels", price: 149.99, originalPrice: 189.99, image: "🎣", rating: 4.8, reviews: 124, description: "Professional-grade spinning rod with carbon fiber construction.", inStock: true, featured: true },
  { id: 2, name: "Titanium Baitcaster Reel", category: "fishing", subcategory: "Rods & Reels", price: 229.99, originalPrice: null, image: "🎣", rating: 4.9, reviews: 89, description: "Smooth 10-bearing system with magnetic brake.", inStock: true, featured: true },
  { id: 3, name: "Bass Pro Tackle Box", category: "fishing", subcategory: "Tackle", price: 49.99, originalPrice: 64.99, image: "🧰", rating: 4.6, reviews: 256, description: "3-tray tackle box with 50+ compartments.", inStock: true, featured: false },
  { id: 4, name: "Live Bait Lure Set (25pc)", category: "fishing", subcategory: "Tackle", price: 34.99, originalPrice: null, image: "🪱", rating: 4.7, reviews: 178, description: "Realistic soft plastic lures for all conditions.", inStock: true, featured: false },
  { id: 5, name: "Neoprene Chest Waders", category: "fishing", subcategory: "Apparel", price: 179.99, originalPrice: 219.99, image: "👢", rating: 4.5, reviews: 67, description: "Insulated waders with reinforced knees.", inStock: true, featured: true },
  { id: 6, name: "Polarized Fishing Sunglasses", category: "fishing", subcategory: "Accessories", price: 89.99, originalPrice: null, image: "🕶️", rating: 4.8, reviews: 203, description: "Cut glare and spot fish below the surface.", inStock: true, featured: false },
  { id: 7, name: "Fly Fishing Starter Kit", category: "fishing", subcategory: "Rods & Reels", price: 299.99, originalPrice: 379.99, image: "🎣", rating: 4.7, reviews: 45, description: "Complete kit with rod, reel, line, and flies.", inStock: true, featured: true },
  { id: 8, name: "Fishing Kayak Seat", category: "fishing", subcategory: "Accessories", price: 124.99, originalPrice: null, image: "🪑", rating: 4.4, reviews: 92, description: "Adjustable padded seat for long days on the water.", inStock: false, featured: false },

  // Hunting Products
  { id: 9, name: "Compound Bow Pro Series", category: "hunting", subcategory: "Bows & Crossbows", price: 599.99, originalPrice: 749.99, image: "🏹", rating: 4.9, reviews: 156, description: "330 FPS with adjustable draw weight 50-70 lbs.", inStock: true, featured: true },
  { id: 10, name: "Crossbow Elite Package", category: "hunting", subcategory: "Bows & Crossbows", price: 849.99, originalPrice: null, image: "🏹", rating: 4.8, reviews: 78, description: "400 FPS crossbow with scope and quiver.", inStock: true, featured: true },
  { id: 11, name: "Camo Hunting Jacket", category: "hunting", subcategory: "Apparel", price: 189.99, originalPrice: 229.99, image: "🧥", rating: 4.7, reviews: 312, description: "Waterproof with scent-control technology.", inStock: true, featured: true },
  { id: 12, name: "Insulated Hunting Boots", category: "hunting", subcategory: "Apparel", price: 219.99, originalPrice: null, image: "🥾", rating: 4.6, reviews: 189, description: "1000g Thinsulate, waterproof to -40°F.", inStock: true, featured: false },
  { id: 13, name: "Deluxe Tree Stand", category: "hunting", subcategory: "Stands & Blinds", price: 274.99, originalPrice: 324.99, image: "🌲", rating: 4.5, reviews: 134, description: "Padded seat, shooting rail, and full platform.", inStock: true, featured: false },
  { id: 14, name: "Ground Blind Camo", category: "hunting", subcategory: "Stands & Blinds", price: 199.99, originalPrice: null, image: "⛺", rating: 4.6, reviews: 87, description: "Hub-style blind with shoot-through mesh.", inStock: true, featured: false },
  { id: 15, name: "10x42 Hunting Binoculars", category: "hunting", subcategory: "Optics", price: 349.99, originalPrice: 429.99, image: "🔭", rating: 4.8, reviews: 223, description: "ED glass with phase-corrected prisms.", inStock: true, featured: true },
  { id: 16, name: "Rifle Scope 3-9x40", category: "hunting", subcategory: "Optics", price: 279.99, originalPrice: null, image: "🎯", rating: 4.7, reviews: 167, description: "Fully multi-coated with BDC reticle.", inStock: true, featured: false },
  { id: 17, name: "Trail Camera 24MP", category: "hunting", subcategory: "Accessories", price: 149.99, originalPrice: 179.99, image: "📷", rating: 4.5, reviews: 298, description: "Infrared night vision with 0.2s trigger.", inStock: true, featured: false },
  { id: 18, name: "Hunting Knife Set", category: "hunting", subcategory: "Accessories", price: 79.99, originalPrice: null, image: "🔪", rating: 4.8, reviews: 445, description: "Stainless steel with gut hook and caping blade.", inStock: true, featured: false },
  { id: 19, name: "Electronic Ear Muffs", category: "hunting", subcategory: "Accessories", price: 69.99, originalPrice: 89.99, image: "🎧", rating: 4.6, reviews: 178, description: "Amplifies sounds while blocking shots.", inStock: true, featured: false },
  { id: 20, name: "Scent Eliminator Kit", category: "hunting", subcategory: "Accessories", price: 44.99, originalPrice: null, image: "🧴", rating: 4.4, reviews: 234, description: "Spray, body wash, and laundry detergent combo.", inStock: true, featured: false },
];

// Star Rating Component
const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} style={{ color: star <= rating ? '#D97706' : '#D1D5DB' }}>
          ★
        </span>
      ))}
    </div>
  );
};

// Header Component
const Header = ({ cartCount, onCartClick, onNavigate, currentPage, searchQuery, setSearchQuery }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{
      background: 'linear-gradient(135deg, #1C1917 0%, #292524 100%)',
      borderBottom: '3px solid #78350F',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      {/* Top Bar */}
      <div style={{ backgroundColor: '#78350F', padding: '8px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#FEF3C7', fontSize: '14px' }}>🚚 Free Shipping on Orders Over $99</span>
          <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#FEF3C7' }}>
            <span>📞 1-800-OUTDOOR</span>
            <span>📍 Store Locator</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
          {/* Logo */}
          <div
            onClick={() => onNavigate('home')}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <div style={{ fontSize: '48px' }}>🦌</div>
            <div>
              <h1 style={{
                color: '#F59E0B',
                fontSize: '24px',
                fontWeight: 'bold',
                fontFamily: 'Georgia, serif',
                letterSpacing: '1px'
              }}>
                WILD FRONTIER
              </h1>
              <p style={{ color: '#A8A29E', fontSize: '12px', letterSpacing: '2px' }}>OUTFITTERS & SUPPLY</p>
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ flex: 1, maxWidth: '500px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search gear, apparel, accessories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 48px 12px 16px',
                  borderRadius: '8px',
                  border: '2px solid #44403C',
                  backgroundColor: '#1C1917',
                  color: '#FAFAF9',
                  fontSize: '14px'
                }}
              />
              <button style={{
                position: 'absolute',
                right: '4px',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: '#78350F',
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
                color: currentPage === 'home' ? '#F59E0B' : '#D6D3D1',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('shop')}
              style={{
                color: currentPage === 'shop' ? '#F59E0B' : '#D6D3D1',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              Shop All
            </button>
            <button
              onClick={() => { onNavigate('shop'); }}
              style={{
                color: '#D6D3D1',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              Fishing
            </button>
            <button
              onClick={() => { onNavigate('shop'); }}
              style={{
                color: '#D6D3D1',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              Hunting
            </button>

            {/* Account */}
            <button style={{
              color: '#D6D3D1',
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
                color: '#D6D3D1',
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
      background: 'linear-gradient(135deg, #1C1917 0%, #292524 50%, #3D2914 100%)',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.1,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
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
            color: '#F59E0B',
            fontSize: '14px',
            fontWeight: '600',
            letterSpacing: '3px',
            marginBottom: '16px'
          }}>
            SEASON OPENER SALE
          </p>
          <h1 style={{
            color: '#FAFAF9',
            fontSize: '56px',
            fontWeight: 'bold',
            fontFamily: 'Georgia, serif',
            lineHeight: '1.1',
            marginBottom: '24px'
          }}>
            Gear Up For Your Next
            <span style={{ color: '#F59E0B', display: 'block' }}>Adventure</span>
          </h1>
          <p style={{
            color: '#A8A29E',
            fontSize: '18px',
            marginBottom: '32px',
            lineHeight: '1.6'
          }}>
            Premium hunting and fishing equipment trusted by outdoor enthusiasts for over 25 years.
            Save up to 40% on select gear this season.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              onClick={() => onNavigate('shop')}
              style={{
                backgroundColor: '#F59E0B',
                color: '#1C1917',
                padding: '16px 32px',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '16px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              Shop Now →
            </button>
            <button
              style={{
                backgroundColor: 'transparent',
                color: '#FAFAF9',
                padding: '16px 32px',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '16px',
                border: '2px solid #57534E',
                cursor: 'pointer'
              }}
            >
              View Catalog
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          right: '10%',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '200px',
          opacity: 0.3
        }}>
          🏕️
        </div>
      </div>

      {/* Bottom Wave */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '80px',
        background: 'linear-gradient(to top, #1C1917, transparent)'
      }} />
    </section>
  );
};

// Category Cards
const CategorySection = ({ onNavigate, setActiveCategory }) => {
  const categories = [
    { id: 'fishing', name: 'Fishing', icon: '🎣', description: 'Rods, reels, tackle & more', color: '#0369A1' },
    { id: 'hunting', name: 'Hunting', icon: '🏹', description: 'Bows, optics, apparel & gear', color: '#78350F' }
  ];

  return (
    <section style={{
      backgroundColor: '#1C1917',
      padding: '80px 16px'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{
            color: '#FAFAF9',
            fontSize: '36px',
            fontWeight: 'bold',
            fontFamily: 'Georgia, serif',
            marginBottom: '16px'
          }}>
            Shop By Category
          </h2>
          <p style={{ color: '#A8A29E', fontSize: '18px' }}>Find the perfect gear for your outdoor pursuits</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); onNavigate('shop'); }}
              style={{
                background: `linear-gradient(135deg, ${cat.color}22 0%, #29252400 100%)`,
                border: `2px solid ${cat.color}44`,
                borderRadius: '16px',
                padding: '48px',
                cursor: 'pointer',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                gap: '32px'
              }}
            >
              <div style={{ fontSize: '80px' }}>{cat.icon}</div>
              <div>
                <h3 style={{ color: '#FAFAF9', fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
                  {cat.name}
                </h3>
                <p style={{ color: '#A8A29E', fontSize: '16px', marginBottom: '16px' }}>{cat.description}</p>
                <span style={{ color: '#F59E0B', fontWeight: '600' }}>Browse Collection →</span>
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
      backgroundColor: '#292524',
      padding: '80px 16px'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
          <div>
            <h2 style={{
              color: '#FAFAF9',
              fontSize: '36px',
              fontWeight: 'bold',
              fontFamily: 'Georgia, serif',
              marginBottom: '8px'
            }}>
              Featured Gear
            </h2>
            <p style={{ color: '#A8A29E', fontSize: '16px' }}>Top picks from our experts</p>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            style={{
              backgroundColor: 'transparent',
              color: '#F59E0B',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: '600',
              border: '2px solid #F59E0B',
              cursor: 'pointer'
            }}
          >
            View All Products
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
        backgroundColor: '#1C1917',
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid #44403C',
        transition: 'all 0.3s',
        transform: isHovered ? 'translateY(-4px)' : 'none',
        boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.3)' : 'none'
      }}
    >
      {/* Image */}
      <div style={{
        height: '200px',
        backgroundColor: '#292524',
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
              SALE
            </span>
          )}
          {!product.inStock && (
            <span style={{
              backgroundColor: '#57534E',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px'
            }}>
              Out of Stock
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
              backgroundColor: '#F59E0B',
              color: '#1C1917',
              padding: '10px 20px',
              borderRadius: '6px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            + Add to Cart
          </button>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '16px' }}>
        <p style={{ color: '#78716C', fontSize: '12px', textTransform: 'uppercase', marginBottom: '4px' }}>
          {product.subcategory}
        </p>
        <h3 style={{ color: '#FAFAF9', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
          {product.name}
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <StarRating rating={product.rating} />
          <span style={{ color: '#78716C', fontSize: '12px' }}>({product.reviews})</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#F59E0B', fontSize: '20px', fontWeight: 'bold' }}>
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span style={{ color: '#78716C', fontSize: '14px', textDecoration: 'line-through' }}>
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

    // Category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    // Subcategory filter
    if (selectedSubcategory !== 'all') {
      filtered = filtered.filter(p => p.subcategory === selectedSubcategory);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(p => p.price >= min && (max ? p.price <= max : true));
    }

    // Sorting
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
    <section style={{ backgroundColor: '#1C1917', minHeight: '100vh', padding: '40px 16px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Page Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ color: '#FAFAF9', fontSize: '36px', fontWeight: 'bold', fontFamily: 'Georgia, serif' }}>
            {activeCategory === 'all' ? 'All Products' : activeCategory === 'fishing' ? 'Fishing Gear' : 'Hunting Gear'}
          </h1>
          <p style={{ color: '#A8A29E', marginTop: '8px' }}>
            {filteredProducts.length} products found
          </p>
        </div>

        <div style={{ display: 'flex', gap: '32px' }}>
          {/* Sidebar Filters */}
          <div style={{ width: '250px', flexShrink: 0 }}>
            <div style={{
              backgroundColor: '#292524',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #44403C',
              position: 'sticky',
              top: '140px'
            }}>
              <h3 style={{ color: '#FAFAF9', fontSize: '18px', fontWeight: 'bold', marginBottom: '24px' }}>
                Filters
              </h3>

              {/* Category Filter */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: '#D6D3D1', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                  Category
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {['all', 'fishing', 'hunting'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setActiveCategory(cat); setSelectedSubcategory('all'); }}
                      style={{
                        backgroundColor: activeCategory === cat ? '#78350F' : 'transparent',
                        color: activeCategory === cat ? '#FEF3C7' : '#A8A29E',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        textTransform: 'capitalize'
                      }}
                    >
                      {cat === 'all' ? 'All Categories' : cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subcategory Filter */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: '#D6D3D1', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                  Type
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubcategory(sub)}
                      style={{
                        backgroundColor: selectedSubcategory === sub ? '#78350F' : 'transparent',
                        color: selectedSubcategory === sub ? '#FEF3C7' : '#A8A29E',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      {sub === 'all' ? 'All Types' : sub}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ color: '#D6D3D1', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                  Price Range
                </h4>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid #44403C',
                    backgroundColor: '#1C1917',
                    color: '#FAFAF9'
                  }}
                >
                  <option value="all">All Prices</option>
                  <option value="0-50">Under $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-250">$100 - $250</option>
                  <option value="250-500">$250 - $500</option>
                  <option value="500-9999">$500+</option>
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
                  border: '1px solid #57534E',
                  backgroundColor: 'transparent',
                  color: '#A8A29E',
                  cursor: 'pointer'
                }}
              >
                Clear All Filters
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
              backgroundColor: '#292524',
              padding: '16px',
              borderRadius: '8px'
            }}>
              <span style={{ color: '#A8A29E' }}>
                Showing {filteredProducts.length} results
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ color: '#A8A29E' }}>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: '1px solid #44403C',
                    backgroundColor: '#1C1917',
                    color: '#FAFAF9'
                  }}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
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
                backgroundColor: '#292524',
                borderRadius: '12px'
              }}>
                <p style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</p>
                <p style={{ color: '#FAFAF9', fontSize: '18px', marginBottom: '8px' }}>No products found</p>
                <p style={{ color: '#A8A29E' }}>Try adjusting your filters or search terms</p>
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
  const tax = subtotal * 0.08;
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
          backgroundColor: 'rgba(0,0,0,0.6)',
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
        backgroundColor: '#1C1917',
        borderLeft: '1px solid #44403C',
        zIndex: 101,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #44403C',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ color: '#FAFAF9', fontSize: '20px', fontWeight: 'bold' }}>
            Your Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </h2>
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#A8A29E',
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
              <p style={{ color: '#A8A29E' }}>Your cart is empty</p>
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
                    backgroundColor: '#292524',
                    borderRadius: '8px'
                  }}
                >
                  <div style={{
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#1C1917',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '40px'
                  }}>
                    {item.image}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ color: '#FAFAF9', fontSize: '14px', marginBottom: '4px' }}>{item.name}</h4>
                    <p style={{ color: '#F59E0B', fontWeight: 'bold' }}>${item.price.toFixed(2)}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          backgroundColor: '#44403C',
                          border: 'none',
                          borderRadius: '4px',
                          color: '#FAFAF9',
                          cursor: 'pointer'
                        }}
                      >
                        -
                      </button>
                      <span style={{ color: '#FAFAF9', width: '30px', textAlign: 'center' }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          backgroundColor: '#44403C',
                          border: 'none',
                          borderRadius: '4px',
                          color: '#FAFAF9',
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
                        Remove
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
          <div style={{ padding: '24px', borderTop: '1px solid #44403C' }}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#A8A29E' }}>Subtotal</span>
                <span style={{ color: '#FAFAF9' }}>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#A8A29E' }}>Shipping</span>
                <span style={{ color: shipping === 0 ? '#22C55E' : '#FAFAF9' }}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#A8A29E' }}>Tax</span>
                <span style={{ color: '#FAFAF9' }}>${tax.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #44403C' }}>
                <span style={{ color: '#FAFAF9', fontWeight: 'bold' }}>Total</span>
                <span style={{ color: '#F59E0B', fontWeight: 'bold', fontSize: '20px' }}>${total.toFixed(2)}</span>
              </div>
            </div>
            {subtotal < 99 && (
              <p style={{ color: '#22C55E', fontSize: '12px', textAlign: 'center', marginBottom: '12px' }}>
                Add ${(99 - subtotal).toFixed(2)} more for FREE shipping!
              </p>
            )}
            <button
              onClick={onCheckout}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: '#F59E0B',
                color: '#1C1917',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '16px',
                cursor: 'pointer'
              }}
            >
              Proceed to Checkout
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
    state: '',
    zip: '',
    phone: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [step, setStep] = useState(1);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 99 ? 0 : 9.99;
  const tax = subtotal * 0.08;
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
        backgroundColor: '#1C1917',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '64px', marginBottom: '24px' }}>🛒</p>
          <h2 style={{ color: '#FAFAF9', fontSize: '24px', marginBottom: '16px' }}>Your cart is empty</h2>
          <button
            onClick={() => onNavigate('shop')}
            style={{
              backgroundColor: '#F59E0B',
              color: '#1C1917',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <section style={{ backgroundColor: '#1C1917', minHeight: '100vh', padding: '40px 16px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h1 style={{
          color: '#FAFAF9',
          fontSize: '32px',
          fontWeight: 'bold',
          fontFamily: 'Georgia, serif',
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          Checkout
        </h1>

        {/* Progress Steps */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '48px',
          marginBottom: '48px'
        }}>
          {['Shipping', 'Payment', 'Review'].map((label, index) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: step > index + 1 ? '#22C55E' : step === index + 1 ? '#F59E0B' : '#44403C',
                color: step >= index + 1 ? '#1C1917' : '#A8A29E',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                {step > index + 1 ? '✓' : index + 1}
              </div>
              <span style={{ color: step >= index + 1 ? '#FAFAF9' : '#78716C' }}>{label}</span>
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
                  backgroundColor: '#292524',
                  borderRadius: '12px',
                  padding: '32px',
                  border: '1px solid #44403C'
                }}>
                  <h2 style={{ color: '#FAFAF9', fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>
                    Shipping Information
                  </h2>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ color: '#A8A29E', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                      Email Address
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
                        border: '1px solid #44403C',
                        backgroundColor: '#1C1917',
                        color: '#FAFAF9'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ color: '#A8A29E', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                        First Name
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
                          border: '1px solid #44403C',
                          backgroundColor: '#1C1917',
                          color: '#FAFAF9'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ color: '#A8A29E', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                        Last Name
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
                          border: '1px solid #44403C',
                          backgroundColor: '#1C1917',
                          color: '#FAFAF9'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ color: '#A8A29E', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                      Street Address
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
                        border: '1px solid #44403C',
                        backgroundColor: '#1C1917',
                        color: '#FAFAF9'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ color: '#A8A29E', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                        City
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
                          border: '1px solid #44403C',
                          backgroundColor: '#1C1917',
                          color: '#FAFAF9'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ color: '#A8A29E', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '6px',
                          border: '1px solid #44403C',
                          backgroundColor: '#1C1917',
                          color: '#FAFAF9'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ color: '#A8A29E', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '6px',
                          border: '1px solid #44403C',
                          backgroundColor: '#1C1917',
                          color: '#FAFAF9'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ color: '#A8A29E', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                      Phone Number
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
                        border: '1px solid #44403C',
                        backgroundColor: '#1C1917',
                        color: '#FAFAF9'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '16px',
                      backgroundColor: '#F59E0B',
                      color: '#1C1917',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      cursor: 'pointer'
                    }}
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div style={{
                  backgroundColor: '#292524',
                  borderRadius: '12px',
                  padding: '32px',
                  border: '1px solid #44403C'
                }}>
                  <h2 style={{ color: '#FAFAF9', fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>
                    Payment Information
                  </h2>

                  <div style={{
                    display: 'flex',
                    gap: '12px',
                    marginBottom: '24px',
                    padding: '16px',
                    backgroundColor: '#1C1917',
                    borderRadius: '8px'
                  }}>
                    {['💳 Visa', '💳 Mastercard', '💳 Amex', '🅿️ PayPal'].map((method) => (
                      <span key={method} style={{ color: '#A8A29E', fontSize: '14px' }}>{method}</span>
                    ))}
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ color: '#A8A29E', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                      Name on Card
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
                        border: '1px solid #44403C',
                        backgroundColor: '#1C1917',
                        color: '#FAFAF9'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ color: '#A8A29E', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                      Card Number
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
                        border: '1px solid #44403C',
                        backgroundColor: '#1C1917',
                        color: '#FAFAF9'
                      }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                    <div>
                      <label style={{ color: '#A8A29E', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '6px',
                          border: '1px solid #44403C',
                          backgroundColor: '#1C1917',
                          color: '#FAFAF9'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ color: '#A8A29E', fontSize: '14px', display: 'block', marginBottom: '8px' }}>
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
                          border: '1px solid #44403C',
                          backgroundColor: '#1C1917',
                          color: '#FAFAF9'
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
                        color: '#A8A29E',
                        border: '1px solid #57534E',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      style={{
                        flex: 2,
                        padding: '16px',
                        backgroundColor: '#F59E0B',
                        color: '#1C1917',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        fontSize: '16px',
                        cursor: 'pointer'
                      }}
                    >
                      Review Order
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div style={{
                  backgroundColor: '#292524',
                  borderRadius: '12px',
                  padding: '32px',
                  border: '1px solid #44403C'
                }}>
                  <h2 style={{ color: '#FAFAF9', fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>
                    Review Your Order
                  </h2>

                  {/* Shipping Info */}
                  <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#1C1917', borderRadius: '8px' }}>
                    <h3 style={{ color: '#F59E0B', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                      Shipping To:
                    </h3>
                    <p style={{ color: '#FAFAF9' }}>
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.state} {formData.zip}
                    </p>
                  </div>

                  {/* Payment Info */}
                  <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#1C1917', borderRadius: '8px' }}>
                    <h3 style={{ color: '#F59E0B', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                      Payment Method:
                    </h3>
                    <p style={{ color: '#FAFAF9' }}>
                      💳 Card ending in {formData.cardNumber.slice(-4) || '****'}
                    </p>
                  </div>

                  {/* Order Items */}
                  <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ color: '#F59E0B', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                      Order Items:
                    </h3>
                    {cart.map((item) => (
                      <div key={item.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '12px 0',
                        borderBottom: '1px solid #44403C'
                      }}>
                        <span style={{ color: '#FAFAF9' }}>
                          {item.image} {item.name} × {item.quantity}
                        </span>
                        <span style={{ color: '#F59E0B' }}>
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
                        color: '#A8A29E',
                        border: '1px solid #57534E',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      ← Back
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
                      🔒 Place Order - ${total.toFixed(2)}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div style={{ width: '350px' }}>
            <div style={{
              backgroundColor: '#292524',
              borderRadius: '12px',
              padding: '24px',
              border: '1px solid #44403C',
              position: 'sticky',
              top: '140px'
            }}>
              <h3 style={{ color: '#FAFAF9', fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
                Order Summary
              </h3>

              {cart.map((item) => (
                <div key={item.id} style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '12px',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #44403C'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    backgroundColor: '#1C1917',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                  }}>
                    {item.image}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: '#FAFAF9', fontSize: '14px' }}>{item.name}</p>
                    <p style={{ color: '#78716C', fontSize: '12px' }}>Qty: {item.quantity}</p>
                  </div>
                  <span style={{ color: '#F59E0B' }}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <div style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#A8A29E' }}>Subtotal</span>
                  <span style={{ color: '#FAFAF9' }}>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#A8A29E' }}>Shipping</span>
                  <span style={{ color: shipping === 0 ? '#22C55E' : '#FAFAF9' }}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span style={{ color: '#A8A29E' }}>Tax</span>
                  <span style={{ color: '#FAFAF9' }}>${tax.toFixed(2)}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '16px',
                  borderTop: '1px solid #44403C'
                }}>
                  <span style={{ color: '#FAFAF9', fontWeight: 'bold', fontSize: '18px' }}>Total</span>
                  <span style={{ color: '#F59E0B', fontWeight: 'bold', fontSize: '20px' }}>${total.toFixed(2)}</span>
                </div>
              </div>

              <div style={{
                marginTop: '20px',
                padding: '12px',
                backgroundColor: '#1C1917',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>🔒</span>
                <span style={{ color: '#A8A29E', fontSize: '12px' }}>
                  Secure checkout powered by SSL encryption
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
  const orderNumber = `WF${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

  return (
    <section style={{
      backgroundColor: '#1C1917',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 16px'
    }}>
      <div style={{
        backgroundColor: '#292524',
        borderRadius: '16px',
        padding: '48px',
        maxWidth: '500px',
        textAlign: 'center',
        border: '1px solid #44403C'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: '#22C55E22',
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
          color: '#FAFAF9',
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '12px'
        }}>
          Order Confirmed!
        </h1>

        <p style={{ color: '#A8A29E', marginBottom: '24px' }}>
          Thank you for your purchase. Your order has been received and is being processed.
        </p>

        <div style={{
          backgroundColor: '#1C1917',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '24px'
        }}>
          <p style={{ color: '#78716C', fontSize: '14px', marginBottom: '4px' }}>Order Number</p>
          <p style={{ color: '#F59E0B', fontSize: '24px', fontWeight: 'bold', fontFamily: 'monospace' }}>
            {orderNumber}
          </p>
        </div>

        <p style={{ color: '#A8A29E', fontSize: '14px', marginBottom: '32px' }}>
          A confirmation email has been sent to your email address with order details and tracking information.
        </p>

        <button
          onClick={() => onNavigate('home')}
          style={{
            backgroundColor: '#F59E0B',
            color: '#1C1917',
            padding: '14px 32px',
            borderRadius: '8px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Continue Shopping
        </button>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer style={{
      backgroundColor: '#0C0A09',
      borderTop: '3px solid #78350F',
      padding: '60px 16px 30px'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '48px', marginBottom: '48px' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <span style={{ fontSize: '32px' }}>🦌</span>
              <span style={{ color: '#F59E0B', fontSize: '20px', fontWeight: 'bold', fontFamily: 'Georgia, serif' }}>
                WILD FRONTIER
              </span>
            </div>
            <p style={{ color: '#78716C', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
              Your trusted source for premium hunting and fishing gear since 1998. Quality equipment for the serious outdoor enthusiast.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['📘', '📸', '🐦', '📺'].map((icon, i) => (
                <span key={i} style={{
                  fontSize: '20px',
                  cursor: 'pointer',
                  opacity: 0.7
                }}>
                  {icon}
                </span>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 style={{ color: '#FAFAF9', fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>Shop</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Fishing Gear', 'Hunting Equipment', 'Apparel', 'Accessories', 'New Arrivals', 'Sale Items'].map((item) => (
                <li key={item} style={{ marginBottom: '8px' }}>
                  <a href="#" style={{ color: '#78716C', textDecoration: 'none', fontSize: '14px' }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ color: '#FAFAF9', fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Contact Us', 'FAQs', 'Shipping Info', 'Returns', 'Size Guide', 'Store Locations'].map((item) => (
                <li key={item} style={{ marginBottom: '8px' }}>
                  <a href="#" style={{ color: '#78716C', textDecoration: 'none', fontSize: '14px' }}>{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{ color: '#FAFAF9', fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>
              Join the Pack
            </h4>
            <p style={{ color: '#78716C', fontSize: '14px', marginBottom: '16px' }}>
              Get exclusive deals, gear tips, and early access to sales.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1px solid #44403C',
                  backgroundColor: '#1C1917',
                  color: '#FAFAF9',
                  fontSize: '14px'
                }}
              />
              <button style={{
                backgroundColor: '#F59E0B',
                color: '#1C1917',
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
          borderTop: '1px solid #292524',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <p style={{ color: '#57534E', fontSize: '14px' }}>
            © 2026 Wild Frontier Outfitters. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms of Service', 'Accessibility'].map((link) => (
              <a key={link} href="#" style={{ color: '#57534E', fontSize: '14px', textDecoration: 'none' }}>
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
      backgroundColor: '#78350F',
      padding: '60px 16px'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <p style={{ color: '#FEF3C7', fontSize: '14px', fontWeight: '600', letterSpacing: '2px', marginBottom: '12px' }}>
          LIMITED TIME OFFER
        </p>
        <h2 style={{
          color: '#FAFAF9',
          fontSize: '36px',
          fontWeight: 'bold',
          fontFamily: 'Georgia, serif',
          marginBottom: '16px'
        }}>
          Season Opener Sale - Save Up to 40%
        </h2>
        <p style={{ color: '#FED7AA', fontSize: '18px', marginBottom: '24px' }}>
          Stock up on everything you need for the season. Free shipping on orders over $99.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#FAFAF9', fontSize: '36px', fontWeight: 'bold' }}>25+</p>
            <p style={{ color: '#FED7AA', fontSize: '14px' }}>Years Experience</p>
          </div>
          <div style={{ width: '1px', backgroundColor: '#92400E' }} />
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#FAFAF9', fontSize: '36px', fontWeight: 'bold' }}>50K+</p>
            <p style={{ color: '#FED7AA', fontSize: '14px' }}>Happy Customers</p>
          </div>
          <div style={{ width: '1px', backgroundColor: '#92400E' }} />
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#FAFAF9', fontSize: '36px', fontWeight: 'bold' }}>5000+</p>
            <p style={{ color: '#FED7AA', fontSize: '14px' }}>Products</p>
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
    <div style={{ minHeight: '100vh', backgroundColor: '#1C1917' }}>
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
