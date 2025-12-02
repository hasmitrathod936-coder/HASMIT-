import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Globe, ShieldCheck, Lock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-1">
             <span className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2 mb-4">
                NexGen<span className="text-indigo-600"> India</span>
             </span>
             <p className="text-gray-500 text-sm leading-relaxed mb-4">
               India's #1 smart recruitment platform. We connect top talent with leading companies in Bangalore, Mumbai, Delhi, and beyond.
             </p>
             <div className="flex items-center text-gray-500 text-sm">
                <Globe className="w-4 h-4 mr-2" />
                Made with ❤️ in India
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Job Seekers</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">Browse Jobs</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">Job Alerts</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">Career Advice</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">Upload Resume</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Employers</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">Post a Job</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">Search Resumes</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">Recruitment Solutions</a></li>
              <li><a href="#" className="text-gray-500 hover:text-indigo-600 text-sm transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Contact</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors"><Instagram className="w-5 h-5" /></a>
            </div>
            <div className="flex items-center text-gray-500 text-sm">
                <Mail className="w-4 h-4 mr-2" />
                support@nexgen.in
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <p className="text-gray-400 text-sm">© 2024 NexGen India. All rights reserved.</p>
            <p className="text-gray-400 text-sm flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-yellow-500" />
                Authorized by <span className="text-gray-600 font-medium">Web Commander</span>
            </p>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-gray-400 text-xs flex items-center gap-1 border px-2 py-0.5 rounded bg-gray-50" title="Protected by Commander Protocol">
                <Lock className="w-3 h-3 text-gray-500" /> Commander Protocol Active
            </span>
            <a href="#" className="text-gray-400 hover:text-gray-600 text-sm">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-gray-600 text-sm">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;