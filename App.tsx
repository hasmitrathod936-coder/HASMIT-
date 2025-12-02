import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import JobCard from './components/JobCard';
import JobDetail from './components/JobDetail';
import Profile from './components/Profile';
import HelpGuide from './components/HelpGuide';
import Footer from './components/Footer';
import { Job, JobAlert, UserProfile } from './types';
import { searchJobsWithAI } from './services/geminiService';
import { 
  BriefcaseIcon, 
  Bookmark, 
  Code, 
  Stethoscope, 
  Building2, 
  Megaphone, 
  BarChart3, 
  Users, 
  Headset, 
  HardHat,
  BellRing,
  Trash2,
  Mail,
  X,
  CheckCircle2,
  Search,
  Wand2,
  Send,
  Star,
  Quote,
  Landmark,
  Building,
  MapPin
} from 'lucide-react';

const CATEGORIES = [
  { name: 'IT & Software', icon: Code, query: 'Software Engineer Developer Tech' },
  { name: 'Pharma & Health', icon: Stethoscope, query: 'Pharmaceutical Doctor Medical Healthcare' },
  { name: 'Banking & Finance', icon: Building2, query: 'Banking Finance Accountant CA' },
  { name: 'Sales & Marketing', icon: Megaphone, query: 'Sales Marketing Business Development' },
  { name: 'Data Science', icon: BarChart3, query: 'Data Scientist Analytics Machine Learning' },
  { name: 'HR & Admin', icon: Users, query: 'Human Resources Recruiter Administration' },
  { name: 'BPO / Customer Care', icon: Headset, query: 'BPO Customer Support Voice Process' },
  { name: 'Engineering', icon: HardHat, query: 'Mechanical Civil Electrical Core Engineering' },
];

const POPULAR_LOCATIONS = [
  { name: 'Bangalore', type: 'Silicon Valley of India' },
  { name: 'Mumbai', type: 'Financial Capital' },
  { name: 'Delhi NCR', type: 'Corporate & Tech Hub' },
  { name: 'Hyderabad', type: 'Cyber City' },
  { name: 'Pune', type: 'IT & Auto Hub' },
  { name: 'Chennai', type: 'SaaS & Manufacturing' },
  { name: 'Kolkata', type: 'Commercial Hub' },
  { name: 'Remote', type: 'Work from Anywhere' },
];

const TRUSTED_COMPANIES = ['TATA Consultancy Services', 'Infosys', 'HDFC Bank', 'Reliance', 'Wipro', 'Flipkart'];

const DEFAULT_PROFILE: UserProfile = {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    address: 'Flat 402, Greenfield Apartments,\nIndiranagar, Bangalore, Karnataka - 560038',
    qualification: 'B.Tech Computer Science',
    university: 'Bangalore Institute of Technology',
    skills: 'React, TypeScript, Node.js, Tailwind CSS, Project Management',
    biodata: 'Motivated software engineer with 5 years of experience building scalable web applications. Passionate about clean code and user experience. Looking for opportunities in top tech product companies in India.'
};

const USER_REVIEWS = [
  {
    id: 1,
    name: "Priya Venkatesh",
    role: "Marketing Manager",
    company: "Placed at Zomato",
    text: "I was skeptical about AI recruitment tools, but NexGen India changed my mind. The cover letter generator saved me hours, and I landed an interview within 3 days!",
    rating: 5,
  },
  {
    id: 2,
    name: "Amit Patel",
    role: "Fresher Graduate",
    company: "Looking for roles",
    text: "The interface is very clean and simple compared to other cluttered job sites. I wish there were more internship options for non-engineering fields, but the experience is great.",
    rating: 4,
  },
  {
    id: 3,
    name: "Sneha Reddy",
    role: "Senior Developer",
    company: "Placed at Tech Mahindra",
    text: "The 'Save Job' feature and Alerts are lifesavers. I didn't have to keep searching manually. Good job on the profile section too, very easy to update.",
    rating: 5,
  }
];

// Security Helper: Safe JSON Parse to prevent crashes from tampered data
const safeParse = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.warn(`System Security Alert: Data corruption detected in ${key}. Resetting to safe defaults.`);
    return fallback;
  }
};

