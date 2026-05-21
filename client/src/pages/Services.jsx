import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useTheme } from '../context/ThemeContext';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    try {
      const { data } = await api.get('/services');
      setServices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const typeColor = (type) => {
    switch (type) {
      case 'subscription': return '#2563eb';
      case 'boost': return '#7c3aed';
      case 'ad-management': return '#16a34a';
      default: return '#64748b';
    }
  };

  const typeLabel = (type) => {
    switch (type) {
      case 'subscription': return 'Subscription';
      case 'boost': return 'Social Boost';
      case 'ad-management': return 'Ad Management';
      default: return type;
    }
  };

  const filtered = filter === 'all' ? services : services.filter(s => s.type === filter);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', paddingTop: '80px' }}>

      {/* Hero */}
      <div style={{ padding: '60px 24px 40px', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: '#3b82f6', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '12px' }}>What We Offer</p>
        <h1 style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '16px' }}>Our Services</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>
          Digital subscriptions, social media boosts, and professional ad management.
        </p>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '32px 24px', flexWrap: 'wrap' }}>
        {[
          { key: 'all', label: 'All Services' },
          { key: 'subscription', label: 'Subscriptions' },
          { key: 'boost', label: 'Social Boosts' },
          { key: 'ad-management', label: 'Ad Management' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            style={{
              padding: '10px 24px',
              borderRadius: '999px',
              border: '1px solid var(--border)',
              background: filter === tab.key ? '#2563eb' : 'var(--bg-card)',
              color: filter === tab.key ? '#fff' : 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Services grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '80px' }}>Loading services...</p>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '48px', marginBottom: '16px' }}>🎬</p>
            <p style={{ fontSize: '18px', fontWeight: 600 }}>No services found</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {filtered.map(service => (
              <div
                key={service._id}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Image */}
                {service.imageUrl ? (
                  <img src={service.imageUrl} alt={service.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '180px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>
                    {service.type === 'subscription' ? '🎬' : service.type === 'boost' ? '📈' : '📣'}
                  </div>
                )}

                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Type badge */}
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{
                      background: typeColor(service.type) + '20',
                      color: typeColor(service.type),
                      padding: '4px 12px',
                      borderRadius: '999px',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em'
                    }}>
                      {typeLabel(service.type)}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>{service.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, marginBottom: '16px', flex: 1 }}>{service.description}</p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                    <p style={{ fontSize: '22px', fontWeight: 900, color: '#3b82f6' }}>
                      ETB {service.price.toLocaleString()}
                    </p>
                    {!service.isAvailable && (
                      <span style={{ background: '#fee2e2', color: '#dc2626', padding: '4px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 700 }}>
                        Unavailable
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                    <button
                      onClick={() => navigate(`/order?service=${service._id}&name=${service.title}`)}
                      disabled={!service.isAvailable}
                      style={{
                        flex: 1,
                        padding: '12px',
                        background: service.isAvailable ? '#2563eb' : '#94a3b8',
                        border: 'none',
                        borderRadius: '10px',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: 700,
                        cursor: service.isAvailable ? 'pointer' : 'not-allowed'
                      }}
                    >
                      {service.isAvailable ? 'Request Service' : 'Unavailable'}
                    </button>
                    
                     <a href="https://t.me/mengistuyeshanbel"
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        padding: '12px 16px',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border)',
                        borderRadius: '10px',
                        color: 'var(--text-secondary)',
                        fontSize: '14px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      💬
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;