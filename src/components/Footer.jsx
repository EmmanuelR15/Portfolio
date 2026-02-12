import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, Code, Zap, Star, ChevronUp } from 'lucide-react';

const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com/EmmanuelR15', label: 'GitHub', external: true },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/emmanuzdev/', label: 'LinkedIn', external: true },
  { icon: Mail, href: 'mailto:emmanuzdev@gmail.com', label: 'Email', external: false },
];

const QUICK_LINKS = [
  { name: 'Inicio', id: 'home' },
  { name: 'Sobre mí', id: 'about' },
  { name: 'Proyectos', id: 'projects' },
  { name: 'Skills', id: 'skills' },
  { name: 'Contacto', id: 'contact' },
];

const footerVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const iconVariants = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    if (typeof document === 'undefined' || typeof window === 'undefined') return;
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-10 sm:py-12" role="contentinfo">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center space-y-6 sm:space-y-8"
          variants={footerVariants}
          initial="initial"
          animate="animate"
        >
          {/* Logo and Title */}
          <div className="space-y-3 sm:space-y-4">
            <motion.h1 
              className="text-2xl sm:text-3xl font-bold gradient-text inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Emmanuel Ruiz
            </motion.h1>
            <p className="text-gray-400 max-w-md mx-auto text-sm sm:text-base px-2">
              Creando experiencias web excepcionales con pasión y dedicación
            </p>
          </div>

          {/* Social Links - centrados y táctiles en móvil */}
          <motion.div
            className="flex justify-center items-center gap-4 sm:gap-6 flex-wrap"
            variants={footerVariants}
            role="list"
          >
            {Array.isArray(SOCIAL_LINKS) && SOCIAL_LINKS.map((social) => {
              const Icon = social?.icon;
              if (!Icon) return null;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.external ? '_blank' : undefined}
                  rel={social.external ? 'noopener noreferrer' : undefined}
                  className="min-w-[44px] min-h-[44px] w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 hover:shadow-card-hover transition-all duration-300 group focus-ring"
                  variants={iconVariants}
                  whileHover={{ scale: 1.12, rotate: 8 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" aria-hidden="true" />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Tech Stack Icons */}
          <motion.div 
            className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5" />
              <span className="text-sm">React</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span className="text-sm">Tailwind</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              <span className="text-sm">Framer Motion</span>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="w-24 h-px bg-gray-700 mx-auto"></div>

          {/* Quick Links - columna en móvil, fila en desktop */}
          <motion.nav 
            aria-label="Enlaces rápidos del sitio" 
            className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-2 sm:gap-4 md:gap-6 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {Array.isArray(QUICK_LINKS) && QUICK_LINKS.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-gray-400 hover:text-purple-400 transition-colors duration-200 font-medium focus-ring rounded px-3 py-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center sm:min-h-0 sm:min-w-0 sm:py-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                aria-label={`Ir a ${link.name}`}
              >
                {link.name}
              </motion.button>
            ))}
          </motion.nav>

          {/* Copyright */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 text-gray-400 text-xs sm:text-sm text-center px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <div className="flex items-center gap-2">
              <span>© {currentYear} Emmanuel Ruiz. Todos los derechos reservados.</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Hecho con</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.div>
              <span>usando</span>
              <span className="text-purple-400 font-medium">React + Tailwind CSS</span>
            </div>
          </motion.div>

          {/* Back to Top Button - táctil y visible en móvil */}
          <motion.button
            type="button"
            onClick={() => scrollToSection('home')}
            className="min-w-[48px] min-h-[48px] w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-300 mx-auto group fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-40 focus-ring"
            aria-label="Volver arriba"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp className="w-6 h-6 text-white group-hover:-translate-y-1 transition-transform duration-200" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
