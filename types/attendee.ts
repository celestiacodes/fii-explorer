export interface EnrichedData {
  normalized_name?: string;
  company_description?: string;
  title_context?: string;
  biography?: string;
  primer_relevance?: string;
  additional_tags?: string[];
  enrichment_source?: string;
  enriched_at?: string;
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