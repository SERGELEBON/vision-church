import { useTranslation } from 'react-i18next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Heart, Wallet, CreditCard, Building2, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Support = () => {
  const { t } = useTranslation();

  const donationMethods = [
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: t('support.methods.card.title'),
      description: t('support.methods.card.desc'),
      action: t('hero.support'),
      link: 'https://actionchapel.net/online-giving/',
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: t('support.methods.bank.title'),
      description: t('support.methods.bank.desc'),
      details: 'Banque: Ecobank Ghana\nCompte: 0123456789\nNom: Christ Vision Sanctuary',
    },
    {
      icon: <Wallet className="w-8 h-8" />,
      title: t('support.methods.mobile.title'),
      description: t('support.methods.mobile.desc'),
      details: 'MTN: 02462322224\nVodafone: 0551885588',
    },
  ];

  return (
    <div className="min-h-screen bg-darkblue">
      <Navigation />
      
      {/* Hero Header */}
      <div className="relative pt-32 pb-20 bg-gradient-to-br from-purple-900/40 to-darkblue">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
              <Heart className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-medium tracking-wider uppercase">
                {t('support.participate')}
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {t('support.title')}
            </h1>
            <p className="text-white/70 text-lg">
              {t('support.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 py-12">
        {/* Impact Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-darkblue-light/50 rounded-2xl p-6 border border-white/10 text-center">
            <div className="text-4xl font-bold text-gold mb-2">5000+</div>
            <p className="text-white/60">{t('about.stats.lives')}</p>
          </div>
          <div className="bg-darkblue-light/50 rounded-2xl p-6 border border-white/10 text-center">
            <div className="text-4xl font-bold text-gold mb-2">50+</div>
            <p className="text-white/60">{t('about.stats.branches')}</p>
          </div>
          <div className="bg-darkblue-light/50 rounded-2xl p-6 border border-white/10 text-center">
            <div className="text-4xl font-bold text-gold mb-2">20+</div>
            <p className="text-white/60">{t('about.stats.years')}</p>
          </div>
        </div>

        {/* Donation Methods */}
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-2xl font-bold text-white text-center mb-8">
            {t('support.methods.card.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {donationMethods.map((method) => (
              <div
                key={method.title}
                className="bg-darkblue-light/50 rounded-2xl p-6 border border-white/10 
                         hover:border-gold/30 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-xl bg-gold/10 border border-gold/30 
                              flex items-center justify-center text-gold mb-4 mx-auto
                              group-hover:bg-gold group-hover:text-darkblue transition-all duration-300">
                  {method.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-white text-center mb-2">
                  {method.title}
                </h3>
                <p className="text-white/60 text-center text-sm mb-4">
                  {method.description}
                </p>
                {method.details ? (
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-gold-light text-sm whitespace-pre-line">
                      {method.details}
                    </p>
                  </div>
                ) : method.link ? (
                  <a
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      className="w-full bg-gold-gradient text-darkblue font-semibold rounded-lg
                               hover:shadow-gold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      {method.action}
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* Scripture Quote */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <blockquote className="border-l-4 border-gold pl-6 py-2">
            <p className="text-white/80 italic text-lg mb-4">
              "{t('support.scripture')}"
            </p>
            <cite className="text-gold text-sm">
              — {t('support.scriptureRef')}
            </cite>
          </blockquote>
        </div>

        {/* Thank You */}
        <div className="max-w-2xl mx-auto mt-16 bg-gradient-to-r from-gold/10 to-purple/10 rounded-2xl p-8 border border-gold/20 text-center">
          <CheckCircle className="w-12 h-12 text-gold mx-auto mb-4" />
          <h3 className="font-serif text-2xl font-bold text-white mb-2">
            {t('support.thankYou')}
          </h3>
          <p className="text-white/60">
            {t('support.thankYouDesc')}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;
