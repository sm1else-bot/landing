import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NavItems = [
  { label: "Home", path: "/" },
  { label: "Projects", path: "/projects" },
  { label: "Music", path: "/music" },
  { label: "Art", path: "/art" },
  { label: "Writing", path: "/writing" },
  { label: "Resume", path: "/resume" },
  { label: "Contact", path: "/contact" },
];

export function Navbar() {
  const [location] = useLocation();

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b border-primary/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold font-mono text-primary">
            TLW/UI
          </h1>
        </Link>

        <div className="hidden md:flex space-x-1">
          {NavItems.map((item) => (
            <Button
              key={item.path}
              variant={location === item.path ? "default" : "ghost"}
              className={cn(
                "transition-all hover:scale-105",
                location === item.path && "bg-primary text-primary-foreground"
              )}
              asChild
            >
              <Link href={item.path}>{item.label}</Link>
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
}