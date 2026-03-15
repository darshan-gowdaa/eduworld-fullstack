import { useState } from 'react';
import { X, GraduationCap, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const WelcomePopup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        onClose();
      }, 2500);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, type: "spring", damping: 25 }}
          className="bg-background border border-border rounded-3xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-muted-foreground hover:text-foreground hover:bg-secondary p-2 rounded-full transition-colors z-10"
          >
            <X className="h-5 w-5" />
          </button>

          {!isSubscribed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-3">
                  Welcome to EduWorld
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
                  Get the latest updates on courses, scholarships, and educational opportunities delivered to your inbox.
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="h-12 w-full bg-secondary/50 border-border"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-base font-medium shadow-sm transition-all"
                >
                  Join the Newsletter
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={onClose}
                  className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
                >
                  No thanks, I'll explore first
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="text-center py-10 relative z-10"
            >
              <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-emerald-500" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3">
                You're Selected!
              </h3>
              <p className="text-muted-foreground">
                Thank you for subscribing. We'll be in touch soon with exciting updates.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WelcomePopup;