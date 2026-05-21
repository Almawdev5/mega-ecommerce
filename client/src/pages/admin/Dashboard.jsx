import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';

const Dashboard = () => {
  const { adminToken, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ products: 0, services: 0, orders: 0, pending: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!adminToken) { navigate('/admin'); return; }
    fetchStats();
  }, [adminToken]);

  const fetchStats = async () => {
    try {
      const [productsRes, servicesRes, ordersRes] = await Promise.all([
        api.get('/products'),
        api.get('/services'),
        api.get('/orders')
      ]);
      const orders = ordersRes.data;
      setStats({
        products: productsRes.data.length,
        services: servicesRes.data.length,
        orders: orders.length,
        pending: orders.filter(o => o.status === 'pending').length
      });
      setRecentOrders(orders.slice(0, 5));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => { logout(); navigate('/'); };

  const statusColor = (status) => {
    switch (status) {
      case 'pending': return { bg: '#fef3c7', color: '#d97706' };
      case 'confirmed': return { bg: '#dbeafe', color: '#2563eb' };
      case 'delivered': return { bg: '#dcfce7', color: '#16a34a' };
      case 'rejected': return { bg: '#fee2e2', color: '#dc2626' };
      default: return { bg: '#f1f5f9', color: '#64748b' };
    }
  };

  const navItems = [
    { label: 'Dashboard', icon: '🏠', link: '/admin/dashboard', active: true },
    { label: 'Products', icon: '📱', link: '/admin/products', active: false },
    { label: 'Services', icon: '🎬', link: '/admin/services', active: false },
    { label: 'Orders', icon: '📦', link: '/admin/orders', active: false },
    { label: 'Payments', icon: '💳', link: '/admin/payments', active: false },
  ];

  const statCards = [
    { label: 'Total Products', value: stats.products, icon: '📱', color: '#2563eb' },
    { label: 'Total Services', value: stats.services, icon: '🎬', color: '#7c3aed' },
    { label: 'Total Orders', value: stats.orders, icon: '📦', color: '#0891b2' },
    { label: 'Pending Orders', value: stats.pending, icon: '⏳', color: '#dc2626' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)', paddingTop: '72px' }}>

      {/* Sidebar */}
      <aside style={{
        width: '240px',
        minHeight: 'calc(100vh - 72px)',
        backgroundColor: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: '72px',
        left: 0,
        bottom: 0,
        zIndex: 40
      }}>
        {/* Admin info */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', marginBottom: '12px' }}>
            👤
          </div>
          <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '14px' }}>megatech_admin</p>
          <p style={{ color: '#3b82f6', fontSize: '12px', marginTop: '2px' }}>Administrator</p>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {navItems.map(item => (
            <Link
              key={item.link}
              to={item.link}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '10px',
                textDecoration: 'none',
                color: item.active ? '#fff' : 'var(--text-secondary)',
                background: item.active ? '#2563eb' : 'transparent',
                fontWeight: 600,
                fontSize: '14px',
                marginBottom: '4px'
              }}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom actions */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid var(--border)' }}>
          <Link
            to="/"
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 14px', borderRadius: '10px', textDecoration: 'none',
              color: 'var(--text-secondary)', fontWeight: 600, fontSize: '14px', marginBottom: '4px'
            }}
          >
            <span>🌐</span> View Site
          </Link>
          <button
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
              padding: '12px 14px', borderRadius: '10px', border: 'none',
              background: '#fee2e2', color: '#dc2626', fontWeight: 600,
              fontSize: '14px', cursor: 'pointer', textAlign: 'left'
            }}
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: '240px', flex: 1, padding: '40px 32px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '11px', color: '#3b82f6', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '6px' }}>Admin Panel</p>
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)' }}>Dashboard</h1>
        </div>

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '40px' }}>
          {statCards.map(card => (
            <div key={card.label} style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: card.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
                {card.icon}
              </div>
              <div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>{card.label}</p>
                <p style={{ fontSize: '28px', fontWeight: 900, color: card.color }}>{loading ? '...' : card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent orders */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>Recent Orders</h2>
            <Link to="/admin/orders" style={{ fontSize: '13px', color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>View All →</Link>
          </div>
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
            {loading ? (
              <p style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading...</p>
            ) : recentOrders.length === 0 ? (
              <p style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>No orders yet.</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border)' }}>
                    {['Customer', 'Phone', 'Payment', 'Status', 'Date'].map(h => (
                      <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => {
                    const sc = statusColor(order.status);
                    return (
                      <tr key={order._id} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '16px 20px', fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px' }}>{order.customerName}</td>
                        <td style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontSize: '14px' }}>{order.phone}</td>
                        <td style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontSize: '14px' }}>{order.paymentMethod}</td>
                        <td style={{ padding: '16px 20px' }}>
                          <span style={{ background: sc.bg, color: sc.color, padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, textTransform: 'capitalize' }}>
                            {order.status}
                          </span>
                        </td>
                        <td style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;