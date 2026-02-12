import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Code, Database, Globe, Smartphone, Server } from 'lucide-react';

const PROJECTS = [
  { id: 1, title: 'Conversor de Monedas', description: 'Aplicación de consola en Java que consulta la API exchangerate.host para realizar conversiones en tiempo real. Arquitectura en capas con manejo de errores y persistencia de historial.', image: 'conversor', tech: ['Java', 'API REST', 'Properties', 'Arquitectura MVC'], demoUrl: null, githubUrl: 'https://github.com/EmmanuelR15/ConversorMonedas', category: 'backend', gradient: 'from-green-400 to-green-600' },
  { id: 2, title: 'Concesionaria BlueJ', description: 'Sistema de gestión integral para concesionaria con inventario de vehículos, taller de revisión mecánica (cola FIFO) y lavadero. Incluye CRUD completo y persistencia en archivos CSV.', image: 'concesionaria', tech: ['Java', 'POO', 'Collections', 'Serialización', 'BlueJ'], demoUrl: null, githubUrl: 'https://github.com/EmmanuelR15/Consecionaria-BlueJ', category: 'backend', gradient: 'from-blue-400 to-blue-600' },
  { id: 3, title: 'Java - De Cero a Héroe', description: 'Repositorio educativo completo con ejercicios prácticos desde conceptos básicos hasta temas avanzados: POO, Collections, JDBC, multithreading, patrones de diseño, JUnit y desarrollo web con Java.', image: 'curso-java', tech: ['Java', 'JDBC', 'JUnit', 'Design Patterns', 'Multithreading'], demoUrl: null, githubUrl: 'https://github.com/EmmanuelR15/CursoDeJava', category: 'backend', gradient: 'from-orange-400 to-orange-600' },
  { id: 4, title: 'Habitus - Finance & Habits', description: 'App mobile-first para registro de gastos y hábitos. Backend con Node.js + Express + MongoDB, frontend en React Native con Expo. Incluye Docker Compose para desarrollo.', image: 'habitus', tech: ['React Native', 'Node.js', 'MongoDB', 'Express', 'Docker'], demoUrl: null, githubUrl: 'https://github.com/EmmanuelR15/habitus', category: 'fullstack', gradient: 'from-purple-400 to-purple-600' },
  { id: 5, title: 'Amigo Secreto', description: 'Aplicación web minimalista para organizar sorteos de amigo secreto. Interfaz moderna con glassmorphism, persistencia en localStorage y diseño totalmente responsive.', image: 'amigo-secreto', tech: ['JavaScript', 'HTML5', 'CSS3', 'LocalStorage'], demoUrl: null, githubUrl: 'https://github.com/EmmanuelR15/ChallengeAmigoSecreto', category: 'frontend', gradient: 'from-pink-400 to-pink-600' },
  { id: 6, title: 'Gestor de Tareas en C', description: 'Aplicación de consola para administrar tareas con persistencia en archivos binarios. Permite agregar, modificar, buscar, eliminar y ordenar tareas por prioridad y fecha de vencimiento.', image: 'task-manager', tech: ['C', 'File I/O', 'Estructuras de Datos', 'Algoritmos'], demoUrl: null, githubUrl: 'https://github.com/EmmanuelR15/TaskManager', category: 'backend', gradient: 'from-gray-600 to-gray-800' },
];

const CATEGORIES = [
  { id: 'all', label: 'Todos', icon: Globe },
  { id: 'frontend', label: 'Frontend', icon: Code },
  { id: 'backend', label: 'Backend', icon: Database },
  { id: 'fullstack', label: 'Full Stack', icon: Server },
  { id: 'mobile', label: 'Mobile', icon: Smartphone },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 40 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: (i ?? 0) * 0.08,
      },
    }),
  };

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(
      (project) =>
        selectedCategory === 'all' || project.category === selectedCategory
    );
  }, [PROJECTS, selectedCategory]);

  const getTechIcon = (tech) => {
    const icons = {
      'React': '⚛️',
      'Node.js': '🟢',
      'MongoDB': '🍃',
      'Firebase': '🔥',
      'Vue.js': '💚',
      'Express': '🚂',
      'PostgreSQL': '🐘',
      'MySQL': '🐬',
      'Next.js': '▲',
      'Tailwind': '🎨',
      'Framer': '🎭',
      'Redux': '🔄',
      'Stripe': '💳',
      'JWT': '🔑',
      'Chart.js': '📊',
      'Prisma': '🔮',
      'React Native': '📱',
      'OpenAI': '🤖',
      'API REST': '🔌',
      'Geolocation': '📍',
    };
    return icons[tech] || '💻';
  };

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-24 bg-gray-900">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-8 sm:mb-12">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Mis <span className="gradient-text">Proyectos</span>
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mb-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isVisible ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          ></motion.div>
          
          <motion.p 
            className="text-sm sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Explora mis trabajos más recientes donde aplico las mejores prácticas de desarrollo y tecnologías modernas.
          </motion.p>

          {/* Filter Buttons - scroll horizontal en móvil */}
          <motion.div 
            role="tablist"
            aria-label="Filtrar proyectos por categoría"
            className="flex overflow-x-auto gap-2 sm:gap-3 mb-8 sm:mb-12 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide justify-start sm:justify-center flex-nowrap sm:flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {CATEGORIES.map((category) => (
              <motion.button
                key={category.id}
                role="tab"
                aria-selected={selectedCategory === category.id}
                aria-label={`Filtrar: ${category.label}`}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 px-4 sm:px-6 py-2.5 sm:py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-200 focus-ring min-h-[44px] ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Projects Grid - 1 col móvil, 2 tablet, 3 desktop */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="initial"
          animate={isVisible ? "animate" : "initial"}
        >
          {Array.isArray(filteredProjects) && filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-lg transition-all duration-300 group"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              custom={index}
              whileHover={{ y: -6, scale: 1.02, boxShadow: '0 20px 40px -12px rgba(124, 58, 237, 0.25)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              {/* Project Image */}
              <div className={`relative h-40 sm:h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-50">
                    {getTechIcon(project.tech[0])}
                  </div>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
              </div>

              {/* Project Content - padding reducido en móvil */}
              <div className="p-4 sm:p-5 lg:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 sm:mb-2 group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-400 mb-3 sm:mb-4 line-clamp-3 text-sm sm:text-base">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-purple-500/20 text-purple-300 text-xs sm:text-sm rounded-full font-medium border border-purple-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-3 py-1 bg-gray-600 text-gray-300 text-sm rounded-full">
                      +{project.tech.length - 3}
                    </span>
                  )}
                </div>

                {/* Action Button - Solo GitHub */}
                <div className="flex gap-3">
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 sm:py-2 rounded-lg font-medium hover:shadow-card-hover transition-all duration-200 flex items-center justify-center gap-2 text-sm focus-ring min-h-[44px]"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label={`Ver código de ${project.title} en GitHub`}
                  >
                    <Github size={16} aria-hidden="true" />
                    Ver Código
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;
