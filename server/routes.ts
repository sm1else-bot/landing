import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertProjectSchema, insertArticleSchema, insertMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.get("/api/projects", async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get("/api/projects/:category", async (req, res) => {
    const projects = await storage.getProjectsByCategory(req.params.category);
    res.json(projects);
  });

  app.post("/api/projects", async (req, res) => {
    const project = insertProjectSchema.parse(req.body);
    const created = await storage.createProject(project);
    res.json(created);
  });

  app.get("/api/articles", async (_req, res) => {
    const articles = await storage.getArticles();
    res.json(articles);
  });

  app.get("/api/articles/:id", async (req, res) => {
    const article = await storage.getArticle(Number(req.params.id));
    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }
    res.json(article);
  });

  app.post("/api/articles", async (req, res) => {
    const article = insertArticleSchema.parse(req.body);
    const created = await storage.createArticle(article);
    res.json(created);
  });

  app.post("/api/messages", async (req, res) => {
    const message = insertMessageSchema.parse(req.body);
    const created = await storage.createMessage(message);
    res.json(created);
  });

  const httpServer = createServer(app);
  return httpServer;
}
