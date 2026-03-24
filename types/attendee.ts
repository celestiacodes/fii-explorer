export interface Attendee {
  number: number;
  name: string;
  title: string;
  company: string;
  linkedin_url: string;
  category: string;
  isTopTarget: boolean;
  priorityScore: number;
}

export interface Category {
  id: string;
  label: string;
  count: number;
}