import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import type { Article } from "@shared/schema";
import { Globe, BookText, Newspaper, Lightbulb } from "lucide-react";

const writingCategories = [
  {
    title: "r/the_omegaverse",
    description: "A groundbreaking IP featuring a fully simulated universe contained entirely in the cloud. This digital world is inhabited by intelligent beings unaware of the watcher's omnipresence—or perhaps, lack thereof. Follow along as we explore the philosophical and technological implications of digital consciousness.",
    icon: Globe,
  },
  {
    title: "Technical Blog",
    description: "Deep dives into software architecture, data science, and emerging technologies. Exploring the intersection of theory and practical implementation.",
    icon: BookText,
  },
  {
    title: "Investigative Journalism",
    description: "In-depth research and reporting on technology, society, and their interconnections.",
    icon: Newspaper,
  },
  {
    title: "Science Fiction",
    description: "Short stories exploring possible futures, alternative realities, and the human condition through a technological lens.",
    icon: Lightbulb,
  }
];

export default function Writing() {
  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Writing & Publications
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {writingCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-6 h-6 text-primary" />
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            );
          })}
        </div>
        <div className="space-y-6">
          {articles?.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{article.title}</CardTitle>
                  <CardDescription>{article.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm dark:prose-invert">
                    <p>{article.content.slice(0, 200)}...</p>
                    <a
                      href={`/writing/${article.id}`}
                      className="text-primary hover:underline inline-block mt-4"
                    >
                      Read More →
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}