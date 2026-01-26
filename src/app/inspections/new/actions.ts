"use server";

import { db } from "@/lib/db";
import { inspections, issues } from "@/lib/schema";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";

export async function createInspection(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const inspector = formData.get("inspector") as string;
  const score = parseInt(formData.get("score") as string) || 0;
  
  const inspectionId = randomUUID();
  
  await db.insert(inspections).values({
    id: inspectionId,
    title,
    inspector,
    date: new Date(),
    score,
    summary: description,
    status: score < 80 ? "flagged" : "completed",
    projectId: "proj-1",
  });

  const aiSeverity = formData.get("aiSeverity") as string;
  const aiSuggestion = formData.get("aiSuggestion") as string;

  if (aiSeverity && aiSuggestion) {
    await db.insert(issues).values({
      id: randomUUID(),
      inspectionId,
      description: `AI Flagged: ${title}`,
      severity: aiSeverity,
      aiSuggestion,
    });
  }

  redirect("/dashboard");
}
