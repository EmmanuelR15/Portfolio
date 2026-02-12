import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { User, Award, Briefcase, GraduationCap, Code, Target, Server, Globe, Database } from 'lucide-react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isVisible, setIsVisible] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

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

  const statsVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    },
  };

  const stats = [
    {
      icon: Code,
      value: "5+",
      label: "Años"
    },
    {
      icon: Server,
      value: "15+",
      label: "Proyectos"
    },
    {
      icon: Database,
      value: "REST",
      label: "APIs"
    },
    {
      icon: Globe,
      value: "Web",
      label: "Full-stack"
    }
  ];

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <section id="about" className="py-16 md:py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid md:grid-cols-2 gap-8 md:gap-10 items-center">
          {/* Left Column - Image */}
          <motion.div
            variants={leftVariants}
            initial="initial"
            animate={isVisible ? "animate" : "initial"}
            className="relative order-1 md:order-1"
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 mx-auto">
              {/* Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full"></div>
              
              {/* Image Container */}
              <div className="absolute inset-2 bg-white rounded-full overflow-hidden">
                {imageError ? (
                  <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                    <span className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white">
                      ER
                    </span>
                  </div>
                ) : (
                  <img
                    src="/images/profile/profile.jpg"
                    alt="Emmanuel Ruiz"
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                )}
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute top-4 right-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Code className="w-5 h-5 text-blue-600" />
              </motion.div>

              <motion.div
                className="absolute bottom-4 left-4 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <GraduationCap className="w-5 h-5 text-purple-600" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            variants={rightVariants}
            initial="initial"
            animate={isVisible ? "animate" : "initial"}
            className="space-y-4 order-2 md:order-2 px-4 md:px-0"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Sobre <span className="gradient-text">Mí</span>
              </h2>
              <div className="w-20 h-1 bg-blue-600 rounded-full mb-6"></div>
            </div>

            <div className="space-y-3">
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Desarrollador Full Stack con sólida base en backend y experiencia en 
                frontend moderno. Mi objetivo es construir aplicaciones web escalables 
                y eficientes, aplicando código limpio y buenas prácticas de desarrollo.
              </p>
              
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Manejo avanzado del ecosistema JavaScript/TypeScript (React, Node.js, Express), 
                junto con experiencia en Python/Django y Java. Conocimiento en bases de datos 
                SQL (PostgreSQL, MySQL) y NoSQL (MongoDB), arquitecturas RESTful y despliegue 
                en entornos Docker. Me enfoco en soluciones prácticas que aporten valor real.
              </p>
              
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Trabajo con metodologías ágiles y control de versiones en Git/GitHub. 
                Constantemente exploro nuevas tecnologías, frameworks y patrones de diseño 
                para optimizar tanto el rendimiento como la experiencia de desarrollo. 
                Mi objetivo es crear código mantenible que evolucione con las necesidades del proyecto.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 px-4 md:px-0">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="text-center p-3 sm:p-4 bg-gray-800 border border-gray-700 rounded-xl hover:border-blue-500 transition-shadow"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white">
                    <stat.icon size={18} className="sm:w-5 sm:h-5" />
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400 mt-1 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
