export type FacultyCategory = "Teaching staff" | "Technical staff";

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  email: string;
  photo: string; 
  category: FacultyCategory;
}

const PLACEHOLDER = "/about/faculty/placeholder.jpeg";

export const facultyMembers: FacultyMember[] = [
  // ----- Teaching staff -----
  {
    id: "teach-1",
    name: "Dr. K R Remesh Babu",
    designation: "Professor",
    email: "remeshbabu@gecskp.ac.in",
    photo: "/about/faculty/remesh.jpeg",
    category: "Teaching staff",
  },
  {
    id: "teach-2",
    name: "Dr. Rendhir R. Prasad",
    designation: "Professor",
    email: "rendhirrprasad@gmail.com",
    photo: "/about/faculty/Rendhir.jpeg",
    category: "Teaching staff",
  },
  {
    id: "teach-3",
    name: "Dr. Sangeetha U",
    designation: "Professor",
    email: "sangeethau2013@gmail.com",
    photo: PLACEHOLDER,
    category: "Teaching staff",
  },
  {
    id: "teach-4",
    name: "Dr. Dhanya K.M.",
    designation: "Associate Professor",
    email: "dhanyakm@gecskp.ac.in",
    photo: "/about/faculty/dhanya.jpeg",
    category: "Teaching staff",
  },
  {
    id: "teach-5",
    name: "Dr. Safeer Babu T",
    designation: "Associate Professor",
    email: "safeerbabut@gecskp.ac.in",
    photo: PLACEHOLDER,
    category: "Teaching staff",
  },
  {
    id: "teach-6",
    name: "Ms. Sujo Vasu",
    designation: "Associate Professor",
    email: "sujovasu@gecskp.ac.in",
    photo: "/about/faculty/sujo.png",
    category: "Teaching staff",
  },
  {
    id: "teach-7",
    name: "Mr. Vinayachandran K K",
    designation: "Assistant Professor",
    email: "vinayachandran.k.k@gmail.com",
    photo: PLACEHOLDER,
    category: "Teaching staff",
  },
  {
    id: "teach-8",
    name: "Mr. Shijin Knox G.U.",
    designation: "Assistant Professor",
    email: "shijinknox@gecskp.ac.in",
    photo: "/about/faculty/Shijin.jpeg",
    category: "Teaching staff",
  },
  {
    id: "teach-9",
    name: "Ms. Sasinas Alias Haritha Z A",
    designation: "Assistant Professor",
    email: "haritha@gecskp.ac.in",
    photo: "/about/faculty/haritha.jpeg",
    category: "Teaching staff",
  },
  {
    id: "teach-10",
    name: "Dr. Rani M R",
    designation: "Assistant Professor",
    email: "ranimr@gecskp.ac.in",
    photo: "/about/faculty/rani.jpeg",
    category: "Teaching staff",
  },
  {
    id: "teach-11",
    name: "Mr. Ebey S. Raj",
    designation: "Asst. Professor (Under QIP)",
    email: "ebeysraj@gecskp.ac.in",
    photo: "/about/faculty/ebey.jpeg",
    category: "Teaching staff",
  },
  {
    id: "teach-12",
    name: "Dr. Sajitha M",
    designation: "Assistant Professor",
    email: "sajitham@gecskp.ac.in",
    photo: "/about/faculty/sajitha.jpeg",
    category: "Teaching staff",
  },
  {
    id: "teach-13",
    name: "Ms. Susmitha K",
    designation: "Assistant Professor (Contract)",
    email: "susmitha@gecskp.ac.in",
    photo: "/about/faculty/susmitha.jpeg",
    category: "Teaching staff",
  },

  // ----- Technical staff -----
  {
    id: "tech-1",
    name: "Mr. Sijo S Vadakkan",
    designation: "System Analyst",
    email: "sijovs@gmail.com",
    photo: "/about/faculty/Sijo.png",
    category: "Technical staff",
  },
  {
    id: "tech-2",
    name: "Mr. Anilkumar PC",
    designation: "Computer Programmer",
    email: "anilkumargpt@gmail.com",
    photo: PLACEHOLDER,
    category: "Technical staff",
  },
  {
    id: "tech-3",
    name: "Mrs. Arya KS",
    designation: "Instructor Gr.I",
    email: "aryakso@gmail.com",
    photo: "/about/faculty/Arya.png",
    category: "Technical staff",
  },
  {
    id: "tech-4",
    name: "Mrs. Rejitha K M",
    designation: "Instructor Gr.II",
    email: "rejithamadhavtvma@gmail.com",
    photo: "/about/faculty/Rejitha.png",
    category: "Technical staff",
  },
  {
    id: "tech-5",
    name: "Mr. Jeo Joseph James",
    designation: "Trade Instructor Senior Grade",
    email: "jeojoseph@gmail.com",
    photo: PLACEHOLDER,
    category: "Technical staff",
  },
  {
    id: "tech-6",
    name: "Mr. Pradeep V",
    designation: "Trade Instructor Gr.I",
    email: "pradeep.cet@gmail.com",
    photo: "/about/faculty/Pradeep.png",
    category: "Technical staff",
  },
  {
    id: "tech-7",
    name: "Mrs. Manju M K",
    designation: "Trade Instructor Gr.I",
    email: "mk.manju93@gmail.com",
    photo: "/about/faculty/Manju.png",
    category: "Technical staff",
  },
  {
    id: "tech-8",
    name: "Ms. Prasanna K.",
    designation: "Trade Instructor Gr.I",
    email: "annaa.daass@gmail.com",
    photo: "/about/faculty/Prasanna.png",
    category: "Technical staff",
  },
  {
    id: "tech-9",
    name: "Mrs. Namitha K V",
    designation: "Tradesman",
    email: "namithakv@gecskp.ac.in",
    photo: PLACEHOLDER,
    category: "Technical staff",
  },
  {
    id: "tech-10",
    name: "Mrs. Sindhoora Vasu",
    designation: "Tradesman",
    email: "sindhooravasu@gecskp.ac.in",
    photo: "/about/faculty/Sindhoora.png",
    category: "Technical staff",
  },
  {
    id: "tech-11",
    name: "Mr. Rameez Ali P",
    designation: "Tradesman",
    email: "rameezali@gecskp.ac.in",
    photo: "/about/faculty/Rameez.png",
    category: "Technical staff",
  },
  {
    id: "tech-12",
    name: "Mr. Anoop A P",
    designation: "Tradesman (Adhoc)",
    email: "anoopap@gecskp.ac.in",
    photo: "/about/faculty/Anoop.png",
    category: "Technical staff",
  },
];