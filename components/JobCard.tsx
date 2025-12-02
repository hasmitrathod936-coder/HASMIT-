import React from 'react';
import { Job } from '../types';
import { MapPin, Clock, IndianRupee, Sparkles, Bookmark } from 'lucide-react';

interface JobCardProps {
  job: Job;
  isSelected: boolean;
  isSaved?: boolean;
  onClick: () => void;
  onToggleSave: (e: React.MouseEvent) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, isSelected, isSaved, onClick, onToggleSave }) => {
  return (
    <div
      onClick={onClick}
      className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 hover:shadow-md relative group ${
        isSelected
          ? 'border-indigo-500 bg-indigo-50/50 ring-1 ring-indigo-500'
          : 'border-gray-200 bg-white hover:border-indigo-300'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex gap-3">
             <img 
                src={`https://picsum.photos/seed/${job.logoSeed}/64/64`} 
                alt={`${job.company} logo`}
                className="w-12 h-12 rounded-lg object-cover bg-gray-100 border border-gray-200"
             />
             <div>
                <h3 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors pr-8">
                  {job.title}
                </h3>
                <p className="text-sm font-medium text-gray-600">{job.company}</p>
             </div>
        </div>
        <div className="flex flex-col items-end gap-2">
            <button
                onClick={onToggleSave}
                className={`p-2 rounded-full transition-colors ${
                    isSaved 
                    ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
                title={isSaved ? "Remove from saved" : "Save job"}
            >
                <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            {job.matchScore && job.matchScore > 85 && (
                <div className="flex items-center px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {job.matchScore}%
                </div>
            )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-500">
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-1.5 text-gray-400" />
          {job.location}
        </div>
        <div className="flex items-center">
          <IndianRupee className="w-4 h-4 mr-1 text-gray-400" />
          {job.salary}
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1.5 text-gray-400" />
          {job.postedAt}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
          {job.type}
        </span>
        {job.requirements.slice(0, 2).map((req, idx) => (
             <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 truncate max-w-[150px]">
                {req}
            </span>
        ))}
      </div>
    </div>
  );
};

export default JobCard;