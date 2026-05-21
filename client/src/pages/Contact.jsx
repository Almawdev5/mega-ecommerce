import { useState } from 'react';
import { FaTiktok, FaYoutube, FaFacebook, FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { MdPhone, MdEmail } from 'react-icons/md';

const Contact = () => {
  const [form, setForm] = useState({ name: '', contact: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!form.name || !form.contact || !form.message) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please contact us directly.');
      }
    } catch {
      setError('Network error. Please contact us on Telegram or WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', paddingTop: '72px' }}>

      {/* Header */}
      <section style={{ padding: '80px 24px 60px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ color: '#3b82f6', fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '12px' }}>Contact</p>
          <h1 style={{ fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 900, lineHeight: 1, marginBottom: '16px' }}>Get In Touch</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '500px' }}>Reach us on any platform. We usually respond within a few hours.</p>
        </div>
      </section>

      <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '80px' }}>

          {/* LEFT: Contact info + social */}
          <div>

            {/* Direct contact */}
            <p style={{ color: '#3b82f6', fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '12px' }}>Direct Contact</p>
            <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '32px' }}>Reach Us Directly</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '56px' }}>
              {[
                { icon: <MdPhone size={18} />, label: 'Phone', value: '0912068580', href: 'tel:0912068580' },
                { icon: <MdEmail size={18} />, label: 'Email', value: 'mengistuyeshanbel@gmail.com', href: 'mailto:mengistuyeshanbel@gmail.com' },
                { icon: <FaTelegram size={16} />, label: 'Telegram', value: '@mengistuyeshanbel', href: 'https://t.me/mengistuyeshanbel' },
                { icon: <FaWhatsapp size={16} />, label: 'WhatsApp', value: '0912068580', href: 'https://wa.me/251912068580' },
              ].map((c) => (
                <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none', padding: '16px', borderRadius: '14px', border: '1px solid var(--border)', background: 'var(--bg-card)', transition: 'border-color 0.2s' }}>
                  <div style={{ width: '44px', height: '44px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', flexShrink: 0 }}>
                    {c.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2px' }}>{c.label}</p>
                    <p style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '14px' }}>{c.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick action buttons */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '56px' }}>
              <a href="https://t.me/mengistuyeshanbel" target="_blank" rel="noreferrer"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '14px', borderRadius: '12px', textDecoration: 'none', background: '#2563eb', color: '#fff', fontWeight: 700, fontSize: '14px' }}>
                <FaTelegram size={18} /> Open Telegram
              </a>
              <a href="https://wa.me/251912068580" target="_blank" rel="noreferrer"
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '14px', borderRadius: '12px', textDecoration: 'none', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontWeight: 700, fontSize: '14px' }}>
                <FaWhatsapp size={18} color="#25d366" /> Open WhatsApp
              </a>
            </div>

            {/* Social Media */}
            <p style={{ color: '#3b82f6', fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '12px' }}>Social Media</p>
            <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '24px' }}>Follow Us</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { icon: <FaTiktok size={18} />, label: 'TikTok', href: 'https://www.tiktok.com/@mengistuyeshanbel', color: 'var(--text-primary)' },
                { icon: <FaYoutube size={18} />, label: 'YouTube', href: 'https://youtube.com/@megatip1', color: '#ef4444' },
                { icon: <FaFacebook size={18} />, label: 'Facebook', href: '#', color: '#3b82f6' },
                { icon: <FaInstagram size={18} />, label: 'Instagram', href: '#', color: '#ec4899' },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '16px 20px', borderRadius: '12px', textDecoration: 'none', transition: 'border-color 0.2s' }}>
                  <span style={{ color: s.color }}>{s.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: Contact form */}
          <div>
            <p style={{ color: '#3b82f6', fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '12px' }}>Message</p>
            <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '32px' }}>Send Us a Message</h2>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '60px 32px', border: '1px solid var(--border)', borderRadius: '16px', background: 'var(--bg-card)' }}>
                <p style={{ fontSize: '56px', marginBottom: '16px' }}>✅</p>
                <h3 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '10px' }}>Message Sent!</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6 }}>Thank you for reaching out. We will get back to you as soon as possible.</p>
              </div>
            ) : (
              <div style={{ border: '1px solid var(--border)', borderRadius: '16px', padding: '36px', background: 'var(--bg-card)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '8px' }}>Your Name *</label>
                    <input type="text" placeholder="Full name" value={form.name} onChange={e => set('name', e.target.value)}
                      style={{ width: '100%', padding: '13px 16px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '8px' }}>Phone or Email *</label>
                    <input type="text" placeholder="09XXXXXXXX or email@example.com" value={form.contact} onChange={e => set('contact', e.target.value)}
                      style={{ width: '100%', padding: '13px 16px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }} />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '8px' }}>Message *</label>
                    <textarea placeholder="Write your message here..." value={form.message} onChange={e => set('message', e.target.value)} rows={5}
                      style={{ width: '100%', padding: '13px 16px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                  </div>

                  {error && (
                    <div style={{ padding: '12px 16px', borderRadius: '10px', background: '#fee2e2', border: '1px solid #fca5a5', color: '#dc2626', fontSize: '14px' }}>
                      {error}
                    </div>
                  )}

                  <button onClick={handleSubmit} disabled={submitting}
                    style={{ width: '100%', padding: '16px', borderRadius: '10px', border: 'none', background: submitting ? 'var(--bg-secondary)' : '#2563eb', color: submitting ? 'var(--text-muted)' : '#fff', fontWeight: 800, fontSize: '15px', cursor: submitting ? 'not-allowed' : 'pointer', transition: 'all 0.15s' }}>
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>

                </div>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;