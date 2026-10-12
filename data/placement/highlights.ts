import { HighlightItem } from '@/types/placement';

/**
 * Key placement statistics cards data.
 * Source: https://gecskp.ac.in/it_placement.php (2021-25 table, 2020-24 poster: 53 offers / 32 placed,
 * 2018-22 list). Recruiter count is unique employers across all three.
 * Each id needs a matching icon in components/placement/Highlights.tsx.
 */
export const highlightsData: HighlightItem[] = [
  {
    id: 'placed-recent',
    value: '74',
    label: 'Students placed (last 2 batches)',
  },
  {
    id: 'offers-recent',
    value: '113',
    label: 'Offers (last 2 batches)',
  },
  {
    id: 'offers-2025',
    value: '60',
    label: 'Offers in 2025 batch',
  },
  {
    id: 'companies',
    value: '33',
    label: 'Recruiting companies',
  },
  {
    id: 'placed-2025',
    value: '42',
    label: 'Placed from 2025 batch',
  },
  {
    id: 'batch',
    value: '2021-2025',
    label: 'Latest batch reported',
  },
];
