import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editService, setEditService] = useState(null);
  const [formData, setFormData] = useState({
    title: '', type: '', platform: '', description: '', price: '', isAvailable: true
  });
  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

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

  const openAdd = () => {
    setEditService(null);
    setFormData({ title: '', type: '', platform: '', description: '', price: '', isAvailable: true });
    setImage(null);
    setShowForm(true);
  };

  const openEdit = (service) => {
    setEditService(service);
    setFormData({
      title: service.title,
      type: service.type,
      platform: service.platform,
      description: service.description,
      price: service.price,
      isAvailable: service.isAvailable
    });
    setImage(null);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('title', formData.title);
      fd.append('type', formData.type);
      fd.append('platform', formData.platform);
      fd.append('description', formData.description);
      fd.append('price', formData.price);
      fd.append('isAvailable', formData.isAvailable);
      if (image) fd.append('image', image);

      if (editService) {
        await api.put(`/services/${editService._id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/services', fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      setShowForm(false);
      fetchServices();
    } catch (err) {
      setError('Failed to save service. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      await api.delete(`/services/${id}`);
      fetchServices();
    } catch (err) {
      console.error(err);
    }
  };

  const typeColor = (type) => {
    switch (type) {
      case 'subscription': return { bg: '#dbeafe', color: '#2563eb' };
      case 'boost': return { bg: '#f3e8ff', color: '#7c3aed' };
      case 'ad-management': return { bg: '#dcfce7', color: '#16a34a' };
      default: return { bg: '#f1f5f9', color: '#64748b' };
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', paddingTop: '80px' }}>

      {/* Top bar */}
      <div style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Link to="/admin/dashboard" style={{ fontSize: '12px', color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>← Dashboard</Link>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>Manage Services</h1>
        </div>
        <button onClick={openAdd} style={{ padding: '12px 24px', background: '#2563eb', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
          + Add Service
        </button>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 32px' }}>

        {/* Form Modal */}
        {showForm && (
          <div style={{ position: 'fixed', inset: 0, background: '#000000aa', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>{editService ? 'Edit Service' : 'Add Service'}</h2>
                <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: 'var(--text-secondary)' }}>✕</button>
              </div>

              {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}

              <form onSubmit={handleSubmit}>
                {[
                  { label: 'Service Title', key: 'title', placeholder: 'e.g. Netflix Premium' },
                  { label: 'Platform', key: 'platform', placeholder: 'e.g. Netflix' },
                  { label: 'Price (ETB)', key: 'price', placeholder: 'e.g. 500', type: 'number' },
                ].map(field => (
                  <div key={field.key} style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>{field.label}</label>
                    <input
                      type={field.type || 'text'}
                      value={formData[field.key]}
                      onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      required
                      style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                ))}

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Service Type</label>
                  <select
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    required
                    style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none' }}
                  >
                    <option value="">Select type</option>
                    <option value="subscription">Subscription</option>
                    <option value="boost">Social Media Boost</option>
                    <option value="ad-management">Ad Management</option>
                  </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Description</label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Service description..."
                    required
                    rows={3}
                    style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Service Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => setImage(e.target.files[0])}
                    style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '14px' }}
                  />
                </div>

                <div style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    checked={formData.isAvailable}
                    onChange={e => setFormData({ ...formData, isAvailable: e.target.checked })}
                    id="isAvailable"
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="isAvailable" style={{ fontSize: '14px', color: 'var(--text-secondary)', cursor: 'pointer' }}>Available</label>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="button" onClick={() => setShowForm(false)} style={{ flex: 1, padding: '14px', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} style={{ flex: 1, padding: '14px', background: '#2563eb', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '14px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer' }}>
                    {saving ? 'Saving...' : editService ? 'Update' : 'Add Service'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Services Table */}
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '60px' }}>Loading services...</p>
        ) : services.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '48px', marginBottom: '16px' }}>🎬</p>
            <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>No services yet</p>
            <p style={{ fontSize: '14px' }}>Click "Add Service" to get started</p>
          </div>
        ) : (
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Title', 'Type', 'Platform', 'Price', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {services.map(service => {
                  const tc = typeColor(service.type);
                  return (
                    <tr key={service._id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '14px 20px', fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px' }}>{service.title}</td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{ background: tc.bg, color: tc.color, padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, textTransform: 'capitalize' }}>
                          {service.type}
                        </span>
                      </td>
                      <td style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontSize: '14px' }}>{service.platform}</td>
                      <td style={{ padding: '14px 20px', color: '#3b82f6', fontWeight: 700, fontSize: '14px' }}>ETB {service.price.toLocaleString()}</td>
                      <td style={{ padding: '14px 20px' }}>
                        <span style={{ background: service.isAvailable ? '#dcfce7' : '#fee2e2', color: service.isAvailable ? '#16a34a' : '#dc2626', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 700 }}>
                          {service.isAvailable ? 'Available' : 'Unavailable'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => openEdit(service)} style={{ padding: '8px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Edit</button>
                          <button onClick={() => handleDelete(service._id)} style={{ padding: '8px 16px', background: '#fee2e2', border: 'none', borderRadius: '8px', color: '#dc2626', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Delete</button>
                        </div>
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

export default ManageServices;