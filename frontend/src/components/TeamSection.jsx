import React from "react";
import TeamCard from "./TeamCard";

const teamMembers = [
  {
    id: 1,
    name: "Colin McKibben",
    role: "Manager",
    department: "Developer Relations",
    category: "IDENTITY SECURITY CLOUD",
    image: "/images/colin.jpg", // Update with correct image paths
  },
  {
    id: 2,
    name: "Tyler Mairose",
    role: "Developer Advocate",
    department: "",
    category: "IDENTITY SECURITY CLOUD",
    image: "/images/tyler.jpg",
  },
  {
    id: 3,
    name: "Christina Gagnon",
    role: "Developer Advocate",
    department: "",
    category: "IDENTITY SECURITY CLOUD",
    image: "/images/christina.jpg",
  },
  {
    id: 4,
    name: "James Haytko",
    role: "Technical Writer",
    department: "",
    category: "DEVELOPER DOCUMENTATION",
    image: "/images/james.jpg",
  },
];

const TeamSection = () => {
  return (
    <>
    <h1 className="text-6xl text-center font-bold">Meet Our <span className="text-blue-500">Developers</span></h1>
    <section className="flex gap-8 items-center text-center p-8 justify-center">
      <TeamCard name="Mukul Kumar" description="John Doe is a software engineer with 5 years of experience in full-stack development."/>
        <TeamCard name="Akash Kumar" description="John Doe is a software engineer with 5 years of experience in full-stack development."/>
        <TeamCard name="Dheeraj Gaur" description="John Doe is a software engineer with 5 years of experience in full-stack development."/>
        <TeamCard name="Shiva Jadoun" description="John Doe is a software engineer with 5 years of experience in full-stack development."/>
    </section>
    </>
  );
};

export default TeamSection;
