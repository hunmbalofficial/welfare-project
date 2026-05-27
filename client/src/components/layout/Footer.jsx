import { Link } from 'react-router-dom';
import { Sprout, Globe, MessageCircle, Camera, Play, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Programs', path: '/programs' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const programs = [
    { name: 'Health Care', path: '/programs/health' },
    { name: 'Education', path: '/programs/education' },
    { name: 'Women Empowerment', path: '/programs/women' },
    { name: 'Food Aid', path: '/programs/food' },
    { name: 'Legal Help', path: '/programs/legal' },
  ];

  return (
    <footer className="bg-primary-900 text-primary-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Sprout className="w-6 h-6 text-white" strokeWidth={2} />
              <span className="font-display text-xl font-bold text-white tracking-tight">
                WelfareOrg
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Dedicated to making a positive impact in communities through sustainable welfare programs and humanitarian aid.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full border border-primary-200/30 flex items-center justify-center hover:border-white hover:text-white transition-colors">
                <Globe size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-primary-200/30 flex items-center justify-center hover:border-white hover:text-white transition-colors">
                <MessageCircle size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-primary-200/30 flex items-center justify-center hover:border-white hover:text-white transition-colors">
                <Camera size={16} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full border border-primary-200/30 flex items-center justify-center hover:border-white hover:text-white transition-colors">
                <Play size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-5">
              Our Programs
            </h3>
            <ul className="space-y-3">
              {programs.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-white mb-5">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-2 text-sm">
                <MapPin size={16} className="shrink-0 mt-0.5" />
                <span>123 Welfare Street, Charity Town, CT 12345</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone size={16} className="shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail size={16} className="shrink-0" />
                <span>contact@welfareorg.org</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-primary-800 border-t border-primary-700">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-primary-200">
            &copy; {currentYear} WelfareOrg. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-primary-200">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="w-px h-4 bg-primary-600" />
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
