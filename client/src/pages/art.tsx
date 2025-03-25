import { motion } from "framer-motion";
import { Palette } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Art() {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-[calc(100vh-8rem)]"
      >
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Digital Art Gallery
        </h1>

        <Card className="max-w-2xl mx-auto mb-8">
          <CardHeader className="text-center py-12">
            <Palette className="w-16 h-16 mx-auto text-primary mb-6" />
            <CardTitle className="text-3xl mb-6">Coming Soon</CardTitle>
            <CardDescription className="text-lg">
              The digital art gallery is currently under construction. 
              Check back soon to explore a collection of digital artwork 
              spanning various styles and mediums.
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>
    </div>
  );
}