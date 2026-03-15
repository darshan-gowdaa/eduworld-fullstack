import ApplicationForm from '../../components/forms/ApplicationForm';
import { motion } from 'framer-motion';

const StudentApply = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Application Form
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Begin your journey with EduWorld. Complete your application in three simple steps. We'll guide you through each section.
          </p>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.1 }}
        >
          <ApplicationForm />
        </motion.div>
      </div>
    </div>
  );
};

export default StudentApply;