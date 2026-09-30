
export interface ResearchProject {
  category: string;
  title: string;
  description: string;
  team: string;
  image: string;
}

export const researchProjects: ResearchProject[] = [
  {
    category: "IoT Architecture",
    title: "Smart Campus Energy Grid",
    description:
      "An integrated sensor network deployed across campus to monitor and optimize HVAC power consumption using predictive machine learning models.",
    team: "Team Alpha",
    image: "/research/projects/smart-campus-energy-grid.png",
  },

  {
    category: "Cryptography",
    title: "Decentralized Voting Ledger",
    description:
      "A blockchain-based implementation of a secure, anonymous voting system designed for student union elections, ensuring immutability and transparency.",
    team: "Team Beta",
    image: "/research/projects/decentralized-voting-ledger.png",
  },

  {
    category: "Data Science",
    title: "Academic Performance Analytics",
    description:
      "A comprehensive dashboard utilizing historical student data to visualize trends and identify potential intervention points for academic counseling.",
    team: "Team Sanna",
    image: "/research/projects/academic-performance-analyzer.png",
  },

  {
    category: "Robotics",
    title: "Autonomous Warehouse Navigation",
    description:
      "A path planning algorithm enabling small robotic units to navigate a simulated warehouse environment with 97% obstacle avoidance accuracy.",
    team: "Team Delta",
    image: "/research/projects/autonomous-navigation.png",
  },
];
