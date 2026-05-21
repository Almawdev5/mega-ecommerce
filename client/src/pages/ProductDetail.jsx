import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaTelegram, FaWhatsapp } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch {
        setProduct({
          _id: id,
          name: 'iPhone 15 Pro',
          category: 'Mobile phones',
          price: 85000,
          inStock: true,
          images: [],
          description: `The iPhone 15 Pro features Apple's A17 Pro chip, a titanium design, and an advanced triple-camera system.\n\nSpecifications:\n- Display: 6.1" Super Retina XDR, 120Hz ProMotion\n- Chip: Apple A17 Pro\n- Camera: 48MP Main + 12MP Ultra Wide + 12MP Telephoto\n- Battery: Up to 23 hours video playback\n\nWhat's in the box:\n- iPhone 15 Pro\n- USB-C Cable (1m)\n- Documentation`,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '14px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', paddingTop: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '56px', marginBottom: '16px' }}>😕</p>
          <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '16px', color: 'var(--text-primary)' }}>Product not found</h2>
          <Link to="/products" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>← Back to Products</Link>
        </div>
      </div>
    );
  }

  const images = product.images?.length > 0 ? product.images : [null];
  const telegramMsg = encodeURIComponent(`Hi, I'm interested in: ${product.name} (ETB ${product.price?.toLocaleString()})`);
  const whatsappMsg = encodeURIComponent(`Hi, I'm interested in: ${product.name} (ETB ${product.price?.toLocaleString()})`);

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', paddingTop: '72px' }}>

      {/* Breadcrumb */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link to="/products" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Products</Link>
          <span>›</span>
          <span style={{ color: 'var(--text-primary)' }}>{product.name}</span>
        </div>
      </div>

      {/* Main */}
      <section style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px', alignItems: 'start' }}>

          {/* Images */}
          <div>
            <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--bg-secondary)', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              {images[selectedImage] ? (
                <img src={`/uploads/${images[selectedImage]}`} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ fontSize: '96px' }}>📦</span>
              )}
            </div>
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {images.map((img, i) => (
                  <button key={i} onClick={() => setSelectedImage(i)} style={{ width: '72px', height: '72px', borderRadius: '10px', overflow: 'hidden', border: `2px solid ${selectedImage === i ? '#3b82f6' : 'var(--border)'}`, background: 'var(--bg-secondary)', cursor: 'pointer', padding: 0 }}>
                    {img ? <img src={`/uploads/${img}`} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: '28px' }}>📦</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <p style={{ color: '#3b82f6', fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '12px' }}>{product.category}</p>
            <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px' }}>{product.name}</h1>

            <span style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, marginBottom: '28px', background: product.inStock ? '#dcfce7' : '#fee2e2', color: product.inStock ? '#16a34a' : '#dc2626' }}>
              {product.inStock ? '✓ In Stock' : '✕ Out of Stock'}
            </span>

            {/* Price box */}
            <div style={{ padding: '24px', border: '1px solid var(--border)', borderRadius: '16px', background: 'var(--bg-card)', marginBottom: '28px' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '6px' }}>Price</p>
              <p style={{ fontSize: '40px', fontWeight: 900, color: '#3b82f6', lineHeight: 1 }}>ETB {product.price?.toLocaleString()}</p>
            </div>

            {/* Order button */}
            <div style={{ marginBottom: '16px' }}>
              <Link
                to={product.inStock ? `/order?product=${encodeURIComponent(product.name)}` : '#'}
                onClick={e => !product.inStock && e.preventDefault()}
                style={{ display: 'block', textAlign: 'center', textDecoration: 'none', padding: '16px', borderRadius: '12px', fontWeight: 700, fontSize: '16px', background: product.inStock ? '#2563eb' : 'var(--bg-secondary)', color: product.inStock ? '#fff' : 'var(--text-muted)', cursor: product.inStock ? 'pointer' : 'not-allowed', border: product.inStock ? 'none' : '1px solid var(--border)' }}
              >
                {product.inStock ? 'Order Now' : 'Currently Unavailable'}
              </Link>
            </div>

            {/* Telegram / WhatsApp */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
              <a href={`https://t.me/mengistuyeshanbel?text=${telegramMsg}`} target="_blank" rel="noreferrer"
                style={{ flex: 1, minWidth: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '13px 16px', borderRadius: '12px', textDecoration: 'none', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontWeight: 600, fontSize: '14px' }}>
                <FaTelegram size={18} color="#2ca5e0" /> Ask on Telegram
              </a>
              <a href={`https://wa.me/251912068580?text=${whatsappMsg}`} target="_blank" rel="noreferrer"
                style={{ flex: 1, minWidth: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '13px 16px', borderRadius: '12px', textDecoration: 'none', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontWeight: 600, fontSize: '14px' }}>
                <FaWhatsapp size={18} color="#25d366" /> Ask on WhatsApp
              </a>
            </div>

            {/* Description */}
            {product.description && (
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '32px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-muted)', marginBottom: '16px' }}>Description</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{product.description}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <div style={{ padding: '0 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
        <Link to="/products" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>← Back to Products</Link>
      </div>

    </div>
  );
};

export default ProductDetail;