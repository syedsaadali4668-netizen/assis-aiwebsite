import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Brain, Code, Database, BookOpen, PenTool, 
  Workflow, CheckCircle2, ChevronRight,
  Layers, Phone, Mail, MapPin, ArrowRight, Sparkles, 
  ArrowUpRight
} from 'lucide-react';

// --- Theme Constants ---
const theme = {
  bg: 'bg-[#F6F9FC]',
  textPrimary: 'text-[#15243A]',
  textSecondary: 'text-[#64748B]',
  glass: 'bg-white/70 backdrop-blur-md border border-white/60 shadow-xl rounded-2xl',
  glassHover: 'hover:bg-white/90 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300',
  textGradient: 'bg-clip-text text-transparent bg-gradient-to-r from-[#18C6D5] via-[#3478F6] to-[#7958E8]',
  buttonGradient: 'bg-gradient-to-r from-[#18C6D5] to-[#3478F6] hover:from-[#13B8A6] hover:to-[#3478F6] text-white shadow-lg shadow-blue-500/25 transition-all',
};

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// --- Mock Data ---
const services = [
  { id: 1, title: "AI Development & Intelligent Systems", icon: <Brain className="text-[#18C6D5]" size={32} />, desc: "We design and develop intelligent AI-powered solutions that solve real-world problems.", list: ["Custom AI Applications", "RAG Systems", "Multi-Agent Architecture"] },
  { id: 2, title: "AI Agents & Automation", icon: <Workflow className="text-[#7958E8]" size={32} />, desc: "Design intelligent autonomous systems that can reason, coordinate, execute tasks, and automate workflows.", list: ["Autonomous Agents", "LangGraph Workflows", "Business Process Automation"] },
  { id: 3, title: "Software & Web Development", icon: <Code className="text-[#3478F6]" size={32} />, desc: "Modern digital products engineered for performance, usability, scalability, and business growth.", list: ["Professional Websites", "SaaS Applications", "Full-Stack Development"] },
  { id: 4, title: "Machine Learning & Data", icon: <Database className="text-[#13B8A6]" size={32} />, desc: "Transform data into actionable intelligence using modern machine learning and predictive technologies.", list: ["ML Model Development", "Predictive Analytics", "Deep Learning"] },
  { id: 5, title: "Academic & Research Solutions", icon: <BookOpen className="text-[#7958E8]" size={32} />, desc: "Professional academic, technical, and research assistance with a focus on quality and accuracy.", list: ["Final Year Projects (FYP)", "Research Formatting", "LaTeX Documents"] },
  { id: 6, title: "Graphic Design & Branding", icon: <PenTool className="text-[#18C6D5]" size={32} />, desc: "Create memorable visual identities and professional digital experiences for modern businesses.", list: ["Logo & Brand Identity", "UI/UX Visual Design", "Digital Advertisements"] }
];

const ecosystem = [
  { name: "ASSIS Workforce", desc: "Intelligent AI agents designed to collaborate, automate workflows, and execute complex tasks.", status: "Available", color: "bg-teal-100 text-teal-700" },
  { name: "ASSIS Research", desc: "An intelligent research environment for knowledge discovery, information analysis, and workflows.", status: "In Development", color: "bg-blue-100 text-blue-700" },
  { name: "ASSIS MCP", desc: "Model Context Protocol infrastructure for connecting AI systems with external tools and services.", status: "In Development", color: "bg-blue-100 text-blue-700" },
  { name: "ASSIS Eval", desc: "Evaluation and quality assessment systems for AI models, agents, and intelligent workflows.", status: "Concept", color: "bg-violet-100 text-violet-700" },
  { name: "ASSIS Model Lab", desc: "An experimental environment for model exploration, AI development, testing, and optimization.", status: "Concept", color: "bg-violet-100 text-violet-700" },
];

