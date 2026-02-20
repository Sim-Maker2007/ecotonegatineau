import { Helmet } from 'react-helmet-async';
import { useLang } from '../context/LanguageContext';

const BASE_URL = 'https://ecotone-gatineau.vercel.app';

const pageMeta = {
  home: {
    fr: { title: 'Ecotone Gatineau | Destination de Plein Air Moderne', desc: 'Votre destination plein air à Gatineau. Chasse, pêche, camping et plus. 600+ marques, service expert.' },
    en: { title: 'Ecotone Gatineau | Modern Outdoor Destination', desc: 'Your outdoor destination in Gatineau. Hunting, fishing, camping and more. 600+ brands, expert service.' }
  },
  shop: {
    fr: { title: 'Boutique | Ecotone Gatineau', desc: 'Parcourez notre catalogue complet de produits de plein air. Chasse, pêche, camping, vêtements.' },
    en: { title: 'Shop | Ecotone Gatineau', desc: 'Browse our complete outdoor product catalog. Hunting, fishing, camping, clothing.' }
  },
  intel: {
    fr: { title: 'Outdoor Intel | Ecotone Gatineau', desc: 'Trucs, astuces et guides pour la chasse, pêche et plein air dans la région de l\'Outaouais.' },
    en: { title: 'Outdoor Intel | Ecotone Gatineau', desc: 'Tips, tricks and guides for hunting, fishing and outdoors in the Outaouais region.' }
  },
  about: {
    fr: { title: 'À propos | Ecotone Gatineau', desc: 'Découvrez Ecotone Gatineau, votre nouvelle destination plein air dans l\'Outaouais.' },
    en: { title: 'About | Ecotone Gatineau', desc: 'Discover Ecotone Gatineau, your new outdoor destination in the Outaouais region.' }
  },
  contact: {
    fr: { title: 'Contact | Ecotone Gatineau', desc: 'Contactez Ecotone Gatineau. 79 Boul. de la Gappe #4, Gatineau QC. (819) 243-6665.' },
    en: { title: 'Contact | Ecotone Gatineau', desc: 'Contact Ecotone Gatineau. 79 Boul. de la Gappe #4, Gatineau QC. (819) 243-6665.' }
  },
  faq: {
    fr: { title: 'FAQ | Ecotone Gatineau', desc: 'Questions fréquentes sur nos produits, livraison, retours et services. Ecotone Gatineau, votre magasin de plein air.' },
    en: { title: 'FAQ | Ecotone Gatineau', desc: 'Frequently asked questions about our products, shipping, returns and services. Ecotone Gatineau, your outdoor store.' }
  }
};

export default function SEOHead({ page = 'home', product = null, post = null }) {
  const { lang } = useLang();
  const altLang = lang === 'fr' ? 'en' : 'fr';
  
  let title, description, url, image;
  
  if (product) {
    title = `${lang === 'fr' ? product.name : product.nameEn} | Ecotone Gatineau`;
    description = lang === 'fr' ? product.desc : (product.descEn || product.desc);
    url = `${BASE_URL}/produit/${product.id}`;
    image = `${BASE_URL}${product.image}`;
  } else if (post) {
    title = `${lang === 'fr' ? post.title : post.titleEn} | Ecotone Gatineau`;
    description = (lang === 'fr' ? post.content : post.contentEn).substring(0, 160);
    url = `${BASE_URL}/intel/${post.slug}`;
    image = `${BASE_URL}${post.img}`;
  } else {
    const meta = pageMeta[page]?.[lang] || pageMeta.home[lang];
    title = meta.title;
    description = meta.desc;
    url = `${BASE_URL}${page === 'home' ? '/' : `/${page === 'shop' ? 'boutique' : page === 'intel' ? 'intel' : page === 'about' ? 'a-propos' : page}`}`;
    image = `${BASE_URL}/assets/ecotone-logo.png`;
  }

  // Build JSON-LD structured data
  let jsonLd = null;
  if (product) {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: lang === 'fr' ? product.name : product.nameEn,
      description: lang === 'fr' ? product.desc : (product.descEn || product.desc),
      image: image,
      url: url,
      brand: { '@type': 'Brand', name: product.brand || 'Ecotone Gatineau' },
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'CAD',
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: 'Ecotone Gatineau' }
      }
    };
  } else if (post) {
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: lang === 'fr' ? post.title : post.titleEn,
      description: description,
      image: image,
      url: url,
      datePublished: post.dateISO || '2026-01-01',
      author: { '@type': 'Organization', name: 'Ecotone Gatineau' },
      publisher: {
        '@type': 'Organization',
        name: 'Ecotone Gatineau',
        logo: { '@type': 'ImageObject', url: `${BASE_URL}/assets/ecotone-logo.png` }
      }
    };
  }

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* OpenGraph */}
      <meta property="og:type" content={post ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Ecotone Gatineau" />
      <meta property="og:locale" content={lang === 'fr' ? 'fr_CA' : 'en_CA'} />
      <meta property="og:locale:alternate" content={altLang === 'fr' ? 'fr_CA' : 'en_CA'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* hreflang for bilingual SEO */}
      <link rel="alternate" hrefLang="fr" href={url} />
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />

      <link rel="canonical" href={url} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
