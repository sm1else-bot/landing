import { Hero } from "@/components/sections/hero";
import { RoleCard } from "@/components/sections/role-card";
import { BrainCircuit, Code, Music, Palette, PenTool, Mail } from "lucide-react";

export default function Home() {
  const roles = [
    {
      title: "Data Scientist",
      description: "Machine learning and data analysis projects",
      icon: <BrainCircuit />,
      href: "/projects/data",
    },
    {
      title: "Software Developer",
      description: "Web and application development",
      icon: <Code />,
      href: "/projects/software",
    },
    {
      title: "Music Producer",
      description: "Electronic music and DJ sets",
      icon: <Music />,
      href: "/music",
    },
    {
      title: "Digital Artist",
      description: "Digital art and creative works",
      icon: <Palette />,
      href: "/art",
    },
    {
      title: "Writer",
      description: "Articles and blog posts",
      icon: <PenTool />,
      href: "/writing",
    },
    {
      title: "Contact",
      description: "Get in touch with me",
      icon: <Mail />,
      href: "/contact",
    },
  ];

  return (
    <div>
      <Hero />
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((role, i) => (
            <RoleCard key={role.title} {...role} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </div>
  );
}