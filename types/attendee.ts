export interface CompanyDetails {
  description?: string;
  employee_count?: string;
  revenue?: string;
  market_cap?: string;
  industry?: string;
  notable_facts?: string[];
}

export interface Education {
  institution: string;
  degree?: string;
  year?: string;
}

export interface CareerRole {
  company: string;
  title: string;
  years?: string;
}

export interface PersonalDetails {
  education?: Education[];
  career_path?: CareerRole[];
  recent_news?: string[];
  expertise?: string[];
  current_focus?: string;
}

export interface PrimerRelevance {
  investment_thesis?: string;
  portfolio_companies?: string;
  potential_fit?: string;
  connection_strategy?: string;
}

export interface EnrichedData {
  // Legacy format fields
  normalized_name?: string;
  company_description?: string;
  title_context?: string;
  biography?: string;
  primer_relevance?: string | PrimerRelevance;
  additional_tags?: string[];
  enrichment_source?: string;
  enriched_at?: string;
  
  // Improved format fields
  company_details?: CompanyDetails;
  personal_details?: PersonalDetails;
  enrichment_quality?: string;
  sources_used?: string[];
}

export interface Attendee {
  number: number;
  name: string;
  title: string;
  company: string;
  linkedin_url: string;
  category: string;
  isTopTarget: boolean;
  priorityScore: number;
  enriched?: EnrichedData;
  tags?: string[];
}

export interface Category {
  id: string;
  label: string;
  count: number;
}