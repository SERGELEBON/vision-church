import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Calendar, User, MessageSquare, CheckCircle, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Appointment = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    reason: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.date || !formData.reason) {
      toast.error(t('common.error'));
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSuccess(true);
    toast.success(t('common.success'));
    setIsSubmitting(false);
  };

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', 
    '14:00', '15:00', '16:00', '17:00'
  ];

  const reasons = [
    { key: 'spiritual', label: t('appointment.reasons.spiritual') },
    { key: 'deliverance', label: t('appointment.reasons.deliverance') },
    { key: 'marriage', label: t('appointment.reasons.marriage') },
    { key: 'direction', label: t('appointment.reasons.direction') },
    { key: 'blessing', label: t('appointment.reasons.blessing') },
    { key: 'other', label: t('appointment.reasons.other') },
  ];

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-darkblue">
        <Navigation />
        <div className="pt-32 pb-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-24 h-24 rounded-full bg-green-500/20 border-2 border-green-500 
                            flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h1 className="font-serif text-4xl font-bold text-white mb-4">
                {t('appointment.success.title')}
              </h1>
              <p className="text-white/70 text-lg mb-8">
                {t('appointment.success.message')}
              </p>
              <Button
                onClick={() => {
                  setIsSuccess(false);
                  setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    date: '',
                    time: '',
                    reason: '',
                    message: '',
                  });
                }}
                className="bg-gold-gradient text-darkblue font-bold px-8 py-4 rounded-full
                         hover:shadow-gold transition-all duration-300"
              >
                {t('common.back')}
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-darkblue">
      <Navigation />
      
      {/* Hero Header */}
      <div className="relative pt-32 pb-20 bg-gradient-to-br from-purple-900/40 to-darkblue">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-6">
              <Crown className="w-4 h-4 text-gold" />
              <span className="text-gold text-sm font-medium tracking-wider uppercase">
                {t('appointment.withBishop')}
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              {t('appointment.title')}
            </h1>
            <p className="text-white/70 text-lg">
              {t('appointment.description')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Bishop Info Card */}
          <div className="bg-gradient-to-r from-gold/10 to-purple/10 rounded-2xl p-6 border border-gold/20 mb-10">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gold/50 flex-shrink-0">
                <img
                  src="/images/pro1.jpg"
                  alt="Bishop Louis Macaiah"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-serif text-xl font-bold text-white mb-1">
                  Bishop Louis Macaiah
                </h3>
                <p className="text-gold mb-2">{t('about.stats.years')}</p>
                <p className="text-white/60 text-sm">
                  {t('footer.description')}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Info */}
            <div className="bg-darkblue-light/50 rounded-2xl p-6 border border-white/10">
              <h3 className="font-serif text-lg font-bold text-white mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-gold" />
                {t('appointment.personalInfo')}
              </h3>
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
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="phone" className="text-white">
                    {t('contact.form.title')} <span className="text-gold">*</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="02462322224"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30
                             focus:border-gold focus:ring-gold/20"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="bg-darkblue-light/50 rounded-2xl p-6 border border-white/10">
              <h3 className="font-serif text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gold" />
                {t('appointment.appointmentDetails')}
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-white">
                    {t('appointment.date')} <span className="text-gold">*</span>
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30
                             focus:border-gold focus:ring-gold/20"
                    disabled={isSubmitting}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time" className="text-white">
                    {t('appointment.time')}
                  </Label>
                  <select
                    id="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full h-12 px-4 rounded-md bg-white/5 border border-white/10 
                             text-white focus:border-gold focus:ring-gold/20
                             focus:outline-none focus:ring-2 focus:ring-offset-0"
                    disabled={isSubmitting}
                  >
                    <option value="" className="bg-darkblue-light">--:--</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time} className="bg-darkblue-light">
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="reason" className="text-white">
                    {t('appointment.reason')} <span className="text-gold">*</span>
                  </Label>
                  <select
                    id="reason"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full h-12 px-4 rounded-md bg-white/5 border border-white/10 
                             text-white focus:border-gold focus:ring-gold/20
                             focus:outline-none focus:ring-2 focus:ring-offset-0"
                    disabled={isSubmitting}
                  >
                    <option value="" className="bg-darkblue-light">{t('common.select')}</option>
                    {reasons.map((reason) => (
                      <option key={reason.key} value={reason.key} className="bg-darkblue-light">
                        {reason.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="message" className="text-white">
                    {t('appointment.message')}
                  </Label>
                  <Textarea
                    id="message"
                    placeholder={t('contact.form.messagePlaceholder')}
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30
                             focus:border-gold focus:ring-gold/20 resize-none"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
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
                  <MessageSquare className="w-5 h-5" />
                  {t('appointment.submit')}
                </span>
              )}
            </Button>

            <p className="text-center text-white/40 text-sm">
              * {t('common.required')}
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Appointment;
