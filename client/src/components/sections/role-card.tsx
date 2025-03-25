import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "wouter";

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  delay?: number;
}

export function RoleCard({ title, description, icon, href, delay = 0 }: RoleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link href={href}>
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="mb-4 text-4xl text-primary">{icon}</div>
            <CardTitle className="text-xl mb-2">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </motion.div>
  );
}
