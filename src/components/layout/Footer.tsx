import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Youtube, 
  Instagram,
  Twitter,
  Heart
} from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { label: t('nav.appointment'), href: '/appointment' },
    { label: t('quickLinks.reservation'), href: '/reservation' },
    { label: t('quickLinks.youth'), href: '/youth' },
    { label: 'FAQ', href: '/faq' },
    { label: t('hero.support'), href: '/support' },
    { label: t('nav.contact'), href: '/contact' },
  ];

  const extensions = [
    {
      name: 'Betphillah Cathedral',
      address: 'Christian Village Junction Behind Melcom',
      city: 'Kumasi, Ghana',
    },
    {
      name: 'CVSI Accra',
      address: 'Adum Central District',
      city: 'Accra, Ghana',
    },
    {
      name: 'CVSI Takoradi',
      address: 'Market Circle Area',
      city: 'Takoradi, Ghana',
    },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <Youtube className="w-5 h-5" />, href: 'https://youtube.com', label: 'YouTube' },
    { icon: <Instagram className="w-5 h-5" />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <footer className="bg-darkblue-light border-t border-white/10">
      {/* Main Footer */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold/50">
                <img
                  src="/images/logocvs.jpg"
                  alt="CVSI Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-gold font-serif text-lg font-semibold block leading-tight">
                  Christ Vision
                </span>
                <span className="text-white/60 text-xs">
                  Sanctuary Int'l
                </span>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 
                           flex items-center justify-center text-white/60
                           hover:bg-gold hover:text-darkblue hover:border-gold 
                           transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-6">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-gold transition-colors duration-300 
                             text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/50 group-hover:bg-gold transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Extensions */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-lg font-bold text-white mb-6">
              {t('footer.extensions')}
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              {extensions.map((ext) => (
                <div
                  key={ext.name}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 
                           hover:border-gold/30 transition-colors duration-300"
                >
                  <h5 className="text-gold font-semibold text-sm mb-2">
                    {ext.name}
                  </h5>
                  <div className="flex items-start gap-2 text-white/50 text-xs">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                    <span>{ext.address}, {ext.city}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <Phone className="w-4 h-4 text-gold" />
                <span>02462322224 / 0551885588</span>
              </div>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <Mail className="w-4 h-4 text-gold" />
                <span>info@cvsi.org</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm text-center md:text-left">
              Copyright © {new Date().getFullYear()} {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/legal" className="text-white/50 hover:text-gold transition-colors">
                {t('footer.legal')}
              </Link>
              <span className="text-white/20">|</span>
              <Link to="/privacy" className="text-white/50 hover:text-gold transition-colors">
                {t('footer.privacy')}
              </Link>
              <span className="text-white/20">|</span>
              <Link to="/charter" className="text-white/50 hover:text-gold transition-colors">
                {t('footer.charter')}
              </Link>
            </div>
          </div>
          
          {/* Made with love */}
          <p className="text-center text-white/30 text-xs mt-4 flex items-center justify-center gap-1">
            {t('footer.madeWith')} <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
