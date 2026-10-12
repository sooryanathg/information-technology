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
 * Internship / placement notice, read from the placement Google Sheet by /api/placements.
 * Empty and "NA" cells come through as "" (or null for deadline / applyLink).
 */
export interface PlacementNotice {
  id: string;
  company: string;
  role: string;
  eligibility: string;
  ctc: string;
  deadline: string | null; // YYYY-MM-DD, or null when not specified
  applyLink: string | null; // application URL from the "Link" column; null when it isn't a URL
  linkNote: string; // the "Link" cell text when it isn't a URL, e.g. "check your email"
  details: string; // longer description shown in the details modal
  status: string;
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
