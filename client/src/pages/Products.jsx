import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = ['All', 'Mobile phones', 'Smart watches', 'Tablets', 'Accessories'];

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const imageUrl = product.images?.[0] ? `/uploads/${product.images[0]}` : null;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? '#3b82f6' : 'var(--border)'}`,
        borderRadius: '16px', overflow: 'hidden',
        background: 'var(--bg-card)', transition: 'all 0.2s',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered ? '0 16px 40px rgba(59,130,246,0.12)' : 'none',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div style={{ height: '220px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
        {imageUrl ? (
          <img src={imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ fontSize: '64px' }}>📦</span>
        )}
        <span style={{
          position: 'absolute', top: '12px', left: '12px',
          padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700,
          background: product.inStock ? '#dcfce7' : '#fee2e2',
          color: product.inStock ? '#16a34a' : '#dc2626',
        }}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>

      {/* Info */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <p style={{ fontSize: '11px', color: '#3b82f6', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px' }}>
          {product.category}
        </p>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px', lineHeight: 1.3 }}>
          {product.name}
        </h3>
        <p style={{ fontSize: '22px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '20px', marginTop: 'auto' }}>
          ETB {product.price?.toLocaleString()}
        </p>

        <Link
          to={product.inStock ? `/products/${product._id}` : '#'}
          onClick={e => !product.inStock && e.preventDefault()}
          style={{
            display: 'block', textAlign: 'center', textDecoration: 'none',
            padding: '12px', borderRadius: '10px', fontWeight: 700, fontSize: '14px',
            background: product.inStock ? '#2563eb' : 'var(--bg-secondary)',
            color: product.inStock ? '#fff' : 'var(--text-muted)',
            cursor: product.inStock ? 'pointer' : 'not-allowed',
            border: product.inStock ? 'none' : '1px solid var(--border)',
          }}
        >
          {product.inStock ? 'View Product' : 'Currently Unavailable'}
        </Link>
      </div>
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch {
        setProducts([
          { _id: '1', name: 'iPhone 15 Pro', category: 'Mobile phones', price: 85000, inStock: true, images: [] },
          { _id: '2', name: 'Samsung Galaxy S24', category: 'Mobile phones', price: 72000, inStock: true, images: [] },
          { _id: '3', name: 'Apple Watch Series 9', category: 'Smart watches', price: 38000, inStock: false, images: [] },
          { _id: '4', name: 'iPad Air M2', category: 'Tablets', price: 65000, inStock: true, images: [] },
          { _id: '5', name: 'AirPods Pro', category: 'Accessories', price: 22000, inStock: true, images: [] },
          { _id: '6', name: 'Samsung Galaxy Watch 6', category: 'Smart watches', price: 28000, inStock: true, images: [] },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', paddingTop: '72px' }}>

      {/* Page Header */}
      <section style={{ padding: '80px 24px 60px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ color: '#3b82f6', fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '12px' }}>Catalog</p>
          <h1 style={{ fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 900, lineHeight: 1, marginBottom: '16px' }}>Our Products</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '500px' }}>
            Premium electronics at competitive prices. All products delivered within Ethiopia.
          </p>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', position: 'sticky', top: '72px', zIndex: 10 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 18px', borderRadius: '999px', border: '1px solid var(--border)',
                  cursor: 'pointer', fontSize: '13px', fontWeight: 600, transition: 'all 0.15s',
                  background: activeCategory === cat ? '#2563eb' : 'var(--bg-card)',
                  color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
                  borderColor: activeCategory === cat ? '#2563eb' : 'var(--border)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: '10px 18px', borderRadius: '12px', border: '1px solid var(--border)',
              background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '14px',
              outline: 'none', width: '220px',
            }}
          />
        </div>
      </div>

      {/* Product Grid */}
      <section style={{ padding: '48px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{ border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden', background: 'var(--bg-card)' }}>
                <div style={{ height: '220px', background: 'var(--bg-secondary)', animation: 'pulse 1.5s infinite' }} />
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ height: '12px', background: 'var(--bg-secondary)', borderRadius: '4px', width: '50%' }} />
                  <div style={{ height: '18px', background: 'var(--bg-secondary)', borderRadius: '4px', width: '80%' }} />
                  <div style={{ height: '24px', background: 'var(--bg-secondary)', borderRadius: '4px', width: '40%' }} />
                  <div style={{ height: '42px', background: 'var(--bg-secondary)', borderRadius: '10px' }} />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <p style={{ fontSize: '56px', marginBottom: '16px' }}>🔍</p>
            <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>No products found</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Try a different category or search term.</p>
          </div>
        ) : (
          <>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '28px' }}>
              Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
              {filtered.map(product => <ProductCard key={product._id} product={product} />)}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Products;