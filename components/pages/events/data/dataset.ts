export type EventCategory = "Tech" | "Non-Tech" | "Talks" | "Seminars";
export type EventStatus = "upcoming" | "past";

export type EventItem = {
  id: number;
  title: string;
  description: string;
  duration: string;
  org: string;
  mode: string;
  category: EventCategory;
  status: EventStatus;
  /** ISO format, yyyy-mm-dd */
  date: string;
  /** Primary cover image URL */
  image?: string;
  /** Array of image URLs for transitions/slideshows */
  images?: string[];
};

export const categories: { title: EventCategory; color: string; icon: string }[] = [
  { title: "Tech", color: "bg-copper-300", icon: "/events/gear.webp" },
  { title: "Non-Tech", color: "bg-copper-400", icon: "/events/gear.webp" },
  { title: "Talks", color: "bg-copper-500", icon: "/events/gear.webp" },
  { title: "Seminars", color: "bg-clay", icon: "/events/gear.webp" },
];

/** Google Drive direct CDN URL generator for public Drive files */
const driveImg = (id: string) => `https://lh3.googleusercontent.com/d/${id}`;

export const events: EventItem[] = [
  {
    id: 1,
    title: "Python Master Class",
    description: "Comprehensive hands-on deep dive covering Python metaprogramming, modern concurrency patterns, and production system development.",
    duration: "2.5h",
    org: "IT Association",
    mode: "Offline",
    category: "Seminars",
    status: "upcoming",
    date: "2026-10-15",
    image: driveImg("1aUbPm-3O4VCa-aRFvCenzLiyaGj-irNS"),
    images: [driveImg("1aUbPm-3O4VCa-aRFvCenzLiyaGj-irNS")],
  },
  {
    id: 2,
    title: "Web3 & Smart Contracts Workshop",
    description: "Practical engineering session building decentralized apps, writing Solidity smart contracts, and exploring Web3 infrastructure.",
    duration: "3h",
    org: "IT Association",
    mode: "Offline",
    category: "Tech",
    status: "upcoming",
    date: "2026-10-22",
    image: driveImg("1EKfFTWbtXNDwL1c5FAgMqwC6kAMcMfZu"),
    images: [driveImg("1EKfFTWbtXNDwL1c5FAgMqwC6kAMcMfZu")],
  },
  {
    id: 3,
    title: "Applied Cryptography Workshop",
    description: "Foundational talk and lab session exploring hashing schemes, zero-knowledge proofs, and secure distributed communication.",
    duration: "2h",
    org: "IT Association",
    mode: "Offline",
    category: "Talks",
    status: "upcoming",
    date: "2026-10-29",
    image: driveImg("1Ry80GBIthw8TK2QIBGKp-EysFYW-R9Bw"),
    images: [driveImg("1Ry80GBIthw8TK2QIBGKp-EysFYW-R9Bw")],
  },
  {
    id: 4,
    title: "IT Association Executive Meet",
    description: "Annual planning conclave setting roadmaps for tech initiatives, open source mentoring clubs, and upcoming hackathons.",
    duration: "2h",
    org: "IT Association",
    mode: "Offline",
    category: "Seminars",
    status: "upcoming",
    date: "2026-11-05",
    image: driveImg("1xszUdAuOEUrDd7iRi1-SUe4CivmYMi0v"),
    images: [
      driveImg("1xszUdAuOEUrDd7iRi1-SUe4CivmYMi0v"),
      driveImg("1nsM9F3xcjjv2eI30ZL9kbJ7kS6u0Wv-G"),
    ],
  },
  {
    id: 5,
    title: "Project Exhibition (2022-26 Batch)",
    description: "Annual capstone project exhibition showcasing groundbreaking software, IoT, and AI innovations developed by IT engineering students.",
    duration: "Full Day",
    org: "IT Department",
    mode: "Offline",
    category: "Tech",
    status: "past",
    date: "2026-09-16",
    image: driveImg("10fOIpFquB-CopcwqipPDfC5qF4SNpAEo"),
    images: [
      driveImg("10fOIpFquB-CopcwqipPDfC5qF4SNpAEo"),
      driveImg("1KQUOMPZvkCF_OGHdeuWcl_Eo8RZz_IC0"),
      driveImg("1N0jWvY6C2XQ77Uul9C1Va1Q6AI50_Byb"),
      driveImg("1UeWOvBEp7lD76v7JFC_xAd2PvZmYQzva"),
      driveImg("1YCJNPN-evmIbi8PvYagI5FyMxjqnp0EQ"),
      driveImg("1vxFXS3p7uANftgKpqDElu5PWfSWOkuR1"),
      driveImg("1MKDL_yNExPrsEpY6RkZQvfvgW5EikxjG"),
      driveImg("1k64zzHfFcIhUcO862_RguFUFHc8XJ1xf"),
      driveImg("1DPwaggUMi9dCIsy_ULOMOet4jT3rJFEa"),
      driveImg("1iub0Xfi4PBSJACAGr1bX2DAYGksmEA9I"),
      driveImg("10c-6vQBiUMPNWY8JMumKew6sWAv4q8wa"),
      driveImg("1uZhekZIWOtI_Nj0fso_FIer-Bww2IBy8"),
      driveImg("1a0tT09EEklfPwcrBpkWuCJNtCJgq9Rw0"),
      driveImg("1nWa9aRnVtgEU9hPP4wVPzehb-mzHrUcz"),
    ],
  },
  {
    id: 6,
    title: "Debug Contest",
    description: "Fast-paced code analysis and troubleshooting showdown testing syntax accuracy, logic tracing, and runtime debugging under pressure.",
    duration: "2h",
    org: "IT Association",
    mode: "Offline",
    category: "Tech",
    status: "past",
    date: "2026-07-16",
    image: driveImg("1nng3XwVQx5-vTpu1k-7zbXGoFamVF1Ma"),
    images: [
      driveImg("1nng3XwVQx5-vTpu1k-7zbXGoFamVF1Ma"),
      driveImg("1w2Yt9BMbNC2o6-n05IU4RWy8XtMlFj3i"),
      driveImg("1wXOd9MixxL3Yfe9u3TqLEFNllHponwkN"),
      driveImg("1DyEIXNFlWFhotukplq5ZkDcZ3cqRkp6_"),
      driveImg("1BC-4bNSlo2b85bSTczmBW_A_u9UqYVMc"),
      driveImg("1f8GBJbLr_-f4LLkYKjlsp4IJRyGxKm0r"),
      driveImg("11VvDpRbB_rnEdPs-bwzOOWk3-buTqlG_"),
    ],
  },
  {
    id: 7,
    title: "First Year Student Orientation",
    description: "Induction and icebreaking session welcoming incoming B.Tech IT students with academic briefings, campus orientation, and senior mentorship.",
    duration: "4h",
    org: "IT Department",
    mode: "Offline",
    category: "Non-Tech",
    status: "past",
    date: "2026-09-16",
    image: driveImg("1hqkr_If7M1auf6kej_Mq9WHazZOx47mo"),
    images: [
      driveImg("1hqkr_If7M1auf6kej_Mq9WHazZOx47mo"),
      driveImg("1PF4rlcjZjWmbKj_f4yFwqa7nwRpP7Fwb"),
      driveImg("1efQIUMY_MLkJqqiTnO0Y1tq6v8iic-j3"),
      driveImg("1ealug6EqFpRfGfZ5YYF3r5FMQ5g0oAiV"),
      driveImg("1eVAgdxwAcuTLKwBYNPWwU5_dR6MLA3KX"),
      driveImg("1ODLBPYrP3hYEpSTgW40kTKH2VOd-bYU-"),
      driveImg("1eK2gYz-IiuTzVS4eazHCD2IBMWLFxzDN"),
    ],
  },
  {
    id: 8,
    title: "Graphic Design Workshop",
    description: "Hands-on UI/UX, brand identity, and visual design masterclass hosted jointly by GDG GEC Palakkad and the IT Association.",
    duration: "3h",
    org: "GDG × IT Association",
    mode: "Offline",
    category: "Talks",
    status: "past",
    date: "2026-09-22",
    image: driveImg("1Kt8sl0G3RxeACP9vNdFNeNz8A30-ELu5"),
    images: [
      driveImg("1Kt8sl0G3RxeACP9vNdFNeNz8A30-ELu5"),
      driveImg("1-IsVEGpmcmPVcQYCsdstCAWak3aGO-KB"),
    ],
  },
  {
    id: 9,
    title: "Avishkar Tech Fest",
    description: "Inter-collegiate technical fest spotlighting engineering project competitions, robotic demos, and inter-departmental innovation challenges.",
    duration: "2 Days",
    org: "IT Department",
    mode: "Offline",
    category: "Tech",
    status: "past",
    date: "2026-09-10",
    image: driveImg("1_0Vfyw_YI1CXH-Cy1xZ7kP8JzW9OqnyV"),
    images: [
      driveImg("1_0Vfyw_YI1CXH-Cy1xZ7kP8JzW9OqnyV"),
      driveImg("10n1wgi7IJF54zDpmlOc_Ahzsku4ZEjsH"),
      driveImg("1CIX7AbnGNJaxOejoUTvcwT_HOugyGXUW"),
      driveImg("1vDwZbCki3jxl41w9cVsmeL1_JhJSZEdj"),
    ],
  },
  {
    id: 10,
    title: "Department Farewell 2022-26",
    description: "Sentimental valedictory gathering celebrating memories, student achievements, and wishing success to the graduating senior engineers.",
    duration: "Evening",
    org: "IT Association",
    mode: "Offline",
    category: "Non-Tech",
    status: "past",
    date: "2026-09-10",
    image: driveImg("1AQy1fNQ8r0tJY__VPJDV0vh-MPQ5VUk1"),
    images: [
      driveImg("1AQy1fNQ8r0tJY__VPJDV0vh-MPQ5VUk1"),
      driveImg("1PQsfcF-Eg1KKIerNfznRVJJTOqyKsrZp"),
      driveImg("1kDhf07xTRZj9bHW_qmDXgUVgijaC40YJ"),
    ],
  },
];