const App: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [lastSearch, setLastSearch] = useState({ query: '', location: 'India' });
  
  // View State
  const [currentView, setCurrentView] = useState<'search' | 'saved' | 'alerts' | 'profile' | 'help'>('search');

  // Saved Jobs State - Using Safe Parse
  const [savedJobs, setSavedJobs] = useState<Job[]>(() => safeParse('nexgen_saved_jobs', []));

  // Job Alerts State - Using Safe Parse
  const [jobAlerts, setJobAlerts] = useState<JobAlert[]>(() => safeParse('nexgen_alerts', []));

  // User Profile State - Using Safe Parse
  const [userProfile, setUserProfile] = useState<UserProfile>(() => safeParse('nexgen_user_profile', DEFAULT_PROFILE));

  // Alert Modal State
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertEmail, setAlertEmail] = useState('');
  const [alertFrequency, setAlertFrequency] = useState<'Daily' | 'Weekly'>('Daily');

  // Mobile view state
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);

  // System Startup Log
  useEffect(() => {
    console.log("------------------------------------------------");
    console.log("🚀 NEXGEN INDIA: OFFICIAL WEB LAUNCH INITIATED");
    console.log("------------------------------------------------");
    console.log("SYSTEM STARTUP: COMMANDER PROTOCOL ACTIVE");
    console.log("SECURITY STATUS: LOCKED (PIN REQUIRED: HNR141509)");
    console.log("SYSTEM STATUS: ONLINE");
  }, []);

  // Persist saved jobs
  useEffect(() => {
    try {
      localStorage.setItem('nexgen_saved_jobs', JSON.stringify(savedJobs));
    } catch (e) {
      console.error("Storage Error: Failed to save jobs.");
    }
  }, [savedJobs]);

  // Persist job alerts
  useEffect(() => {
    try {
      localStorage.setItem('nexgen_alerts', JSON.stringify(jobAlerts));
    } catch (e) {
      console.error("Storage Error: Failed to save alerts.");
    }
  }, [jobAlerts]);

  // Persist user profile
  useEffect(() => {
    try {
      localStorage.setItem('nexgen_user_profile', JSON.stringify(userProfile));
    } catch (e) {
      console.error("Storage Error: Failed to save profile.");
    }
  }, [userProfile]);

  // Initial Load
  useEffect(() => {
    // Default search for Indian market
    handleSearch('', 'India');
  }, []);

  const handleSearch = async (query: string, location: string) => {
    setCurrentView('search'); // Switch to search view on new search
    setLastSearch({ query: query || 'Various Roles', location: location || 'India' });
    setIsLoading(true);
    setHasSearched(true);
    setSelectedJob(null); // Deselect on new search
    
    // Simulate slight network delay for better UX if API is too fast
    const [fetchedJobs] = await Promise.all([
        searchJobsWithAI(query, location),
        new Promise(resolve => setTimeout(resolve, 800)) 
    ]);

    setJobs(fetchedJobs);
    setIsLoading(false);
    
    // Auto select first job on desktop
    if (window.innerWidth >= 1024 && fetchedJobs.length > 0) {
        setSelectedJob(fetchedJobs[0]);
    }
  };

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    if (window.innerWidth < 1024) {
        setIsMobileDetailOpen(true);
    }
  };

  const toggleSaveJob = (job: Job) => {
    setSavedJobs(prev => {
        const exists = prev.some(j => j.id === job.id);
        if (exists) {
            return prev.filter(j => j.id !== job.id);
        } else {
            return [...prev, job];
        }
    });
  };

  const createJobAlert = () => {
    if (!alertEmail) return;
    
    const newAlert: JobAlert = {
        id: Math.random().toString(36).substr(2, 9),
        query: lastSearch.query,
        location: lastSearch.location,
        email: alertEmail,
        frequency: alertFrequency,
        createdAt: new Date().toLocaleDateString()
    };
    
    setJobAlerts(prev => [newAlert, ...prev]);
    setIsAlertModalOpen(false);
    
    // Feedback to user
    alert(`Job Alert Created!\nWe will send ${alertFrequency} emails to ${alertEmail} for jobs matching "${lastSearch.query}" in "${lastSearch.location}".`);
    
    setAlertEmail(''); // Reset email
  };

  const deleteAlert = (id: string) => {
    setJobAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const handleSaveProfile = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
  };

  const isJobSaved = (jobId: string) => savedJobs.some(j => j.id === jobId);

  // Determine which list of jobs to display
  const displayJobs = currentView === 'search' ? jobs : savedJobs;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Header 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        savedCount={savedJobs.length}
        userProfile={userProfile}
      />
      
      {/* Hero Section */}
      {currentView !== 'profile' && currentView !== 'help' && (
        <div className="bg-indigo-700 pb-20 pt-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                {currentView === 'search' 
                    ? <>Find your next <span className="text-indigo-200">dream job in India</span></>
                    : currentView === 'saved'
                    ? <>Your <span className="text-indigo-200">Saved Opportunities</span></>
                    : <>Manage <span className="text-indigo-200">Job Alerts</span></>
                }
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-indigo-100">
                {currentView === 'search' 
                    ? "Intelligent matching for the Indian market, automated cover letters, and personalized career insights powered by smart technology."
                    : currentView === 'saved' 
                    ? "Review and manage the jobs you've shortlisted for applications."
                    : "Get notified via email when new jobs matching your preferences are posted."
                }
            </p>
            </div>
        </div>
      )}

      <main className={`flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12 ${currentView !== 'profile' && currentView !== 'help' ? '-mt-8' : 'mt-4'}`}>
        
        {/* PROFILE VIEW */}
        {currentView === 'profile' && (
            <Profile 
                profile={userProfile} 
                onSave={handleSaveProfile} 
            />
        )}

        {/* HELP GUIDE VIEW */}
        {currentView === 'help' && (
            <HelpGuide />
        )}

        {/* Search View Specific Components */}
        {currentView === 'search' && (
            <>
                <SearchBar onSearch={handleSearch} isLoading={isLoading} />
                
                {/* Job Type Section: Private vs Govt */}
                <div className="mt-8 mb-6">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Browse by Job Type</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            onClick={() => handleSearch('Private Sector MNC Startup', 'India')}
                            className="flex items-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-400 hover:bg-indigo-50 transition-all group text-left"
                        >
                            <div className="p-4 bg-blue-100 rounded-full group-hover:bg-white group-hover:text-indigo-600 transition-colors mr-4">
                                <Building className="w-8 h-8 text-blue-600" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 group-hover:text-indigo-700">Private Jobs</h4>
                                <p className="text-sm text-gray-500 mt-1">MNCs, Startups, IT, Corporate Roles</p>
                            </div>
                        </button>
                        
                        <button
                            onClick={() => handleSearch('Government Sarkari Naukri PSU Bank', 'India')}
                            className="flex items-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-orange-400 hover:bg-orange-50 transition-all group text-left"
                        >
                            <div className="p-4 bg-orange-100 rounded-full group-hover:bg-white group-hover:text-orange-600 transition-colors mr-4">
                                <Landmark className="w-8 h-8 text-orange-600" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-gray-900 group-hover:text-orange-700">Government Jobs</h4>
                                <p className="text-sm text-gray-500 mt-1">Sarkari Naukri, PSU, Railways, Banking</p>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Categories Section */}
                <div className="mt-8 mb-6">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Browse by Sector</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.name}
                                onClick={() => handleSearch(cat.query, 'India')}
                                className="flex flex-col items-center justify-center p-3 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-indigo-300 hover:bg-indigo-50 transition-all group gap-2"
                            >
                                <div className="p-2 bg-gray-50 rounded-full group-hover:bg-white transition-colors">
                                    <cat.icon className="w-5 h-5 text-gray-500 group-hover:text-indigo-600" />
                                </div>
                                <span className="text-xs font-medium text-gray-700 group-hover:text-indigo-700 text-center">{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Browse by Location Section */}
                <div className="mt-8 mb-6">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Browse by Location</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {POPULAR_LOCATIONS.map((loc) => (
                            <button
                                key={loc.name}
                                onClick={() => handleSearch('', loc.name)}
                                className="flex items-center p-3 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-indigo-300 hover:bg-indigo-50 transition-all group"
                            >
                                <div className="p-2 bg-indigo-50 rounded-full group-hover:bg-white transition-colors mr-3">
                                    <MapPin className="w-5 h-5 text-indigo-500 group-hover:text-indigo-600" />
                                </div>
                                <div className="text-left">
                                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-indigo-700">{loc.name}</h4>
                                    <p className="text-xs text-gray-500">{loc.type}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* How It Works Section */}
                <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-5 rounded-xl border border-indigo-100 shadow-sm flex items-start gap-4">
                        <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                            <Search className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-1">1. Smart Search</h4>
                            <p className="text-sm text-gray-500">Enter your role and city. Our smart engine scans thousands of listings to find your best matches.</p>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-indigo-100 shadow-sm flex items-start gap-4">
                        <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                            <Wand2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-1">2. Smart Cover Letter</h4>
                            <p className="text-sm text-gray-500">Don't write alone. Let our smart assistant draft a professional cover letter instantly.</p>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-xl border border-indigo-100 shadow-sm flex items-start gap-4">
                        <div className="p-3 bg-green-50 rounded-lg text-green-600">
                            <Send className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-1">3. Easy Apply</h4>
                            <p className="text-sm text-gray-500">Submit your application to top Indian companies with a single click.</p>
                        </div>
                    </div>
                </div>
            </>
        )}

        {/* ALERTS VIEW */}
        {currentView === 'alerts' && (
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px] mt-4">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-900">Your Active Alerts</h2>
                    <button 
                        onClick={() => setCurrentView('search')} 
                        className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                        Create New Alert from Search
                    </button>
                </div>
                
                {jobAlerts.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                        {jobAlerts.map(alert => (
                            <div key={alert.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-indigo-100 rounded-full">
                                        <BellRing className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900">{alert.query || "All Jobs"}</h3>
                                        <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                                            <span>{alert.location}</span>
                                            <span>•</span>
                                            <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{alert.frequency}</span>
                                        </p>
                                        <p className="text-xs text-gray-400 mt-2">Sent to: {alert.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button 
                                        onClick={() => deleteAlert(alert.id)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
                                        title="Delete Alert"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 px-6">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BellRing className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts set yet</h3>
                        <p className="text-gray-500 mb-6 max-w-md mx-auto">
                            Create a job alert to get notified when new jobs match your preferences. 
                            Go to "Find Jobs", search for a role, and click the bell icon.
                        </p>
                        <button 
                            onClick={() => setCurrentView('search')}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            Search Jobs
                        </button>
                    </div>
                )}
             </div>
        )}

        {/* SEARCH & SAVED JOBS SPLIT VIEW */}
        {(currentView === 'search' || currentView === 'saved') && (
            <div className={`flex flex-col lg:flex-row gap-6 ${currentView === 'saved' ? 'mt-8' : 'mt-0'}`}>
                {/* Left Column: Filters & Job List */}
                <div className={`flex flex-col gap-4 lg:w-5/12 ${isMobileDetailOpen ? 'hidden lg:flex' : 'flex'} ${currentView === 'search' ? 'h-[600px]' : 'h-[calc(100vh-250px)]'}`}>
                    
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-lg font-bold text-gray-800">
                            {currentView === 'search' 
                                ? (isLoading ? 'Searching...' : `${jobs.length} Jobs Found`)
                                : `${savedJobs.length} Saved Jobs`
                            }
                        </h2>
                        {currentView === 'search' && !isLoading && (
                            <button 
                                onClick={() => setIsAlertModalOpen(true)}
                                className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                            >
                                <BellRing className="w-4 h-4" />
                                Create Alert
                            </button>
                        )}
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
                        {isLoading ? (
                            // Skeleton Loaders
                            Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm animate-pulse">
                                    <div className="flex gap-3 mb-3">
                                        <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                                </div>
                            ))
                        ) : displayJobs.length > 0 ? (
                            displayJobs.map((job) => (
                                <JobCard 
                                    key={job.id} 
                                    job={job} 
                                    isSelected={selectedJob?.id === job.id}
                                    isSaved={isJobSaved(job.id)}
                                    onClick={() => handleJobSelect(job)}
                                    onToggleSave={(e) => {
                                        e.stopPropagation();
                                        toggleSaveJob(job);
                                    }}
                                />
                            ))
                        ) : (
                            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                                {currentView === 'search' ? (
                                    <>
                                        <BriefcaseIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                        <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
                                        <p className="text-gray-500">Try adjusting your search criteria or location.</p>
                                    </>
                                ) : (
                                    <>
                                        <Bookmark className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                        <h3 className="text-lg font-medium text-gray-900">No saved jobs yet</h3>
                                        <p className="text-gray-500 mb-4">Jobs you save will appear here.</p>
                                        <button 
                                            onClick={() => setCurrentView('search')}
                                            className="text-indigo-600 font-medium hover:text-indigo-800"
                                        >
                                            Find Jobs
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Job Details (Desktop) */}
                <div className={`hidden lg:block lg:w-7/12 h-full ${currentView === 'search' ? 'h-[600px]' : 'h-[calc(100vh-250px)]'}`}>
                    {selectedJob ? (
                        <JobDetail 
                            job={selectedJob} 
                            onCloseMobile={() => {}} 
                            isSaved={isJobSaved(selectedJob.id)}
                            onToggleSave={() => toggleSaveJob(selectedJob)}
                            userProfile={userProfile}
                        />
                    ) : (
                        <div className="h-full bg-white rounded-xl border border-gray-200 border-dashed flex items-center justify-center text-gray-400">
                            {currentView === 'saved' && savedJobs.length === 0 
                                ? 'Search for jobs to save them here' 
                                : 'Select a job to view details'
                            }
                        </div>
                    )}
                </div>

                {/* Mobile Job Detail Overlay */}
                {selectedJob && isMobileDetailOpen && (
                    <div className="fixed inset-0 z-50 bg-gray-50 lg:hidden">
                        <JobDetail 
                            job={selectedJob} 
                            onCloseMobile={() => setIsMobileDetailOpen(false)} 
                            isSaved={isJobSaved(selectedJob.id)}
                            onToggleSave={() => toggleSaveJob(selectedJob)}
                            userProfile={userProfile}
                        />
                    </div>
                )}
            </div>
        )}

        {/* TRUSTED COMPANIES - Only show in search view */}
        {currentView === 'search' && (
             <div className="mt-12 mb-10 pb-2 border-b border-gray-100 hidden md:block">
               <p className="text-center text-xs text-gray-400 font-semibold uppercase tracking-widest mb-4">Trusted by leading companies</p>
               <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-50">
                  {TRUSTED_COMPANIES.map(company => (
                     <span key={company} className="text-lg font-bold text-gray-500 hover:text-indigo-600 transition-colors cursor-default select-none">
                        {company}
                     </span>
                  ))}
               </div>
            </div>
        )}

        {/* REVIEWS SECTION - Only show in search view */}
        {currentView === 'search' && (
            <div className="py-10">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-gray-900">What users think about NexGen India</h2>
                    <p className="text-gray-500 mt-2">Feedback from our community (Good & Bad)</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {USER_REVIEWS.map(review => (
                        <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative">
                            <Quote className="w-8 h-8 text-indigo-100 absolute top-4 right-4" />
                            <div className="flex items-center gap-1 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star 
                                        key={i} 
                                        className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} 
                                    />
                                ))}
                            </div>
                            <p className="text-gray-600 italic mb-4 text-sm leading-relaxed">"{review.text}"</p>
                            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
                                <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">{review.name}</p>
                                    <p className="text-xs text-indigo-600">{review.company}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

      </main>

      <Footer />

      {/* CREATE ALERT MODAL */}
      {isAlertModalOpen && (
        <div className="fixed inset-0 z-[60] bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <BellRing className="w-5 h-5 text-indigo-600" />
                        Create Job Alert
                    </h3>
                    <button 
                        onClick={() => setIsAlertModalOpen(false)}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="p-6 space-y-4">
                    <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
                        <p className="text-sm text-indigo-800 font-medium">Alert Criteria:</p>
                        <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                            <span className="font-semibold">{lastSearch.query}</span>
                            <span className="text-gray-400">•</span>
                            <span>{lastSearch.location}</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-4 w-4 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                value={alertEmail}
                                onChange={(e) => setAlertEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                autoFocus
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setAlertFrequency('Daily')}
                                className={`px-4 py-2 border rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
                                    alertFrequency === 'Daily' 
                                    ? 'bg-indigo-600 text-white border-transparent' 
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                {alertFrequency === 'Daily' && <CheckCircle2 className="w-3.5 h-3.5" />}
                                Daily
                            </button>
                            <button
                                onClick={() => setAlertFrequency('Weekly')}
                                className={`px-4 py-2 border rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
                                    alertFrequency === 'Weekly' 
                                    ? 'bg-indigo-600 text-white border-transparent' 
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                {alertFrequency === 'Weekly' && <CheckCircle2 className="w-3.5 h-3.5" />}
                                Weekly
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={createJobAlert}
                        disabled={!alertEmail}
                        className="w-full mt-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Create Alert
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default App;