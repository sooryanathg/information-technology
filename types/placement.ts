import React from 'react';

/**
 * Recruiter item in Top Recruiters grid.
 * Can be a simple string or structured object with name, optional logo, and website URL.
 */
export interface RecruiterItem {
  id?: string;
  name: string;
  logoUrl?: string;
  websiteUrl?: string;
}

/**
 * Internship notice board item.
 */
export interface InternshipNotice {
  id: string;
  role: string;
  company: string;
  mode: 'Remote' | 'On-Site' | 'Hybrid' | string;
  duration: string;
  deadline: string;
  applyUrl?: string;
}

/**
 * Key placement statistic card item.
 */
export interface HighlightItem {
  id: string;
  value: string;
  label: string;
  renderIcon?: () => React.ReactNode;
}

/**
 * Alumni connection profile item.
 */
export interface AlumniProfile {
  id: string;
  name: string;
  designation: string;
  company: string;
  location: string;
  avatarUrl?: string;
}

/**
 * Placement success story / testimonial item.
 */
export interface SuccessStory {
  id: string;
  testimonial: string;
  name: string;
  batch: string;
}
