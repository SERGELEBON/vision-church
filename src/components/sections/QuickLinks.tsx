import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Heart, 
  Phone, 
  ShoppingBag, 
  Clock,
  ArrowRight 
} from 'lucide-react';

const QuickLinks = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const quickLinks = [
    {
      title: t('quickLinks.weeklyProgram'),
      subtitle: t('quickLinks.weeklyProgram'),
      icon: <Calendar className="w-8 h-8" />,
      href: '/program',
      bgImage: '/images/eve1.jpg',
    },
    {
      title: t('quickLinks.departments'),
      subtitle: t('quickLinks.departments'),
      icon: <Users className="w-8 h-8" />,
      href: '/departments',
      bgImage: '/images/eve3.jpg',
    },
    {
      title: t('quickLinks.youth'),
      subtitle: t('quickLinks.youth'),
      icon: <Clock className="w-8 h-8" />,
      href: '/youth',
      bgImage: '/images/lev9.jpg',
    },
    {
      title: t('quickLinks.support'),
      subtitle: t('quickLinks.support'),
      icon: <Heart className="w-8 h-8" />,
      href: '/support',
      bgImage: '/images/pro1.jpg',
    },
    {
      title: t('quickLinks.appointment'),
      subtitle: t('quickLinks.appointment'),
      icon: <Phone className="w-8 h-8" />,
      href: '/appointment',
      bgImage: '/images/lev9.jpg',
    },
    {
      title: t('quickLinks.reservation'),
      subtitle: t('quickLinks.reservation'),
      icon: <ShoppingBag className="w-8 h-8" />,
      href: '/reservation',
      bgImage: '/images/eve1.jpg',
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-darkblue relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-darkblue via-purple-900/5 to-darkblue" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            {t('quickLinks.title')}
          </h2>
          <div className="w-24 h-1 bg-gold-gradient mx-auto rounded-full" />
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => (
            <Link
              key={link.title}
              to={link.href}
              className={`group relative h-64 rounded-2xl overflow-hidden border border-white/10 
                        hover:border-gold/40 transition-all duration-500
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Background Image */}
              {link.bgImage && (
                <div className="absolute inset-0">
                  <img
                    src={link.bgImage}
                    alt={link.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-darkblue/80 group-hover:bg-darkblue/70 transition-colors duration-300" />
                </div>
              )}

              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full 
                              bg-gold/10 border border-gold/30 text-gold mb-4
                              group-hover:bg-gold group-hover:text-darkblue 
                              group-hover:scale-110 transition-all duration-300">
                  {link.icon}
                </div>

                {/* Text */}
                <h3 className="font-serif text-xl font-bold text-white mb-2 
                             group-hover:text-gold transition-colors duration-300">
                  {link.title}
                </h3>

                {/* Arrow */}
                <div className="flex items-center gap-2 text-gold opacity-0 group-hover:opacity-100 
                              transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-sm font-medium">{t('common.discover')}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-gold/10 via-transparent to-transparent" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
