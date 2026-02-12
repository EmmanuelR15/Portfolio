import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Server, 
  Wrench
} from 'lucide-react';
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaVuejs,
  FaNode,
  FaPython,
  FaJava,
  FaGit,
  FaGithub,
  FaDocker,
  FaLinux
} from 'react-icons/fa';
import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiExpress,
  SiDjango,
  SiFlask,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiPostman
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('frontend');

  const tabs = [
    { id: 'frontend', label: 'Frontend', icon: Code2 },
    { id: 'backend', label: 'Backend', icon: Server },
    { id: 'databases', label: 'Databases', icon: Database },
    { id: 'tools', label: 'Tools & Others', icon: Wrench }
  ];

  const skillsData = {
    frontend: [
      { name: 'HTML5', icon: FaHtml5, color: '#E34C26' },
      { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6' },
      { name: 'JavaScript', icon: FaJs, color: '#F7DF1E' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'React', icon: FaReact, color: '#61DAFB' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Vue.js', icon: FaVuejs, color: '#4FC08D' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' }
    ],
    backend: [
      { name: 'Node.js', icon: FaNode, color: '#339933' },
      { name: 'Express', icon: SiExpress, color: '#FFFFFF' },
      { name: 'Python', icon: FaPython, color: '#3776AB' },
      { name: 'Django', icon: SiDjango, color: '#092E20' },
      { name: 'Flask', icon: SiFlask, color: '#FFFFFF' },
      { name: 'Java', icon: FaJava, color: '#007396' }
    ],
    databases: [
      { name: 'MongoDB', icon: SiMongodb, color: '#13AA52' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
      { name: 'MySQL', icon: SiMysql, color: '#00758F' },
      { name: 'Redis', icon: SiRedis, color: '#DC382D' }
    ],
    tools: [
      { name: 'Git', icon: FaGit, color: '#F1502F' },
      { name: 'GitHub', icon: FaGithub, color: '#181717' },
      { name: 'Docker', icon: FaDocker, color: '#2496ED' },
      { name: 'Linux', icon: FaLinux, color: '#FCC624' },
      { name: 'VS Code', icon: VscCode, color: '#007ACC' },
      { name: 'Postman', icon: SiPostman, color: '#FF6C37' }
    ]
  };

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-white">
            Mis <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto px-2">
            Tecnologías y herramientas que domino para crear soluciones web modernas y eficientes.
          </p>
        </motion.div>

        {/* Tabs - scroll horizontal en móvil */}
        <div role="tablist" aria-label="Categorías de skills" className="flex overflow-x-auto gap-2 mb-6 sm:mb-8 px-2 sm:px-4 pb-2 scrollbar-hide -mx-4 sm:mx-0">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-label={`Ver skills de ${tab.label}`}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold whitespace-nowrap flex items-center gap-2 flex-shrink-0 focus-ring min-h-[44px] ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <tab.icon size={18} className="sm:w-5 sm:h-5" aria-hidden="true" />
              <span className="text-sm sm:text-base">{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Skills Grid con AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-4 md:px-0"
          >
            {skillsData[activeTab].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, type: 'spring', stiffness: 400, damping: 28 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -6,
                  boxShadow: "0 20px 40px rgba(124, 58, 237, 0.25)"
                }}
                className="bg-gray-700 border border-gray-600 rounded-xl p-4 sm:p-5 lg:p-6 hover:border-purple-500/70 transition-all duration-300 group flex flex-col items-center justify-center"
              >
                <div className="flex flex-col items-center gap-3 sm:gap-4">
                  <motion.div 
                    className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-16 md:h-16 lg:w-16 lg:h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-600 to-gray-700 group-hover:from-gray-500 group-hover:to-gray-600 transition-all duration-300 flex-shrink-0 shadow-lg"
                    whileHover={{ rotate: 360, transition: { duration: 0.6 } }}
                  >
                    <skill.icon 
                      className="w-7 h-7 sm:w-8 sm:h-8 md:w-8 md:h-8 transition-all duration-300 group-hover:scale-125" 
                      style={{ color: skill.color }}
                      aria-hidden="true"
                    />
                  </motion.div>
                  <span 
                    className="font-semibold text-gray-200 text-center text-xs sm:text-sm md:text-base group-hover:text-white transition-colors duration-300"
                    role="img"
                    aria-label={`Habilidad: ${skill.name}`}
                  >
                    {skill.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Mensaje final */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-400 mt-12 italic"
        >
          Siempre aprendiendo nuevas tecnologías y expandiendo mi stack 🚀
        </motion.p>
      </div>
    </section>
  );
};

export default Skills;
