export interface PublishedWork {
  category: string;
  title: string;
  description: string;
  authors: string;
  date: string;
}

export const publishedWorks: PublishedWork[] = [
  {
    category: "Machine Learning / AI",
    title:
      "Optimizing Neural Networks for Edge Computing Devices in Low-Bandwidth Environments",
    description:
      "This paper proposes a novel quantization technique that reduces model size by 40% while maintaining 98% accuracy on standard edge hardware benchmarks.",
    authors: "Dr. A. Smith, J. Doe (Student)",
    date: "2024.Q2",
  },
  {
    category: "Cybersecurity",
    title:
      "Distributed Denial of Service Mitigation via Blockchain Consensus Mechanisms",
    description:
      "Exploring the viability of utilizing smart contracts to decentralize traffic filtering nodes, creating a more resilient academic network infrastructure.",
    authors: "Prof. M. Chen, L. Gomez",
    date: "2023.Q4",
  },
];