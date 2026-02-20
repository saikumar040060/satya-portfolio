import { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import { ThemeContext } from './ThemeContext';

export default function Navbar() {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  const smoothScroll = (id) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      ['home', 'about', 'projects', 'contact'].forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          const scrollPosition = window.scrollY + 100;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      ref={navRef}
      className="sticky top-0 z-50 bg-gray-900/90 dark:bg-white/90 backdrop-blur-md border-b border-gray-800 dark:border-gray-200"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.a 
            href="#home"
            className="text-orange-400 dark:text-orange-600 font-bold text-xl"
            whileHover={{ scale: 1.05 }}
            onClick={() => smoothScroll('home')}
          >
            Satya Sai Kumar Dwarapureddy
          </motion.a>

          <div className="hidden md:flex items-center space-x-8">
            {['home', 'about', 'projects','resume', 'contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item}`}
                className={`${
                  activeSection === item 
                    ? 'text-orange-400 dark:text-orange-600 font-medium' 
                    : 'text-gray-300 dark:text-gray-700 hover:text-white dark:hover:text-black'
                } transition-colors text-sm uppercase tracking-wider`}
                onClick={(e) => {
                  e.preventDefault();
                  smoothScroll(item);
                }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </motion.a>
            ))}
            
            <button
              onClick={toggleDarkMode}
              className="text-gray-300 dark:text-gray-700 hover:text-orange-400 dark:hover:text-orange-600 ml-4"
              aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="text-gray-300 dark:text-gray-700 hover:text-orange-400 dark:hover:text-orange-600"
              aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 dark:text-gray-700 hover:text-orange-400 dark:hover:text-orange-600"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900/95 dark:bg-white/95 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {['home', 'about', 'projects','resume', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className={`block px-3 py-2 rounded-md text-base ${
                    activeSection === item 
                      ? 'bg-gray-800 dark:bg-gray-200 text-orange-400 dark:text-orange-600' 
                      : 'text-gray-300 dark:text-gray-700 hover:bg-gray-800 dark:hover:bg-gray-200'
                  }`}
                  onClick={() => smoothScroll(item)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}