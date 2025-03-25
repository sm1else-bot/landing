import { z } from "zod";

// Project types
export const projectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  imageUrl: z.string().nullable(),
  link: z.string().nullable(),
});

export const insertProjectSchema = projectSchema.omit({ id: true });

// Article types
export const articleSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  summary: z.string(),
});

export const insertArticleSchema = articleSchema.omit({ id: true });

// Message types
export const messageSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  message: z.string(),
});

export const insertMessageSchema = messageSchema.omit({ id: true });

// Export types
export type Project = z.infer<typeof projectSchema>;
export type Article = z.infer<typeof articleSchema>;
export type Message = z.infer<typeof messageSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type InsertArticle = z.infer<typeof insertArticleSchema>;
export type InsertMessage = z.infer<typeof insertMessageSchema>;