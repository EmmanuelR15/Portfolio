import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Calendar, Loader2 } from 'lucide-react';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  const leftVariants = {
    initial: { opacity: 0, x: -60 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    },
  };

  const rightVariants = {
    initial: { opacity: 0, x: 60 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Formulario enviado:', formData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus(''), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    return formData.name.trim() !== '' && 
           formData.email.trim() !== '' && 
           formData.message.trim() !== '' &&
           formData.email.includes('@');
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'emmanuzdev@gmail.com',
      href: 'mailto:emmanuzdev@gmail.com',
      external: false,
    },
    {
      icon: Phone,
      label: 'Teléfono',
      value: '+54 9 362 4-123456',
      href: 'tel:+5493624123456',
      external: false,
    },
    {
      icon: MapPin,
      label: 'Ubicación',
      value: 'Resistencia, Chaco, Argentina',
      href: 'https://maps.google.com/?q=Resistencia,Chaco,Argentina',
      external: true,
    },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/EmmanuelR15', external: true },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/emmanuzdev/', external: true },
  ];

  // Reemplaza con tu enlace real de Calendly o Google Calendar
  const scheduleMeetingUrl = 'https://calendly.com/emmanuzdev/30min';

  return (
    <section 
      id="contact" 
      aria-labelledby="contact-heading"
      className="relative py-12 sm:py-16 lg:py-24 overflow-hidden"
    >
      {/* Fondo gradiente - se adapta sin cortar */}
      <div className="absolute inset-0 min-h-full bg-contact-gradient bg-cover bg-center" aria-hidden="true" />
      <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

      <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-8 sm:mb-12">
          <motion.h2 
            id="contact-heading"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Contacto
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mx-auto mb-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isVisible ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <motion.p 
            className="text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            ¿Tienes un proyecto en mente? Me encantaría saber de ti. Envíame un mensaje o agenda una reunión.
          </motion.p>
        </div>

        {/* Formulario columna en móvil, dos columnas en desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            variants={leftVariants}
            initial="initial"
            animate={isVisible ? "animate" : "initial"}
          >
            <div className="bg-white/10 dark:bg-gray-900/40 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 dark:border-purple-500/20 p-5 sm:p-6 lg:p-8 transition-shadow hover:shadow-card-hover w-full">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                Envíame un mensaje
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400/50 text-white placeholder-white/50 transition-all duration-300 focus-ring"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400/50 text-white placeholder-white/50 transition-all duration-300 focus-ring"
                    placeholder="tu.email@ejemplo.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400/50 text-white placeholder-white/50 transition-all duration-300 resize-none focus-ring"
                    placeholder="Cuéntame sobre tu proyecto..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    type="submit"
                    disabled={!validateForm() || isSubmitting}
                    className="w-full sm:flex-1 bg-white text-purple-600 font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 border-2 border-transparent disabled:opacity-50 disabled:cursor-not-allowed focus-ring min-h-[48px] min-w-[44px]"
                    whileHover={validateForm() && !isSubmitting ? { scale: 1.02, boxShadow: '0 12px 24px -8px rgba(124, 58, 237, 0.3)' } : {}}
                    whileTap={validateForm() && !isSubmitting ? { scale: 0.98 } : {}}
                    aria-busy={isSubmitting}
                    aria-disabled={!validateForm() || isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                        <span>Enviando...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send size={20} aria-hidden="true" />
                        Enviar Mensaje
                      </span>
                    )}
                  </motion.button>

                  <motion.a
                    href={scheduleMeetingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-semibold border-2 border-white/60 text-white focus-ring min-h-[48px] min-w-[44px] relative overflow-hidden group/btn"
                    whileHover={{ scale: 1.05, boxShadow: '0 16px 32px -8px rgba(124, 58, 237, 0.4)' }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    aria-label="Agendar una reunión por Calendly"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                    <span className="relative flex items-center gap-2">
                      <Calendar size={20} aria-hidden="true" />
                      Agendar reunión
                    </span>
                  </motion.a>
                </div>
              </form>

              {submitStatus === 'success' && (
                <motion.div
                  role="status"
                  aria-live="polite"
                  className="mt-4 p-4 bg-green-500/25 border border-green-400/50 rounded-lg text-green-100 flex items-center gap-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/30 text-green-300" aria-hidden="true">✓</span>
                  <span>¡Mensaje enviado con éxito! Te responderé pronto.</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  role="alert"
                  aria-live="assertive"
                  className="mt-4 p-4 bg-red-500/25 border border-red-400/50 rounded-lg text-red-100 flex items-center gap-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/30 text-red-300" aria-hidden="true">✕</span>
                  <span>Hubo un error al enviar. Por favor, inténtalo de nuevo.</span>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={rightVariants}
            initial="initial"
            animate={isVisible ? "animate" : "initial"}
            className="space-y-8"
          >
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.external ? "_blank" : undefined}
                  rel={info.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 w-full bg-white/10 dark:bg-gray-900/40 backdrop-blur-md rounded-xl border border-white/20 dark:border-purple-500/20 group transition-all duration-300 focus-ring hover:scale-[1.02] hover:shadow-card-hover min-h-[44px]"
                  whileHover={{ x: 6 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label={`${info.label}: ${info.value}`}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500/30 to-blue-500/30 text-white group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300 shadow-inner">
                    <info.icon className="w-6 h-6 text-white" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm text-white/80">{info.label}</div>
                    <div className="font-semibold text-white truncate group-hover:text-purple-200 transition-colors">
                      {info.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="bg-white/10 dark:bg-gray-900/40 backdrop-blur-md rounded-xl shadow-lg p-5 sm:p-6 border border-white/20 dark:border-purple-500/20 w-full">
              <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">
                Sígueme en redes
              </h3>
              <div className="flex gap-3 sm:gap-4 justify-center sm:justify-start flex-wrap">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-[44px] min-h-[44px] w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500/40 to-blue-500/40 text-white hover:from-purple-400 hover:to-blue-400 transition-all duration-300 focus-ring hover:scale-110 hover:shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6" aria-hidden="true" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600/90 to-blue-600/90 rounded-xl p-6 text-white border border-white/10 shadow-lg">
              <h3 className="text-lg font-bold mb-3">
                ¿Listo para empezar tu proyecto?
              </h3>
              <p className="text-white/90 mb-4">
                Disponible para proyectos freelance y oportunidades laborales. 
                Tiempo de respuesta: 24-48 horas.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
