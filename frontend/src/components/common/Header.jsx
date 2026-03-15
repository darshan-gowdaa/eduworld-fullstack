import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, User, GraduationCap, ChevronDown, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ isAuthenticated = true, userRole = 'student', userName = '', dashboardMode = false, onLogout, pathname = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const isActiveLink = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/courses', label: 'Courses' },
    { path: '/contact', label: 'Contact' }
  ];

  // Drawer Animation Variants
  const drawerVariants = {
    closed: { 
      x: '-100%', 
      opacity: 0,
      rotateY: -20,
      transition: { duration: 0.3, ease: 'easeInOut' } 
    },
    open: { 
      x: 0, 
      opacity: 1,
      rotateY: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30, staggerChildren: 0.1, delayChildren: 0.1 } 
    }
  };

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled 
            ? 'bg-background/80 backdrop-blur-xl border-b border-border shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group z-50">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-foreground text-background shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                EduWorld
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                  {isActiveLink(link.path) && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-secondary rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {pathname === '/login' ? (
                <Link to="/register" className="px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                  Register
                </Link>
              ) : pathname === '/register' ? (
                <Link to="/login" className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Sign In
                </Link>
              ) : dashboardMode ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-muted-foreground">Welcome, {userName || 'User'}</span>
                  <button onClick={handleLogout} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors" title="Sign Out">
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>
              ) : isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-border hover:bg-secondary transition-colors group"
                  >
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center group-hover:bg-background transition-colors">
                      <User className="h-4 w-4 text-foreground" />
                    </div>
                    <motion.div animate={{ rotate: showUserDropdown ? 180 : 0 }}>
                      <ChevronDown className="h-3 w-3 text-muted-foreground" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {showUserDropdown && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-56 bg-background rounded-2xl shadow-xl border border-border overflow-hidden z-50"
                      >
                        <div className="p-4 border-b border-border bg-muted/30">
                          <p className="font-semibold text-foreground truncate">{userName || (userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : 'User')}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 capitalize">{userRole}</p>
                        </div>
                        <div className="p-2">
                          <Link
                            to={userRole === 'student' ? '/student/dashboard' : '/faculty/dashboard'}
                            className="block w-full text-left px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary rounded-lg transition-colors"
                            onClick={() => setShowUserDropdown(false)}
                          >
                            Dashboard
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="mt-1 w-full text-left px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          >
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login" className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-secondary">
                    Sign In
                  </Link>
                  <Link to="/register" className="px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-90 transition-opacity shadow-sm">
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center z-50">
              <button
                onClick={toggleMenu}
                className="p-2 text-foreground hover:bg-secondary rounded-full transition-colors relative w-10 h-10 flex items-center justify-center"
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            />
            <motion.div
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-background border-r border-border shadow-2xl z-40 md:hidden pt-24 px-6 flex flex-col"
              style={{ perspective: 1000 }}
            >
              <div className="flex flex-col space-y-2 mb-8">
                {navLinks.map((link) => (
                  <motion.div key={link.path} variants={itemVariants}>
                    <Link
                      to={link.path}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        isActiveLink(link.path)
                          ? 'bg-secondary text-foreground'
                          : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <motion.div variants={itemVariants} className="h-px bg-border my-2" />
              
              <motion.div variants={itemVariants} className="mt-4 flex flex-col space-y-3">
                {dashboardMode ? (
                  <div className="flex items-center justify-between px-4 py-3 bg-secondary/50 rounded-xl">
                    <span className="text-sm font-medium text-foreground">Welcome, {userName || 'User'}</span>
                    <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                ) : isAuthenticated ? (
                  <>
                    <Link
                      to={userRole === 'student' ? '/student/dashboard' : '/faculty/dashboard'}
                      className="block px-4 py-3 rounded-xl text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                      className="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <Link
                      to="/login"
                      className="flex justify-center px-4 py-2.5 rounded-xl text-sm font-medium border border-border text-foreground hover:bg-secondary transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="flex justify-center px-4 py-2.5 rounded-xl text-sm font-medium bg-foreground text-background hover:opacity-90 transition-opacity"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showUserDropdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 hidden md:block"
            onClick={() => setShowUserDropdown(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;