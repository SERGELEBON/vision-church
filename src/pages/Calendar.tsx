import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { ChevronLeft, ChevronRight, SlidersHorizontal, Clock, MapPin } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface CalendarEvent {
  id: number;
  title: string;
  date: number;
  month: number;
  year: number;
  startTime: string;
  endTime: string;
  timezone: string;
  location: string;
  description: string;
  category: 'worship' | 'special' | 'youth' | 'conference';
  color: string;
}

const generateEvents = (t: (key: string) => string): CalendarEvent[] => [
  { id: 1, title: t('calendar.events.mensWorship'), date: 26, month: 1, year: 2026, startTime: '18:00', endTime: '20:00', timezone: 'UTC+0', location: 'CVSI Main Auditorium', description: 'Culte spécialement dédié aux hommes', category: 'special', color: 'bg-purple-600' },
  { id: 2, title: t('calendar.events.faf'), date: 28, month: 1, year: 2026, startTime: '15:00', endTime: '18:00', timezone: 'UTC+0', location: 'Youth Center', description: 'Fer Aiguise le Fer - Événement jeunesse', category: 'youth', color: 'bg-blue-600' },
  { id: 3, title: t('calendar.events.youthMoment'), date: 13, month: 1, year: 2026, startTime: '14:00', endTime: '16:00', timezone: 'UTC+0', location: 'Youth Center', description: 'Moment de partage pour la jeunesse', category: 'youth', color: 'bg-blue-600' },
  { id: 4, title: t('calendar.events.sundayWorship'), date: 1, month: 1, year: 2026, startTime: '09:00', endTime: '12:00', timezone: 'UTC+0', location: 'Betphillah Cathedral', description: 'Culte dominical', category: 'worship', color: 'bg-amber-600' },
  { id: 5, title: t('calendar.events.sundayWorship'), date: 8, month: 1, year: 2026, startTime: '09:00', endTime: '12:00', timezone: 'UTC+0', location: 'Betphillah Cathedral', description: 'Culte dominical', category: 'worship', color: 'bg-amber-600' },
  { id: 6, title: t('calendar.events.bibleStudy'), date: 3, month: 1, year: 2026, startTime: '18:00', endTime: '20:00', timezone: 'UTC+0', location: 'Salle de Conférence', description: 'Étude biblique', category: 'worship', color: 'bg-amber-600' },
  { id: 7, title: t('calendar.events.deliverance'), date: 5, month: 1, year: 2026, startTime: '19:00', endTime: '21:00', timezone: 'UTC+0', location: 'Betphillah Cathedral', description: 'Soirée de prière et délivrance', category: 'special', color: 'bg-purple-600' },
  { id: 8, title: t('calendar.events.sundayWorship'), date: 15, month: 1, year: 2026, startTime: '09:00', endTime: '12:00', timezone: 'UTC+0', location: 'Betphillah Cathedral', description: 'Culte dominical', category: 'worship', color: 'bg-amber-600' },
  { id: 9, title: t('calendar.events.sundayWorship'), date: 22, month: 1, year: 2026, startTime: '09:00', endTime: '12:00', timezone: 'UTC+0', location: 'Betphillah Cathedral', description: 'Culte dominical', category: 'worship', color: 'bg-amber-600' },
];

const monthNames: Record<string, string[]> = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
};

