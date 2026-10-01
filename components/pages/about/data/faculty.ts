export type FacultyCategory = "Professors" | "Assistant professors" | "Lab staffs";

export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  email: string;
  photo: string; 
  category: FacultyCategory;
}

export const facultyMembers: FacultyMember[] = [
  {
    id: "prof-1",
    name: "Prof. Sujo Vasu",
    designation: "Assistant Professor",
    email: "sujovasu@gmail.com",
    photo: "/about/faculty/placeholder.jpg",
    category: "Professors",
  },
  {
    id: "prof-2",
    name: "Prof. Sujo Vasu",
    designation: "Assistant Professor",
    email: "sujovasu@gmail.com",
    photo: "/about/faculty/placeholder.jpg",
    category: "Professors",
  },
  {
    id: "prof-3",
    name: "Prof. Sujo Vasu",
    designation: "Assistant Professor",
    email: "sujovasu@gmail.com",
    photo: "/about/faculty/placeholder.jpg",
    category: "Professors",
  },
  {
    id: "prof-4",
    name: "Prof. Sujo Vasu",
    designation: "Assistant Professor",
    email: "sujovasu@gmail.com",
    photo: "/about/faculty/placeholder.jpg",
    category: "Professors",
  },
  {
    id: "prof-5",
    name: "Prof. Sujo Vasu",
    designation: "Assistant Professor",
    email: "sujovasu@gmail.com",
    photo: "/about/faculty/placeholder.jpg",
    category: "Professors",
  },
  {
    id: "prof-6",
    name: "Prof. Sujo Vasu",
    designation: "Assistant Professor",
    email: "sujovasu@gmail.com",
    photo: "/about/faculty/placeholder.jpg",
    category: "Professors",
  },
  {
    id: "prof-7",
    name: "Prof. Sujo Vasu",
    designation: "Assistant Professor",
    email: "sujovasu@gmail.com",
    photo: "/about/faculty/placeholder.jpg",
    category: "Professors",
  },
  {
    id: "prof-8",
    name: "Prof. Sujo Vasu",
    designation: "Assistant Professor",
    email: "sujovasu@gmail.com",
    photo: "/about/faculty/placeholder.jpg",
    category: "Professors",
  },
  {
    id: "asst-1",
    name: "Prof. Sujo Vasu",
    designation: "Assistant Professor",
    email: "sujovasu@gmail.com",
    photo: "/about/faculty/placeholder.jpg",
    category: "Assistant professors",
  },
  {
    id: "asst-2",
    name: "Prof. Sujo Vasu",
    designation: "Assistant Professor",
    email: "sujovasu@gmail.com",
    photo: "/about/faculty/placeholder.jpg",
    category: "Assistant professors",
  },
  {
    id: "lab-1",
    name: "Prof. Sujo Vasu",
    designation: "Lab Instructor",
    email: "sujovasu@gmail.com",
    photo: "/about/faculty/placeholder.jpg",
    category: "Lab staffs",
  },
  {
    id: "lab-2",
    name: "Prof. Sujo Vasu",
    designation: "Lab Instructor",
    email: "sujovasu@gmail.com",
    photo: "/about/faculty/placeholder.jpg",
    category: "Lab staffs",
  },
];