import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaTelegram, FaWhatsapp } from 'react-icons/fa';

const PAYMENT_METHODS = [
  { id: 'cbe', icon: '🏦', name: 'CBE', label: 'Commercial Bank of Ethiopia', detail: 'Account Number', value: '1000611500894', accountName: 'Mengistu Yeshan Bel' },
  { id: 'telebirr', icon: '📲', name: 'Telebirr', label: 'Mobile Money Transfer', detail: 'Phone Number', value: '0912068580', accountName: 'Mengistu Yeshan Bel' },
  { id: 'binance', icon: '💰', name: 'Binance', label: 'Cryptocurrency Payment', detail: 'Contact us for wallet address', value: null, accountName: null },
];

const Order = () => {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    orderDetails: searchParams.get('product') || searchParams.get('service') || '',
    quantity: '1',
    notes: '',
    paymentMethod: '',
  });
  const [proofFile, setProofFile] = useState(null);
  const [proofPreview, setProofPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const selectedPayment = PAYMENT_METHODS.find(p => p.id === form.paymentMethod);

  useEffect(() => {
    if (proofFile) {
      const url = URL.createObjectURL(proofFile);
      setProofPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setProofPreview(null);
    }
  }, [proofFile]);

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    if (!form.fullName || !form.phone || !form.orderDetails || !form.paymentMethod) {
      setError('Please fill in all required fields.');
      return;
    }
    if (form.paymentMethod !== 'binance' && !proofFile) {
      setError('Please upload your payment screenshot.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (proofFile) formData.append('paymentProof', proofFile);
      const res = await fetch('/api/orders', { method: 'POST', body: formData });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please try again or contact us directly.');
      }
    } catch {
      setError('Network error. Please contact us on Telegram or WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', paddingTop: '72px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <p style={{ fontSize: '72px', marginBottom: '24px' }}>✅</p>
          <h2 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '16px' }}>Order Received!</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.7, marginBottom: '40px' }}>
            Your order has been received. We will contact you within 24 hours to confirm your payment and process your order.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://t.me/mengistuyeshanbel" target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '13px 24px', borderRadius: '12px', textDecoration: 'none', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontWeight: 600, fontSize: '14px' }}>
              <FaTelegram size={16} color="#2ca5e0" /> Contact on Telegram
            </a>
            <a href="https://wa.me/251912068580" target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '13px 24px', borderRadius: '12px', textDecoration: 'none', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontWeight: 600, fontSize: '14px' }}>
              <FaWhatsapp size={16} color="#25d366" /> Contact on WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', paddingTop: '72px' }}>

      {/* Header */}
      <section style={{ padding: '80px 24px 60px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <p style={{ color: '#3b82f6', fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '12px' }}>Order</p>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 70px)', fontWeight: 900, lineHeight: 1, marginBottom: '16px' }}>Place Your Order</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>Fill in the form below, or contact us directly on Telegram or WhatsApp.</p>
        </div>
      </section>

      <section style={{ padding: '60px 24px 100px', maxWidth: '760px', margin: '0 auto' }}>

        {/* Direct contact */}
        <div style={{ border: '1px solid var(--border)', borderRadius: '16px', padding: '28px', background: 'var(--bg-card)', marginBottom: '48px' }}>
          <p style={{ fontWeight: 700, fontSize: '15px', marginBottom: '6px' }}>Prefer to chat first?</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>Contact us directly before placing an order.</p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="https://t.me/mengistuyeshanbel" target="_blank" rel="noreferrer"
              style={{ flex: 1, minWidth: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '13px 20px', borderRadius: '10px', textDecoration: 'none', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontWeight: 600, fontSize: '14px' }}>
              <FaTelegram size={18} color="#2ca5e0" /> Message on Telegram
            </a>
            <a href="https://wa.me/251912068580" target="_blank" rel="noreferrer"
              style={{ flex: 1, minWidth: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '13px 20px', borderRadius: '10px', textDecoration: 'none', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontWeight: 600, fontSize: '14px' }}>
              <FaWhatsapp size={18} color="#25d366" /> Message on WhatsApp
            </a>
          </div>
        </div>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          <p style={{ color: 'var(--text-muted)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Or fill the form</p>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>

        {/* Form fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

          {/* Full Name */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '8px' }}>Full Name *</label>
            <input type="text" placeholder="Your full name" value={form.fullName} onChange={e => set('fullName', e.target.value)}
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          {/* Phone */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '8px' }}>Phone Number *</label>
            <input type="tel" placeholder="09XXXXXXXX" value={form.phone} onChange={e => set('phone', e.target.value)}
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          {/* Order Details */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '8px' }}>What Are You Ordering? *</label>
            <input type="text" placeholder="Product name, service name, or both" value={form.orderDetails} onChange={e => set('orderDetails', e.target.value)}
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
          </div>

          {/* Quantity */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '8px' }}>Quantity</label>
            <input type="number" min="1" value={form.quantity} onChange={e => set('quantity', e.target.value)}
              style={{ width: '120px', padding: '14px 16px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '15px', outline: 'none' }} />
          </div>

          {/* Notes */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '8px' }}>Special Notes</label>
            <textarea placeholder="Any special requests or notes..." value={form.notes} onChange={e => set('notes', e.target.value)} rows={3}
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontSize: '15px', outline: 'none', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>

          {/* Payment Method */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '12px' }}>Payment Method *</label>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {PAYMENT_METHODS.map(pm => (
                <button key={pm.id} onClick={() => set('paymentMethod', pm.id)}
                  style={{ flex: 1, minWidth: '130px', padding: '16px 12px', borderRadius: '12px', cursor: 'pointer', border: `2px solid ${form.paymentMethod === pm.id ? '#3b82f6' : 'var(--border)'}`, background: form.paymentMethod === pm.id ? 'rgba(59,130,246,0.08)' : 'var(--bg-card)', color: 'var(--text-primary)', textAlign: 'center', transition: 'all 0.15s' }}>
                  <p style={{ fontSize: '28px', marginBottom: '6px' }}>{pm.icon}</p>
                  <p style={{ fontWeight: 700, fontSize: '14px' }}>{pm.name}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '11px', marginTop: '2px' }}>{pm.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Details */}
          {selectedPayment && (
            <div style={{ border: '1px solid #3b82f6', borderRadius: '16px', padding: '28px', background: 'rgba(59,130,246,0.05)' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#3b82f6', marginBottom: '16px' }}>{selectedPayment.name} Payment Details</p>
              {selectedPayment.accountName && (
                <div style={{ marginBottom: '12px' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>Account Name</p>
                  <p style={{ fontWeight: 700, fontSize: '15px' }}>{selectedPayment.accountName}</p>
                </div>
              )}
              {selectedPayment.value ? (
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>{selectedPayment.detail}</p>
                  <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px 16px' }}>
                    <p style={{ color: '#3b82f6', fontFamily: 'monospace', fontSize: '16px', letterSpacing: '1px', fontWeight: 700 }}>{selectedPayment.value}</p>
                  </div>
                </div>
              ) : (
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>Contact us on Telegram or WhatsApp to get the Binance wallet address.</p>
              )}
              {selectedPayment.value && (
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6 }}>Make the transfer using the details above, then upload your payment screenshot below.</p>
              )}
            </div>
          )}

          {/* Payment Proof Upload */}
          {form.paymentMethod && form.paymentMethod !== 'binance' && (
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '8px' }}>Upload Payment Screenshot *</label>
              <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', padding: '32px', borderRadius: '12px', cursor: 'pointer', border: `2px dashed ${proofFile ? '#3b82f6' : 'var(--border)'}`, background: proofFile ? 'rgba(59,130,246,0.05)' : 'var(--bg-card)' }}>
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => setProofFile(e.target.files[0])} />
                {proofPreview ? (
                  <>
                    <img src={proofPreview} alt="Payment proof" style={{ maxHeight: '200px', borderRadius: '8px', objectFit: 'contain' }} />
                    <p style={{ color: '#3b82f6', fontSize: '13px', fontWeight: 600 }}>{proofFile.name} — click to change</p>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: '40px' }}>📸</span>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', textAlign: 'center' }}>Click to upload your payment screenshot</p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>JPG, PNG supported</p>
                  </>
                )}
              </label>
            </div>
          )}

          {/* Error */}
          {error && (
            <div style={{ padding: '14px 18px', borderRadius: '10px', background: '#fee2e2', border: '1px solid #fca5a5', color: '#dc2626', fontSize: '14px', fontWeight: 500 }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <button onClick={handleSubmit} disabled={submitting}
            style={{ width: '100%', padding: '18px', borderRadius: '12px', border: 'none', background: submitting ? 'var(--bg-secondary)' : '#2563eb', color: submitting ? 'var(--text-muted)' : '#fff', fontWeight: 800, fontSize: '16px', cursor: submitting ? 'not-allowed' : 'pointer', transition: 'all 0.15s', letterSpacing: '0.3px' }}>
            {submitting ? 'Submitting...' : 'Submit Order'}
          </button>

        </div>
      </section>
    </div>
  );
};

export default Order;