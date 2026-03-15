import React, { useState, useEffect, memo } from 'react';
import { GraduationCap, Users, Trophy, Globe, Star, Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import WelcomePopup from '../components/common/WelcomePopup';

// Memoized Stat Component for Performance
const StatItem = memo(({ number, label, index }) => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center text-center"
    >
      <div className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-2">
        {number}
      </div>
      <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
});
StatItem.displayName = 'StatItem';

const Home = () => {
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!localStorage.getItem('newsletterPopupShown')) {
      const timer = setTimeout(() => {
        setShowWelcomePopup(true);
        localStorage.setItem('newsletterPopupShown', 'true');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const stats = [
    { number: "50k+", label: "Students Worldwide" },
    { number: "95%", label: "Employment Rate" },
    { number: "200+", label: "Expert Faculty" },
    { number: "50+", label: "Countries Represented" }
  ];

  // Variants for staggered reveals
  const sectionVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30">
      {showWelcomePopup && (
        <WelcomePopup onClose={() => setShowWelcomePopup(false)} />
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" 
        />
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="text-center max-w-4xl mx-auto flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-background border border-border rounded-full px-3 py-1 mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-sm font-medium text-muted-foreground">Admissions open for 2024</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight text-foreground text-balance mb-8">
            Transform your future with{' '}
            <span className="bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
              world-class education.
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl text-balance leading-relaxed">
            Join thousands of students globally who are already on their path to success. 
            Experience an innovative curriculum taught by industry leaders.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link to="/register" className="group inline-flex items-center justify-center bg-foreground text-background px-8 py-3.5 rounded-full text-base font-medium hover:opacity-90 transition-opacity shadow-lg w-full">
                Start Your Journey
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
              <Link to="/courses" className="inline-flex items-center justify-center bg-background border border-border text-foreground px-8 py-3.5 rounded-full text-base font-medium hover:bg-secondary transition-colors shadow-sm w-full">
                Explore Programs
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Minimal Hero Image/Dashboard Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 relative mx-auto max-w-5xl"
        >
          <div className="rounded-2xl border border-border/50 bg-background/50 p-2 shadow-2xl backdrop-blur-xl">
            <div className="rounded-xl overflow-hidden border border-border bg-secondary relative aspect-[16/9] md:aspect-[21/9]">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80" 
                alt="Students collaborating" 
                className="object-cover w-full h-full opacity-90"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border/50 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <StatItem key={index} index={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Features/About Section - Bento Grid Style */}
      <section className="py-24 bg-secondary/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="max-w-3xl mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Designed for excellence.
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed text-balance">
              Empowering students with quality education and practical learning experiences.
              We provide everything you need to succeed in the modern world.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={sectionVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Bento Box 1 - Large */}
            <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="md:col-span-2 bg-background rounded-3xl p-8 md:p-12 border border-border shadow-sm flex flex-col justify-between overflow-hidden group hover:border-foreground/20 transition-all duration-300">
              <div>
                <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-6">
                  <GraduationCap className="w-6 h-6 text-foreground" />
                </motion.div>
                <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3">
                  Quality Education
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-md">
                  Our programs are designed by industry experts and delivered by experienced faculty members with cutting-edge curriculum spanning multiple disciplines.
                </p>
              </div>
            </motion.div>

            {/* Bento Box 2 */}
            <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-background rounded-3xl p-8 border border-border shadow-sm group hover:border-foreground/20 transition-all duration-300 flex flex-col">
              <motion.div whileHover={{ rotate: -10, scale: 1.1 }} className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-foreground" />
              </motion.div>
              <h3 className="text-xl font-bold tracking-tight text-foreground mb-3">
                Diverse Community
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Join a vibrant community of students from around the world with diverse backgrounds and perspectives.
              </p>
            </motion.div>

            {/* Bento Box 3 */}
            <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="bg-background rounded-3xl p-8 border border-border shadow-sm group hover:border-foreground/20 transition-all duration-300 flex flex-col">
              <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-6">
                <Trophy className="w-6 h-6 text-foreground" />
              </motion.div>
              <h3 className="text-xl font-bold tracking-tight text-foreground mb-3">
                Career Success
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Remarkable success rates with industry-leading employment and career advancement.
              </p>
            </motion.div>

            {/* Bento Box 4 - Wide (Dark/Accent Theme via CSS variables theoretically, but we use strict colors here) */}
            <motion.div variants={itemVariants} whileHover={{ y: -5 }} className="md:col-span-2 bg-foreground rounded-3xl p-8 md:p-12 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between group overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
              <div className="relative z-10 w-full flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold tracking-tight text-background mb-3">
                    Global Recognition
                  </h3>
                  <p className="text-muted leading-relaxed max-w-sm">
                    Degrees recognized worldwide, opening doors to international opportunities globally.
                  </p>
                </div>
                <motion.div 
                  className="w-16 h-16 rounded-full bg-background/10 flex items-center justify-center shrink-0 border border-background/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Globe className="w-8 h-8 text-background" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sleek Minimal Call to Action */}
      <section className="py-24 bg-background border-t border-border">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Ready to secure your future?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 text-balance leading-relaxed mx-auto max-w-2xl">
            Join a thriving network of learners and educators. Apply now to secure your spot in an environment built to help you excel.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link to="/register" className="w-full sm:w-auto px-8 py-3.5 bg-foreground text-background rounded-full font-medium text-base hover:opacity-90 transition-opacity shadow-md group flex items-center justify-center">
                Apply Now
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
              <Link to="/courses" className="w-full sm:w-auto px-8 py-3.5 bg-background text-foreground border border-border rounded-full font-medium text-base hover:bg-secondary transition-colors group flex items-center justify-center">
                View Programs
              </Link>
            </motion.div>
          </div>
          
          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-muted-foreground font-medium">
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-muted-foreground/70" />
              Top Rated Program
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-border"></div>
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-2 text-muted-foreground/70" />
              Fully Accredited
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;