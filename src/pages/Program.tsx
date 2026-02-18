import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Clock, MapPin, Calendar, Users, BookOpen, Music, Heart } from 'lucide-react';

interface ProgramItem {
  day: string;
  events: {
    time: string;
    title: string;
    description: string;
    location: string;
    icon: React.ReactNode;
  }[];
}

const Program = () => {
  const { t } = useTranslation();
  const [selectedDay, setSelectedDay] = useState('Sunday');

  const weeklyProgram: ProgramItem[] = [
    {
      day: 'Sunday',
      events: [
        {
          time: '09:00 - 12:00',
          title: t('calendar.events.sundayWorship'),
          description: 'Notre culte dominical principal avec louange, adoration et enseignement puissant.',
          location: 'Betphillah Cathedral',
          icon: <Music className="w-5 h-5" />,
        },
        {
          time: '18:00 - 20:00',
          title: 'Soirée de Gloire',
          description: 'Culte du soir avec un temps spécial de prière et d\'adoration.',
          location: 'Main Auditorium',
          icon: <Heart className="w-5 h-5" />,
        },
      ],
    },
    {
      day: 'Tuesday',
      events: [
        {
          time: '18:00 - 20:00',
          title: t('calendar.events.bibleStudy'),
          description: 'Étude approfondie de la parole de Dieu avec le Bishop Louis Macaiah.',
          location: 'Salle de Conférence',
          icon: <BookOpen className="w-5 h-5" />,
        },
      ],
    },
    {
      day: 'Wednesday',
      events: [
        {
          time: '18:00 - 20:00',
          title: 'Service de Guérison',
          description: 'Service spécial dédié à la guérison et à la délivrance.',
          location: 'Betphillah Cathedral',
          icon: <Heart className="w-5 h-5" />,
        },
      ],
    },
    {
      day: 'Thursday',
      events: [
        {
          time: '18:00 - 20:00',
          title: t('calendar.events.mensWorship'),
          description: 'Culte spécialement dédié aux hommes pour être édifiés et encouragés.',
          location: 'Men\'s Fellowship Hall',
          icon: <Users className="w-5 h-5" />,
        },
      ],
    },
    {
      day: 'Friday',
      events: [
        {
          time: '18:00 - 20:00',
          title: 'All Night Prayer',
          description: 'Nuit de prière et d\'adoration pour chercher la face de Dieu.',
          location: 'Betphillah Cathedral',
          icon: <Heart className="w-5 h-5" />,
        },
      ],
    },
    {
      day: 'Saturday',
      events: [
        {
          time: '10:00 - 12:00',
          title: 'École du Sabbat',
          description: 'Étude biblique pour tous les âges.',
          location: 'Classes',
          icon: <BookOpen className="w-5 h-5" />,
        },
        {
          time: '15:00 - 18:00',
          title: t('calendar.events.faf'),
          description: 'Notre événement de jeunesse dynamique et puissant.',
          location: 'Youth Center',
          icon: <Users className="w-5 h-5" />,
        },
      ],
    },
  ];

  const dayNames: Record<string, string> = {
    Sunday: 'Dimanche',
    Monday: 'Lundi',
    Tuesday: 'Mardi',
    Wednesday: 'Mercredi',
    Thursday: 'Jeudi',
    Friday: 'Vendredi',
    Saturday: 'Samedi',
  };

  const currentDayProgram = weeklyProgram.find(p => p.day === selectedDay);

  return (
    <div className="min-h-screen bg-darkblue">
      <Navigation />
      
      {/* Hero Header */}
      <div className="relative pt-32 pb-20 bg-gradient-to-br from-purple-900/40 to-darkblue">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {t('program.title')}
            </h1>
            <p className="text-white/70 text-lg">
              {t('program.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Day Selector */}
          <div className="lg:col-span-1">
            <div className="bg-darkblue-light/50 rounded-2xl p-4 border border-white/10 sticky top-24">
              <h3 className="font-serif text-lg font-bold text-white mb-4 px-2">
                {t('calendar.days.mon')} - {t('calendar.days.sun')}
              </h3>
              <div className="space-y-1">
                {weeklyProgram.map((item) => (
                  <button
                    key={item.day}
                    onClick={() => setSelectedDay(item.day)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                      selectedDay === item.day
                        ? 'bg-gold-gradient text-darkblue font-semibold'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{dayNames[item.day]}</span>
                      <span className={`text-xs ${
                        selectedDay === item.day ? 'text-darkblue/70' : 'text-white/40'
                      }`}>
                        {item.events.length} event{item.events.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Events Display */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="font-serif text-2xl font-bold text-white mb-2">
                {dayNames[selectedDay]}
              </h2>
              <div className="w-16 h-1 bg-gold-gradient rounded-full" />
            </div>

            <div className="space-y-6">
              {currentDayProgram?.events.map((event, index) => (
                <div
                  key={index}
                  className="bg-darkblue-light/50 rounded-2xl p-6 border border-white/10 
                           hover:border-gold/30 transition-all duration-500
                           hover:shadow-lg hover:shadow-gold/10 group"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Time */}
                    <div className="flex items-center gap-3 md:w-48 flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 
                                    flex items-center justify-center text-gold
                                    group-hover:bg-gold group-hover:text-darkblue transition-all duration-300">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-gold font-semibold">{event.time}</p>
                        <p className="text-white/40 text-sm">{dayNames[selectedDay]}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-gold">{event.icon}</span>
                        <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold transition-colors">
                          {event.title}
                        </h3>
                      </div>
                      <p className="text-white/60 mb-4 leading-relaxed">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-2 text-white/50 text-sm">
                        <MapPin className="w-4 h-4 text-gold" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Special Events Notice */}
            <div className="mt-10 bg-gradient-to-r from-gold/10 to-purple/10 rounded-2xl p-6 border border-gold/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-white mb-2">
                    {t('program.specialEvents')}
                  </h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {t('program.specialEventsDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Program;
