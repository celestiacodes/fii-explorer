import { FaLinkedin } from 'react-icons/fa';
import { Star, Building, Briefcase } from 'lucide-react';
import { Attendee } from '@/types/attendee';

interface AttendeeCardProps {
  attendee: Attendee;
}

const categoryColors: Record<string, string> = {
  'Investors': 'bg-purple-900/30 text-purple-300 border-purple-700/50',
  'Tech/AI': 'bg-blue-900/30 text-blue-300 border-blue-700/50',
  'EdTech': 'bg-emerald-900/30 text-emerald-300 border-emerald-700/50',
  'Longevity/Health': 'bg-red-900/30 text-red-300 border-red-700/50',
  'Middle East': 'bg-amber-900/30 text-amber-300 border-amber-700/50',
  'Other': 'bg-gray-800/50 text-gray-300 border-gray-700/50',
};

export default function AttendeeCard({ attendee }: AttendeeCardProps) {
  return (
    <div className={`group relative bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-4 hover:border-gray-700 transition-all duration-200 hover:shadow-xl hover:shadow-gray-900/30 ${attendee.isTopTarget ? 'ring-1 ring-yellow-500/30' : ''}`}>
      {/* Top Target Badge */}
      {attendee.isTopTarget && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500 rounded-full blur-sm"></div>
            <div className="relative bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full p-1.5">
              <Star className="w-4 h-4 text-white fill-white" />
            </div>
          </div>
        </div>
      )}

      {/* Priority Score */}
      {attendee.priorityScore > 0 && (
        <div className="absolute -top-2 -left-2">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {attendee.priorityScore}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-3">
        <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors line-clamp-1">
          {attendee.name}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <Briefcase className="w-3 h-3 text-gray-500 flex-shrink-0" />
          <p className="text-sm text-gray-400 line-clamp-1">{attendee.title}</p>
        </div>
      </div>

      {/* Company */}
      <div className="flex items-center gap-2 mb-3">
        <Building className="w-3 h-3 text-gray-500 flex-shrink-0" />
        <p className="text-sm text-gray-300 line-clamp-1">{attendee.company}</p>
      </div>

      {/* Category Badge */}
      <div className="mb-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryColors[attendee.category] || categoryColors['Other']}`}>
          {attendee.category}
        </span>
      </div>

      {/* LinkedIn Link */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-800">
        <a
          href={attendee.linkedin_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors group/link"
        >
          <FaLinkedin className="w-4 h-4" />
          <span className="group-hover/link:underline">LinkedIn</span>
        </a>
        
        <div className="text-xs text-gray-500">
          #{attendee.number.toString().padStart(4, '0')}
        </div>
      </div>
    </div>
  );
}