const portfolio = [
  { id: 1, title: "Enterprise RAG Assistant", category: "AI Applications", tech: ["Python", "LangChain", "React"], img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "Autonomous Sales Agent", category: "AI Agents", tech: ["CrewAI", "Node.js"], img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "FinTech SaaS Dashboard", category: "SaaS Products", tech: ["Next.js", "Tailwind", "PostgreSQL"], img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "Predictive Analytics Model", category: "Machine Learning", tech: ["PyTorch", "Pandas"], img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800" },
  { id: 5, title: "Next-Gen Web Platform", category: "Web Development", tech: ["React", "Framer Motion"], img: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800" },
  { id: 6, title: "Medical Thesis Formatting", category: "Academic & Research", tech: ["LaTeX", "TikZ"], img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800" },
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // offset for sticky navbar
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filters = ["All", "AI Applications", "AI Agents", "SaaS Products", "Machine Learning", "Web Development"];
  const filteredProjects = activeFilter === "All" ? portfolio : portfolio.filter(p => p.category === activeFilter);

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.textPrimary} font-sans selection:bg-[#18C6D5]/20 selection:text-[#3478F6]`}>
      
      {/* --- Navbar --- */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-md rounded-2xl px-6 py-3' : 'px-2'}`}>
            
            <button onClick={() => scrollToSection('home')} className="flex flex-col text-left group">
              <span className={`text-2xl font-bold tracking-tight ${theme.textGradient}`}>ASSIS AI</span>
              <span className={`text-[0.65rem] tracking-widest font-bold uppercase text-slate-500 group-hover:text-[#3478F6] transition-colors`}>Intelligent Systems. Real Innovation.</span>
            </button>

            <div className="hidden lg:flex items-center space-x-8 font-medium text-sm text-[#15243A]">
              {['Home', 'About', 'Services', 'Ecosystem', 'Portfolio'].map(link => (
                <button 
                  key={link} 
                  onClick={() => scrollToSection(link.toLowerCase())}
                  className="hover:text-[#3478F6] transition-colors font-semibold"
                >
                  {link}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <button onClick={() => scrollToSection('services')} className="text-sm font-bold text-slate-600 hover:text-[#3478F6] transition-colors">Explore Services</button>
              <button onClick={() => scrollToSection('contact')} className={`px-6 py-2.5 rounded-xl text-sm font-bold hover:-translate-y-0.5 ${theme.buttonGradient}`}>
                Get a Consultation
              </button>
            </div>

            <button className="lg:hidden text-[#15243A]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="lg:hidden absolute top-full left-4 right-4 mt-2"
            >
              <div className={`${theme.glass} flex flex-col p-6 space-y-4`}>
                {['Home', 'About', 'Services', 'Ecosystem', 'Portfolio', 'Contact'].map(link => (
                  <button 
                    key={link} 
                    onClick={() => scrollToSection(link.toLowerCase())} 
                    className="text-lg font-bold text-left hover:text-[#3478F6]"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- Hero Section --- */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="relative z-10">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-[#3478F6] uppercase tracking-wider mb-6">
              <Sparkles size={14} /> AI Innovation & Engineering Company
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Engineering <span className={theme.textGradient}>Intelligence.</span><br/>
              Building the <span className={theme.textGradient}>Future.</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className={`text-lg lg:text-xl ${theme.textSecondary} mb-8 max-w-lg leading-relaxed font-medium`}>
              From autonomous AI agents and intelligent applications to enterprise software, research systems, and academic innovation — ASSIS transforms complex ideas into powerful digital solutions.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-10">
              <button onClick={() => scrollToSection('services')} className={`px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 ${theme.buttonGradient}`}>
                Explore Our Services <ArrowRight size={20} />
              </button>
              <button onClick={() => scrollToSection('about')} className="px-8 py-4 rounded-xl font-bold text-lg bg-white border border-slate-200 text-[#15243A] shadow-sm hover:bg-slate-50 transition-colors">
                Discover ASSIS
              </button>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 sm:gap-8 text-sm font-bold text-[#64748B]">
              <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-[#13B8A6]"/> AI-Powered Innovation</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-[#13B8A6]"/> Intelligent Automation</span>
              <span className="flex items-center gap-2"><CheckCircle2 size={18} className="text-[#13B8A6]"/> Engineering Excellence</span>
            </motion.div>
          </motion.div>

          {/* Hero Image Visual */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#18C6D5]/20 to-[#7958E8]/20 rounded-3xl blur-3xl -z-10 transform scale-110" />
            <div className={`${theme.glass} p-4 rounded-3xl overflow-hidden`}>
              <img 
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800" 
                alt="AI Technology Visual" 
                className="w-full h-auto rounded-2xl object-cover shadow-inner"
              />
            </div>
            
            {/* Floating Badges over Hero Image */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute -left-10 top-20 p-4 bg-white/80 backdrop-blur-xl border border-white shadow-xl rounded-2xl flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Brain size={20}/></div>
               <div><p className="text-xs text-slate-500 font-bold uppercase">System Status</p><p className="text-sm font-extrabold text-slate-900">AI Agents Active</p></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- About Section --- */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">More Than Technology. We Build <span className={theme.textGradient}>Intelligence.</span></h2>
          <p className={`${theme.textSecondary} max-w-2xl mx-auto text-lg font-medium`}>ASSIS AI combines artificial intelligence, software engineering, automation, and research to create practical, high-impact solutions.</p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid md:grid-cols-3 gap-8">
          {[
            { num: "01", title: "Innovation First", desc: "Transforming ambitious ideas into intelligent digital products.", icon: <Sparkles className="text-[#13B8A6]" /> },
            { num: "02", title: "Engineering Excellence", desc: "Building scalable, reliable, and thoughtfully designed software systems.", icon: <Layers className="text-[#3478F6]" /> },
            { num: "03", title: "Intelligent Future", desc: "Using AI and automation to simplify complex workflows and unlock new possibilities.", icon: <Brain className="text-[#7958E8]" /> }
          ].map((item, i) => (
            <motion.div key={i} variants={fadeInUp} className={`${theme.glass} ${theme.glassHover} p-8 relative overflow-hidden group`}>
              <div className="absolute -right-4 -top-4 text-7xl font-black text-slate-100 opacity-50 group-hover:scale-110 transition-transform duration-500">{item.num}</div>
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-6 relative z-10">{item.icon}</div>
              <h3 className="text-xl font-extrabold mb-3 relative z-10">{item.title}</h3>
              <p className={`${theme.textSecondary} relative z-10 font-medium`}>{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- Services Section --- */}
      <section id="services" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-[#18C6D5]/5 to-white/0 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="mb-16 max-w-3xl">
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-4 text-[#15243A]">Our <span className={theme.textGradient}>Services</span></h2>
            <p className={`${theme.textSecondary} text-lg font-medium`}>A complete catalog of enterprise-grade digital and research solutions.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((srv) => (
              <motion.div key={srv.id} variants={fadeInUp} className={`${theme.glass} ${theme.glassHover} p-8 flex flex-col h-full bg-white/80`}>
                <div className="mb-6 bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm">{srv.icon}</div>
                <h3 className="text-xl font-extrabold mb-3">{srv.title}</h3>
                <p className={`${theme.textSecondary} mb-6 flex-grow font-medium text-sm leading-relaxed`}>{srv.desc}</p>
                <ul className="space-y-3 mb-8">
                  {srv.list.map((li, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-800 font-bold">
                      <ChevronRight size={18} className="text-[#3478F6] shrink-0" /> {li}
                    </li>
                  ))}
                </ul>
                <button onClick={() => scrollToSection('contact')} className="mt-auto text-sm font-extrabold text-[#3478F6] flex items-center gap-1 group-hover:gap-2 transition-all w-fit">
                  Learn More <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- Ecosystem Section --- */}
      <section id="ecosystem" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4 text-[#15243A]">ASSIS AI <span className={theme.textGradient}>Ecosystem</span></h2>
          <p className={`${theme.textSecondary} max-w-2xl mx-auto text-lg font-medium`}>We are not just a service provider. We are building a growing AI technology ecosystem.</p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ecosystem.map((prod, i) => (
            <motion.div key={i} variants={fadeInUp} className={`${theme.glass} p-6 border-slate-200/60 hover:border-[#3478F6]/30 hover:shadow-xl transition-all group`}>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-extrabold text-[#15243A] group-hover:text-[#3478F6] transition-colors">{prod.name}</h3>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${prod.color}`}>{prod.status}</span>
              </div>
              <p className={`${theme.textSecondary} text-sm mb-6 font-medium`}>{prod.desc}</p>
              <button onClick={() => scrollToSection('contact')} className="text-sm font-bold text-slate-400 group-hover:text-[#3478F6] flex items-center gap-1 transition-colors">
                Explore Product <ArrowUpRight size={14} />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- Tech Stack --- */}
      <section className="py-20 bg-[#0B1120] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#18C6D5]/10 to-[#7958E8]/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl font-extrabold mb-12">Engineering Technologies</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'LangChain', 'LangGraph', 'CrewAI', 'React', 'Next.js', 'Tailwind CSS', 'Node.js', 'FastAPI', 'PostgreSQL', 'Figma', 'LaTeX'].map((tech) => (
              <span key={tech} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-bold backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all cursor-default shadow-sm">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- Process Section --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="mb-20 text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">Our <span className={theme.textGradient}>Working Process</span></h2>
          <p className={`${theme.textSecondary} text-lg font-medium`}>A methodical approach to ensure premium delivery.</p>
        </motion.div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line for Desktop */}
          <div className="hidden md:block absolute top-8 left-0 w-full h-1 bg-gradient-to-r from-[#18C6D5] via-[#3478F6] to-[#7958E8] opacity-20 -z-10 rounded-full" />
          
          <div className="grid md:grid-cols-5 gap-10 md:gap-6 relative z-10">
            {['Discover', 'Strategize', 'Design', 'Develop', 'Deliver'].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full bg-white border-4 border-slate-100 shadow-xl flex items-center justify-center mb-6 relative group hover:border-[#3478F6]/30 transition-colors`}>
                  <span className="text-xl font-black text-slate-300 group-hover:text-[#3478F6] transition-colors">0{i+1}</span>
                </div>
                <h4 className="text-lg font-extrabold mb-2 text-[#15243A]">{step}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Portfolio / Featured Projects --- */}
      <section id="portfolio" className="py-24 bg-white/50 border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-4">Featured <span className={theme.textGradient}>Projects</span></h2>
            <p className={`${theme.textSecondary} text-lg font-medium`}>A selection of our intelligent solutions and research architectures.</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {filters.map(f => (
              <button 
                key={f} 
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${activeFilter === f ? 'bg-[#15243A] text-white border-[#15243A] shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'}`}
              >
                {f}
              </button>
            ))}
          </div>

          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((p) => (
                <motion.div 
                  layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}
                  key={p.id} className={`${theme.glass} p-2 group hover:border-[#3478F6]/40`}
                >
                  <div className="h-56 w-full relative rounded-xl overflow-hidden mb-4 bg-slate-100">
                    <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                      <button onClick={() => scrollToSection('contact')} className="px-5 py-2.5 bg-white text-[#15243A] rounded-xl text-sm font-extrabold shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">View Details</button>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <span className="text-[0.65rem] font-black text-[#18C6D5] uppercase tracking-widest mb-2 block">{p.category}</span>
                    <h4 className="text-xl font-extrabold mb-4 text-[#15243A]">{p.title}</h4>
                    <div className="flex flex-wrap gap-2">
                      {p.tech.map(t => <span key={t} className="text-xs px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 rounded-md font-bold">{t}</span>)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp} className="max-w-5xl mx-auto rounded-[2.5rem] overflow-hidden relative shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-[#18C6D5] via-[#3478F6] to-[#7958E8] opacity-95" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xNSkiLz48L3N2Zz4=')] opacity-50" />
          
          <div className="relative p-12 lg:p-24 text-center text-white backdrop-blur-sm">
            <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Have an Idea? Let's Build Something Intelligent.</h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium">
              Whether you need an AI-powered application, an autonomous agent system, a modern website, or a professional academic solution, ASSIS is ready to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => scrollToSection('contact')} className="px-8 py-4 bg-white text-[#3478F6] rounded-xl font-extrabold text-lg shadow-xl hover:scale-105 transition-transform">
                Start a Project
              </button>
              <button onClick={() => scrollToSection('contact')} className="px-8 py-4 bg-transparent border-2 border-white/50 hover:bg-white/10 hover:border-white text-white rounded-xl font-extrabold text-lg transition-colors">
                Contact ASSIS
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- Contact Section --- */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute -left-[20%] top-0 w-[50%] h-full bg-gradient-to-r from-[#18C6D5]/10 to-transparent -z-10 blur-3xl rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-6">Let's Discuss Your Next <span className={theme.textGradient}>Project.</span></h2>
            <p className={`${theme.textSecondary} text-lg mb-12 font-medium`}>Inquire about AI development, software engineering, or academic solutions. Our team is ready to architect your future.</p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-[#3478F6] shadow-sm"><Phone size={24} /></div>
                <div className="mt-1">
                  <h5 className="font-extrabold text-[#15243A] text-lg mb-1">Phone / WhatsApp</h5>
                  <p className="text-slate-600 font-semibold text-lg">0314 4668442</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 text-[#13B8A6] shadow-sm"><Mail size={24} /></div>
                <div className="mt-1">
                  <h5 className="font-extrabold text-[#15243A] text-lg mb-1">Email Address</h5>
                  <p className="text-slate-600 font-semibold text-lg">theassis.ai@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0 text-[#7958E8] shadow-sm"><MapPin size={24} /></div>
                <div className="mt-1">
                  <h5 className="font-extrabold text-[#15243A] text-lg mb-1">Office Location</h5>
                  <p className="text-slate-600 font-semibold text-lg">#4 Software Technology Park,<br/>UOK, Kotli AJ&K.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className={`${theme.glass} bg-white/90 p-8 lg:p-10 border-slate-200 shadow-2xl`}>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-extrabold text-[#15243A] mb-2">Full Name</label>
                  <input type="text" className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#3478F6] transition-all font-medium text-slate-800" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-extrabold text-[#15243A] mb-2">Email Address</label>
                  <input type="email" className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#3478F6] transition-all font-medium text-slate-800" placeholder="john@example.com" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-extrabold text-[#15243A] mb-2">Select Service</label>
                <select className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#3478F6] transition-all text-slate-800 font-medium appearance-none">
                  <option>AI Development & Intelligent Systems</option>
                  <option>AI Agents & Automation</option>
                  <option>Software & Web Development</option>
                  <option>Machine Learning & Data Intelligence</option>
                  <option>Academic & Research Solutions</option>
                  <option>Graphic Design & Digital Branding</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-extrabold text-[#15243A] mb-2">Project Description</label>
                <textarea rows="4" className="w-full px-5 py-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#3478F6] transition-all resize-none font-medium text-slate-800" placeholder="Tell us about your requirements..." />
              </div>

              <button className={`w-full py-4 rounded-xl font-extrabold text-lg ${theme.buttonGradient}`}>
                Send Inquiry
              </button>
            </form>
          </motion.div>

        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-[#0B1120] text-white pt-20 pb-8 border-t border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-1">
              <span className={`text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#18C6D5] to-[#7958E8] mb-4 block`}>ASSIS AI</span>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed font-medium">
                Artificial intelligence, software engineering, automation, and academic technology company.
              </p>
              <p className="text-[0.65rem] font-black tracking-widest uppercase text-slate-300">Engineering Intelligence. Building the Future.</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-6 text-lg tracking-wide">Services</h4>
              <ul className="space-y-3 text-sm text-slate-400 font-medium">
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">AI Development</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">AI Agents</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Web Development</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Machine Learning</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Academic Solutions</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-lg tracking-wide">Ecosystem</h4>
              <ul className="space-y-3 text-sm text-slate-400 font-medium">
                <li><button onClick={() => scrollToSection('ecosystem')} className="hover:text-white transition-colors">ASSIS Workforce</button></li>
                <li><button onClick={() => scrollToSection('ecosystem')} className="hover:text-white transition-colors">ASSIS Research</button></li>
                <li><button onClick={() => scrollToSection('ecosystem')} className="hover:text-white transition-colors">ASSIS MCP</button></li>
                <li><button onClick={() => scrollToSection('ecosystem')} className="hover:text-white transition-colors">ASSIS Eval</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-lg tracking-wide">Connect</h4>
              <ul className="space-y-4 text-sm text-slate-400 font-medium">
                <li className="flex items-center gap-3"><Phone size={16} className="text-[#3478F6]"/> 0314 4668442</li>
                <li className="flex items-center gap-3"><Mail size={16} className="text-[#13B8A6]"/> theassis.ai@gmail.com</li>
                <li className="flex items-start gap-3 mt-4"><MapPin size={16} className="mt-1 shrink-0 text-[#7958E8]"/> #4 Software Technology Park,<br/>UOK, Kotli AJ&K.</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-bold">
            <p>© {new Date().getFullYear()} ASSIS AI. All Rights Reserved.</p>
            <div className="flex gap-6">
              <button className="hover:text-white transition-colors">Privacy Policy</button>
              <button className="hover:text-white transition-colors">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}