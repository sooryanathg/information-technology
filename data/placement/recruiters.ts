import { RecruiterItem, InternshipNotice } from '@/types/placement';

/**
 * ============================================================================
 * TOP RECRUITERS DATA
 * ============================================================================
 * Easily updatable list of visiting / partner recruiters.
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
export const topRecruiters: (string | RecruiterItem)[] = [
  'Company Logo',
  'Company Logo',
  'Company Logo',
  'Company Logo',
  'Company Logo',
  'Company Logo',
  'Company Logo',
  'Company Logo',
];

/**
 * ============================================================================
 * INTERNSHIP NOTICE BOARD DATA
 * ============================================================================
 * List of ongoing internship drives and notices for IT students.
 * 
 * Instructions to update:
 * - Update existing objects or append a new internship notice object.
 * - Properties:
 *   - id: Unique identifier (string)
 *   - role: Internship title/position
 *   - company: Organization offering the role
 *   - mode: "Remote" | "On-Site" | "Hybrid"
 *   - duration: e.g. "2 Months", "6 Weeks"
 *   - deadline: e.g. "Apply Before 15 July"
 *   - applyUrl: (Optional) External application link or mailto
 */
export const internshipNotices: InternshipNotice[] = [
  {
    id: 'uiux',
    role: 'UI/UX Design Internship',
    company: 'ABC Technologies',
    mode: 'Remote',
    duration: '2 Months',
    deadline: 'Apply Before 15 July',
    applyUrl: '#',
  },
  {
    id: 'webdev',
    role: 'Web Development Internship',
    company: 'ABC Technologies',
    mode: 'On-Site',
    duration: '6 Weeks',
    deadline: 'Apply Before 15 July',
    applyUrl: '#',
  },
  {
    id: 'data',
    role: 'Data Analytics Internship',
    company: 'ABC Technologies',
    mode: 'Hybrid',
    duration: '8 Weeks',
    deadline: 'Apply Before 15 July',
    applyUrl: '#',
  },
];
