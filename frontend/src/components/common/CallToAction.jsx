import React from "react";
import { ChevronRight, BookOpen, Star, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CallToAction = ({
  title = "Ready to Start Your Journey?",
  description = "Join thousands of students who have already taken the first step towards their future. Apply now and secure your place in our next intake with early bird benefits.",
  primaryBtn = { text: "Apply Now", onClick: null, href: "/register", icon: <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /> },
  secondaryBtn = { text: "Explore Courses", onClick: null, href: "/courses", icon: <BookOpen className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform" /> },
  showTrust = true,
  trustIndicators = [
    { icon: <Star className="w-5 h-5 text-yellow-500 fill-current" />, text: "4.9/5 Student Rating" },
    { icon: <Award className="w-5 h-5 text-primary" />, text: "Accredited Programs" }
  ],
  gradient = "bg-secondary",
  className = "",
  children
}) => {
  return (
    <section className={`py-24 ${gradient} relative overflow-hidden border-t border-border ${className}`}>
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -mr-40 -mt-40 mix-blend-multiply dark:mix-blend-overlay" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -ml-40 -mb-40 mix-blend-multiply dark:mix-blend-overlay" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-6 text-balance">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed text-balance">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {primaryBtn && (
              primaryBtn.href ? (
                primaryBtn.href.startsWith('/') ? (
                  <Link
                    to={primaryBtn.href}
                    className="group bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-medium transition-all duration-300 hover:bg-primary/90 shadow-sm hover:shadow-md flex items-center justify-center w-full sm:w-auto"
                    onClick={primaryBtn.onClick}
                  >
                    {primaryBtn.text}
                    {primaryBtn.icon}
                  </Link>
                ) : (
                  <a
                    href={primaryBtn.href}
                    className="group bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-medium transition-all duration-300 hover:bg-primary/90 shadow-sm hover:shadow-md flex items-center justify-center w-full sm:w-auto"
                    onClick={primaryBtn.onClick}
                    target="_blank" rel="noopener noreferrer"
                  >
                    {primaryBtn.text}
                    {primaryBtn.icon}
                  </a>
                )
              ) : (
                <button
                  className="group bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-medium transition-all duration-300 hover:bg-primary/90 shadow-sm hover:shadow-md flex items-center justify-center w-full sm:w-auto"
                  onClick={primaryBtn.onClick}
                >
                  {primaryBtn.text}
                  {primaryBtn.icon}
                </button>
              )
            )}
            
            {secondaryBtn && (
              secondaryBtn.href ? (
                secondaryBtn.href.startsWith('/') ? (
                  <Link
                    to={secondaryBtn.href}
                    className="group bg-background border border-input text-foreground px-8 py-3.5 rounded-full font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-sm flex items-center justify-center w-full sm:w-auto"
                    onClick={secondaryBtn.onClick}
                  >
                    {secondaryBtn.text}
                    {secondaryBtn.icon}
                  </Link>
                ) : (
                  <a
                    href={secondaryBtn.href}
                    className="group bg-background border border-input text-foreground px-8 py-3.5 rounded-full font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-sm flex items-center justify-center w-full sm:w-auto"
                    onClick={secondaryBtn.onClick}
                    target="_blank" rel="noopener noreferrer"
                  >
                    {secondaryBtn.text}
                    {secondaryBtn.icon}
                  </a>
                )
              ) : (
                <button
                  className="group bg-background border border-input text-foreground px-8 py-3.5 rounded-full font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-sm flex items-center justify-center w-full sm:w-auto"
                  onClick={secondaryBtn.onClick}
                >
                  {secondaryBtn.text}
                  {secondaryBtn.icon}
                </button>
              )
            )}
          </div>

          {showTrust && trustIndicators && (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-sm text-muted-foreground font-medium"
            >
              {trustIndicators.map((item, idx) => (
                <div className="flex items-center" key={idx}>
                  <div className="mr-2.5 bg-background p-1.5 rounded-full border border-border shadow-sm">
                    {item.icon}
                  </div>
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          )}

          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;