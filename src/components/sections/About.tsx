import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Cross, Heart, Users, BookOpen, Sparkles } from 'lucide-react';

interface StatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

const AnimatedStat = ({ icon, value, label, delay }: StatProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const numericValue = parseInt(value.replace(/\D/g, ''));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;

      const interval = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, numericValue, delay]);

  return (
    <div
      ref={ref}
      className={`text-center transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 border border-gold/30 mb-4">
        {icon}
      </div>
      <div className="font-serif text-4xl lg:text-5xl font-bold text-gold mb-2">
        {value.includes('+') ? `${count}+` : count}
      </div>
      <div className="text-white/60 text-sm">{label}</div>
    </div>
  );
};

const About = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const pillars = [
    {
      icon: <Cross className="w-6 h-6 text-gold" />,
      title: t('about.pillars.healing.title'),
      description: t('about.pillars.healing.desc'),
    },
    {
      icon: <Sparkles className="w-6 h-6 text-gold" />,
      title: t('about.pillars.deliverance.title'),
      description: t('about.pillars.deliverance.desc'),
    },
    {
      icon: <Heart className="w-6 h-6 text-gold" />,
      title: t('about.pillars.restoration.title'),
      description: t('about.pillars.restoration.desc'),
    },
    {
      icon: <BookOpen className="w-6 h-6 text-gold" />,
      title: t('about.pillars.evangelism.title'),
      description: t('about.pillars.evangelism.desc'),
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-darkblue relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Left: Image */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-gold/30 shadow-2xl shadow-gold/10">
                <img
                  src="/images/lev9.jpg"
                  alt="Bishop Louis Macaiah"
                  className="w-full h-[500px] lg:h-[600px] object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darkblue/60 via-transparent to-transparent" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-gold-gradient text-darkblue rounded-2xl p-6 shadow-gold">
                <span className="block text-4xl font-bold font-serif">20+</span>
                <span className="text-sm font-medium">{t('about.stats.years')}</span>
              </div>

              {/* Decorative Frame */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold/50 rounded-tl-3xl" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gold/50 rounded-br-3xl" />
            </div>
          </div>

          {/* Right: Content */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            {/* Section Label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-medium tracking-wider uppercase">
                {t('about.title')}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-6">
              Christ Vision
              <span className="text-gradient-gold block">Sanctuary International</span>
            </h2>

            {/* Description */}
            <div className="space-y-4 text-white/70 leading-relaxed mb-8">
              <p>
                {t('about.description')}
              </p>
              <p>
                {t('about.mission')}
              </p>
            </div>

            {/* Quote */}
            <blockquote className="border-l-4 border-gold pl-6 py-2 mb-8">
              <p className="text-gold-light italic text-lg">
                "{t('about.quote')}"
              </p>
              <cite className="text-white/50 text-sm mt-2 block">
                — Bishop Louis Macaiah
              </cite>
            </blockquote>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 py-12 border-y border-white/10">
          <AnimatedStat
            icon={<Users className="w-6 h-6 text-gold" />}
            value="5000+"
            label={t('about.stats.members')}
            delay={0}
          />
          <AnimatedStat
            icon={<Cross className="w-6 h-6 text-gold" />}
            value="50+"
            label={t('about.stats.branches')}
            delay={200}
          />
          <AnimatedStat
            icon={<Heart className="w-6 h-6 text-gold" />}
            value="10000+"
            label={t('about.stats.lives')}
            delay={400}
          />
          <AnimatedStat
            icon={<BookOpen className="w-6 h-6 text-gold" />}
            value="20+"
            label={t('about.stats.years')}
            delay={600}
          />
        </div>

        {/* Pillars Section */}
        <div id="pillars">
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-4">
              {t('about.pillars.title')}
            </h3>
            <div className="w-20 h-1 bg-gold-gradient mx-auto rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className={`group bg-darkblue-light/50 rounded-2xl p-6 border border-white/10 
                         hover:border-gold/30 transition-all duration-500
                         hover:shadow-lg hover:shadow-gold/10 hover:-translate-y-2
                         ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${800 + index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl 
                              bg-gold/10 border border-gold/30 mb-4
                              group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300">
                  {pillar.icon}
                </div>
                <h4 className="font-serif text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
