import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, Users, Trophy, Globe, Lightbulb, Heart, Star, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import CallToAction from '../components/common/CallToAction';
import HeroSection from '../components/common/HeroSection';

const About = () => {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const timelineRefs = useRef([]);
  const timelineContainerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Auto-select timeline card on scroll
  useEffect(() => {
    const handleTimelineScroll = () => {
      if (!timelineRefs.current.length) return;
      const offsets = timelineRefs.current.map(ref => {
        if (!ref) return Infinity;
        const rect = ref.getBoundingClientRect();
        return Math.abs(rect.top - window.innerHeight * 0.25);
      });
      const minIndex = offsets.indexOf(Math.min(...offsets));
      setActiveTimeline(minIndex);
    };
    window.addEventListener('scroll', handleTimelineScroll);
    return () => window.removeEventListener('scroll', handleTimelineScroll);
  }, []);

  const testimonials = [
    {
      name: "Aarav Sharma",
      role: "Computer Science Graduate",
      text: "EduWorld transformed my understanding of technology and opened doors I never imagined possible.",
      rating: 5,
      img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80"
    },
    {
      name: "Priya Patel",
      role: "Business Administration Alumni",
      text: "The global perspective and innovative teaching methods prepared me for leadership roles in international companies.",
      rating: 5,
      img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80"
    },
    {
      name: "Rohan Verma",
      role: "Engineering Student",
      text: "The hands-on approach and cutting-edge facilities make learning engaging and practical.",
      rating: 5,
      img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80"
    }
  ];

  const timelineEvents = [
    { year: '1999', title: 'Founded', desc: 'EduWorld was established with a vision to transform education.' },
    { year: '2005', title: 'Expansion', desc: 'Added new programs and modern campus facilities.' },
    { year: '2015', title: 'Global Reach', desc: 'Established international partnerships and online programs.' },
    { year: '2024', title: 'Innovation', desc: 'Leading the future of education with cutting-edge technology.' }
  ];

  const fadeUpVariant = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden font-sans">
      <HeroSection
        title="About EduWorld"
        subtitle="Our Story"
        description="Empowering students worldwide with quality education and innovative learning experiences since 1999."
        buttons={[]}
      />

      {/* Modern Mission & Vision Split Layout */}
      <section className="py-24 bg-background border-b border-border">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div variants={itemVariant} className="space-y-8">
              <div>
                <div className="inline-flex items-center space-x-2 bg-secondary rounded-full px-3 py-1 mb-6">
                  <span className="text-sm font-medium text-muted-foreground">Our Purpose</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight text-balance">
                  Empowering the next generation.
                </h2>
                <div className="h-1 w-20 bg-primary rounded-full mb-8"></div>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  To provide accessible, high-quality education that empowers students to achieve their full potential 
                  and make meaningful contributions to society. We believe that education is the foundation for 
                  personal growth, professional success, and positive change in the world.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Through innovative teaching methods, experienced faculty, and modern facilities, we create an 
                  environment where learning thrives and dreams become reality.
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariant} className="relative isolate">
              <div className="absolute inset-0 -z-10 bg-primary/10 rounded-3xl blur-2xl transform rotate-3"></div>
              <div className="bg-foreground rounded-3xl p-10 md:p-14 text-background shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-background/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-md">
                    <Lightbulb className="text-background w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-bold mb-6 tracking-tight text-background">Our Vision</h3>
                  <p className="text-lg text-background/80 leading-relaxed text-balance">
                    To be the leading educational institution recognized globally for academic excellence, 
                    innovation, and commitment to student success.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Clean Core Values Grid */}
      <section className="py-24 bg-secondary/30 border-b border-border">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-3xl mb-16">
            <motion.h2 variants={itemVariant} className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Our Core Values
            </motion.h2>
            <motion.p variants={itemVariant} className="text-lg text-muted-foreground leading-relaxed text-balance">
              The principles that guide everything we do and shape the experience of every student.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Lightbulb, title: 'Innovation', desc: 'Embracing new technologies and teaching methods to enhance learning experiences.' },
              { icon: Heart, title: 'Excellence', desc: 'Maintaining the highest standards in education, research, and student support.' },
              { icon: Users, title: 'Diversity', desc: 'Celebrating and embracing diverse perspectives, cultures, and backgrounds.' },
              { icon: GraduationCap, title: 'Integrity', desc: 'Upholding ethical standards and academic honesty in all our endeavors.' },
              { icon: Globe, title: 'Global Perspective', desc: 'Preparing students for success in an interconnected world.' },
              { icon: Trophy, title: 'Achievement', desc: 'Supporting students in reaching their goals and realizing their potential.' }
            ].map((value, index) => (
              <motion.div 
                key={index}
                variants={itemVariant}
                whileHover={{ y: -5 }}
                className="group bg-background p-8 rounded-3xl border border-border shadow-sm hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mb-6 text-foreground group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Redesigned Modern Timeline */}
      <section className="py-24 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground">A timeline of growth and excellence</p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto" ref={timelineContainerRef}>
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-px bg-border h-full" />
            
            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  ref={el => timelineRefs.current[index] = el}
                  className={`relative flex flex-col md:flex-row items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} group cursor-pointer`}
                  onClick={() => setActiveTimeline(index)}
                >
                  <div className={`md:w-1/2 flex ${index % 2 === 0 ? 'md:justify-start md:pl-12' : 'md:justify-end md:pr-12'} pl-12 md:pl-0 w-full`}>
                    <div className={`bg-background rounded-3xl p-8 border transition-all duration-300 w-full md:max-w-md ${activeTimeline === index ? 'border-primary shadow-lg scale-[1.02]' : 'border-border shadow-sm group-hover:border-primary/50'}`}>
                      <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-muted-foreground to-foreground mb-2">{event.year}</div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{event.title}</h3>
                      <p className="text-muted-foreground">{event.desc}</p>
                    </div>
                  </div>
                  
                  {/* Indicator Dot */}
                  <div 
                    className={`absolute left-4 md:left-1/2 transform -translate-x-1/2 mt-8 md:mt-0 md:top-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full border-2 border-background shadow-sm transition-all duration-300 z-10 ${activeTimeline === index ? 'bg-primary scale-125' : 'bg-muted-foreground group-hover:bg-primary group-hover:scale-125'}`} 
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clean Student Testimonials */}
      <section className="py-24 bg-secondary/30 border-b border-border">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-16">
            <motion.h2 variants={itemVariant} className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">What Our Students Say</motion.h2>
            <motion.p variants={itemVariant} className="text-lg text-muted-foreground">Real experiences from our global community</motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                variants={itemVariant}
                whileHover={{ y: -5 }}
                className="bg-background p-8 rounded-3xl border border-border shadow-sm hover:border-primary/30 transition-all duration-300 flex flex-col"
              >
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400 w-4 h-4 mr-1" />
                  ))}
                </div>
                
                <p className="text-foreground mb-8 leading-relaxed flex-1">"{testimonial.text}"</p>
                
                <div className="flex items-center pt-6 border-t border-border mt-auto">
                  <img src={testimonial.img} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-secondary" />
                  <div>
                    <div className="font-bold text-foreground tracking-tight">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground font-medium">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Minimal Leadership Cards */}
      <section className="py-24 bg-background">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-16">
            <motion.h2 variants={itemVariant} className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">Leadership Team</motion.h2>
            <motion.p variants={itemVariant} className="text-lg text-muted-foreground">Meet the visionaries guiding our institution</motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Dr. Ananya Iyer', role: 'President & CEO', desc: 'Leading EduWorld with over 20 years of experience in higher education.', img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80' },
              { name: 'Prof. Rajesh Nair', role: 'Academic Dean', desc: 'Overseeing academic excellence and curriculum development.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80' },
              { name: 'Dr. Meera Desai', role: 'Student Affairs Director', desc: 'Ensuring student success and well-being across all programs.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80' }
            ].map((leader, index) => (
              <motion.div 
                key={index}
                variants={itemVariant}
                whileHover={{ y: -5 }}
                className="bg-background rounded-3xl border border-border shadow-sm overflow-hidden group hover:border-primary/40 transition-all duration-300"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-secondary">
                  <img src={leader.img} alt={leader.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{objectPosition: 'center 35%'}} />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold tracking-tight text-foreground mb-1">{leader.name}</h3>
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-4">{leader.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{leader.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Sleek Minimal Call to Action */}
      <CallToAction
        title="Join Our Community"
        description="Be part of our mission to transform education and empower the next generation of leaders. Your journey to excellence starts here."
        primaryBtn={{ text: 'Apply Now', href: '/register', icon: <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /> }}
        secondaryBtn={{ text: 'Contact Us', href: '/contact', icon: null }}
        showTrust={false}
        gradient="bg-secondary/30 border-t border-border"
      />
    </div>
  );
};

export default About;