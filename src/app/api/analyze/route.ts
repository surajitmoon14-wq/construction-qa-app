import { NextResponse } from "next/server";

function generateFallbackAnalysis(title: string, description: string) {
  const text = `${title} ${description}`.toLowerCase();
  
  let riskLevel = "Medium";
  let issueType = "General Quality";
  let recommendation = "Document finding and schedule follow-up inspection.";

  if (text.includes("leak") || text.includes("water") || text.includes("moisture")) {
    issueType = "Water Intrusion / Leakage";
    riskLevel = "High";
    recommendation = "Identify leak source, apply waterproofing, and verify drainage systems.";
  } else if (text.includes("crack") || text.includes("structural") || text.includes("foundation")) {
    issueType = "Structural Integrity";
    riskLevel = "Critical";
    recommendation = "Engage structural engineer for assessment. Do not proceed until cleared.";
  } else if (text.includes("electrical") || text.includes("wire") || text.includes("circuit")) {
    issueType = "Electrical Safety";
    riskLevel = "High";
    recommendation = "Isolate affected circuit and have licensed electrician inspect.";
  } else if (text.includes("hvac") || text.includes("duct") || text.includes("air")) {
    issueType = "HVAC / Air Quality";
    riskLevel = "Medium";
    recommendation = "Re-seal connections and perform pressure test to verify fix.";
  } else if (text.includes("fire") || text.includes("smoke") || text.includes("safety")) {
    issueType = "Fire Safety";
    riskLevel = "Critical";
    recommendation = "Immediate remediation required. Verify all fire safety systems operational.";
  } else if (text.includes("paint") || text.includes("finish") || text.includes("cosmetic")) {
    issueType = "Cosmetic / Finish";
    riskLevel = "Low";
    recommendation = "Schedule touch-up work before final inspection.";
  }

  return { riskLevel, issueType, recommendation };
}

export async function POST(req: Request) {
  try {
    const { title, description } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      const fallback = generateFallbackAnalysis(title, description);
      return NextResponse.json(fallback);
    }

    const { default: Groq } = await import("groq-sdk");
    const client = new Groq({ apiKey });

    const prompt = `
      You are an expert Construction Quality Assurance AI assistant.
      Analyze the following inspection finding and provide:
      1. A risk level (low, medium, high, critical).
      2. An issue type (e.g., Air Leakage, Structural, Electrical Safety, etc.).
      3. A concise recommendation for remediation.

      Finding Title: ${title}
      Description: ${description}

      Return the response in JSON format like this:
      {
        "riskLevel": "Medium",
        "issueType": "Air Leakage / Installation Quality",
        "recommendation": "Re-seal duct joints and perform re-test"
      }
    `;

    const chatCompletion = await client.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
    });

    const content = chatCompletion.choices[0].message.content || "{}";
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    const result = JSON.parse(jsonMatch ? jsonMatch[0] : "{}");
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    const { title, description } = await req.clone().json().catch(() => ({ title: "", description: "" }));
    const fallback = generateFallbackAnalysis(title || "", description || "");
    return NextResponse.json(fallback);
  }
}
