import { Link } from 'react-router-dom';
import { Sprout, MapPin, Phone, Mail, ArrowRight, Heart, Globe, MessageCircle, Camera, Play } from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Our Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const programs = [
    { name: 'Health Care', path: '/projects' },
    { name: 'Education', path: '/projects' },
    { name: 'Women Empowerment', path: '/projects' },
    { name: 'Food Aid', path: '/projects' },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) alert('Subscribed! (integration pending)');
  };

  return (
    <footer className="relative bg-primary-900 text-primary-200 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary-700/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary-800/30 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/20">
                <Sprout className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display text-xl font-bold text-white tracking-tight">WelfareOrg</span>
            </Link>
            <p className="text-sm leading-relaxed text-primary-300 mb-6 max-w-sm">
              Transforming lives through sustainable welfare programs, education, healthcare, and community development initiatives.
            </p>

            <div className="flex items-center gap-3 mb-8">
              {[
                { icon: Globe, href: '#' },
                { icon: MessageCircle, href: '#' },
                { icon: Camera, href: '#' },
                { icon: Play, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-primary-800/50 border border-primary-700/50 flex items-center justify-center hover:bg-primary-600 hover:border-primary-500 hover:text-white text-primary-400 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>

            <div className="bg-primary-800/40 border border-primary-700/50 rounded-xl p-5 max-w-sm">
              <p className="text-white text-sm font-semibold mb-2">Stay Updated</p>
              <p className="text-primary-300 text-xs mb-3">Get the latest news and updates</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 bg-primary-800/60 border border-primary-700/50 rounded-lg px-3 py-2 text-sm text-white placeholder:text-primary-400 focus:outline-none focus:border-primary-500 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="bg-primary-600 hover:bg-primary-500 text-white rounded-lg px-3 py-2 transition-colors"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <h3 className="font-display text-base font-semibold text-white mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-300 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary-500 group-hover:bg-white transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="font-display text-base font-semibold text-white mb-5">Programs</h3>
            <ul className="space-y-3">
              {programs.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-300 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary-500 group-hover:bg-white transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-display text-base font-semibold text-white mb-5">Get In Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-primary-300">
                <MapPin size={16} className="shrink-0 mt-0.5 text-primary-500" />
                <span>123 Welfare Street, Charity Town, CT 12345</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-300">
                <Phone size={16} className="shrink-0 text-primary-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-300">
                <Mail size={16} className="shrink-0 text-primary-500" />
                <span>contact@welfareorg.org</span>
              </li>
            </ul>

            <div className="mt-6">
              <Link
                to="/donate"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-full px-6 py-3 text-sm font-semibold hover:from-primary-500 hover:to-primary-400 transition-all duration-300 shadow-lg shadow-primary-600/20"
              >
                <Heart size={16} />
                Make a Donation
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-primary-800">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-400">
            &copy; {currentYear} WelfareOrg. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-primary-400">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="w-px h-3 bg-primary-700" />
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="w-px h-3 bg-primary-700" />
            <span className="hover:text-white cursor-pointer transition-colors">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
