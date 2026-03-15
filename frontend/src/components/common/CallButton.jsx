import { useState, useEffect } from 'react';
import { Phone, MessageCircle, X, Mail, MapPin, Clock, Headset } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CallButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleCall = () => {
    window.location.href = 'tel:+919876543210';
    setShowPopup(false);
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919876543210?text=Hello! I have a question about EduWorld.', '_blank');
    setShowPopup(false);
  };

  const handleEmail = () => {
    window.location.href = 'mailto:dummy@email.com?subject=EduWorld Inquiry';
    setShowPopup(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showPopup && !event.target.closest('.contact-popup') && !event.target.closest('.contact-button')) {
        setShowPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPopup]);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-24 right-6 z-40"
          >
            <div className="relative">
              {!showPopup && (
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
              )}
              
              <button
                onClick={() => setShowPopup(!showPopup)}
                className="contact-button relative bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-3.5 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center border border-primary-foreground/10"
              >
                <div className={`transition-transform duration-300 ${showPopup ? 'rotate-90' : 'rotate-0'}`}>
                  {showPopup ? <X className="h-5 w-5" /> : <Headset className="h-5 w-5" />}
                </div>
              </button>

              {!showPopup && (
                <div className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold border-2 border-background">
                  1
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-40 right-6 z-40"
          >
            <div className="contact-popup bg-background/95 backdrop-blur-xl rounded-2xl shadow-xl border border-border p-5 w-72">
              <div className="mb-4">
                <h3 className="text-base font-semibold text-foreground tracking-tight">Need assistance?</h3>
                <p className="text-xs text-muted-foreground mt-0.5">We typically respond within 15 minutes.</p>
              </div>
              
              <div className="space-y-2">
                <button
                  onClick={handleCall}
                  className="w-full flex items-center space-x-3 p-3 bg-secondary hover:bg-secondary/80 text-foreground border border-border rounded-xl transition-all"
                >
                  <div className="bg-background rounded-full p-2 text-foreground">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-sm block">Call Support</span>
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Instant</span>
                  </div>
                </button>
                
                <button
                  onClick={handleWhatsApp}
                  className="w-full flex items-center space-x-3 p-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/20 text-[#25D366] rounded-xl transition-all dark:text-[#25D366] dark:border-[#25D366]/30 dark:bg-[#25D366]/10 dark:hover:bg-[#25D366]/20"
                >
                  <div className="bg-background rounded-full p-2 text-[#25D366]">
                    <MessageCircle className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-sm block">WhatsApp</span>
                    <span className="text-[10px] opacity-80 font-medium uppercase tracking-wider">Fast</span>
                  </div>
                </button>
                
                <button
                  onClick={handleEmail}
                  className="w-full flex items-center space-x-3 p-3 bg-secondary hover:bg-secondary/80 text-foreground border border-border rounded-xl transition-all"
                >
                  <div className="bg-background rounded-full p-2 text-foreground">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="text-left">
                    <span className="font-semibold text-sm block">Email Us</span>
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Detailed</span>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CallButton;