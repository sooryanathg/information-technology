/**
 * Student academic project, read from the "research" tab of the placement Google Sheet
 * by /api/research. Missing or "Not provided" values come through as "".
 */
export interface AcademicProject {
  id: string;
  title: string;
  team: string;
  mentor: string;
  overview: string; // problem statement & overview
  domain: string;
  stack: string;
  stage: string;
  links: string[]; // GitHub / demo / report URLs found in the "Project Stage & Links" cell
  potential: string; // research & opportunity potential
}

/**
 * Past student project, read from the "project_archive" tab of the placement Google Sheet
 * by /api/project-archive. Projects come back grouped by batch, newest batch first.
 */
export interface ArchivedProject {
  title: string;
  members: string[];
  guide: string;
}

export interface ProjectBatch {
  batch: string; // e.g. "2021–25"
  kind: string; // "Final Year Project" or "Mini Project"
  projects: ArchivedProject[];
}
