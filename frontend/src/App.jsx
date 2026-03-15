import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ThemeProvider } from './components/theme-provider';

// Common Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CallButton from './components/common/CallButton';
import ChatBot from './components/chat/ChatBot';
import Toast from './components/ui/Toast';
import PrivateRoute from './utils/PrivateRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import StudentApply from './pages/student/Apply';
import StudentStatus from './pages/student/Status';

// Faculty Pages
import FacultyDashboard from './pages/faculty/Dashboard';
import FacultyApplications from './pages/faculty/Applications';
import FacultyEnquiries from './pages/faculty/Enquiries';

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, filter: 'blur(5px)' }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));
  const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole') || '');
  const [userName, setUserName] = useState(() => localStorage.getItem('userName') || '');
  const location = useLocation();

  // Keep localStorage in sync with state
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('userRole', userRole || '');
      localStorage.setItem('userName', userName || '');
    }
  }, [isAuthenticated, userRole, userName]);

  // Helper for logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    setUserName('');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
  };

  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans overflow-x-hidden">
      <Header 
        isAuthenticated={isAuthenticated} 
        userRole={userRole} 
        userName={userName} 
        onLogout={handleLogout} 
        pathname={location.pathname} 
      />
      <main className={`flex-1 relative ${isHome ? '' : 'pt-20'}`}>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/courses" element={<PageTransition><Courses /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/login" element={
              <PageTransition>
                <Login isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userRole={userRole} setUserRole={setUserRole} userName={userName} setUserName={setUserName} />
              </PageTransition>
            } />
            <Route path="/register" element={
              <PageTransition>
                <Register isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userRole={userRole} setUserRole={setUserRole} userName={userName} setUserName={setUserName} />
              </PageTransition>
            } />
            
            {/* Student Routes */}
            <Route path="/student/dashboard" element={
              <PrivateRoute isAuthenticated={isAuthenticated} role={userRole} allowedRoles={['student']}>
                <PageTransition><StudentDashboard /></PageTransition>
              </PrivateRoute>
            } />
            <Route path="/student/apply" element={
              <PrivateRoute isAuthenticated={isAuthenticated} role={userRole} allowedRoles={['student']}>
                <PageTransition><StudentApply /></PageTransition>
              </PrivateRoute>
            } />
            <Route path="/student/status" element={
              <PrivateRoute isAuthenticated={isAuthenticated} role={userRole} allowedRoles={['student']}>
                <PageTransition><StudentStatus /></PageTransition>
              </PrivateRoute>
            } />
            
            {/* Faculty Routes */}
            <Route path="/faculty/dashboard" element={
              <PrivateRoute isAuthenticated={isAuthenticated} role={userRole} allowedRoles={['faculty']}>
                <PageTransition><FacultyDashboard /></PageTransition>
              </PrivateRoute>
            } />
            <Route path="/faculty/applications" element={
              <PrivateRoute isAuthenticated={isAuthenticated} role={userRole} allowedRoles={['faculty']}>
                <PageTransition><FacultyApplications /></PageTransition>
              </PrivateRoute>
            } />
            <Route path="/faculty/enquiries" element={
              <PrivateRoute isAuthenticated={isAuthenticated} role={userRole} allowedRoles={['faculty']}>
                <PageTransition><FacultyEnquiries /></PageTransition>
              </PrivateRoute>
            } />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
      <CallButton />
      <ChatBot />
      <Toast />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="eduworld-theme">
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
