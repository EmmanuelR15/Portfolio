import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = ({ isScrolled = false, activeSection = 'home' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Forzar estado inicial cerrado
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Cerrar menú cuando se cambia de sección
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [activeSection]);

  const navItems = [
    { id: "home", label: "Inicio" },
    { id: "about", label: "Sobre mí" },
    { id: "projects", label: "Proyectos" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contacto" },
  ];

  const scrollToSection = (sectionId) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 64;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - navbarHeight;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 150);
  };

  const navbarVariants = {
    initial: { y: -100, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.5 },
      },
    },
  };

  const mobileMenuVariants = {
    initial: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0 }
    },
    animate: { 
      opacity: 1, 
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.2, ease: "easeInOut" }
    }
  };

  return (
    <>
      <motion.nav
        role="navigation"
        aria-label="Menú principal"
        className={`fixed top-0 left-0 right-0 w-full z-50 overflow-hidden transition-all duration-300 ${
          isScrolled ? "glass-morphism shadow-lg" : "bg-transparent"
        }`}
        variants={navbarVariants}
        initial="initial"
        animate="animate"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
            <motion.div
              className="flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h1
                className="text-xl sm:text-2xl font-bold gradient-text cursor-pointer focus-ring rounded px-1"
                onClick={() => scrollToSection("home")}
                onKeyDown={(e) => e.key === "Enter" && scrollToSection("home")}
                tabIndex={0}
                role="button"
              >
                ER
              </h1>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-6 lg:ml-10 flex items-baseline gap-1 sm:gap-2">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative px-3 sm:px-4 py-3 rounded-md text-sm lg:text-base font-medium transition-colors duration-300 focus-ring min-h-[44px] ${
                      activeSection === item.id
                        ? "text-white dark:text-white"
                        : isScrolled
                          ? "text-gray-900 hover:text-purple-600 dark:text-gray-200 dark:hover:text-purple-400"
                          : "text-white hover:text-purple-300"
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.span
                        className="absolute left-0 right-0 bottom-0 h-0.5 rounded-full gradient-indicator-animated"
                        layoutId="navbar-active"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        aria-hidden="true"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="md:hidden flex items-center">
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2 rounded-md transition-all duration-300 focus-ring ${
                  isScrolled
                    ? "text-gray-900 hover:bg-purple-100 dark:text-gray-200 dark:hover:bg-purple-900/30"
                    : "text-white hover:bg-white/10"
                }`}
                whileTap={{ scale: 0.9 }}
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence mode="wait">
          {isMobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              className="md:hidden overflow-hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-700"
              variants={mobileMenuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="px-4 sm:px-6 pt-2 pb-4 space-y-1">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative block w-full text-left pl-5 pr-4 py-3 sm:py-3.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 focus-ring min-h-[48px] ${
                      activeSection === item.id
                        ? "text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-md"
                        : "text-white hover:bg-white/10"
                    }`}
                    whileHover={{ x: 6 }}
                    whileTap={{ scale: 0.98 }}
                    aria-current={activeSection === item.id ? "page" : undefined}
                  >
                    {activeSection === item.id && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 rounded-r gradient-indicator-animated" aria-hidden="true" />
                    )}
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <div className="h-14 sm:h-16" aria-hidden="true" />
    </>
  );
};

export default Navbar;
