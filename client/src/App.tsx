import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/layout/navbar";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Projects from "@/pages/projects";
import Music from "@/pages/music";
import Art from "@/pages/art";
import Writing from "@/pages/writing";
import Contact from "@/pages/contact";
import Resume from "@/pages/resume";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projects" component={Projects} />
      <Route path="/projects/:category" component={Projects} />
      <Route path="/music" component={Music} />
      <Route path="/art" component={Art} />
      <Route path="/writing" component={Writing} />
      <Route path="/resume" component={Resume} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <Router />
        </main>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;