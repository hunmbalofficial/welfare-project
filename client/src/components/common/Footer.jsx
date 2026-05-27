import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-primary-400">Hope</span>
              <span className="text-2xl font-bold text-secondary-400">Foundation</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Dedicated to making a positive impact in communities through sustainable welfare programs and humanitarian aid.
            </p>
            <div className="flex space-x-3 mt-6">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Our Projects', path: '/projects' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'News', path: '/news' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-primary-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/donate" className="hover:text-primary-400 transition-colors">Donate Now</Link></li>
              <li><Link to="/contact" className="hover:text-primary-400 transition-colors">Become a Volunteer</Link></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">FAQs</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3 text-gray-400">
              <li>123 Welfare Street, City</li>
              <li>contact@hopefoundation.org</li>
              <li>+1 (555) 123-4567</li>
              <li className="pt-2">
                <Link to="/donate" className="inline-flex items-center space-x-2 bg-primary-600 text-white px-5 py-2.5 rounded-lg hover:bg-primary-700 transition-colors">
                  <FaHeart />
                  <span>Make a Donation</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <p className="text-center text-gray-500 text-sm">
            &copy; {currentYear} Hope Foundation. All rights reserved. Made with <FaHeart className="inline text-red-500" /> for humanity.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
