import { useState } from 'react';
import { User, GraduationCap, X } from 'lucide-react';

const UserTypePopup = ({ isOpen, onClose, onUserTypeSelect, mode = 'login' }) => {
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    onUserTypeSelect(type);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="relative bg-background border border-border rounded-3xl p-8 max-w-md w-full shadow-xl animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors bg-secondary p-2 rounded-full"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="mb-8 pr-12">
          <h2 className="text-2xl font-bold text-foreground mb-2 tracking-tight">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h2>
          <p className="text-muted-foreground text-sm">
            Select your account type to continue
          </p>
        </div>

        {/* User type options */}
        <div className="space-y-4">
          <button
            onClick={() => handleTypeSelect('student')}
            className="w-full group relative flex cursor-pointer rounded-2xl border border-border p-5 hover:border-primary/50 hover:bg-secondary/50 transition-all duration-200 text-left items-center shadow-sm hover:shadow-md"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <User className="h-6 w-6" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-foreground tracking-tight">Student</h3>
                <p className="text-sm text-muted-foreground">Current or prospective student</p>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => handleTypeSelect('faculty')}
            className="w-full group relative flex cursor-pointer rounded-2xl border border-border p-5 hover:border-primary/50 hover:bg-secondary/50 transition-all duration-200 text-left items-center shadow-sm hover:shadow-md"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-6 w-6" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-foreground tracking-tight">Faculty</h3>
                <p className="text-sm text-muted-foreground">Staff or faculty member</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTypePopup;