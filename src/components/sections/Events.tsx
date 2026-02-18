import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, ArrowRight, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Event {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string;
  month: string;
  day: string;
  featured?: boolean;
}

const Events = () => {
  const { t } = useTranslation();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const events: Event[] = [
    {
      id: 1,
      title: t('calendar.events.calendarTitle') || 'LE TEMPS DE LA MISSION',
      subtitle: 'BIENVENUE EN 2026 !',
      description: 'Nous entrons dans l\'année du temps de la mission, une année marquée par l\'obéissance, la puissance du Saint-Esprit et l\'engagement à répondre à l\'appel divin.',
      date: 'Toute l\'année 2026',
      time: '',
      location: 'Betphillah Cathedral',
      image: '/images/eve1.jpg',
      month: '2026',
      day: t('calendar.calendarTitle')?.split(' ')[0] || 'ANNÉE',
      featured: true,
    },
    {
      id: 2,
      title: 'TRANSITION PROPHÉTIQUE',
      subtitle: 'Bon mois de Février !',
      description: 'Un mois de transition prophétique où nous recevons de nouvelles instructions pour l\'année.',
      date: 'Février 2026',
      time: '',
      location: 'CVSI Main Auditorium',
      image: '/images/eve3.jpg',
      month: 'FÉV',
      day: '01',
    },
    {
      id: 3,
      title: t('calendar.events.mensWorship'),
      subtitle: 'Jeudi 26 février',
      description: 'Culte spécialement dédié aux hommes. Un moment de partage, de prière et d\'édification.',
      date: 'Jeudi 26 Février',
      time: '18h00',
      location: 'CVSI Main Auditorium',
      image: '/images/lev9.jpg',
      month: 'FÉV',
      day: '26',
    },
    {
      id: 4,
      title: t('calendar.events.faf'),
      subtitle: 'Le FAF',
      description: 'Notre événement de jeunesse où le fer aiguise le fer ! Un moment puissant pour la nouvelle génération.',
      date: 'Samedi 28 Février',
      time: '15h00',
      location: 'Youth Center',
      image: '/images/pro1.jpg',
      month: 'FÉV',
      day: '28',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-darkblue relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
            <Flame className="w-4 h-4 text-gold" />
            <span className="text-gold text-sm font-medium tracking-wider uppercase">
              {t('events.featured')}
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t('events.title')}
          </h2>
          <div className="w-24 h-1 bg-gold-gradient mx-auto rounded-full" />
        </div>

        {/* Featured Event */}
        <div className="mb-12">
          <div
            className="group relative bg-gradient-to-br from-purple-900/40 to-darkblue-light/60 
                       rounded-3xl overflow-hidden border border-gold/20 hover:border-gold/40 
                       transition-all duration-500 cursor-pointer"
            onClick={() => setSelectedEvent(events[0])}
          >
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <img
                  src={events[0].image}
                  alt={events[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-darkblue/80 lg:bg-gradient-to-l" />
                
                {/* Date Badge */}
                <div className="absolute top-6 left-6 bg-gold-gradient text-darkblue rounded-2xl p-4 text-center shadow-gold">
                  <span className="block text-xs font-bold uppercase tracking-wider">{events[0].month}</span>
                  <span className="block text-2xl font-bold">{events[0].day}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <span className="text-gold text-sm font-medium tracking-wider uppercase mb-3">
                  {t('events.featured')}
                </span>
                <h3 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-2">
                  {events[0].title}
                </h3>
                <h4 className="text-xl lg:text-2xl text-gold-light mb-4">
                  {events[0].subtitle}
                </h4>
                <p className="text-white/70 mb-6 leading-relaxed">
                  {events[0].description}
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-white/60">
                    <MapPin className="w-4 h-4 text-gold" />
                    <span className="text-sm">{events[0].location}</span>
                  </div>
                </div>
                <Button
                  className="w-fit bg-gold-gradient text-darkblue font-semibold px-6 py-3 rounded-full
                           hover:shadow-gold transition-all duration-300 group/btn"
                >
                  {t('events.learnMore')}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(1).map((event) => (
            <div
              key={event.id}
              className="group bg-darkblue-light/50 rounded-2xl overflow-hidden border border-white/10 
                       hover:border-gold/30 transition-all duration-500 cursor-pointer
                       hover:shadow-lg hover:shadow-gold/10"
              onClick={() => setSelectedEvent(event)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-darkblue-light to-transparent" />
                
                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-gold-gradient text-darkblue rounded-xl p-3 text-center shadow-gold">
                  <span className="block text-xs font-bold uppercase">{event.month}</span>
                  <span className="block text-xl font-bold">{event.day}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                  {event.title}
                </h3>
                <p className="text-gold-light text-sm mb-3">{event.subtitle}</p>
                <div className="flex flex-wrap gap-3 text-white/60 text-sm">
                  {event.time && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gold" />
                      <span>{event.time}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gold" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/calendar">
            <Button
              variant="outline"
              className="border-2 border-gold/50 text-gold hover:bg-gold/10 
                       px-8 py-3 rounded-full transition-all duration-300"
            >
              <Calendar className="w-4 h-4 mr-2" />
              {t('events.viewAll')}
            </Button>
          </Link>
        </div>
      </div>

      {/* Event Detail Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="bg-darkblue-light border-gold/30 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-white">
              {selectedEvent?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="mt-4">
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              <h4 className="text-gold-light text-lg mb-4">{selectedEvent.subtitle}</h4>
              <p className="text-white/70 mb-6 leading-relaxed">
                {selectedEvent.description}
              </p>
              <div className="space-y-3 text-white/60">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gold" />
                  <span>{selectedEvent.date}</span>
                </div>
                {selectedEvent.time && (
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gold" />
                    <span>{selectedEvent.time}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gold" />
                  <span>{selectedEvent.location}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Events;
