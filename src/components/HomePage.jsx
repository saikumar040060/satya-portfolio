import { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaJava, FaAws, FaDocker, FaGithub, FaLinkedin,
  FaFileDownload, FaEye, FaExternalLinkAlt, FaCode,
  FaLock, FaChartBar, FaEnvelope, FaServer
} from 'react-icons/fa';
import {
  SiSpringboot, SiPostgresql, SiMysql,
  SiRedis, SiKubernetes, SiMongodb
} from 'react-icons/si';
import { ThemeContext } from './ThemeContext';
import Navbar from './Navbar';

function ProjectThumbnail({ gradient, Icon, label }) {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${gradient} relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      {Icon && <Icon className="text-white/20 mb-3" size={80} />}
      <span className="text-white/50 text-xs font-semibold tracking-widest uppercase">{label}</span>
    </div>
  );
}

const projects = [
  { id: 1, title: 'E-Commerce Microservices Platform', tagline: '5-service microservices backend with Kafka & Redis', description: 'Architected a microservices backend with 5 services (User, Product, Order, Payment, Inventory) using Spring Boot. Built RESTful APIs with Swagger docs, Kafka for order processing, and Redis caching reducing queries by 60%. Deployed on AWS with Docker and Resilience4j circuit breakers.', technologies: ['Java', 'Spring Boot', 'Spring Cloud', 'MySQL', 'Redis', 'Kafka', 'Docker', 'AWS'], category: 'backend', gradient: 'from-emerald-700 to-teal-900', Icon: FaServer, liveUrl: '#', codeUrl: 'https://github.com/saikumar040060' },
  { id: 2, title: 'Hotel Booking Management System', tagline: 'Full booking & payment backend with CI/CD on AWS', description: 'Designed a backend handling reservations and payments with optimized PostgreSQL queries. Built RESTful APIs with JWT authentication and RBAC using Spring Boot. Created a Jenkins CI/CD pipeline for automated AWS deployment.', technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'JWT', 'Docker', 'AWS', 'Jenkins'], category: 'backend', gradient: 'from-violet-700 to-purple-900', Icon: FaLock, liveUrl: '#', codeUrl: 'https://github.com/saikumar040060' },
  { id: 3, title: 'Real-Time Task Management API', tagline: 'WebSocket-powered collaboration backend', description: 'Developed a backend API with WebSocket for real-time collaboration using Spring STOMP. Used MongoDB for flexible schema storage and event-driven architecture for real-time notifications.', technologies: ['Java', 'Spring Boot', 'WebSocket', 'MongoDB', 'Docker', 'Event-Driven'], category: 'backend', gradient: 'from-orange-600 to-rose-900', Icon: FaChartBar, liveUrl: '#', codeUrl: 'https://github.com/saikumar040060' },
  { id: 4, title: 'Automated Grading System', tagline: 'Python backend for evaluating student submissions', description: 'Built during Graduate Teaching Assistantship at Lawrence Technological University. Python backend for automated evaluation and grading of student code submissions. Supported 50+ students in data structures, algorithms, and software engineering.', technologies: ['Python', 'REST API', 'PostgreSQL', 'Automated Testing', 'PyTest'], category: 'fullstack', gradient: 'from-sky-600 to-indigo-900', Icon: FaCode, liveUrl: '#', codeUrl: 'https://github.com/saikumar040060' },
];

const TABS = ['all', 'backend', 'fullstack'];

const techStack = [
  { icon: <FaJava size={40} />, name: 'Java' },
  { icon: <SiSpringboot size={40} />, name: 'Spring Boot' },
  { icon: <SiPostgresql size={40} />, name: 'PostgreSQL' },
  { icon: <SiMysql size={40} />, name: 'MySQL' },
  { icon: <SiMongodb size={40} />, name: 'MongoDB' },
  { icon: <SiRedis size={40} />, name: 'Redis' },
  { icon: <FaServer size={40} />, name: 'Kafka' },
  { icon: <FaAws size={40} />, name: 'AWS' },
  { icon: <FaDocker size={40} />, name: 'Docker' },
  { icon: <SiKubernetes size={40} />, name: 'Kubernetes' },
  { icon: <FaServer size={40} />, name: 'Microservices' },
  { icon: <FaLock size={40} />, name: 'Spring Security' },
];

