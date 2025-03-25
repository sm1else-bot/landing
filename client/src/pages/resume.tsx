import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Resume() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Resume
        </h1>
        
        <Card>
          <CardContent className="p-0">
            <iframe
              src="/assets/resume.pdf"
              className="w-full h-[calc(100vh-12rem)] rounded-lg"
              title="Resume"
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
