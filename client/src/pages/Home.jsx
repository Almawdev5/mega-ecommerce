import { Link } from 'react-router-dom';
import { FaTiktok, FaYoutube, FaFacebook, FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { MdPhone, MdEmail } from 'react-icons/md';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { theme } = useTheme();

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', paddingTop: '72px' }}>

      {/* Hero */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: theme === 'dark' ? 'radial-gradient(ellipse 80% 50% at 50% -20%, #1d4ed830, transparent)' : 'radial-gradient(ellipse 80% 50% at 50% -20%, #bfdbfe50, transparent)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ color: '#3b82f6', fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '24px' }}>
            Ethiopia's Premier Tech Platform
          </p>

          <h1 style={{ fontSize: 'clamp(60px, 12vw, 120px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-2px', marginBottom: '24px' }}>
            <span style={{ color: 'var(--text-primary)' }}>MEGA</span>
            <br />
            <span style={{ color: '#3b82f6' }}>TECHNOLOGY</span>
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '520px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Premium electronics, digital subscriptions, and professional social media advertising — all in one place.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/products" style={{
              background: '#2563eb', color: '#fff', textDecoration: 'none',
              padding: '14px 36px', borderRadius: '12px', fontWeight: 700,
              fontSize: '15px', letterSpacing: '0.5px', display: 'inline-block'
            }}>
              Browse Products
            </Link>
            <Link to="/services" style={{
              background: 'transparent', color: 'var(--text-primary)',
              textDecoration: 'none', padding: '14px 36px', borderRadius: '12px',
              fontWeight: 700, fontSize: '15px', letterSpacing: '0.5px',
              border: '1px solid var(--border)', display: 'inline-block'
            }}>
              Our Services
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '64px', marginTop: '64px', paddingTop: '40px', borderTop: '1px solid var(--border)' }}>
            {[['500+', 'Products'], ['1K+', 'Customers'], ['3', 'Services']].map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '36px', fontWeight: 900, color: '#3b82f6', lineHeight: 1 }}>{val}</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '6px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll */}
        <div style={{ position: 'absolute', bottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Scroll</p>
          <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, #3b82f6, transparent)' }} />
        </div>
      </section>

      {/* What We Offer */}
      <section style={{ padding: '100px 24px', backgroundColor: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ color: '#3b82f6', fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '12px' }}>What We Offer</p>
          <h2 style={{ fontSize: '42px', fontWeight: 900, marginBottom: '64px', lineHeight: 1.1 }}>Everything You Need<br />In One Place</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'var(--border)' }}>
            {[
              { icon: '📱', title: 'Electronics', desc: 'Mobile phones, smart watches, tablets, and accessories at competitive prices.', link: '/products', cta: 'Browse Products' },
              { icon: '🎬', title: 'Digital Services', desc: 'Netflix, Spotify, Telegram, and YouTube premium at the best prices.', link: '/services', cta: 'View Services' },
              { icon: '📣', title: 'Ad Management', desc: 'Professional paid ad campaigns on TikTok, Facebook and YouTube on your behalf.', link: '/services', cta: 'Learn More' },
            ].map((item) => (
              <div key={item.title} style={{ backgroundColor: 'var(--bg-primary)', padding: '40px', transition: 'background 0.2s' }}>
                <p style={{ fontSize: '44px', marginBottom: '20px' }}>{item.icon}</p>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7, marginBottom: '24px' }}>{item.desc}</p>
                <Link to={item.link} style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>
                  {item.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section style={{ padding: '100px 24px', backgroundColor: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ color: '#3b82f6', fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '12px' }}>Payments</p>
          <h2 style={{ fontSize: '42px', fontWeight: 900, marginBottom: '12px', lineHeight: 1.1 }}>Simple & Secure<br />Payment Methods</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '64px', fontSize: '15px' }}>Transfer payment and upload your screenshot — we confirm manually.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {[
              { icon: '🏦', name: 'CBE', sub: 'Commercial Bank of Ethiopia', detail: '1000611500894' },
              { icon: '📲', name: 'Telebirr', sub: 'Mobile Money Transfer', detail: '0912068580' },
              { icon: '💰', name: 'Binance', sub: 'Cryptocurrency Payment', detail: 'Contact Us' },
            ].map((p) => (
              <div key={p.name} style={{ border: '1px solid var(--border)', borderRadius: '16px', padding: '32px', backgroundColor: 'var(--bg-card)' }}>
                <p style={{ fontSize: '40px', marginBottom: '16px' }}>{p.icon}</p>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-primary)' }}>{p.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '16px' }}>{p.sub}</p>
                <div style={{ background: theme === 'dark' ? '#111' : '#eff6ff', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 14px' }}>
                  <p style={{ color: '#3b82f6', fontFamily: 'monospace', fontSize: '14px', letterSpacing: '1px' }}>{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Social */}
      <section style={{ padding: '100px 24px', backgroundColor: 'var(--bg-secondary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px' }}>
          <div>
            <p style={{ color: '#3b82f6', fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '12px' }}>Contact</p>
            <h2 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '40px', lineHeight: 1.1 }}>Get In Touch</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { icon: <MdPhone size={18} />, label: 'Phone', value: '0912068580', href: 'tel:0912068580' },
                { icon: <MdEmail size={18} />, label: 'Email', value: 'mengistuyeshanbel@gmail.com', href: 'mailto:mengistuyeshanbel@gmail.com' },
                { icon: <FaTelegram size={16} />, label: 'Telegram', value: '@mengistuyeshanbel', href: 'https://t.me/mengistuyeshanbel' },
                { icon: <FaWhatsapp size={16} />, label: 'WhatsApp', value: '0912068580', href: 'https://wa.me/251912068580' },
              ].map((c) => (
                <a key={c.label} href={c.href} style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}>
                  <div style={{ width: '44px', height: '44px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', flexShrink: 0 }}>
                    {c.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>{c.label}</p>
                    <p style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '14px' }}>{c.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <p style={{ color: '#3b82f6', fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '12px' }}>Social Media</p>
            <h2 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '40px', lineHeight: 1.1 }}>Follow Us</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { icon: <FaTiktok size={18} />, label: 'TikTok', href: 'https://www.tiktok.com/@mengistuyeshanbel', color: 'var(--text-primary)' },
                { icon: <FaYoutube size={18} />, label: 'YouTube', href: 'https://youtube.com/@megatip1', color: '#ef4444' },
                { icon: <FaFacebook size={18} />, label: 'Facebook', href: '#', color: '#3b82f6' },
                { icon: <FaInstagram size={18} />, label: 'Instagram', href: '#', color: '#ec4899' },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  padding: '16px 20px', borderRadius: '12px', textDecoration: 'none',
                  color: 'var(--text-secondary)', transition: 'border-color 0.2s'
                }}>
                  <span style={{ color: s.color }}>{s.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 24px', backgroundColor: 'var(--bg-primary)', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <p style={{ color: '#3b82f6', fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '24px' }}>Get Started</p>
          <h2 style={{ fontSize: 'clamp(48px, 8vw, 80px)', fontWeight: 900, lineHeight: 1, marginBottom: '24px' }}>
            Ready to <br /><span style={{ color: '#3b82f6' }}>Order?</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '17px', marginBottom: '48px' }}>Browse our full catalog and place your order in minutes.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/order" style={{
              background: '#2563eb', color: '#fff', textDecoration: 'none',
              padding: '16px 48px', borderRadius: '12px', fontWeight: 700,
              fontSize: '16px', letterSpacing: '0.5px', display: 'inline-block'
            }}>
              Order Now
            </Link>
            <Link to="/contact" style={{
              background: 'transparent', color: 'var(--text-secondary)',
              textDecoration: 'none', padding: '16px 48px', borderRadius: '12px',
              fontWeight: 700, fontSize: '16px',
              border: '1px solid var(--border)', display: 'inline-block'
            }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;