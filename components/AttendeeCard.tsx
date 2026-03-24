import { FaLinkedin } from 'react-icons/fa';
import { Star, Building, Briefcase, ChevronDown, ChevronUp, GraduationCap, TrendingUp, Target, Newspaper } from 'lucide-react';
import { Attendee, PrimerRelevance } from '@/types/attendee';
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

function isImprovedFormat(enriched: any): boolean {
  return enriched && (enriched.company_details || enriched.personal_details);
}

export default function AttendeeCard({ attendee }: AttendeeCardProps) {
  const [showBio, setShowBio] = useState(false);
  const enriched = attendee.enriched;
  const improved = isImprovedFormat(enriched);
  
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
        {improved && enriched?.company_details?.employee_count && (
          <span className="text-xs text-gray-500 ml-auto whitespace-nowrap">
            {enriched.company_details.employee_count} emp
          </span>
        )}
      </div>

      {/* Category Badge + Enriched Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryColors[attendee.category] || categoryColors['Other']}`}>
          {attendee.category}
        </span>
        {enriched && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-400 border border-green-700/50">
            ✦ Enriched
          </span>
        )}
      </div>

      {/* View Profile Button - BIG and prominent */}
      {enriched && (
        <button
          onClick={() => setShowBio(!showBio)}
          className={`w-full mb-3 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
            showBio 
              ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600/30' 
              : 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 border border-blue-500/30 hover:from-blue-600/30 hover:to-purple-600/30 hover:border-blue-400/50'
          }`}
        >
          {showBio ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Hide Profile
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              View Full Profile
            </>
          )}
        </button>
      )}

      {/* Expanded Profile */}
      {showBio && enriched && (
        <div className="mb-3 space-y-3 animate-in slide-in-from-top-2">
          
          {/* IMPROVED FORMAT */}
          {improved ? (
            <>
              {/* Company Details */}
              {enriched.company_details && (
                <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Building className="w-3.5 h-3.5 text-blue-400" />
                    <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wide">Company</h4>
                  </div>
                  <p className="text-sm text-gray-300 mb-2">{enriched.company_details.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {enriched.company_details.employee_count && (
                      <div><span className="text-gray-500">Employees:</span> <span className="text-gray-300">{enriched.company_details.employee_count}</span></div>
                    )}
                    {enriched.company_details.revenue && (
                      <div><span className="text-gray-500">Revenue:</span> <span className="text-gray-300">{enriched.company_details.revenue}</span></div>
                    )}
                    {enriched.company_details.market_cap && (
                      <div className="col-span-2"><span className="text-gray-500">Valuation:</span> <span className="text-gray-300">{enriched.company_details.market_cap}</span></div>
                    )}
                    {enriched.company_details.industry && (
                      <div className="col-span-2"><span className="text-gray-500">Industry:</span> <span className="text-gray-300">{enriched.company_details.industry}</span></div>
                    )}
                  </div>
                  {enriched.company_details.notable_facts && enriched.company_details.notable_facts.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-700">
                      <p className="text-xs text-gray-500 mb-1">Key Facts:</p>
                      <ul className="space-y-0.5">
                        {enriched.company_details.notable_facts.slice(0, 3).map((fact: string, i: number) => (
                          <li key={i} className="text-xs text-gray-400 flex gap-1.5">
                            <span className="text-gray-600 mt-0.5">•</span>
                            <span>{fact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Education & Career */}
              {enriched.personal_details && (
                <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-1.5 mb-2">
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                    <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">Background</h4>
                  </div>
                  
                  {/* Education */}
                  {enriched.personal_details.education && enriched.personal_details.education.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs text-gray-500 mb-1">Education:</p>
                      {enriched.personal_details.education.map((edu: any, i: number) => (
                        <div key={i} className="text-xs text-gray-300 mb-0.5">
                          <span className="font-medium">{edu.institution}</span>
                          {edu.degree && <span className="text-gray-400"> — {edu.degree}</span>}
                          {edu.year && <span className="text-gray-500"> ({edu.year})</span>}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Career Path */}
                  {enriched.personal_details.career_path && enriched.personal_details.career_path.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs text-gray-500 mb-1">Career:</p>
                      {enriched.personal_details.career_path.map((role: any, i: number) => (
                        <div key={i} className="text-xs text-gray-300 mb-0.5 flex gap-1.5">
                          <span className="text-gray-600 mt-0.5">→</span>
                          <span>
                            <span className="font-medium">{role.title}</span>
                            <span className="text-gray-400"> at {role.company}</span>
                            {role.years && <span className="text-gray-500"> ({role.years})</span>}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Current Focus */}
                  {enriched.personal_details.current_focus && (
                    <div className="pt-2 border-t border-gray-700">
                      <p className="text-xs text-gray-500">Current Focus:</p>
                      <p className="text-xs text-gray-300 mt-0.5">{enriched.personal_details.current_focus}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Recent News */}
              {enriched.personal_details?.recent_news && enriched.personal_details.recent_news.length > 0 && (
                <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Newspaper className="w-3.5 h-3.5 text-amber-400" />
                    <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wide">Recent News</h4>
                  </div>
                  <ul className="space-y-1">
                    {enriched.personal_details.recent_news.slice(0, 4).map((news: string, i: number) => (
                      <li key={i} className="text-xs text-gray-400 flex gap-1.5">
                        <span className="text-gray-600 mt-0.5">•</span>
                        <span>{news}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Primer Relevance */}
              {enriched.primer_relevance && typeof enriched.primer_relevance === 'object' && (
                <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-800/30">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Target className="w-3.5 h-3.5 text-blue-400" />
                    <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wide">Primer Relevance</h4>
                  </div>
                  {(enriched.primer_relevance as PrimerRelevance).investment_thesis && (
                    <div className="mb-1.5">
                      <p className="text-xs text-gray-500">Thesis:</p>
                      <p className="text-xs text-gray-300">{(enriched.primer_relevance as PrimerRelevance).investment_thesis}</p>
                    </div>
                  )}
                  {(enriched.primer_relevance as PrimerRelevance).potential_fit && (
                    <div className="mb-1.5">
                      <p className="text-xs text-gray-500">Fit:</p>
                      <p className="text-xs text-gray-300">{(enriched.primer_relevance as PrimerRelevance).potential_fit}</p>
                    </div>
                  )}
                  {(enriched.primer_relevance as PrimerRelevance).connection_strategy && (
                    <div className="pt-1.5 border-t border-blue-800/30">
                      <p className="text-xs text-blue-300 font-medium">Connection Strategy:</p>
                      <p className="text-xs text-gray-400 mt-0.5">{(enriched.primer_relevance as PrimerRelevance).connection_strategy}</p>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            /* LEGACY FORMAT - simple biography string */
            <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
              <p className="text-sm text-gray-300">{enriched?.biography}</p>
              {enriched?.primer_relevance && typeof enriched.primer_relevance === 'string' && (
                <div className="mt-2 pt-2 border-t border-gray-700">
                  <p className="text-xs text-blue-300 font-medium">Primer Relevance:</p>
                  <p className="text-xs text-gray-400 mt-0.5">{enriched.primer_relevance}</p>
                </div>
              )}
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