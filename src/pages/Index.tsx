import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';

const Index = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language || 'ar');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [isRTL, i18n.language]);

  const services = [
    {
      title: "القانون الجنائي",
      description: "خدمات قانونية متخصصة في القضايا الجنائية",
      icon: "⚖️",
    },
    {
      title: "القانون التجاري",
      description: "استشارات وحلول قانونية للشركات والأعمال",
      icon: "💼",
    },
    {
      title: "القانون العقاري",
      description: "خدمات قانونية متكاملة في مجال العقارات",
      icon: "🏢",
    },
  ];

  const testimonials = [
    {
      name: "أحمد محمد",
      comment: "خدمة ممتازة وفريق محترف",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    },
    {
      name: "سارة أحمد",
      comment: "تجربة رائعة مع المكتب",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const getAvailableTimeSlots = (date: Date) => {
    const dayOfWeek = date.getDay();
    let slots = [];
    
    // Vendredi (5)
    if (dayOfWeek === 5) {
      // Matin: 9h-12h
      for (let hour = 9; hour < 12; hour++) {
        slots.push(`${hour}:00`);
        slots.push(`${hour}:30`);
      }
      // Après-midi: 15h-20h
      for (let hour = 15; hour < 20; hour++) {
        slots.push(`${hour}:00`);
        slots.push(`${hour}:30`);
      }
    }
    // Dimanche (0) - Fermé
    else if (dayOfWeek === 0) {
      return [];
    }
    // Autres jours
    else {
      for (let hour = 9; hour < 20; hour++) {
        slots.push(`${hour}:00`);
        slots.push(`${hour}:30`);
      }
    }
    
    return slots;
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    setIsMenuOpen(false);
  };

  return (
    <div className={`min-h-screen ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* Navbar */}
      <nav className={`fixed w-full top-0 z-50 ${isMenuOpen ? 'bg-gray-900 text-white' : 'bg-white/90'} backdrop-blur-lg shadow-sm transition-all duration-300`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Name */}
            <div className="flex items-center gap-3">
              <motion.div 
                className="flex-shrink-0"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img
                  src="/images/sadok-farhat.jpg"
                  alt={t('header.lawyer_name')}
                  className="h-12 w-12 rounded-full border-2 border-gold object-cover"
                />
              </motion.div>
              <div className={`text-lg font-bold ${isRTL ? 'text-right' : 'text-left'}`}>
                {t('header.lawyer_name')}
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {["home", "about", "services", "testimonials", "faq", "appointment", "contact"].map((item, index) => (
                <motion.a
                  key={item}
                  href={item === "home" ? "#" : `#${item}`}
                  className="hover:text-gold transition-colors"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {t(`nav.${item}`)}
                </motion.a>
              ))}
            </div>

            {/* Language Switcher */}
            <div className="hidden md:flex items-center space-x-2">
              {["ar", "fr", "en"].map((lang, index) => (
                <motion.button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-2 py-1 rounded ${currentLang === lang ? 'bg-gold text-white' : 'hover:bg-gray-100'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {lang === "ar" ? "العربية" : lang === "fr" ? "Français" : "English"}
                </motion.button>
              ))}
            </div>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden rounded-lg p-2 hover:bg-gray-800 transition-colors"
              whileTap={{ scale: 0.9 }}
            >
              <Menu className="h-6 w-6" />
            </motion.button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              className="md:hidden py-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4">
                <a 
                  href="#" 
                  className="hover:text-gold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.home')}
                </a>
                <a 
                  href="#about" 
                  className="hover:text-gold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.about')}
                </a>
                <a 
                  href="#services" 
                  className="hover:text-gold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.services')}
                </a>
                <a 
                  href="#testimonials" 
                  className="hover:text-gold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.testimonials')}
                </a>
                <a 
                  href="#faq" 
                  className="hover:text-gold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.faq')}
                </a>
                <a 
                  href="#appointment" 
                  className="hover:text-gold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.appointment')}
                </a>
                <a 
                  href="#contact" 
                  className="hover:text-gold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.contact')}
                </a>
                
                {/* Mobile Language Switcher */}
                <div className="flex space-x-2 pt-4 border-t border-gray-700">
                  <button
                    onClick={() => handleLanguageChange('ar')}
                    className={`px-2 py-1 rounded ${currentLang === 'ar' ? 'bg-gold text-white' : 'hover:bg-gray-100'}`}
                  >
                    العربية
                  </button>
                  <button
                    onClick={() => handleLanguageChange('fr')}
                    className={`px-2 py-1 rounded ${currentLang === 'fr' ? 'bg-gold text-white' : 'hover:bg-gray-100'}`}
                  >
                    Français
                  </button>
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`px-2 py-1 rounded ${currentLang === 'en' ? 'bg-gold text-white' : 'hover:bg-gray-100'}`}
                  >
                    English
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            src="/images/hero-bg1.jpg"
            alt="مكتب المحاماة"
            className="w-full h-full object-cover object-[center_40%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-screen flex items-end pb-20">
          <motion.div
            className="text-white w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 className="text-5xl font-bold mb-6 text-center text-gold">
              {t('hero.title')}
            </h1>
            <p className="text-xl mb-8 text-center">
              {t('hero.subtitle')}
            </p>
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <a
                href="#appointment"
                className="bg-gold hover:bg-gold-hover text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                {t('hero.cta')}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="container mx-auto py-16 px-4" id="about">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="slide-up">
            <h2 className="text-3xl font-bold mb-6">
              {t('about.title')}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {t('about.description1')}
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              {t('about.description2')}
            </p>
          </div>
          <div className="glass-card rounded-lg overflow-hidden">
            <img
              src="/images/av2.jpg"
              alt={t('about.title')}
              className="w-full h-[600px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto py-16 px-4" id="services">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t('services.title')}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              key: 'criminal',
              icon: "⚖️"
            },
            {
              key: 'commercial',
              icon: "💼"
            },
            {
              key: 'real_estate',
              icon: "🏢"
            }
          ].map((service, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 rounded-lg p-6 shadow-sm border border-gray-200 hover:bg-white transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-4xl mb-4 text-gold">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">
                {t(`services.${service.key}.title`)}
              </h3>
              <p className="text-gray-600">
                {t(`services.${service.key}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto py-16 px-4" id="testimonials">
        <motion.h2 className="text-3xl font-bold text-center mb-12">
          {t('testimonials.title')}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Array.isArray(t('testimonials.clients', { returnObjects: true })) ? 
            t('testimonials.clients', { returnObjects: true }).map((testimonial: any, index: number) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gold/5 to-gold/10 p-6 rounded-lg"
              >
                <h3 className="text-xl font-bold text-center mb-2">{testimonial.name}</h3>
                <p className="text-gray-600 text-center">{testimonial.comment}</p>
              </motion.div>
            ))
            : null
          }
        </div>
      </section>

      {/* Appointment Section */}
      <section className="container mx-auto py-16 px-4 bg-white" id="appointment">
        <motion.h2 className="text-3xl font-bold text-center mb-12">
          {t('appointment.title')}
        </motion.h2>
        <div className="max-w-lg mx-auto glass-card p-8 rounded-lg">
          <div className="mb-8">
            <h3 className={`text-xl font-bold mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('appointment.workingHours.title')}
            </h3>
            <ul className={`space-y-2 ${isRTL ? 'text-right' : 'text-left'} list-none`}>
              <li className="flex items-center gap-2">
                <span className="text-gold">•</span>
                <span>{t('appointment.workingHours.weekdays')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">•</span>
                <span>{t('appointment.workingHours.friday')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">•</span>
                <span>{t('appointment.workingHours.saturday')}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">•</span>
                <span>{t('appointment.workingHours.sunday')}</span>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              {t('appointment.form.dateLabel')}
            </label>
            <input
              type="date"
              className="w-full p-3 border rounded-lg"
              min={format(new Date(), 'yyyy-MM-dd')}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              required
            />
          </div>

          {selectedDate && (
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                {t('appointment.form.timeLabel')}
              </label>
              <select
                className="w-full p-3 border rounded-lg"
                onChange={(e) => setSelectedTime(e.target.value)}
                required
              >
                <option value="">{t('appointment.form.selectTime')}</option>
                {getAvailableTimeSlots(selectedDate).map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          )}

          {selectedDate && selectedTime && (
            <div className="text-center">
              <div className="text-green-600 mb-6">
                {t('appointment.form.confirmation', { date: format(selectedDate, 'dd/MM/yyyy', { locale: ar }), time: selectedTime })}
              </div>
              <a
                href="#contact"
                className="bg-gold hover:bg-gold-hover text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 inline-block"
              >
                {t('appointment.form.nextStep')}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto py-16 px-4 bg-gray-50" id="contact">
        <motion.h2 className="text-3xl font-bold text-center mb-12">
          {t('contact.title')}
        </motion.h2>
        <motion.form onSubmit={handleSubmit} className="max-w-lg mx-auto glass-card p-8 rounded-lg">
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              {t('contact.form.name')}
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              {t('contact.form.email')}
            </label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              {t('contact.form.phone')}
            </label>
            <input
              type="tel"
              className="w-full p-3 border rounded-lg"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">
              {t('contact.form.message')}
            </label>
            <textarea
              className="w-full p-3 border rounded-lg h-32"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            ></textarea>
          </div>
          <button type="submit" className="w-full bg-gold hover:bg-gold-hover text-white font-bold py-3 px-6 rounded-lg">
            {t('contact.form.submit')}
          </button>
        </motion.form>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto py-16 px-4 bg-white" id="faq">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t('faq.title')}
        </motion.h2>
        <div className="max-w-3xl mx-auto space-y-6">
          {Array.isArray(t('faq.questions', { returnObjects: true })) ? 
            t('faq.questions', { returnObjects: true }).map((item: any, index: number) => (
              <motion.div
                key={index}
                className="bg-gray-100 rounded-lg shadow-sm p-6 border border-gray-200 hover:bg-white transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className={`text-xl font-bold mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {item.question}
                </h3>
                <p className={`text-gray-600 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
                  {item.answer}
                </p>
              </motion.div>
            ))
            : null
          }
        </div>
      </section>

      {/* Digital Transformation Section */}
      <section className="container mx-auto py-16 px-4 bg-gray-50">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-8">
            {t('digital.title')}
          </h2>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <p className={`text-gray-700 leading-relaxed mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('digital.intro')}
            </p>
            
            <div className="bg-gold/10 rounded-lg p-6 mb-6">
              <p className="text-gray-800 font-bold text-center text-xl mb-2">
                {t('digital.pricing.title')}
              </p>
              <p className="text-gray-600 text-center">
                {t('digital.pricing.description')}
              </p>
            </div>

            <p className={`text-gray-700 leading-relaxed mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('digital.expertise')}
            </p>

            <p className={`text-gray-700 leading-relaxed mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('digital.community')}
            </p>

            <p className="text-gold font-bold text-center text-xl">
              {t('digital.cta')}
            </p>

            <div className="text-center mt-8">
              <a
                href="mailto:contact@raouane.com"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-hover text-white px-8 py-4 rounded-lg transition-all duration-300"
              >
                <span>{t('digital.contact')}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Location Section */}
      <section className="container mx-auto py-16 px-4 bg-white">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t('location.title')}
        </motion.h2>
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold mb-4">
                {t('location.office')}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('location.address')}
              </p>
              <a 
                href="https://www.google.com/maps/place/Tataouine/@32.9290485,10.4508956,15z"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-hover text-white px-6 py-3 rounded-lg transition-all duration-300"
              >
                <span>{t('location.viewMap')}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`bg-gray-900 text-white py-12 ${isRTL ? '' : 'ltr'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Footer Contact Info */}
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h3 className="text-xl font-bold mb-4">
                {t('footer.contact.title')}
              </h3>
              
              {/* Address */}
              <div className="mb-4">
                <div className="mb-1">{t('footer.contact.address')}</div>
                <div className="mb-1">{t('location.address')}</div>
                <a 
                  href="https://www.google.com/maps/place/Tataouine/@32.9290485,10.4508956,15z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold text-sm hover:text-gold-hover"
                >
                  {t('footer.contact.viewLocation')}
                </a>
              </div>

              {/* Phone */}
              <div className="mb-4">
                <div className="mb-1">{t('footer.contact.phone')}</div>
                <a href="tel:+21648343898" className="hover:text-gold">
                  +216 48 343 898
                </a>
              </div>

              {/* Email */}
              <div className="mb-4">
                <div className="mb-1">{t('footer.contact.email')}</div>
                <a href="mailto:contact@sadokfarhat-avocat.tn" className="hover:text-gold">
                  contact@sadokfarhat-avocat.tn
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h3 className="text-xl font-bold mb-4">{t('footer.quickLinks.title')}</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="hover:text-gold transition-colors">
                    {t('footer.quickLinks.about')}
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-gold transition-colors">
                    {t('footer.quickLinks.services')}
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-gold transition-colors">
                    {t('footer.quickLinks.contact')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <h3 className="text-xl font-bold mb-4">{t('footer.followUs')}</h3>
              <div className="flex space-x-4">
                {/* Social Media Icons */}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8">
            <p className="text-center mb-2">{t('footer.copyright')}</p>
            <p className="text-center text-sm text-gray-400">
              <span>{t('footer.credits.developedBy')}</span>
              <a 
                href="mailto:contact@raouane.com" 
                className="text-gold hover:text-gold-hover transition-colors mx-1"
              >
                "Raouane"
              </a>
              <span>{t('footer.credits.contactUs')}</span>
            </p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/21648343898"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 15.14C16.46 15.64 15.72 16.1 15.22 16.22C14.72 16.34 14.08 16.4 11.94 15.4C9.8 14.4 8.4 12.22 8.28 12.04C8.16 11.86 7.28 10.68 7.28 9.44C7.28 8.2 7.88 7.64 8.12 7.34C8.36 7.04 8.66 6.98 8.84 6.98C9.02 6.98 9.2 6.98 9.38 7C9.56 7.02 9.8 6.94 10.04 7.52C10.28 8.1 10.86 9.34 10.92 9.46C10.98 9.58 11.02 9.72 10.94 9.88C10.86 10.04 10.82 10.14 10.7 10.28C10.58 10.42 10.44 10.6 10.34 10.7C10.22 10.82 10.1 10.96 10.24 11.2C10.38 11.44 10.86 12.24 11.58 12.88C12.5 13.7 13.26 13.98 13.5 14.1C13.74 14.22 13.88 14.2 14.02 14.04C14.16 13.88 14.62 13.34 14.78 13.1C14.94 12.86 15.1 12.9 15.32 12.98C15.54 13.06 16.78 13.68 17.02 13.8C17.26 13.92 17.42 13.98 17.48 14.08C17.54 14.18 17.54 14.64 17.36 15.14H16.64Z"/>
        </svg>
      </motion.a>
    </div>
  );
};

export default Index;