function HomePage() {
  const { darkMode } = useContext(ThemeContext);
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const texts = ['Building scalable microservices', 'Java Spring Boot specialist', 'AWS cloud deployments', 'API design & architecture', 'Backend Software Engineer'];

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const timeout = setTimeout(() => {
      if (!isDeleting && charIndex === texts[textIndex].length) { setIsDeleting(true); }
      else if (isDeleting && charIndex === 0) { setIsDeleting(false); setTextIndex((textIndex + 1) % texts.length); }
      else { setCharIndex(isDeleting ? charIndex - 1 : charIndex + 1); }
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts]);

  const filteredProjects = activeTab === 'all' ? projects : projects.filter((p) => p.category === activeTab);

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="dark:bg-gray-900 dark:text-gray-100 bg-white text-gray-900 transition-colors duration-300">
        <Navbar />

        <header id="home" className="relative bg-gradient-to-br from-gray-900 to-black dark:from-gray-100 dark:to-white text-white dark:text-black py-32 px-4 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div key={i} className="absolute rounded-full bg-orange-400/20 dark:bg-orange-600/20"
                initial={{ x: Math.random() * 100, y: Math.random() * 100, width: Math.random() * 10 + 2, height: Math.random() * 10 + 2, opacity: 0 }}
                animate={{ x: Math.random() * 100, y: Math.random() * 100, opacity: [0, 0.2, 0], transition: { duration: Math.random() * 10 + 10, repeat: Infinity, repeatType: 'reverse' } }}
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
            ))}
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 bg-orange-400/10 border border-orange-400/25 text-orange-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" /> Open to Opportunities
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-5xl md:text-6xl font-bold mb-4 text-orange-400 dark:text-orange-600">
              <span className="inline-block">Hi, I'm</span> <br />Satya Sai Kumar <br />Dwarapureddy
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="text-xl mb-8 text-gray-300 dark:text-gray-700">
              Backend Engineer <span className="text-orange-400 dark:text-orange-600">•</span> Java & Spring Boot <span className="text-orange-400 dark:text-orange-600">•</span> AWS & Microservices
            </motion.p>
            <div className="h-16 text-2xl md:text-3xl mb-8 font-light text-orange-300 dark:text-orange-500">
              {texts[textIndex].substring(0, charIndex)}<span className="animate-pulse">|</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a whileHover={{ y: -3, boxShadow: '0 10px 20px rgba(255,165,0,0.3)' }} whileTap={{ scale: 0.95 }} href="#projects" className="bg-orange-400 dark:bg-orange-600 text-black px-6 py-3 rounded-full font-semibold hover:bg-orange-300 dark:hover:bg-orange-500 transition-colors flex items-center gap-2">
                <FaEye /> View My Work
              </motion.a>
              <motion.a whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }} href="/satya_resume.pdf" download="Satya_Sai_Kumar_Resume.pdf" className="bg-gray-800 dark:bg-gray-200 text-white dark:text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors flex items-center gap-2">
                <FaFileDownload /> Download Resume
              </motion.a>
            </div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-16">
              <div className="text-gray-400 dark:text-gray-600 text-sm mb-2">Scroll down</div>
              <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full mx-auto relative">
                <motion.div animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }} className="w-1 h-2 bg-gray-400 dark:bg-gray-600 rounded-full absolute top-2 left-1/2 -translate-x-1/2" />
              </div>
            </motion.div>
          </div>
        </header>

        <section id="skills" className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black dark:from-gray-100 dark:to-white">
          <div className="max-w-6xl mx-auto">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold mb-2 text-center text-orange-400 dark:text-orange-600">My Tech Stack</motion.h2>
            <p className="text-gray-400 dark:text-gray-600 mb-12 text-center max-w-2xl mx-auto">Technologies I use to build high-performance backend systems</p>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
              {techStack.map((tech, index) => (
                <motion.div key={tech.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.07, duration: 0.4 }} whileHover={{ y: -10, scale: 1.08 }} className="bg-gray-800 dark:bg-gray-200 p-5 rounded-xl shadow-md cursor-default relative group flex flex-col items-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  <div className="text-orange-400 dark:text-orange-600 mb-3">{tech.icon}</div>
                  <h3 className="font-medium text-white dark:text-black text-center text-sm">{tech.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-gray-800/50 dark:bg-gray-200/50 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-400/10 dark:bg-orange-600/10 rounded-full filter blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-400/10 dark:bg-orange-600/10 rounded-full filter blur-3xl" />
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="md:w-1/3">
                <div className="bg-gradient-to-br from-orange-400 to-orange-600 p-1 rounded-full">
                  <div className="bg-gray-900 dark:bg-white p-1 rounded-full">
                    <img src="/profile.jpg" alt="Profile" className="rounded-full w-full aspect-square object-cover" />
                  </div>
                </div>
              </motion.div>
              <div className="md:w-2/3">
                <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl font-bold mb-6 text-orange-400 dark:text-orange-600">About Me</motion.h2>
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-gray-300 dark:text-gray-700 mb-4 text-lg leading-relaxed">
                  Backend Software Engineer with 3+ years building scalable systems using Java Spring Boot and microservices. Expert in RESTful APIs, cloud deployments on AWS, and distributed systems architecture.
                </motion.p>
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-gray-300 dark:text-gray-700 mb-4 text-lg leading-relaxed">
                  Previously Backend Developer at <span className="text-orange-400 font-semibold">Firstzen Solutions</span> (Hyderabad), where I designed REST APIs handling 10,000+ daily requests, led microservices migration achieving 20% performance improvement, and reduced database load by 50% using Redis caching.
                </motion.p>
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-gray-300 dark:text-gray-700 mb-8 text-lg leading-relaxed">
                  M.S. Computer Science graduate from <span className="text-orange-400 font-semibold">Lawrence Technological University</span>, Michigan (Dec 2025). B.Tech in ECE from ANITS, Visakhapatnam, India.
                </motion.p>
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="flex flex-wrap gap-4">
                  {[{ value: '3+', label: 'Years Experience' }, { value: '10K+', label: 'Daily API Requests' }, { value: '90%+', label: 'Test Coverage' }, { value: '50%', label: 'DB Load Reduced' }].map((stat) => (
                    <div key={stat.label} className="bg-gray-800/50 dark:bg-gray-200/50 border border-gray-700 dark:border-gray-300 rounded-lg p-4 flex-1 min-w-[130px]">
                      <div className="text-orange-400 dark:text-orange-600 text-3xl font-bold mb-1">{stat.value}</div>
                      <div className="text-gray-300 dark:text-gray-700 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="py-20 px-4 bg-gray-900 dark:bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold mb-2 text-center text-orange-400 dark:text-orange-600">Experience</motion.h2>
            <p className="text-gray-400 dark:text-gray-600 mb-12 text-center">My professional journey</p>
            <div className="relative border-l-2 border-orange-400/30 ml-4 space-y-10">
              {[
                { role: 'Graduate Teaching Assistant', company: 'Lawrence Technological University', location: 'Southfield, MI', period: 'Jun 2024 – Apr 2025', points: ['Built Python backend for automated student evaluation & grading systems', 'Mentored 50+ students in data structures, algorithms & backend development', 'Conducted technical sessions on API design, database design & system architecture'] },
                { role: 'Backend Developer', company: 'Firstzen Solutions Private Limited', location: 'Hyderabad, India', period: 'Jan 2022 – Dec 2023', points: ['Designed RESTful APIs using Java Spring Boot handling 10,000+ daily requests with 99.9% uptime', 'Led migration to microservices architecture — 20% performance improvement', 'Implemented Redis caching reducing database load by 50%', 'Deployed on AWS (EC2, RDS, S3) with Docker & Jenkins CI/CD', 'Achieved 90%+ test coverage using JUnit and Mockito'] },
                { role: 'Java Cloud Intern', company: 'Firstzen Solutions Private Limited', location: 'Hyderabad, India', period: 'May 2021 – Dec 2021', points: ['Developed Java backend services deployed on AWS using Spring Boot', 'Worked with MySQL databases — schema design and query optimization', 'Participated in code reviews in Agile/Scrum environment'] },
              ].map((exp, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="ml-8 relative">
                  <div className="absolute -left-[2.85rem] top-1 w-4 h-4 rounded-full bg-orange-400 border-4 border-gray-900 dark:border-gray-50" />
                  <div className="bg-gray-800 dark:bg-gray-100 border border-gray-700 dark:border-gray-200 rounded-xl p-5 hover:border-orange-400/40 transition-colors">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-white dark:text-black">{exp.role}</h3>
                        <p className="text-orange-400 dark:text-orange-600 font-semibold text-sm">{exp.company} · {exp.location}</p>
                      </div>
                      <span className="text-xs bg-orange-400/15 text-orange-400 px-3 py-1 rounded-full font-semibold whitespace-nowrap">{exp.period}</span>
                    </div>
                    <ul className="space-y-1.5">
                      {exp.points.map((pt, j) => (
                        <li key={j} className="text-gray-400 dark:text-gray-600 text-sm flex gap-2"><span className="text-orange-400 mt-0.5">▸</span>{pt}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-20 px-4 bg-gray-800 dark:bg-gray-200">
          <div className="max-w-6xl mx-auto">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold mb-2 text-center text-orange-400 dark:text-orange-600">Featured Projects</motion.h2>
            <p className="text-gray-400 dark:text-gray-600 mb-10 text-center max-w-2xl mx-auto">Production-grade backend systems built with Java, Spring Boot, AWS & more.</p>
            <div className="flex justify-center gap-3 mb-12 flex-wrap">
              {TABS.map((tab) => (
                <motion.button key={tab} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-full font-medium capitalize transition-all text-sm ${activeTab === tab ? 'bg-orange-400 dark:bg-orange-600 text-black shadow-lg shadow-orange-400/30' : 'bg-gray-700 dark:bg-gray-300 text-gray-300 dark:text-gray-700 hover:bg-gray-600 dark:hover:bg-gray-400'}`}>
                  {tab === 'all' ? 'All Projects' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </motion.button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div key={project.id} layout initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} whileHover={{ y: -6 }}
                    className="bg-gray-900 dark:bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-700 dark:border-gray-200 hover:border-orange-400/40 transition-all group flex flex-col">
                    <div className="h-48 relative overflow-hidden">
                      <ProjectThumbnail gradient={project.gradient} Icon={project.Icon} label={project.category} />
                      <div className="absolute inset-0 bg-black/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <p className="text-white text-base font-semibold px-6 text-center">{project.tagline}</p>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-white dark:text-black mb-2">{project.title}</h3>
                      <p className="text-gray-400 dark:text-gray-600 text-sm mb-4 leading-relaxed flex-1">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.technologies.map((tech) => (<span key={tech} className="bg-orange-400/15 text-orange-400 px-3 py-1 rounded-full text-xs font-medium">{tech}</span>))}
                      </div>
                      <div className="flex gap-3 mt-auto">
                        <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm bg-orange-400 dark:bg-orange-600 text-black px-4 py-2 rounded-full font-semibold flex items-center gap-2 hover:bg-orange-300 transition-colors">
                          <FaExternalLinkAlt size={11} /> Live Demo
                        </motion.a>
                        <motion.a whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="text-sm border border-gray-600 dark:border-gray-400 text-gray-300 dark:text-gray-700 px-4 py-2 rounded-full font-semibold hover:border-orange-400 hover:text-orange-400 flex items-center gap-2 transition-colors">
                          <FaGithub size={13} /> Source Code
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-14 text-center">
              <p className="text-gray-400 dark:text-gray-600 mb-4">Want to explore more of my work?</p>
              <motion.a whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }} href="https://github.com/saikumar040060" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black border border-gray-700 dark:border-gray-300 px-6 py-3 rounded-full font-semibold hover:border-orange-400 hover:text-orange-400 transition-all">
                <FaGithub size={18} /> View All Projects on GitHub
              </motion.a>
            </motion.div>
          </div>
        </section>

        <section id="resume" className="py-20 px-4 bg-gray-900 dark:bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold mb-12 text-center text-orange-400 dark:text-orange-600">My Resume</motion.h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <div className="bg-gray-800 dark:bg-white p-4 rounded-lg shadow-xl border border-gray-700 dark:border-gray-300">
                  <img src="/resume-preview.jpg" alt="Resume Preview" className="w-full h-auto rounded-lg" />
                </div>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4 text-white dark:text-black">Key Highlights</h3>
                <ul className="text-gray-300 dark:text-gray-700 mb-6 space-y-2 text-sm leading-relaxed">
                  <li>▸ 3+ years Java / Spring Boot backend experience</li>
                  <li>▸ Microservices, REST APIs, GraphQL & API design</li>
                  <li>▸ AWS (EC2, S3, RDS, Lambda), Docker, Kubernetes</li>
                  <li>▸ Kafka, RabbitMQ, Redis — event-driven systems</li>
                  <li>▸ OAuth 2.0, JWT, Spring Security, RBAC</li>
                  <li>▸ M.S. Computer Science — Lawrence Tech University</li>
                </ul>
                <motion.a whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }} href="/satya_resume.pdf" download="Satya_Sai_Kumar_Resume.pdf" className="inline-flex items-center gap-2 bg-orange-400 dark:bg-orange-600 text-black px-6 py-3 rounded-full font-semibold hover:bg-orange-300 transition-colors">
                  <FaFileDownload size={16} /> Download Full Resume
                </motion.a>
              </div>
            </div>
          </div>
        </section>

        <footer id="contact" className="bg-gradient-to-r from-gray-900 to-black dark:from-gray-100 dark:to-white py-12 px-4 border-t border-gray-800 dark:border-gray-200">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-10">
              <div>
                <h3 className="text-2xl font-bold text-orange-400 dark:text-orange-600 mb-1">Satya Sai Kumar Dwarapureddy</h3>
                <p className="text-gray-400 dark:text-gray-600">Backend Software Engineer · Open to Opportunities</p>
              </div>
              <div className="flex flex-col items-center md:items-end gap-3">
                <div className="text-gray-300 dark:text-gray-700 text-sm mb-1">Let's connect</div>
                <div className="flex gap-5">
                  {[{ Icon: FaGithub, href: 'https://github.com/saikumar040060', label: 'GitHub' }, { Icon: FaLinkedin, href: 'https://www.linkedin.com/in/dwarapureddysaikumar/', label: 'LinkedIn' }, { Icon: FaEnvelope, href: 'mailto:saikumar040060@gmail.com', label: 'Email' }, { Icon: FaFileDownload, href: '/satya_resume.pdf', label: 'Resume' }].map(({ Icon, href, label }) => (
                    <motion.a key={label} whileHover={{ y: -3 }} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" aria-label={label} className="text-gray-300 dark:text-gray-700 hover:text-orange-400 dark:hover:text-orange-600 transition-colors">
                      <Icon size={24} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-800 dark:border-gray-200 text-center text-gray-500 dark:text-gray-400 text-sm">
              <p>© {new Date().getFullYear()} Satya Sai Kumar Dwarapureddy. All rights reserved.</p>
              <p className="mt-1">Built with React, Tailwind CSS & Framer Motion</p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default HomePage;
