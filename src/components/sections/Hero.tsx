import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Heart, ChevronRight, Sparkles } from 'lucide-react';

const Hero = () => {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;
      
      const bgElement = heroRef.current.querySelector('.parallax-bg') as HTMLElement;
      if (bgElement) {
        bgElement.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="parallax-bg absolute inset-0 scale-110 transition-transform duration-300 ease-out"
          style={{
            backgroundImage: `url('/images/lev9.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-darkblue/90 via-darkblue/70 to-darkblue" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 via-transparent to-darkblue/60" />
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gold/40 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-medium tracking-wider uppercase">
              {t('hero.welcome')}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
            <span className="block">Christ Vision</span>
            <span className="block text-gradient-gold mt-2">Sanctuary</span>
            <span className="block text-3xl sm:text-4xl md:text-5xl mt-3 text-white/90">
              International
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/80 mb-4 italic animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {t('hero.subtitle')}
          </p>

          {/* Scripture */}
          <p className="text-gold-light/90 text-base sm:text-lg mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.3s' }}>
            "{t('hero.verse')}"
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Link to="/support">
              <Button
                size="lg"
                className="bg-gold-gradient text-darkblue font-bold px-8 py-6 rounded-full
                         hover:shadow-gold hover:scale-105 transition-all duration-300
                         text-base sm:text-lg group"
              >
                <Heart className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                {t('hero.support')}
              </Button>
            </Link>
            <Link to="/program">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gold/50 text-gold hover:bg-gold/10 
                         px-8 py-6 rounded-full transition-all duration-300
                         text-base sm:text-lg group"
              >
                {t('hero.program')}
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Bishop Info */}
          <div className="mt-16 flex items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold/50">
              <img
                src="/images/pro1.jpg"
                alt="Bishop Louis Macaiah"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <p className="text-gold font-semibold">Bishop Louis Macaiah</p>
              <p className="text-white/60 text-sm">{t('about.stats.years')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-darkblue to-transparent" />
    </section>
  );
};

export default Hero;
