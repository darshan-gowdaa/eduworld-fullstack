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
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="relative bg-zinc-950 border border-zinc-800 rounded-[2.5rem] p-8 md:p-10 max-w-md w-full shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-zinc-400 hover:text-white transition-colors bg-zinc-900/50 p-2.5 rounded-full border border-zinc-800"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="mb-10 pr-12">
          <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h2>
          <p className="text-zinc-400 text-base">
            Select your account type to continue
          </p>
        </div>

        {/* User type options */}
        <div className="space-y-4">
          <button
            onClick={() => handleTypeSelect('student')}
            className="w-full group relative flex cursor-pointer rounded-2xl border border-zinc-800 p-6 hover:border-primary/50 hover:bg-zinc-900/50 transition-all duration-300 text-left items-center shadow-lg hover:shadow-primary/5"
          >
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-all duration-300 ring-1 ring-primary/20">
                  <User className="h-7 w-7" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-primary transition-colors">Student</h3>
                <p className="text-sm text-zinc-400">Current or prospective student</p>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => handleTypeSelect('faculty')}
            className="w-full group relative flex cursor-pointer rounded-2xl border border-zinc-800 p-6 hover:border-primary/50 hover:bg-zinc-900/50 transition-all duration-300 text-left items-center shadow-lg hover:shadow-primary/5"
          >
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-all duration-300 ring-1 ring-primary/20">
                  <GraduationCap className="h-7 w-7" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-primary transition-colors">Faculty</h3>
                <p className="text-sm text-zinc-400">Staff or faculty member</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTypePopup;