import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location"),
  status: text("status").default("active"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()),
});

export const inspections = sqliteTable("inspections", {
  id: text("id").primaryKey(),
  projectId: text("project_id").references(() => projects.id),
  title: text("title").notNull(),
  inspector: text("inspector").notNull(),
  date: integer("date", { mode: "timestamp" }).notNull(),
  score: integer("score").default(0),
  summary: text("summary"),
  status: text("status").default("pending"), // pending, completed, flagged
});

export const issues = sqliteTable("issues", {
  id: text("id").primaryKey(),
  inspectionId: text("inspection_id").references(() => inspections.id),
  description: text("description").notNull(),
  severity: text("severity").notNull(), // low, medium, high, critical
  resolved: integer("resolved", { mode: "boolean" }).default(false),
  aiSuggestion: text("ai_suggestion"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()),
});

export const pulseMetrics = sqliteTable("pulse_metrics", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  date: integer("date", { mode: "timestamp" }).notNull(),
  avgScore: integer("avg_score").notNull(),
  issueCount: integer("issue_count").notNull(),
  criticalCount: integer("critical_count").notNull(),
});
