import React, { useState } from 'react';
import { UserProfile } from '../types';
import { User, Mail, Phone, MapPin, GraduationCap, Code, FileText, Save, ShieldCheck, Lock, Unlock, ShieldAlert, KeyRound, X } from 'lucide-react';

interface ProfileProps {
  profile: UserProfile;
  onSave: (updatedProfile: UserProfile) => void;
}

const Profile: React.FC<ProfileProps> = ({ profile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authPin, setAuthPin] = useState('');
  const [authError, setAuthError] = useState('');
  const [formData, setFormData] = useState<UserProfile>(profile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditClick = () => {
    // Security Intercept
    setShowAuthModal(true);
    setAuthPin('');
    setAuthError('');
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Commander Verification Logic
    if (authPin === 'HNR141509') {
        setShowAuthModal(false);
        setIsEditing(true);
    } else {
        setAuthError('ACCESS DENIED: Restricted to Web Commander');
        setAuthPin('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden my-8 relative">
      {/* Profile Header */}
      <div className="bg-indigo-600 h-32 relative">
        <div className="absolute -bottom-16 left-8 flex items-end">
          <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg relative">
            <div className="w-full h-full bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500">
               <User className="w-16 h-16" />
            </div>
            {isEditing ? (
                <div className="absolute bottom-1 right-1 bg-green-500 rounded-full p-1.5 border-2 border-white shadow-sm" title="Write Access Granted">
                    <Unlock className="w-4 h-4 text-white" />
                </div>
            ) : (
                <div className="absolute bottom-1 right-1 bg-gray-700 rounded-full p-1.5 border-2 border-white shadow-sm" title="Read-Only Mode">
                    <Lock className="w-4 h-4 text-white" />
                </div>
            )}
          </div>
          <div className="mb-4 ml-4">
             <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white drop-shadow-md">{profile.name || 'Your Name'}</h1>
                {/* Immutable Web Commander Badge */}
                <div className="flex items-center gap-1 px-2 py-0.5 bg-yellow-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm border border-yellow-400 select-none">
                    <ShieldCheck className="w-3 h-3" />
                    Web Commander
                </div>
             </div>
             <p className="text-indigo-100">{profile.qualification || 'Job Seeker'}</p>
          </div>
        </div>
        <div className="absolute top-4 right-4">
            {!isEditing ? (
                <button 
                    onClick={handleEditClick}
                    className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur-sm transition-colors font-medium border border-white/10"
                >
                    <Lock className="w-4 h-4" /> Edit Profile
                </button>
            ) : (
                <div className="flex gap-2">
                    <button 
                        onClick={() => setIsEditing(false)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur-sm transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-4 py-2 bg-white text-indigo-600 hover:bg-indigo-50 rounded-lg shadow-sm transition-colors font-bold"
                    >
                        <Save className="w-4 h-4" /> Save Changes
                    </button>
                </div>
            )}
        </div>
      </div>

      <div className="pt-20 px-8 pb-12">
        {/* Security Banner */}
        {!isEditing && (
            <div className="mb-6 p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center gap-3 text-sm text-gray-500">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span>System Profile: <strong>Secure Read-Only Mode</strong>. Authentication required to modify.</span>
            </div>
        )}

        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                
                {/* Contact Section */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                        <User className="w-5 h-5 text-indigo-600" />
                        Personal Details
                    </h3>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        {isEditing ? (
                            <input 
                                type="text" name="name" value={formData.name} onChange={handleChange}
                                maxLength={50}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        ) : (
                            <p className="text-gray-900 font-medium text-lg">{profile.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <Mail className="w-4 h-4 text-gray-400" /> Email
                        </label>
                        {isEditing ? (
                            <input 
                                type="email" name="email" value={formData.email} onChange={handleChange}
                                maxLength={60}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        ) : (
                            <p className="text-gray-900">{profile.email}</p>
                        )}
                    </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <Phone className="w-4 h-4 text-gray-400" /> Phone
                        </label>
                        {isEditing ? (
                            <input 
                                type="tel" name="phone" value={formData.phone} onChange={handleChange}
                                maxLength={15}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        ) : (
                            <p className="text-gray-900">{profile.phone}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <MapPin className="w-4 h-4 text-gray-400" /> Permanent Address
                        </label>
                        {isEditing ? (
                            <textarea 
                                name="address" value={formData.address} onChange={handleChange} rows={3}
                                maxLength={150}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        ) : (
                            <p className="text-gray-900 whitespace-pre-line">{profile.address}</p>
                        )}
                    </div>
                </div>

                {/* Professional Section */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b pb-2 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-indigo-600" />
                        Professional & Education
                    </h3>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Highest Qualification</label>
                        {isEditing ? (
                            <input 
                                type="text" name="qualification" value={formData.qualification} onChange={handleChange}
                                placeholder="e.g. B.Tech Computer Science"
                                maxLength={50}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        ) : (
                            <p className="text-gray-900 font-medium">{profile.qualification}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">University / Institute</label>
                        {isEditing ? (
                            <input 
                                type="text" name="university" value={formData.university} onChange={handleChange}
                                placeholder="e.g. IIT Bombay"
                                maxLength={50}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        ) : (
                            <p className="text-gray-900">{profile.university}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <Code className="w-4 h-4 text-gray-400" /> Key Skills
                        </label>
                        {isEditing ? (
                            <input 
                                type="text" name="skills" value={formData.skills} onChange={handleChange}
                                placeholder="e.g. React, Node.js, Python, Leadership"
                                maxLength={100}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {profile.skills.split(',').map((skill, idx) => (
                                    <span key={idx} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium border border-indigo-100">
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                            <FileText className="w-4 h-4 text-gray-400" /> Biodata / Summary
                        </label>
                        {isEditing ? (
                            <textarea 
                                name="biodata" value={formData.biodata} onChange={handleChange} rows={4}
                                placeholder="Brief overview of your career and goals..."
                                maxLength={500}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        ) : (
                            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm bg-gray-50 p-4 rounded-lg border border-gray-100">
                                {profile.biodata}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </form>
      </div>

      {/* Security Authentication Modal */}
      {showAuthModal && (
        <div className="absolute inset-0 z-50 bg-gray-900/95 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-sm rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-red-600" />
                        Security Clearance
                    </h3>
                    <button onClick={() => setShowAuthModal(false)} className="text-gray-400 hover:text-gray-600">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6">
                    <p className="text-sm text-gray-600 mb-4">
                        This system is protected. Only the <strong>Web Commander</strong> has permission to modify core data.
                    </p>
                    <form onSubmit={handleAuthSubmit}>
                        <div className="mb-4">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                Commander Access Code
                            </label>
                            <div className="relative">
                                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input 
                                    type="password"
                                    value={authPin}
                                    onChange={(e) => setAuthPin(e.target.value)}
                                    placeholder="Enter Protocol PIN"
                                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all font-mono"
                                    autoFocus
                                />
                            </div>
                            {authError && (
                                <p className="text-xs text-red-600 font-bold mt-2 flex items-center gap-1 animate-pulse">
                                    <ShieldAlert className="w-3 h-3" /> {authError}
                                </p>
                            )}
                        </div>
                        <button 
                            type="submit"
                            className="w-full py-2 bg-gray-900 hover:bg-black text-white font-bold rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
                        >
                            <Unlock className="w-4 h-4" /> Authenticate
                        </button>
                    </form>
                </div>
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-center">
                    <p className="text-xs text-gray-400 font-mono">SECURE SYSTEM V1.0</p>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default Profile;