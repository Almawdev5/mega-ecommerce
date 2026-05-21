import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const ManagePayments = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [filter, setFilter] = useState('all');

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders');
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    setUpdating(true);
    try {
      await api.put(`/orders/${id}`, { status });
      fetchOrders();
      if (selectedOrder && selectedOrder._id === id) {
        setSelectedOrder({ ...selectedOrder, status });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case 'pending': return { bg: '#fef3c7', color: '#d97706' };
      case 'confirmed': return { bg: '#dbeafe', color: '#2563eb' };
      case 'delivered': return { bg: '#dcfce7', color: '#16a34a' };
      case 'rejected': return { bg: '#fee2e2', color: '#dc2626' };
      default: return { bg: '#f1f5f9', color: '#64748b' };
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'with-proof') return order.paymentProofUrl;
    if (filter === 'without-proof') return !order.paymentProofUrl;
    return order.status === filter;
  });

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', paddingTop: '80px' }}>

      {/* Top bar */}
      <div style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Link to="/admin/dashboard" style={{ fontSize: '12px', color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>← Dashboard</Link>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>Payment Proofs</h1>
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          {orders.filter(o => o.paymentProofUrl).length} proofs uploaded
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 32px' }}>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {[
            { key: 'all', label: 'All Orders' },
            { key: 'with-proof', label: 'With Proof' },
            { key: 'pending', label: 'Pending' },
            { key: 'confirmed', label: 'Confirmed' },
            { key: 'rejected', label: 'Rejected' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              style={{
                padding: '8px 20px',
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

        {/* Payment proof modal */}
        {selectedOrder && (
          <div style={{ position: 'fixed', inset: 0, background: '#000000aa', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>Payment Proof</h2>
                <button onClick={() => setSelectedOrder(null)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: 'var(--text-secondary)' }}>✕</button>
              </div>

              {/* Customer info */}
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
                <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '16px', marginBottom: '4px' }}>{selectedOrder.customerName}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px' }}>📞 {selectedOrder.phone}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px' }}>💳 {selectedOrder.paymentMethod}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                  {new Date(selectedOrder.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Payment screenshot */}
              {selectedOrder.paymentProofUrl ? (
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Screenshot</p>
                  <img
                    src={selectedOrder.paymentProofUrl}
                    alt="Payment proof"
                    style={{ width: '100%', borderRadius: '12px', border: '1px solid var(--border)' }}
                  />
                </div>
              ) : (
                <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '12px', padding: '20px', marginBottom: '20px', textAlign: 'center' }}>
                  <p style={{ color: '#d97706', fontWeight: 600, fontSize: '14px' }}>⚠️ No payment proof uploaded yet</p>
                </div>
              )}

              {/* Current status */}
              <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Current status:</p>
                <span style={{
                  background: statusColor(selectedOrder.status).bg,
                  color: statusColor(selectedOrder.status).color,
                  padding: '4px 12px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'capitalize'
                }}>
                  {selectedOrder.status}
                </span>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  onClick={() => updateStatus(selectedOrder._id, 'confirmed')}
                  disabled={updating || selectedOrder.status === 'confirmed'}
                  style={{
                    padding: '14px',
                    background: selectedOrder.status === 'confirmed' ? '#dcfce7' : '#16a34a',
                    border: 'none',
                    borderRadius: '10px',
                    color: selectedOrder.status === 'confirmed' ? '#16a34a' : '#fff',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: updating || selectedOrder.status === 'confirmed' ? 'not-allowed' : 'pointer'
                  }}
                >
                  ✓ Verify Payment
                </button>
                <button
                  onClick={() => updateStatus(selectedOrder._id, 'rejected')}
                  disabled={updating || selectedOrder.status === 'rejected'}
                  style={{
                    padding: '14px',
                    background: selectedOrder.status === 'rejected' ? '#fee2e2' : '#dc2626',
                    border: 'none',
                    borderRadius: '10px',
                    color: selectedOrder.status === 'rejected' ? '#dc2626' : '#fff',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: updating || selectedOrder.status === 'rejected' ? 'not-allowed' : 'pointer'
                  }}
                >
                  ✕ Reject Payment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Orders grid */}
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '60px' }}>Loading...</p>
        ) : filteredOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '48px', marginBottom: '16px' }}>💳</p>
            <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>No orders found</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
            {filteredOrders.map(order => {
              const sc = statusColor(order.status);
              return (
                <div
                  key={order._id}
                  onClick={() => setSelectedOrder(order)}
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer'
                  }}
                >
                  {/* Payment proof thumbnail */}
                  {order.paymentProofUrl ? (
                    <img
                      src={order.paymentProofUrl}
                      alt="Payment"
                      style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '160px', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>No proof uploaded</p>
                    </div>
                  )}

                  <div style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '15px' }}>{order.customerName}</p>
                      <span style={{ background: sc.bg, color: sc.color, padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 700, textTransform: 'capitalize' }}>
                        {order.status}
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '4px' }}>📞 {order.phone}</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>💳 {order.paymentMethod}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePayments;