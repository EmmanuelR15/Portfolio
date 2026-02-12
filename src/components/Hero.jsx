import React from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/CV.pdf';
    link.download = 'Emmanuel-Ruiz-CV.pdf';
    link.click();
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-14 sm:-mt-16 bg-black">
      {/* FONDO DECORATIVO - escala sin cortar */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 min-h-full min-w-full bg-cover bg-center">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] sm:bg-[size:24px_24px]" />
        
        {/* Animated gradient orbs - responsive size */}
        <motion.div
          className="absolute top-0 left-0 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 right-0 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/2 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20 sm:mb-24">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-3 sm:space-y-4 md:space-y-6"
        >
          {/* ¡Hola! Soy */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl font-light"
          >
            ¡Hola! Soy
          </motion.p>

          {/* NOMBRE - mobile text-2xl, desktop text-5xl+ */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="relative">
              <span className="absolute inset-0 text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold gradient-text-animated blur-sm opacity-50" aria-hidden="true">
                Emmanuel Ruiz
              </span>
              <span className="relative text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold gradient-text-animated leading-tight">
                Emmanuel Ruiz
              </span>
            </h1>
          </motion.div>

          {/* FULL STACK DEVELOPER */}
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }} 
            className="text-base sm:text-lg md:text-2xl lg:text-4xl font-light text-gray-200"
          >
            <span className="font-light">Full Stack</span>{' '}
            <span className="font-bold text-blue-400">Developer</span>
            <span className="animate-pulse">|</span>
          </motion.h2>

          {/* DESCRIPCIÓN */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }} 
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto font-light tracking-wide px-4"
          >
            Especializado en crear experiencias web excepcionales con{' '}
            <span className="text-blue-400 font-semibold">React</span>,{' '}
            <span className="text-purple-400 font-semibold">Node.js</span> y{' '}
            <span className="text-blue-400 font-semibold">tecnologías modernas</span>
          </motion.p>

          {/* BOTONES - áreas táctiles min 44px */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }} 
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-2 sm:px-4"
          >
            {/* Botón Descargar CV */}
            <motion.a
              href="/cv.pdf"
              download
              className="w-full sm:w-auto relative group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg overflow-hidden text-center focus-ring min-h-[48px] min-w-[44px] inline-flex items-center justify-center"
              whileHover={{ scale: 1.06, y: -3, boxShadow: '0 20px 40px -12px rgba(124, 58, 237, 0.4)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              aria-label="Descargar currículum en PDF"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
              <span className="relative flex items-center justify-center gap-2">
                <Download size={18} aria-hidden="true" />
                Descargar CV
              </span>
            </motion.a>

            {/* Botón Ver Proyectos */}
            <motion.button
              onClick={() => scrollToSection('projects')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/90 backdrop-blur-sm text-gray-900 rounded-xl font-semibold shadow-lg border-2 border-transparent hover:border-purple-400 focus-ring min-h-[48px] min-w-[44px]"
              whileHover={{ scale: 1.06, y: -3, boxShadow: '0 20px 40px -12px rgba(124, 58, 237, 0.35)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              aria-label="Ir a la sección Proyectos"
            >
              <span className="flex items-center justify-center gap-2">
                Ver Proyectos
                <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowDown size={18} />
                </motion.div>
              </span>
            </motion.button>
          </motion.div>

          {/* REDES SOCIALES - min 44px táctil */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }} 
            className="flex gap-3 sm:gap-4 justify-center px-4"
          >
            {[
              { icon: Github, href: "https://github.com/EmmanuelR15", color: "hover:bg-gray-700", external: true },
              { icon: Linkedin, href: "https://www.linkedin.com/in/emmanuzdev/", color: "hover:bg-blue-700", external: true },
              { icon: Mail, href: "mailto:emmanuzdev@gmail.com", color: "hover:bg-blue-600", external: false }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target={social.external ? "_blank" : undefined}
                rel={social.external ? "noopener noreferrer" : undefined}
                className={`min-w-[44px] min-h-[44px] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-300 shadow-lg transition-all hover:shadow-card-hover ${social.color} hover:text-white border border-gray-700 focus-ring`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                aria-label={social.href.includes('github') ? 'GitHub' : social.href.includes('linkedin') ? 'LinkedIn' : 'Email'}
              >
                <social.icon size={20} className="sm:w-6 sm:h-6" aria-hidden="true" />
              </motion.a>
            ))}
          </motion.div>

        </motion.div>
      </div>

      {/* FLECHA DE SCROLL */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 sm:bottom-8 md:bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.button
          onClick={() => scrollToSection('about')}
          className="min-w-[44px] min-h-[44px] w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg transition-all cursor-pointer focus-ring"
          animate={{ y: [0, 8, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.15, boxShadow: '0 16px 32px -8px rgba(124, 58, 237, 0.5)' }}
          whileTap={{ scale: 0.95 }}
          aria-label="Ir a la sección Sobre mí"
        >
          <ArrowDown size={20} className="sm:w-6 sm:h-6" />
        </motion.button>
        <motion.p
          className="text-xs sm:text-sm text-gray-400 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Descubre más
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Hero;
