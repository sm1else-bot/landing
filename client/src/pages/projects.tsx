import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import type { Project } from "@shared/schema";

const categories = [
  { id: "all", label: "All Projects" },
  { id: "data", label: "Data Science" },
  { id: "software", label: "Software Development" },
];

const services = {
  software: [
    {
      title: "Web Development",
      description: "Modern, responsive web applications using cutting-edge technologies",
    },
    {
      title: "Digital Transformation",
      description: "Strategic modernization of legacy systems and business processes",
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications",
    },
    {
      title: "Cloud Architecture",
      description: "Scalable cloud solutions and infrastructure design",
    },
  ],
  data: [
    {
      title: "AI for Business",
      description: "Custom AI solutions to automate and optimize business processes",
    },
    {
      title: "Data Analytics",
      description: "Advanced analytics and business intelligence solutions",
    },
    {
      title: "Machine Learning",
      description: "Custom ML models for prediction and automation",
    },
    {
      title: "Natural Language Processing",
      description: "Text analysis and processing solutions",
    },
  ],
};

export default function Projects() {
  const [match, params] = useRoute("/projects/:category");
  const [, setLocation] = useLocation();

  const activeCategory = match ? params?.category : "all";

  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: [activeCategory === "all" ? "/api/projects" : `/api/projects/${activeCategory}`],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const showServices = activeCategory !== "all" && services[activeCategory as keyof typeof services];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          {activeCategory === "all" 
            ? "All Projects" 
            : activeCategory === "data" 
              ? "Data Science Projects"
              : "Software Development Projects"
          }
        </h1>

        <Tabs value={activeCategory} className="mb-8">
          <TabsList className="mb-8">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                onClick={() => {
                  const newPath = category.id === "all" ? "/projects" : `/projects/${category.id}`;
                  setLocation(newPath);
                }}
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects?.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col border-primary/20">
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                {project.link && (
                  <CardContent className="mt-auto">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center"
                    >
                      View Project →
                    </a>
                  </CardContent>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {showServices && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-foreground">Professional Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services[activeCategory as keyof typeof services].map((service) => (
                <Card key={service.title} className="border-primary/20">
                  <CardHeader>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}