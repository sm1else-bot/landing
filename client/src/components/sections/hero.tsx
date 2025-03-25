import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function Hero() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background border-b border-primary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter">
            <span className="text-primary">Jessenth</span>{" "}
            <span className="text-foreground">Ebenezer</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto font-mono">
            Data Scientist • Software Developer • Music Producer • Digital Artist • Writer
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              size="lg" 
              variant="default"
              className="text-lg hover:scale-105 transition-transform"
              asChild
            >
              <Link href="/projects">View Projects</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg hover:scale-105 transition-transform border-primary"
              asChild
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}