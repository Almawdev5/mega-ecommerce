import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '', category: '', description: '', price: '', inStock: true
  });
  const [image, setImage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    setEditProduct(null);
    setFormData({ name: '', category: '', description: '', price: '', inStock: true });
    setImage(null);
    setShowForm(true);
  };

  const openEdit = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      inStock: product.inStock
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
      fd.append('name', formData.name);
      fd.append('category', formData.category);
      fd.append('description', formData.description);
      fd.append('price', formData.price);
      fd.append('inStock', formData.inStock);
      if (image) fd.append('image', image);

      if (editProduct) {
        await api.put(`/products/${editProduct._id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/products', fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      setError('Failed to save product. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleStock = async (product) => {
    try {
      await api.put(`/products/${product._id}`, { inStock: !product.inStock });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', paddingTop: '80px' }}>

      {/* Top bar */}
      <div style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Link to="/admin/dashboard" style={{ fontSize: '12px', color: '#3b82f6', textDecoration: 'none', fontWeight: 600 }}>← Dashboard</Link>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text-primary)', marginTop: '4px' }}>Manage Products</h1>
        </div>
        <button onClick={openAdd} style={{ padding: '12px 24px', background: '#2563eb', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '14px', fontWeight: 700, cursor: 'pointer' }}>
          + Add Product
        </button>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 32px' }}>

        {/* Form Modal */}
        {showForm && (
          <div style={{ position: 'fixed', inset: 0, background: '#000000aa', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
            <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '520px', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>{editProduct ? 'Edit Product' : 'Add Product'}</h2>
                <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: 'var(--text-secondary)' }}>✕</button>
              </div>

              {error && <div style={{ background: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}

              <form onSubmit={handleSubmit}>
                {[
                  { label: 'Product Name', key: 'name', type: 'text', placeholder: 'e.g. Samsung Galaxy S24' },
                  { label: 'Price (ETB)', key: 'price', type: 'number', placeholder: 'e.g. 45000' },
                ].map(field => (
                  <div key={field.key} style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>{field.label}</label>
                    <input
                      type={field.type}
                      value={formData[field.key]}
                      onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      required
                      style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                ))}

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    required
                    style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none' }}
                  >
                    <option value="">Select category</option>
                    <option>Mobile Phones</option>
                    <option>Smart Watches</option>
                    <option>Tablets</option>
                    <option>Accessories</option>
                  </select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Description</label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Product description..."
                    required
                    rows={3}
                    style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-primary)', fontSize: '14px', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Product Image</label>
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
                    checked={formData.inStock}
                    onChange={e => setFormData({ ...formData, inStock: e.target.checked })}
                    id="inStock"
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="inStock" style={{ fontSize: '14px', color: 'var(--text-secondary)', cursor: 'pointer' }}>In Stock</label>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="button" onClick={() => setShowForm(false)} style={{ flex: 1, padding: '14px', background: 'var(--bg-primary)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                    Cancel
                  </button>
                  <button type="submit" disabled={saving} style={{ flex: 1, padding: '14px', background: '#2563eb', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '14px', fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer' }}>
                    {saving ? 'Saving...' : editProduct ? 'Update' : 'Add Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Products Table */}
        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '60px' }}>Loading products...</p>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '48px', marginBottom: '16px' }}>📦</p>
            <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>No products yet</p>
            <p style={{ fontSize: '14px' }}>Click "Add Product" to get started</p>
          </div>
        ) : (
          <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Image', 'Name', 'Category', 'Price', 'Stock', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '14px 20px' }}>
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border)' }} />
                      ) : (
                        <div style={{ width: '48px', height: '48px', background: 'var(--bg-secondary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📱</div>
                      )}
                    </td>
                    <td style={{ padding: '14px 20px', fontWeight: 600, color: 'var(--text-primary)', fontSize: '14px' }}>{product.name}</td>
                    <td style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontSize: '14px' }}>{product.category}</td>
                    <td style={{ padding: '14px 20px', color: '#3b82f6', fontWeight: 700, fontSize: '14px' }}>ETB {product.price.toLocaleString()}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <button onClick={() => toggleStock(product)} style={{ padding: '4px 12px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 700, background: product.inStock ? '#dcfce7' : '#fee2e2', color: product.inStock ? '#16a34a' : '#dc2626' }}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </button>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => openEdit(product)} style={{ padding: '8px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Edit</button>
                        <button onClick={() => handleDelete(product._id)} style={{ padding: '8px 16px', background: '#fee2e2', border: 'none', borderRadius: '8px', color: '#dc2626', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProducts;