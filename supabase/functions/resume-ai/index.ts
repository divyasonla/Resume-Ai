import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, resumeData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    let systemPrompt = "";
    let userPrompt = "";

    if (type === "generate-objective") {
      systemPrompt = "You are an expert resume writer. Generate a concise, professional career objective (2-3 sentences) for a student/fresher based on their information.";
      userPrompt = `Generate a career objective for: ${JSON.stringify(resumeData.personalInfo)}. Education: ${JSON.stringify(resumeData.education)}. Skills: ${JSON.stringify(resumeData.skills)}`;
    } else if (type === "suggest-skills") {
      systemPrompt = "You are a career advisor. Suggest 5 relevant technical skills based on the user's education and projects. Return only skill names as a JSON array.";
      userPrompt = `Suggest skills for: Education: ${JSON.stringify(resumeData.education)}. Projects: ${JSON.stringify(resumeData.projects)}`;
    } else if (type === "feedback") {
      systemPrompt = "You are a professional resume reviewer. Analyze the resume and provide scores and feedback. Return JSON with: overallScore (0-100), grammarScore (0-100), professionalScore (0-100), completenessScore (0-100), strengths (array of strings), suggestions (array of strings), weaknesses (array of strings).";
      userPrompt = `Review this resume: ${JSON.stringify(resumeData)}`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded" }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (response.status === 402) return new Response(JSON.stringify({ error: "Payment required" }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    let result: Record<string, unknown> = {};
    if (type === "generate-objective") {
      result = { objective: content.trim() };
    } else if (type === "suggest-skills") {
      const match = content.match(/\[[\s\S]*\]/);
      result = { skills: match ? JSON.parse(match[0]) : [] };
    } else if (type === "feedback") {
      const match = content.match(/\{[\s\S]*\}/);
      result = { feedback: match ? JSON.parse(match[0]) : { overallScore: 70, grammarScore: 70, professionalScore: 70, completenessScore: 70, strengths: [], suggestions: ["Add more details"], weaknesses: [] } };
    }

    return new Response(JSON.stringify(result), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
