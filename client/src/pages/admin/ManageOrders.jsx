import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updating, setUpdating] = useState(false);

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

  const deleteOrder = async (id) => {
    if (!window.confirm('Delete this order?')) return;
    try {
      await api.delete(`/orders/${id}`);
      setSelectedOrder(null);
      fetchOrders();
    } catch (err) {
      console.error(err);
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

  const statuses = ['pending', 'confirmed', 'delivered', 'rejected'];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', paddingTop: '80px' }}>

      {/* Top bar */}
      <div style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Link to="/admin/dashboard" style={{ fontSize: '12px', color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>← Dashboard</Link>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>Manage Orders</h1>
        </div>
        <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
          Total: <strong style={{ color: 'var(--text-primary)' }}>{orders.length}</strong> orders
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 32px' }}>

        {/* Order detail modal */}
        {selectedOrder && (
          <div style={{ position: 'fixed', inset: 0, background: '#000000aa', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>Order Details</h2>
                <button onClick={() => setSelectedOrder(null)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: 'var(--text-secondary)' }}>✕</button>
              </div>

              {/* Customer info */}
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Customer Info</p>
                <p style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '16px', marginBottom: '4px' }}>{selectedOrder.customerName}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '4px' }}>📞 {selectedOrder.phone}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>💳 {selectedOrder.paymentMethod}</p>
                {selectedOrder.notes && (
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '8px' }}>📝 {selectedOrder.notes}</p>
                )}
              </div>

              {/* Items */}
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Items Ordered</p>
                {selectedOrder.items && selectedOrder.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < selectedOrder.items.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <span style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: 600 }}>{item.itemName}</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>x{item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Payment proof */}
              {selectedOrder.paymentProofUrl && (
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
                  <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Payment Proof</p>
                  <img src={selectedOrder.paymentProofUrl} alt="Payment proof" style={{ width: '100%', borderRadius: '10px', border: '1px solid var(--border)' }} />
                </div>
              )}

              {/* Update status */}
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Update Status</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {statuses.map(status => {
                    const sc = statusColor(status);
                    const isActive = selectedOrder.status === status;
                    return (
                      <button
                        key={status}
                        onClick={() => updateStatus(selectedOrder._id, status)}
                        disabled={updating || isActive}
                        style={{
                          padding: '10px',
                          borderRadius: '8px',
                          border: isActive ? `2px solid ${sc.color}` : '1px solid var(--border)',
                          background: isActive ? sc.bg : 'var(--bg-primary)',
                          color: isActive ? sc.color : 'var(--text-secondary)',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: isActive ? 'default' : 'pointer',
                          textTransform: 'capitalize'
                        }}
                      >
                        {status}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => deleteOrder(selectedOrder._id)}
                style={{ width: '100%', padding: '12px', background: '#fee2e2', border: 'none', borderRadius: '10px', color: '#dc2626', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}
              >
                Delete Order
              </button>
            </div>
          </div>
        )}

        {/* Orders table */}
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '60px' }}>Loading orders...</p>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '48px', marginBottom: '16px' }}>📦</p>
            <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>No orders yet</p>
            <p style={{ fontSize: '14px' }}>Orders will appear here when customers place them</p>
          </div>
        ) : (
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Customer', 'Phone', 'Type', 'Payment', 'Status', 'Date', 'Action'].map(h => (
                    <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map(order => {
                  const sc = statusColor(order.status);
                  return (
                    <tr key={order._id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '14px 20px', fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px' }}>{order.customerName}</td>
                      <td style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontSize: '14px' }}>{order.phone}</td>
                      <td style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontSize: '14px', textTransform: 'capitalize' }}>{order.orderType}</td>
                      <td style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontSize: '14px' }}>{order.paymentMethod}</td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{ background: sc.bg, color: sc.color, padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, textTransform: 'capitalize' }}>
                          {order.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontSize: '13px' }}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          style={{ padding: '8px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;