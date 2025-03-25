// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  projects;
  articles;
  messages;
  currentProjectId;
  currentArticleId;
  currentMessageId;
  constructor() {
    this.projects = /* @__PURE__ */ new Map();
    this.articles = /* @__PURE__ */ new Map();
    this.messages = /* @__PURE__ */ new Map();
    this.currentProjectId = 1;
    this.currentArticleId = 1;
    this.currentMessageId = 1;
    const initialProjects = [
      {
        title: "Comparative Analysis of ML Algorithms in Breast Cancer Prediction",
        description: "Supervised machine learning algorithms comparison for breast cancer prediction",
        category: "data",
        link: null,
        imageUrl: null
      },
      {
        title: "Kolmogorov-Arnold Networks in Neural Applications",
        description: "Implementation of Kolmogorov-Arnold Networks for real-life neural applications",
        category: "data",
        link: null,
        imageUrl: null
      },
      {
        title: "Brain Tumor Detection using T1 FLAIR MRI",
        description: "Segmenting T1 FLAIR MRI data to detect and diagnose brain tumors",
        category: "data",
        link: null,
        imageUrl: null
      },
      {
        title: "XR MRI Visualization Platform",
        description: "Utilising eXtended Reality to visualize MRI DICOM Data in real time 3D for surgical planning and patient awareness",
        category: "software",
        link: null,
        imageUrl: null
      },
      {
        title: "WiFi ESP32 Surveillance Rover",
        description: "WiFi ESP32 Surveillance Rover with cross platform control and feedback",
        category: "software",
        link: null,
        imageUrl: null
      },
      {
        title: "C2C Diecast Marketplace",
        description: "C2C diecast trading and selling marketplace",
        category: "software",
        link: null,
        imageUrl: null
      }
    ];
    initialProjects.forEach((project) => {
      const id = this.currentProjectId++;
      const newProject = { id, ...project };
      this.projects.set(id, newProject);
    });
  }
  async getProjects() {
    return Array.from(this.projects.values());
  }
  async getProjectsByCategory(category) {
    return Array.from(this.projects.values()).filter(
      (project) => project.category === category
    );
  }
  async createProject(project) {
    const id = this.currentProjectId++;
    const newProject = { id, ...project };
    this.projects.set(id, newProject);
    return newProject;
  }
  async getArticles() {
    return Array.from(this.articles.values());
  }
  async getArticle(id) {
    return this.articles.get(id);
  }
  async createArticle(article) {
    const id = this.currentArticleId++;
    const newArticle = { id, ...article };
    this.articles.set(id, newArticle);
    return newArticle;
  }
  async createMessage(message) {
    const id = this.currentMessageId++;
    const newMessage = { id, ...message };
    this.messages.set(id, newMessage);
    return newMessage;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { z } from "zod";
var projectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  imageUrl: z.string().nullable(),
  link: z.string().nullable()
});
var insertProjectSchema = projectSchema.omit({ id: true });
var articleSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  summary: z.string()
});
var insertArticleSchema = articleSchema.omit({ id: true });
var messageSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  message: z.string()
});
var insertMessageSchema = messageSchema.omit({ id: true });

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/projects", async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });
  app2.get("/api/projects/:category", async (req, res) => {
    const projects = await storage.getProjectsByCategory(req.params.category);
    res.json(projects);
  });
  app2.post("/api/projects", async (req, res) => {
    const project = insertProjectSchema.parse(req.body);
    const created = await storage.createProject(project);
    res.json(created);
  });
  app2.get("/api/articles", async (_req, res) => {
    const articles = await storage.getArticles();
    res.json(articles);
  });
  app2.get("/api/articles/:id", async (req, res) => {
    const article = await storage.getArticle(Number(req.params.id));
    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }
    res.json(article);
  });
  app2.post("/api/articles", async (req, res) => {
    const article = insertArticleSchema.parse(req.body);
    const created = await storage.createArticle(article);
    res.json(created);
  });
  app2.post("/api/messages", async (req, res) => {
    const message = insertMessageSchema.parse(req.body);
    const created = await storage.createMessage(message);
    res.json(created);
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
