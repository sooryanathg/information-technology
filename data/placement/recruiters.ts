import { RecruiterItem } from '@/types/placement';

/**
 * ============================================================================
 * TOP RECRUITERS DATA
 * ============================================================================
 * Easily updatable list of recruiters shown in the Top Recruiters grid (first 8).
 * 
 * Instructions to update:
 * 1. To add a simple company name:
 *    Add a string: "Google"
 * 
 * 2. To add a company with a custom logo or link:
 *    Add an object:
 *    {
 *      name: "Microsoft",
 *      logoUrl: "/logos/microsoft.png",
 *      websiteUrl: "https://microsoft.com"
 *    }
 */
// Recruiters from https://gecskp.ac.in/it_placement.php (2018-22, 2020-24 and 2021-25 batches).
// Logos go in public/recruiters/, e.g. { name: 'TCS', logoUrl: '/recruiters/tcs.svg' }.
export const topRecruiters: (string | RecruiterItem)[] = [
  { name: 'TCS', logoUrl: '/recruiters/tcs.png' },
  { name: 'Tata Elxsi', logoUrl: '/recruiters/tata-elxsi.png' },
  { name: 'Infosys', logoUrl: '/recruiters/infosys.png' },
  { name: 'UST', logoUrl: '/recruiters/ust.svg' },
  { name: 'Cognizant', logoUrl: '/recruiters/cognizant.png' },
  { name: 'QBurst', logoUrl: '/recruiters/qburst.png' },
  { name: 'Experion Technologies', logoUrl: '/recruiters/experion.png' },
  { name: 'IBM', logoUrl: '/recruiters/ibm.png' },
];

// Internship notices are no longer kept here: they are read from the placement
// Google Sheet by app/api/placements/route.ts (GOOGLE_PLACEMENT_SHEET_ID).
