import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Newsletter = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success(t('common.success'));
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(to right, rgba(15, 23, 42, 0.95), rgba(88, 28, 135, 0.4)), url(/images/lev9.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-darkblue/95 via-purple-900/60 to-darkblue/90" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full 
                        bg-gold/10 border border-gold/30 mb-8">
            <Mail className="w-10 h-10 text-gold" />
          </div>

          {/* Title */}
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            {t('newsletter.title')}
          </h2>
          
          <p className="text-white/70 text-lg mb-8">
            {t('newsletter.subtitle')}
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <div className="flex-1 relative">
              <Input
                type="email"
                placeholder={t('newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 px-6 rounded-full bg-white/10 border-white/20 
                         text-white placeholder:text-white/50
                         focus:border-gold focus:ring-gold/20
                         backdrop-blur-sm"
                disabled={isSubmitting}
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-14 px-8 rounded-full bg-gold-gradient text-darkblue font-bold
                       hover:shadow-gold hover:scale-105 transition-all duration-300
                       disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-darkblue/30 border-t-darkblue rounded-full animate-spin" />
                  {t('common.loading')}
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  {t('newsletter.subscribe')}
                  <Send className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <CheckCircle className="w-4 h-4 text-gold" />
              <span>{t('newsletter.free')}</span>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <CheckCircle className="w-4 h-4 text-gold" />
              <span>{t('newsletter.unsubscribe')}</span>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <CheckCircle className="w-4 h-4 text-gold" />
              <span>{t('newsletter.noSpam')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
