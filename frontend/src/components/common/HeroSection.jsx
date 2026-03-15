import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';

const HeroSection = ({
  title,
  subtitle,
  description,
  buttons = [],
  gradient = 'bg-background border-b border-border',
  backgroundElements = null,
  scrollIndicator = null,
  className = '',
  style = {},
  children
}) => {
  const containerRef = useRef(null);
  
  // Parallax Effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Cursor following spotlight (Interactive element)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  // Staggered Text Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, filter: 'blur(10px)' },
    visible: { 
      y: 0, 
      opacity: 1, 
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden ${gradient} ${className}`} 
      style={style}
    >
      {/* Interactive Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 md:opacity-100 mix-blend-soft-light"
        style={{
          background: `radial-gradient(600px circle at ${cursorXSpring}px ${cursorYSpring}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
        }}
      />

      {/* Animated Floating Particles Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-center">
        {backgroundElements || (
          <>
            <motion.div 
              animate={{ 
                y: [0, -30, 0], 
                rotate: [0, 5, 0],
                scale: [1, 1.05, 1] 
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] opacity-70 -z-10"
            />
            <motion.div 
              animate={{ 
                y: [0, 40, 0], 
                x: [0, -20, 0] 
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-20 right-[10%] w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] opacity-50 -z-10"
            />
          </>
        )}
      </div>
      
      <motion.div 
        style={{ y, opacity }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center"
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center"
        >
          {subtitle && (
            <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 mb-6 rounded-full bg-secondary text-foreground text-sm font-semibold border border-border shadow-sm">
              {subtitle}
            </motion.div>
          )}
          
          {title && (
            <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-foreground text-balance leading-tight">
              {title}
            </motion.h1>
          )}
          
          {description && (
            <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
              {description}
            </motion.p>
          )}
          
          {buttons.length > 0 && (
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4 w-full">
              {buttons.map((btn, idx) => {
                const isPrimary = idx === 0;
                
                const baseClasses = "inline-flex items-center justify-center px-8 py-3.5 rounded-full font-medium text-base transition-all w-full sm:w-auto shadow-sm";
                const primaryClasses = "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md group";
                const secondaryClasses = "bg-background text-foreground border border-input hover:bg-accent hover:text-accent-foreground group";
                const btnClasses = `${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses} ${btn.className || ''}`;
                
                // Add a hover scale effect to buttons using Framer Motion
                const ButtonContent = () => (
                  <>
                    {btn.text}
                    {btn.icon && <span className="ml-2 group-hover:translate-x-1 transition-transform">{btn.icon}</span>}
                  </>
                );

                if (btn.href) {
                  return btn.href.startsWith('/') ? (
                    <motion.div key={idx} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Link to={btn.href} className={btnClasses}>
                        <ButtonContent />
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.div key={idx} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <a href={btn.href} className={btnClasses} target="_blank" rel="noopener noreferrer">
                        <ButtonContent />
                      </a>
                    </motion.div>
                  );
                }
                return (
                  <motion.button key={idx} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={btnClasses} onClick={btn.onClick}>
                    <ButtonContent />
                  </motion.button>
                );
              })}
            </motion.div>
          )}
          {children}
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      {scrollIndicator && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1 }}
        >
          {scrollIndicator}
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;