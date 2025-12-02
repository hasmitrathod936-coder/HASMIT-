import React, { useState } from 'react';
import { Briefcase, Bell, User, Menu, X, HelpCircle, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  currentView: 'search' | 'saved' | 'alerts' | 'profile' | 'help';
  onNavigate: (view: 'search' | 'saved' | 'alerts' | 'profile' | 'help') => void;
  savedCount: number;
  userProfile: UserProfile;
}

const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, savedCount, userProfile }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNav = (view: 'search' | 'saved' | 'alerts' | 'profile' | 'help') => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
              onClick={() => onNavigate('search')}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5" title="Official Verified System">
                    <ShieldCheck className="w-3 h-3 text-green-500 fill-current" />
                </div>
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">NexGen<span className="text-indigo-600"> India</span></span>
            </div>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <button 
                onClick={() => onNavigate('search')}
                className={`${
                  currentView === 'search' 
                    ? 'border-indigo-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16 transition-colors`}
              >
                Find Jobs
              </button>
              <button 
                onClick={() => onNavigate('saved')}
                className={`${
                  currentView === 'saved' 
                    ? 'border-indigo-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16 transition-colors`}
              >
                Saved Jobs
                {savedCount > 0 && (
                  <span className="ml-2 bg-indigo-100 text-indigo-600 py-0.5 px-2 rounded-full text-xs font-semibold">
                    {savedCount}
                  </span>
                )}
              </button>
              <button 
                onClick={() => onNavigate('alerts')}
                className={`${
                  currentView === 'alerts' 
                    ? 'border-indigo-500 text-gray-900' 
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium h-16 transition-colors`}
              >
                Job Alerts
              </button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button 
                onClick={() => onNavigate('help')}
                className={`p-2 rounded-full hover:bg-gray-100 focus:outline-none transition-colors ${currentView === 'help' ? 'text-indigo-600 bg-indigo-50' : 'text-gray-400 hover:text-gray-500'}`}
                title="Help Guide"
            >
              <span className="sr-only">Help</span>
              <HelpCircle className="h-6 w-6" />
            </button>
            
            {/* Desktop Profile Trigger */}
            <button 
                onClick={() => onNavigate('profile')}
                className={`hidden md:flex items-center gap-2 border-l pl-4 border-gray-200 hover:bg-gray-50 p-2 rounded-r-lg transition-colors ${currentView === 'profile' ? 'bg-gray-50' : ''}`}
            >
              <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">{userProfile.name}</span>
              <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200">
                <User className="h-5 w-5 text-indigo-600" />
              </div>
            </button>

            <div className="md:hidden flex items-center">
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none p-2"
                >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="pt-2 pb-3 space-y-1 px-2 shadow-lg">
            <div className="px-3 py-3 flex items-center gap-3 border-b border-gray-100 mb-2">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center border border-indigo-200">
                    <User className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                    <p className="text-sm font-bold text-gray-900">{userProfile.name}</p>
                    <p className="text-xs text-gray-500">{userProfile.email}</p>
                </div>
            </div>

            <button
              onClick={() => handleNav('search')}
              className={`${
                currentView === 'search'
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              } block pl-3 pr-4 py-3 border-l-4 text-base font-medium w-full text-left transition-colors`}
            >
              Find Jobs
            </button>
            <button
              onClick={() => handleNav('saved')}
              className={`${
                currentView === 'saved'
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              } block pl-3 pr-4 py-3 border-l-4 text-base font-medium w-full text-left transition-colors flex items-center`}
            >
              Saved Jobs
              {savedCount > 0 && (
                <span className="ml-2 bg-indigo-100 text-indigo-600 py-0.5 px-2 rounded-full text-xs font-semibold">
                  {savedCount}
                </span>
              )}
            </button>
            <button
              onClick={() => handleNav('alerts')}
              className={`${
                currentView === 'alerts'
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              } block pl-3 pr-4 py-3 border-l-4 text-base font-medium w-full text-left transition-colors`}
            >
              Job Alerts
            </button>
            <button
              onClick={() => handleNav('profile')}
              className={`${
                currentView === 'profile'
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              } block pl-3 pr-4 py-3 border-l-4 text-base font-medium w-full text-left transition-colors`}
            >
              My Profile
            </button>
            <button
              onClick={() => handleNav('help')}
              className={`${
                currentView === 'help'
                  ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                  : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              } block pl-3 pr-4 py-3 border-l-4 text-base font-medium w-full text-left transition-colors`}
            >
              Help Center
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;