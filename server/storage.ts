import { projects, articles, messages } from "@shared/schema";
import type { Project, Article, Message, InsertProject, InsertArticle, InsertMessage } from "@shared/schema";

export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  getProjectsByCategory(category: string): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;

  // Articles
  getArticles(): Promise<Article[]>;
  getArticle(id: number): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;

  // Messages
  createMessage(message: InsertMessage): Promise<Message>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private articles: Map<number, Article>;
  private messages: Map<number, Message>;
  private currentProjectId: number;
  private currentArticleId: number;
  private currentMessageId: number;

  constructor() {
    this.projects = new Map();
    this.articles = new Map();
    this.messages = new Map();
    this.currentProjectId = 1;
    this.currentArticleId = 1;
    this.currentMessageId = 1;

    // Initialize with real projects
    const initialProjects: InsertProject[] = [
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

    initialProjects.forEach(project => {
      const id = this.currentProjectId++;
      const newProject = { id, ...project };
      this.projects.set(id, newProject);
    });
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectsByCategory(category: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      (project) => project.category === category
    );
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const newProject = { id, ...project };
    this.projects.set(id, newProject);
    return newProject;
  }

  async getArticles(): Promise<Article[]> {
    return Array.from(this.articles.values());
  }

  async getArticle(id: number): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    const id = this.currentArticleId++;
    const newArticle = { id, ...article };
    this.articles.set(id, newArticle);
    return newArticle;
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const newMessage = { id, ...message };
    this.messages.set(id, newMessage);
    return newMessage;
  }
}

export const storage = new MemStorage();