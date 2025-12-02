import React from 'react';
import { Search, User, FileText, Bell, Sparkles, HelpCircle, ChevronRight, Wand2 } from 'lucide-react';

const HelpGuide: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
          <HelpCircle className="w-8 h-8 text-indigo-600" />
          NexGen India User Guide
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Welcome to the future of recruitment. This guide will help you navigate NexGen India like a pro and land your dream job faster.
        </p>
      </div>

      {/* Quick Start Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-6 border-b pb-4">🚀 Quick Start Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-100 rounded-full"></div>
            <div className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold absolute -left-3.5 top-0 ring-4 ring-white">1</div>
            <div className="pt-2">
              <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-indigo-600" /> Set Up Profile
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Go to "My Profile" and fill in your details, skills, and biodata. This ensures the <strong>Smart Assistant</strong> generates personalized cover letters for you.
              </p>
            </div>
          </div>
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-100 rounded-full"></div>
            <div className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold absolute -left-3.5 top-0 ring-4 ring-white">2</div>
            <div className="pt-2">
              <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-2">
                <Search className="w-4 h-4 text-indigo-600" /> Smart Search
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Use the search bar or browse by <strong>Sector</strong> or <strong>Location</strong>. You can even filter specifically for <strong>Government</strong> or <strong>Private</strong> jobs.
              </p>
            </div>
          </div>
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-100 rounded-full"></div>
            <div className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold absolute -left-3.5 top-0 ring-4 ring-white">3</div>
            <div className="pt-2">
              <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-2">
                <Wand2 className="w-4 h-4 text-indigo-600" /> Apply Smartly
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Click "Apply Now" on any job. Use the <strong>Smart Application Assistant</strong> to instantly write a professional cover letter, then hit Send.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Deep Dive */}
      <h2 className="text-xl font-bold text-gray-900 mb-6">✨ Features Explained</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">Smart Cover Letters</h3>
          <p className="text-gray-600 text-sm">
            Writing cover letters is tedious. Our Smart engine analyzes the job description and your profile (Skills & Experience) to write a persuasive letter in seconds. You can edit it before sending.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mb-4">
            <Bell className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">Job Alerts</h3>
          <p className="text-gray-600 text-sm">
            Never miss an opportunity. After making a search (e.g., "Java Developer" in "Pune"), click the <strong>Bell Icon</strong>. You'll get Daily or Weekly updates for new matches.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">Govt vs Private</h3>
          <p className="text-gray-600 text-sm">
            We understand the Indian market. Use the dedicated buttons on the home page to switch between Corporate MNC roles and Sarkari Naukri (Government & PSU) listings.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
                <User className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Persistent Profile</h3>
            <p className="text-gray-600 text-sm">
                Your data is saved locally on your device. You don't need to login every time. Your saved jobs and profile details are always ready when you return.
            </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">❓ Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mr-2" />
                Are the job listings real?
            </h4>
            <p className="text-sm text-gray-600 ml-6">
                This is the <strong>Official AI Portal</strong>. The jobs are generated by our advanced intelligent engine to provide the most relevant market simulations for your career planning.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
             <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mr-2" />
                How do I save a job?
            </h4>
            <p className="text-sm text-gray-600 ml-6">
                Click the <strong>Bookmark icon</strong> on any job card. You can view all saved jobs in the "Saved Jobs" tab in the header.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
             <h4 className="font-bold text-gray-900 mb-2 flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mr-2" />
                Is my data secure?
            </h4>
            <p className="text-sm text-gray-600 ml-6">
                Yes. Your profile, saved jobs, and alerts are stored <strong>Locally</strong> on your browser. We do not transmit your personal data to any external server.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpGuide;