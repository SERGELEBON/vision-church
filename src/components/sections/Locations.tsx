import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, ChevronLeft, ChevronRight, Navigation } from 'lucide-react';

interface Location {
  id: number;
  name: string;
  address: string;
  city: string;
  image: string;
  phone?: string;
}

const Locations = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const locations: Location[] = [
    {
      id: 1,
      name: 'Betphillah Cathedral',
      address: 'Christian Village Junction Behind Melcom',
      city: 'Kumasi, Ghana',
      image: '/images/eve1.jpg',
      phone: '02462322224',
    },
    {
      id: 2,
      name: 'CVSI Accra',
      address: 'Adum Central District',
      city: 'Accra, Ghana',
      image: '/images/eve3.jpg',
      phone: '0551885588',
    },
    {
      id: 3,
      name: 'CVSI Takoradi',
      address: 'Market Circle Area',
      city: 'Takoradi, Ghana',
      image: '/images/lev9.jpg',
      phone: '0244377540',
    },
    {
      id: 4,
      name: 'CVSI International',
      address: 'Coming Soon',
      city: 'London, UK',
      image: '/images/pro1.jpg',
    },
  ];

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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % locations.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + locations.length) % locations.length);
  };

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-darkblue relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
            <Navigation className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-medium tracking-wider uppercase">
              {t('footer.extensions')}
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            {t('locations.title')}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            <span className="text-gold font-semibold">{locations.length} {t('locations.centers')}</span>{' '}
            {t('locations.subtitle')}
          </p>
        </div>

        {/* Carousel */}
        <div
          className={`relative transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Main Display */}
          <div className="relative overflow-hidden rounded-3xl border border-gold/20">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {locations.map((location) => (
                <div
                  key={location.id}
                  className="w-full flex-shrink-0 relative h-[400px] lg:h-[500px]"
                >
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-darkblue via-darkblue/50 to-transparent" />
                  
                  {/* Location Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                    <div className="max-w-2xl">
                      <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-2">
                        {location.name}
                      </h3>
                      <div className="flex items-start gap-2 text-white/70 mb-1">
                        <MapPin className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                        <span>{location.address}</span>
                      </div>
                      <p className="text-gold-light ml-7">{location.city}</p>
                      {location.phone && (
                        <p className="text-white/60 ml-7 text-sm mt-1">
                          {t('contact.coordinates')}: {location.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full 
                       bg-darkblue/80 backdrop-blur-sm border border-gold/30
                       flex items-center justify-center text-gold
                       hover:bg-gold hover:text-darkblue transition-all duration-300"
              aria-label="Previous location"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full 
                       bg-darkblue/80 backdrop-blur-sm border border-gold/30
                       flex items-center justify-center text-gold
                       hover:bg-gold hover:text-darkblue transition-all duration-300"
              aria-label="Next location"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {locations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gold w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Location Names */}
          <div className="flex justify-center gap-4 lg:gap-8 mt-8 flex-wrap">
            {locations.map((location, index) => (
              <button
                key={location.id}
                onClick={() => setCurrentIndex(index)}
                className={`text-sm font-medium transition-colors duration-300 ${
                  index === currentIndex
                    ? 'text-gold'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                {location.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;
