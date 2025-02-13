import { useState } from "react";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('ar');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navbar */}
      <nav className={`fixed w-full top-0 z-50 ${isMenuOpen ? 'bg-gray-900 text-white' : 'bg-white/90'} backdrop-blur-lg shadow-sm transition-all duration-300`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex-shrink-0"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img
                src="/images/sadok-farhat.jpg"
                alt="Maître Sadok Farhat Moussa"
                className="h-12 w-12 rounded-full border-2 border-gold object-cover"
              />
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {["about", "services", "testimonials", "contact"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  className="hover:text-gold transition-colors"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item === "about" && "من نحن"}
                  {item === "services" && "خدماتنا"}
                  {item === "testimonials" && "آراء العملاء"}
                  {item === "contact" && "اتصل بنا"}
                </motion.a>
              ))}
            </div>

            {/* Language Switcher */}
            <div className="hidden md:flex items-center space-x-2">
              {["ar", "fr", "en"].map((lang, index) => (
                <motion.button
                  key={lang}
                  onClick={() => setCurrentLang(lang)}
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
                <a href="#about" className="hover:text-gold transition-colors">من نحن</a>
                <a href="#services" className="hover:text-gold transition-colors">خدماتنا</a>
                <a href="#testimonials" className="hover:text-gold transition-colors">آراء العملاء</a>
                <a href="#contact" className="hover:text-gold transition-colors">اتصل بنا</a>
                
                {/* Mobile Language Switcher */}
                <div className="flex space-x-2 pt-4 border-t border-gray-700">
                  <button
                    onClick={() => setCurrentLang('ar')}
                    className={`px-2 py-1 rounded ${currentLang === 'ar' ? 'bg-gold text-white' : 'hover:bg-gray-100'}`}
                  >
                    العربية
                  </button>
                  <button
                    onClick={() => setCurrentLang('fr')}
                    className={`px-2 py-1 rounded ${currentLang === 'fr' ? 'bg-gold text-white' : 'hover:bg-gray-100'}`}
                  >
                    Français
                  </button>
                  <button
                    onClick={() => setCurrentLang('en')}
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
            src="/images/av1.jpg"
            alt="مكتب المحاماة"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto pt-32 pb-20 px-4">
          <motion.div
            className="text-center text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 className="text-5xl font-bold mb-6">مكتب المحاماة المتميز</h1>
            <p className="text-xl mb-8">خبرة قانونية موثوقة</p>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="container mx-auto py-16 px-4" id="about">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="slide-up">
            <h2 className="text-3xl font-bold mb-6">من نحن</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              نحن مكتب محاماة رائد يقدم خدمات قانونية شاملة بأعلى معايير الجودة والاحترافية. يضم فريقنا نخبة من المحامين ذوي الخبرة.
            </p>
            {/* Image supplémentaire */}
            <div className="glass-card rounded-lg overflow-hidden mb-6">
              <img
                src="/images/av1.jpg"
                alt="مكتب المحاماة"
                className="w-full h-[200px] object-cover"
              />
            </div>
          </div>
          <div className="glass-card rounded-lg overflow-hidden">
            <img
              src="/images/about.jpg"
              alt="مكتب المحاماة الأستاذ الصادق فرحات موسى"
              className="w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto py-16 px-4 bg-gray-50" id="services">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          خدماتنا
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-white to-gray-100 p-6 rounded-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto py-16 px-4" id="testimonials">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          آراء العملاء
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gold/5 to-gold/10 p-6 rounded-lg border border-gold/20 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-center mb-2">{testimonial.name}</h3>
              <p className="text-gray-600 text-center">{testimonial.comment}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto py-16 px-4 bg-gray-50" id="contact">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          اتصل بنا
        </motion.h2>
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto glass-card p-8 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">الاسم</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">البريد الإلكتروني</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">الهاتف</label>
            <input
              type="tel"
              className="w-full p-3 border rounded-lg"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">رسالتك</label>
            <textarea
              className="w-full p-3 border rounded-lg h-32"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-gold hover:bg-gold-hover text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            إرسال
          </button>
        </motion.form>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
              <p className="mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>20 نهج الهادي شاكر، تطاوين 3200</span>
              </p>
              <p className="mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>هاتف:</span>
                <span dir="ltr">
                  <a href="tel:+21648343898" className="hover:text-gold transition-colors">
                    +216 48 343 898
                  </a>
                </span>
              </p>
              <p className="mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>البريد الإلكتروني:</span>
                <span dir="ltr">
                  <a href="mailto:contact@sadokfarhat-avocat.tn" className="hover:text-gold transition-colors">
                    contact@sadokfarhat-avocat.tn
                  </a>
                </span>
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
              <ul>
                <li className="mb-2"><a href="#about" className="hover:text-gold transition-colors">من نحن</a></li>
                <li className="mb-2"><a href="#services" className="hover:text-gold transition-colors">خدماتنا</a></li>
                <li><a href="#contact" className="hover:text-gold transition-colors">اتصل بنا</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">تابعنا</h3>
              <div className="flex space-x-4">
                {/* Social Media Icons */}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>© 2024 مكتب المحاماة الأستاذ الصادق فرحات موسى. جميع الحقوق محفوظة</p>
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
