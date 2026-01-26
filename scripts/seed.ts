import { db } from "../src/lib/db";
import { projects, inspections, issues, pulseMetrics } from "../src/lib/schema";
import { v4 as uuidv4 } from "uuid";

async function seed() {
  console.log("Seeding database...");

  const projectId = "proj-1";
  await db.insert(projects).values({
    id: projectId,
    name: "Skyline Tower Phase 1",
    location: "Downtown Metropolis",
    status: "active",
  });

  const inspectionId = "insp-1";
  await db.insert(inspections).values({
    id: inspectionId,
    projectId: projectId,
    title: "Structural Reinforcement Check",
    inspector: "John Doe",
    date: new Date(),
    score: 85,
    summary: "Reinforcement bars installation looks mostly correct, but some ties are missing.",
    status: "completed",
  });

  await db.insert(issues).values({
    id: "issue-1",
    inspectionId: inspectionId,
    description: "Missing rebar ties in Column C4.",
    severity: "high",
    aiSuggestion: "Ensure all ties are installed according to the structural drawings before concrete pouring.",
  });

  // Pulse data for charts
  const now = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - (6 - i));
    await db.insert(pulseMetrics).values({
      date: date,
      avgScore: 70 + Math.floor(Math.random() * 25),
      issueCount: 5 + Math.floor(Math.random() * 10),
      criticalCount: Math.floor(Math.random() * 3),
    });
  }

  console.log("Seeding completed.");
}

seed().catch(console.error);
