import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error(t('common.error'));
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success(t('common.success'));
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t('contact.coordinates'),
      content: 'Betphillah Cathedral',
      subContent: 'Christian Village Junction Behind Melcom, Kumasi, Ghana',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: t('contact.form.title'),
      content: '02462322224',
      subContent: '0551885588',
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      content: 'info@cvsi.org',
      subContent: 'bishop@cvsi.org',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t('contact.form.title'),
      content: 'Lun - Ven: 9h00 - 17h00',
      subContent: 'Dimanche: 8h00 - 14h00',
    },
  ];

  return (
    <div className="min-h-screen bg-darkblue">
      <Navigation />
      
      {/* Hero Header */}
      <div className="relative pt-32 pb-20 bg-gradient-to-br from-purple-900/40 to-darkblue">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {t('contact.title')}
            </h1>
            <p className="text-white/70 text-lg">
              {t('contact.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Contact Info */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-white mb-2">
              {t('contact.coordinates')}
            </h2>
            <div className="w-16 h-1 bg-gold-gradient rounded-full mb-8" />

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {contactInfo.map((item) => (
                <div
                  key={item.title}
                  className="bg-darkblue-light/50 rounded-2xl p-6 border border-white/10 
                           hover:border-gold/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/30 
                                flex items-center justify-center text-gold mb-4
                                group-hover:bg-gold group-hover:text-darkblue transition-all duration-300">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gold-light">{item.content}</p>
                  <p className="text-white/50 text-sm">{item.subContent}</p>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="bg-darkblue-light/50 rounded-2xl overflow-hidden border border-white/10 h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.8!2d-1.6!3d6.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDInMDAuMCJOIDHCsDM2JzAwLjAiVw!5e0!3m2!1sfr!2sgh!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="CVSI Location"
              />
            </div>
          </div>

          {/* Right: Contact Form */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-white mb-2">
              {t('contact.form.title')}
            </h2>
            <div className="w-16 h-1 bg-gold-gradient rounded-full mb-6" />
            
            <p className="text-white/60 mb-8">
              {t('contact.form.description')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">
                    {t('contact.form.name')} <span className="text-gold">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={t('contact.form.namePlaceholder')}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30
                             focus:border-gold focus:ring-gold/20"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    {t('contact.form.email')} <span className="text-gold">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('contact.form.emailPlaceholder')}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30
                             focus:border-gold focus:ring-gold/20"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-white">
                  {t('contact.form.subject')}
                </Label>
                <Input
                  id="subject"
                  type="text"
                  placeholder={t('contact.form.subjectPlaceholder')}
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30
                           focus:border-gold focus:ring-gold/20"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white">
                  {t('contact.form.message')} <span className="text-gold">*</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder={t('contact.form.messagePlaceholder')}
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30
                           focus:border-gold focus:ring-gold/20 resize-none"
                  disabled={isSubmitting}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-gold-gradient text-darkblue font-bold text-lg rounded-xl
                         hover:shadow-gold hover:scale-[1.02] transition-all duration-300
                         disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-darkblue/30 border-t-darkblue rounded-full animate-spin" />
                    {t('common.loading')}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    {t('contact.form.send')}
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