const Calendar = () => {
  const { t, i18n } = useTranslation();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 1)); // February 2026
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const events = useMemo(() => generateEvents(t), [t]);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthName = monthNames[i18n.language]?.[currentMonth] || monthNames.en[currentMonth];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const getEventsForDate = (date: number): CalendarEvent[] => {
    const dateEvents = events.filter(
      (e) => e.date === date && e.month === currentMonth && e.year === currentYear
    );
    if (activeFilters.length === 0) return dateEvents;
    return dateEvents.filter((e) => activeFilters.includes(e.category));
  };

  const toggleFilter = (category: string) => {
    setActiveFilters((prev) =>
      prev.includes(category) ? prev.filter((f) => f !== category) : [...prev, category]
    );
  };

  const isToday = (date: number) => {
    const today = new Date();
    return (
      date === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const calendarDays = [];
  for (let i = 0; i < adjustedFirstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const weekDays = [
    t('calendar.days.mon'),
    t('calendar.days.tue'),
    t('calendar.days.wed'),
    t('calendar.days.thu'),
    t('calendar.days.fri'),
    t('calendar.days.sat'),
    t('calendar.days.sun'),
  ];

  const filterCategories = [
    { key: 'worship', label: t('calendar.categories.worship'), color: 'bg-amber-600' },
    { key: 'special', label: t('calendar.categories.special'), color: 'bg-purple-600' },
    { key: 'youth', label: t('calendar.categories.youth'), color: 'bg-blue-600' },
    { key: 'conference', label: t('calendar.categories.conference'), color: 'bg-green-600' },
  ];

  return (
    <div className="min-h-screen bg-darkblue">
      <Navigation />

      {/* Hero Header */}
      <div
        className="relative pt-32 pb-20 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(15, 23, 42, 0.95), rgba(88, 28, 135, 0.7)), url(/images/eve1.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            {t('calendar.title')}
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-darkblue to-transparent" />
      </div>

      {/* Description Section */}
      <section className="py-16 bg-darkblue">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
            {t('calendar.subtitle')}
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">
            {t('calendar.description')}
          </p>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="pb-20 bg-darkblue">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-gradient-to-br from-purple-900/80 to-indigo-950/90 rounded-3xl p-6 md:p-8 shadow-2xl">
            {/* Calendar Header */}
            <div className="text-center mb-6">
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-gold mb-4">
                {t('calendar.calendarTitle')}
              </h3>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 
                         border border-white/20 rounded-lg text-white text-sm font-medium
                         transition-all duration-300"
              >
                <SlidersHorizontal className="w-4 h-4" />
                {t('calendar.filters')}
              </button>

              <div className="flex items-center gap-4">
                <button
                  onClick={prevMonth}
                  className="w-10 h-10 flex items-center justify-center rounded-lg 
                           bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
                  aria-label={t('calendar.prevMonth')}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-white font-semibold text-lg min-w-[140px] text-center">
                  {monthName} {currentYear}
                </span>
                <button
                  onClick={nextMonth}
                  className="w-10 h-10 flex items-center justify-center rounded-lg 
                           bg-white/10 hover:bg-white/20 text-white transition-all duration-300"
                  aria-label={t('calendar.nextMonth')}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10 animate-fade-in">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-white/60 text-sm">{t('calendar.filters')}:</span>
                  {filterCategories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => toggleFilter(cat.key)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all duration-300
                        ${activeFilters.includes(cat.key)
                          ? `${cat.color} text-white`
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${cat.color}`} />
                      {cat.label}
                    </button>
                  ))}
                  {activeFilters.length > 0 && (
                    <button
                      onClick={() => setActiveFilters([])}
                      className="text-white/50 hover:text-white text-sm underline ml-auto"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Calendar Grid */}
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                {/* Week Days Header */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {weekDays.map((day) => (
                    <div
                      key={day}
                      className="text-center py-2 text-gold font-semibold text-sm uppercase"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => {
                    if (day === null) {
                      return (
                        <div
                          key={`empty-${index}`}
                          className="aspect-square bg-white/5 rounded-lg"
                        />
                      );
                    }

                    const dayEvents = getEventsForDate(day);
                    const today = isToday(day);

                    return (
                      <div
                        key={day}
                        className={`aspect-square bg-white/5 rounded-lg p-2 relative
                          ${today ? 'ring-2 ring-gold' : ''}
                          hover:bg-white/10 transition-all duration-300`}
                      >
                        <span
                          className={`text-sm font-medium ${
                            today ? 'text-gold' : 'text-white/70'
                          }`}
                        >
                          {day}
                        </span>

                        {/* Events */}
                        <div className="mt-1 space-y-1">
                          {dayEvents.slice(0, 2).map((event) => (
                            <button
                              key={event.id}
                              onClick={() => setSelectedEvent(event)}
                              className={`w-full text-left px-1.5 py-0.5 rounded text-[10px] 
                                        text-white truncate hover:opacity-80 transition-opacity
                                        ${event.color}`}
                            >
                              {event.title}
                            </button>
                          ))}
                          {dayEvents.length > 2 && (
                            <span className="text-[10px] text-white/50 px-1.5">
                              +{dayEvents.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-purple-900/40 to-darkblue">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h3 className="font-serif text-2xl font-bold text-white mb-4">
            {t('newsletter.title')}
          </h3>
          <p className="text-white/60 mb-6">{t('newsletter.subtitle')}</p>
        </div>
      </section>

      {/* Event Detail Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="bg-darkblue-light border-gold/30 max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-white">
              {selectedEvent?.title}
            </DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div className="mt-4 space-y-4">
              <div className={`inline-block px-3 py-1 rounded-full text-xs text-white ${selectedEvent.color}`}>
                {t(`calendar.categories.${selectedEvent.category}`)}
              </div>
              
              <p className="text-white/70 text-sm">{selectedEvent.description}</p>
              
              <div className="space-y-2 text-white/60 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold" />
                  <span>
                    {selectedEvent.startTime} - {selectedEvent.endTime} ({selectedEvent.timezone})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span>{selectedEvent.location}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Calendar;
