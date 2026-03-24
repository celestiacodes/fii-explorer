import { FaLinkedin } from 'react-icons/fa';
import { Star, Building, Briefcase, Info, GraduationCap, TrendingUp, Target, ChevronDown, ChevronUp } from 'lucide-react';
import { Attendee } from '@/types/attendee';
import { useState } from 'react';

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
  const [showBio, setShowBio] = useState(false);
  
  const enriched = attendee.enriched as any;
  const hasImprovedBio = enriched?.company_details || enriched?.personal_details;
  const hasBasicBio = enriched?.biography && !hasImprovedBio;
  const hasAnyBio = hasImprovedBio || hasBasicBio;
  
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
      <div className="flex items-center gap-2 mb-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryColors[attendee.category] || categoryColors['Other']}`}>
          {attendee.category}
        </span>
        {hasAnyBio && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-300 border border-green-700/50">
            ✦ Enriched
          </span>
        )}
      </div>

      {/* Bio Button - LARGE and prominent */}
      {hasAnyBio && (
        <button
          onClick={() => setShowBio(!showBio)}
          className="w-full mb-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 hover:border-blue-500/50 text-blue-300 hover:text-blue-200 transition-all duration-200 text-sm font-medium"
        >
          <Info className="w-4 h-4" />
          {showBio ? 'Hide Profile' : 'View Full Profile'}
          {showBio ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      )}

      {/* Expanded Bio */}
      {showBio && hasImprovedBio && (
        <div className="mb-3 space-y-3">
          {/* Company Details */}
          {enriched.company_details && (
            <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Building className="w-4 h-4 text-blue-400" />
                <h4 className="text-sm font-semibold text-blue-300">Company</h4>
              </div>
              <p className="text-xs text-gray-300 mb-2">{enriched.company_details.description}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {enriched.company_details.employee_count && (
                  <div><span className="text-gray-500">Size:</span> <span className="text-gray-300">{enriched.company_details.employee_count}</span></div>
                )}
                {enriched.company_details.revenue && (
                  <div><span className="text-gray-500">Revenue:</span> <span className="text-gray-300">{enriched.company_details.revenue}</span></div>
                )}
                {enriched.company_details.industry && (
                  <div className="col-span-2"><span className="text-gray-500">Industry:</span> <span className="text-gray-300">{enriched.company_details.industry}</span></div>
                )}
                {enriched.company_details.market_cap && (
                  <div className="col-span-2"><span className="text-gray-500">Valuation:</span> <span className="text-gray-300">{enriched.company_details.market_cap}</span></div>
                )}
              </div>
            </div>
          )}

          {/* Personal Details */}
          {enriched.personal_details && (
            <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-semibold text-emerald-300">Background</h4>
              </div>
              
              {/* Education */}
              {enriched.personal_details.education?.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs text-gray-500 font-medium mb-1">Education</p>
                  {enriched.personal_details.education.map((edu: any, i: number) => (
                    <p key={i} className="text-xs text-gray-300">• {edu.institution} — {edu.degree} {edu.year && `(${edu.year})`}</p>
                  ))}
                </div>
              )}
              
              {/* Career Path */}
              {enriched.personal_details.career_path?.length > 0 && (
                <div className="mb-2">
                  <p className="text-xs text-gray-500 font-medium mb-1">Career Path</p>
                  {enriched.personal_details.career_path.map((pos: any, i: number) => (
                    <p key={i} className="text-xs text-gray-300">• {pos.title} at {pos.company} {pos.years && `(${pos.years})`}</p>
                  ))}
                </div>
              )}

              {/* Recent News */}
              {enriched.personal_details.recent_news?.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Recent News</p>
                  {enriched.personal_details.recent_news.slice(0, 3).map((news: string, i: number) => (
                    <p key={i} className="text-xs text-gray-300">• {news}</p>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Primer Relevance */}
          {enriched.primer_relevance && (
            <div className="p-3 bg-gray-800/50 rounded-lg border border-purple-700/30">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-purple-400" />
                <h4 className="text-sm font-semibold text-purple-300">Primer Relevance</h4>
              </div>
              {typeof enriched.primer_relevance === 'string' ? (
                <p className="text-xs text-gray-300">{enriched.primer_relevance}</p>
              ) : (
                <div className="space-y-1.5 text-xs">
                  {enriched.primer_relevance.investment_thesis && (
                    <div><span className="text-gray-500">Thesis:</span> <span className="text-gray-300">{enriched.primer_relevance.investment_thesis}</span></div>
                  )}
                  {enriched.primer_relevance.potential_fit && (
                    <div><span className="text-gray-500">Fit:</span> <span className="text-gray-300">{enriched.primer_relevance.potential_fit}</span></div>
                  )}
                  {enriched.primer_relevance.connection_strategy && (
                    <div><span className="text-gray-500">Strategy:</span> <span className="text-gray-300">{enriched.primer_relevance.connection_strategy}</span></div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Basic Bio Fallback */}
      {showBio && hasBasicBio && (
        <div className="mb-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-300">{enriched.biography}</p>
          {typeof enriched.primer_relevance === 'string' && enriched.primer_relevance && (
            <div className="mt-2 pt-2 border-t border-gray-700">
              <p className="text-xs text-purple-300 font-medium">Primer Relevance:</p>
              <p className="text-xs text-gray-400 mt-0.5">{enriched.primer_relevance}</p>
            </div>
          )}
        </div>
      )}

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