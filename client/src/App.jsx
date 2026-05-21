import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Services from './pages/Services';
import Order from './pages/Order';
import Contact from './pages/Contact';

import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageServices from './pages/admin/ManageServices';
import ManageOrders from './pages/admin/ManageOrders';
import ManagePayments from './pages/admin/ManagePayments';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/order" element={<Order />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<ManageProducts />} />
            <Route path="/admin/services" element={<ManageServices />} />
            <Route path="/admin/orders" element={<ManageOrders />} />
            <Route path="/admin/payments" element={<ManagePayments />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;