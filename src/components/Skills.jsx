import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Server, 
  Wrench,
  FileCode,
  Smartphone
} from 'lucide-react';

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
      { name: 'HTML5', icon: FileCode },
      { name: 'CSS3', icon: FileCode },
      { name: 'JavaScript', icon: Code2 },
      { name: 'TypeScript', icon: Code2 },
      { name: 'React', icon: Code2 },
      { name: 'Tailwind CSS', icon: FileCode },
      { name: 'Vue.js', icon: Code2 },
      { name: 'Next.js', icon: Code2 }
    ],
    backend: [
      { name: 'Node.js', icon: Server },
      { name: 'Express', icon: Server },
      { name: 'Python', icon: Code2 },
      { name: 'Django', icon: Server },
      { name: 'Flask', icon: Server },
      { name: 'Java', icon: Code2 }
    ],
    databases: [
      { name: 'MongoDB', icon: Database },
      { name: 'PostgreSQL', icon: Database },
      { name: 'MySQL', icon: Database },
      { name: 'Redis', icon: Database }
    ],
    tools: [
      { name: 'Git', icon: Wrench },
      { name: 'GitHub', icon: Wrench },
      { name: 'Docker', icon: Wrench },
      { name: 'Linux', icon: Wrench },
      { name: 'VS Code', icon: Wrench },
      { name: 'Postman', icon: Wrench }
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
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 px-2 sm:px-4 md:px-0"
          >
            {skillsData[activeTab].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, type: 'spring', stiffness: 400, damping: 28 }}
                whileHover={{ 
                  scale: 1.03, 
                  y: -4,
                  boxShadow: "0 12px 28px rgba(124, 58, 237, 0.18)"
                }}
                className="bg-gray-700 border border-gray-600 rounded-xl p-4 sm:p-5 lg:p-6 hover:border-purple-500/50 transition-all duration-300 group"
              >
                <div className="flex flex-col items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500/30 to-blue-500/30 group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300 group-hover:scale-110 flex-shrink-0">
                    <skill.icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-300 group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                  </div>
                  <span className="font-semibold text-gray-200 text-center text-xs sm:text-sm md:text-base">
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
