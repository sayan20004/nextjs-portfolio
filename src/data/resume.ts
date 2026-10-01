import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Sayan Maity",
  initials: "SM",
  url: "https://sayanmaity.me",
  location: "West Bengal, India",
  locationLink: "https://www.google.com/maps/place/West+Bengal",
  description:
    "Full Stack Web & iOS Developer crafting high-performance applications with modern UI/UX.",
  summary:
    "Full-stack web and native iOS developer with a passion for building intuitive, accessible, and scalable digital products. Experienced in React, Next.js, Node.js, Express, MongoDB, Swift, and SwiftUI.",
  avatarUrl: "/profile.png",
  skills: [
    { name: "React" },
    { name: "Next.js" },
    { name: "TypeScript" },
    { name: "Node.js" },
    { name: "Express.js" },
    { name: "MongoDB" },
    { name: "Swift" },
    { name: "SwiftUI" },
    { name: "TailwindCSS" },
    { name: "Socket.IO" },
    { name: "Google Gemini API" },
    { name: "Git & GitHub" },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "sayanmaity600@gmail.com",
    tel: "+911234567890",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/sayan20004",
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/sayan-maitydev/",
        navbar: true,
      },
    },
  },
  work: [
    {
      company: "Personal Projects & Freelance",
      href: "https://github.com/sayan20004",
      badges: ["Full Stack", "iOS"],
      location: "Remote",
      title: "Full Stack & iOS Developer",
      logoUrl: "/github.png",
      start: "2022",
      end: "Present",
      description:
        "Building full-stack MERN web applications and native iOS apps using SwiftUI and modern cloud services.",
    },
    {
      company: "College Hackathon & Events",
      href: "https://www.cclms.org",
      badges: ["Organizer", "UI/UX"],
      location: "CCLMS",
      title: "Hackathon Organizer & UI Lead",
      logoUrl: "/clg.png",
      start: "2024",
      end: "2024",
      description:
        "Organized and mentored participants in an intra-college Hackathon & Quiz for BCA students. Led UI/UX concept design.",
    },
  ],
  education: [
    {
      school: "Contai College of Learning and Management Science (CCLMS)",
      href: "https://www.cclms.org",
      degree: "Bachelor of Computer Applications (BCA)",
      logoUrl: "/clg.png",
      start: "2023",
      end: "2025",
    },
    {
      school: "Higher Secondary Education",
      href: "",
      degree: "Bio-Science Stream",
      logoUrl: "/school.svg",
      start: "2020",
      end: "2022",
    },
  ],
  projects: [
    {
      title: "AI Quiz Generator (Web)",
      href: "https://aiquizv2.vercel.app",
      dates: "2024",
      active: true,
      description:
        "A full-stack MERN application that leverages the Google Gemini API to automatically generate multiple-choice quizzes from uploaded PDF notes.",
      technologies: ["React", "Node.js", "MongoDB", "Express.js", "Gemini API"],
      links: [
        {
          type: "Website",
          href: "https://aiquizv2.vercel.app",
        },
        {
          type: "Source",
          href: "https://github.com/sayan20004/aiquiz",
        },
      ],
      image: "/ai-quiz-web.png",
      video: "",
    },
    {
      title: "Uber Clone",
      href: "https://uberclonev2.vercel.app",
      dates: "2024",
      active: true,
      description:
        "A full-stack ride-sharing app with real-time tracking, rider/driver matching, and fare estimation using Socket.IO and Google Maps API.",
      technologies: ["React", "Node.js", "Socket.IO", "Google Maps API", "MERN"],
      links: [
        {
          type: "Website",
          href: "https://uberclonev2.vercel.app",
        },
        {
          type: "Source",
          href: "https://github.com/sayan20004/UberClone",
        },
      ],
      image: "/uber-clone-app.png",
      video: "",
    },
    {
      title: "AI Quiz App (iOS)",
      href: "https://github.com/sayan20004/iosaiquizapp",
      dates: "2024",
      active: true,
      description:
        "A native iOS application built with SwiftUI featuring PDF upload, authentication, and AI MCQ generation.",
      technologies: ["Swift", "SwiftUI", "iOS", "Gemini API"],
      links: [
        {
          type: "Source",
          href: "https://github.com/sayan20004/iosaiquizapp",
        },
      ],
      image: "/ios-quiz-app.png",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "CCLMS Intra-College Hackathon 2024",
      dates: "2024",
      location: "Contai, WB",
      description:
        "Organized, mentored, and developed event platform for BCA intra-college coding hackathon & quiz competition.",
      image: "/clg.png",
      links: [],
    },
  ],
};
