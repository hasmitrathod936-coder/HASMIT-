import React, { useState, useEffect } from 'react';
import { Job, CoverLetterRequest, UserProfile } from '../types';
import { MapPin, IndianRupee, Briefcase, CheckCircle2, Zap, Wand2, X, Bookmark, Send, Loader2 } from 'lucide-react';
import { generateCoverLetter } from '../services/geminiService';

interface JobDetailProps {
  job: Job;
  onCloseMobile: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
  userProfile: UserProfile;
}

const JobDetail: React.FC<JobDetailProps> = ({ job, onCloseMobile, isSaved, onToggleSave, userProfile }) => {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  
  // Initialize with User Profile data if available, otherwise defaults
  const [candidateName, setCandidateName] = useState(userProfile.name || '');
  const [userSkills, setUserSkills] = useState(userProfile.skills || '');
  const [userExp, setUserExp] = useState(userProfile.biodata || '');
  
  // Update local state if profile changes
  useEffect(() => {
    if (userProfile.name) setCandidateName(userProfile.name);
    if (userProfile.skills) setUserSkills(userProfile.skills);
    if (userProfile.biodata) setUserExp(userProfile.biodata);
  }, [userProfile]);
  
  // Application status state
  const [appStatus, setAppStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleAIApply = async () => {
    setIsGenerating(true);
    const req: CoverLetterRequest = {
        jobTitle: job.title,
        companyName: job.company,
        candidateName,
        skills: userSkills,
        experience: userExp
    };
    const letter = await generateCoverLetter(req);
    setCoverLetter(letter);
    setIsGenerating(false);
  };

  const handleSubmitApplication = () => {
    setAppStatus('sending');
    // Simulate API call
    setTimeout(() => {
        setAppStatus('sent');
        // Close modal after success
        setTimeout(() => {
            setShowApplyModal(false);
            setAppStatus('idle');
            setCoverLetter('');
        }, 2000);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative">
      {/* Mobile Close Button */}
      <div className="lg:hidden absolute top-4 right-4 z-10">
        <button onClick={onCloseMobile} className="p-2 bg-white rounded-full shadow-md text-gray-500">
            <X className="w-5 h-5" />
        </button>
      </div>

      {/* Header Image/Pattern */}
      <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 w-full relative">
         <div className="absolute -bottom-10 left-8">
            <img 
                src={`https://picsum.photos/seed/${job.logoSeed}/128/128`} 
                alt={`${job.company} logo`}
                className="w-20 h-20 rounded-xl border-4 border-white shadow-md bg-white object-cover"
             />
         </div>
      </div>

      <div className="pt-12 px-8 pb-6 flex-1 overflow-y-auto custom-scrollbar">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
            <div className="flex items-center gap-2 mt-1 text-gray-600">
                <span className="font-medium text-indigo-600">{job.company}</span>
                <span>•</span>
                <span className="text-sm">{job.postedAt}</span>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-6 pb-6 border-b border-gray-100">
                <div className="flex items-center px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
                    <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">{job.location}</span>
                </div>
                <div className="flex items-center px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
                    <Briefcase className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">{job.type}</span>
                </div>
                <div className="flex items-center px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200">
                    <IndianRupee className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">{job.salary}</span>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About the role</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {job.description}
                </p>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                <ul className="space-y-2">
                    {job.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start text-gray-600">
                            <div className="flex-shrink-0 mt-1">
                                <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                            </div>
                            <span className="ml-3 text-sm leading-6">{req}</span>
                        </li>
                    ))}
                </ul>
            </div>

             <div className="mt-8 mb-20">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h3>
                <div className="flex flex-wrap gap-2">
                     {job.benefits.map((benefit, idx) => (
                        <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                            {benefit}
                        </span>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0">
        <div className="flex gap-4">
            <button 
                onClick={() => setShowApplyModal(true)}
                className="flex-1 bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
            >
                Apply Now
            </button>
            <button 
                onClick={onToggleSave}
                className={`px-4 py-3 border rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    isSaved 
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
            >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                {isSaved ? 'Saved' : 'Save'}
            </button>
        </div>
      </div>

      {/* Smart Application Modal */}
      {showApplyModal && (
        <div className="absolute inset-0 z-50 bg-white/95 backdrop-blur-sm p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Wand2 className="w-5 h-5 text-indigo-600" />
                    Smart Application Assistant
                 </h2>
                 <button onClick={() => setShowApplyModal(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="w-6 h-6" />
                 </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4">
                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100 mb-4">
                    <p className="text-sm text-indigo-800">
                        <Zap className="w-4 h-4 inline mr-1" />
                        Our smart assistant has pre-filled your profile details below. Click generate to create a tailored cover letter.
                    </p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input 
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        maxLength={50}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" 
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Key Skills</label>
                    <input 
                        value={userSkills}
                        onChange={(e) => setUserSkills(e.target.value)}
                        maxLength={100}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" 
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience / Biodata Summary</label>
                    <textarea 
                        value={userExp}
                        onChange={(e) => setUserExp(e.target.value)}
                        rows={3}
                        maxLength={500}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" 
                    />
                </div>

                <div className="pt-2">
                    <button 
                        onClick={handleAIApply}
                        disabled={isGenerating || appStatus !== 'idle'}
                        className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70"
                    >
                        {isGenerating ? (
                             <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Generating...
                             </>
                        ) : 'Generate Cover Letter'}
                    </button>
                </div>

                {coverLetter && (
                    <div className="mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Generated Cover Letter</label>
                        <textarea 
                            value={coverLetter}
                            readOnly
                            className="w-full h-64 p-3 border border-gray-300 rounded-lg text-sm text-gray-800 leading-relaxed bg-gray-50 focus:ring-0 mb-3"
                        />
                        <button 
                            onClick={handleSubmitApplication}
                            disabled={appStatus !== 'idle'}
                            className={`w-full py-3 rounded-md font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 ${
                                appStatus === 'sent' 
                                ? 'bg-green-600 text-white'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }`}
                        >
                            {appStatus === 'idle' && (
                                <>
                                    Send Application
                                    <Send className="w-4 h-4" />
                                </>
                            )}
                            {appStatus === 'sending' && (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Sending...
                                </>
                            )}
                            {appStatus === 'sent' && (
                                <>
                                    <CheckCircle2 className="w-5 h-5" />
                                    Application Sent!
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;