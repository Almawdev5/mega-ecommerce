import { Link } from 'react-router-dom';
import { FaTiktok, FaYoutube, FaFacebook, FaInstagram, FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-[#060b18] border-t border-blue-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400 mb-2">MEGA <span className="text-white">TECHNOLOGY</span></h2>
          <p className="text-gray-400 text-sm">Innovation · Connectivity · Future</p>
          <p className="text-gray-400 text-sm mt-3">Your trusted source for electronics and digital services in Ethiopia.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-gray-400 hover:text-blue-400 text-sm transition">Home</Link>
            <Link to="/products" className="text-gray-400 hover:text-blue-400 text-sm transition">Products</Link>
            <Link to="/services" className="text-gray-400 hover:text-blue-400 text-sm transition">Services</Link>
            <Link to="/order" className="text-gray-400 hover:text-blue-400 text-sm transition">Order Now</Link>
            <Link to="/contact" className="text-gray-400 hover:text-blue-400 text-sm transition">Contact</Link>
          </div>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <div className="flex flex-col gap-2 mb-6">
            <a href="tel:0912068580" className="text-gray-400 hover:text-blue-400 text-sm flex items-center gap-2 transition">
              <MdPhone /> 0912068580
            </a>
            <a href="mailto:mengistuyeshanbel@gmail.com" className="text-gray-400 hover:text-blue-400 text-sm flex items-center gap-2 transition">
              <MdEmail /> mengistuyeshanbel@gmail.com
            </a>
            <a href="https://t.me/mengistuyeshanbel" className="text-gray-400 hover:text-blue-400 text-sm flex items-center gap-2 transition">
              <FaTelegram /> @mengistuyeshanbel
            </a>
          </div>

          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://www.tiktok.com/@mengistuyeshanbel" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-400 text-xl transition"><FaTiktok /></a>
            <a href="https://youtube.com/@megatip1" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-red-500 text-xl transition"><FaYoutube /></a>
            <a href="#" className="text-gray-400 hover:text-blue-600 text-xl transition"><FaFacebook /></a>
            <a href="#" className="text-gray-400 hover:text-pink-500 text-xl transition"><FaInstagram /></a>
            <a href="https://wa.me/251912068580" className="text-gray-400 hover:text-green-500 text-xl transition"><FaWhatsapp /></a>
          </div>
        </div>

      </div>

      <div className="border-t border-blue-900 py-4 text-center text-gray-500 text-sm">
        © 2024 Mega Technology. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;