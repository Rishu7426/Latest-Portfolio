import { GoogleGenAI, Type } from "@google/genai";

function getAI() {
  const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY || "";
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing. Please set it in your environment variables.");
  }
  return new GoogleGenAI({ apiKey });
}

const PORTFOLIO_CONTEXT = `
You are an AI assistant for Alex Rivers, a Senior Staff Engineer with 12+ years of experience.
Alex's expertise includes:
- Frontend: React, Next.js, TypeScript, Tailwind CSS, Three.js, Web Performance.
- Backend: Node.js, Go, PostgreSQL, Redis, GraphQL.
- Infrastructure: AWS, GCP, Docker, Kubernetes, Terraform, CI/CD.
- Architecture: System Design, Microservices, Security, Scalability, Mentorship.

Experience:
1. TechFlow Systems (2021 - Present): Senior Staff Engineer. Architected micro-frontend ecosystem for 5M+ users, reduced cloud costs by 40%.
2. Nexus AI (2018 - 2021): Principal Frontend Architect. Real-time data visualization platform for AI monitoring.
3. CloudScale (2015 - 2018): Lead Software Engineer. Scalable API services, improved response times by 60%.

Projects:
- Nebula Cloud Engine: Cloud orchestration with Go and Kubernetes.
- Prism Design System: Enterprise UI library for 200+ devs.
- Vortex Analytics: IoT real-time dashboard.

Tone: Professional, helpful, concise, and technically sophisticated.
`;

export async function askChatbot(message: string, history: { role: string, parts: { text: string }[] }[]) {
  const ai = getAI();
  const model = "gemini-3-flash-preview";
  const chat = ai.chats.create({
    model,
    config: {
      systemInstruction: PORTFOLIO_CONTEXT + "\nAnswer questions about Alex's experience, skills, and projects. Be concise.",
    },
    history: history,
  });

  const response = await chat.sendMessage({ message });
  return response.text;
}

export async function getProjectSuggestions(visitorInterests: string) {
  const ai = getAI();
  const model = "gemini-3-flash-preview";
  const response = await ai.models.generateContent({
    model,
    contents: `Based on Alex Rivers' expertise and these visitor interests: "${visitorInterests}", suggest 3 innovative project ideas Alex could build or collaborate on. Return as JSON array of objects with 'title' and 'description'.`,
    config: {
      systemInstruction: PORTFOLIO_CONTEXT,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING }
          },
          required: ["title", "description"]
        }
      }
    }
  });

  return JSON.parse(response.text || "[]");
}

export async function generateProjectCodeStream(prompt: string) {
  const ai = getAI();
  const model = "gemini-3-flash-preview";
  
  return ai.models.generateContentStream({
    model,
    contents: `Generate a single-file HTML/CSS/JS prototype for this project idea: "${prompt}". 
    The code should be modern, responsive, and visually appealing. 
    Alex Rivers' style is minimal, high-performance, and "glassmorphic".
    Include all CSS in a <style> tag and JS in a <script> tag.
    Return ONLY the code, no markdown formatting or explanations.`,
    config: {
      systemInstruction: PORTFOLIO_CONTEXT + "\nYou are a world-class frontend architect. You write clean, performant, and beautiful code.",
    }
  });
}

export async function summarizeResume() {
  const ai = getAI();
  const model = "gemini-3-flash-preview";
  const response = await ai.models.generateContent({
    model,
    contents: "Provide a high-impact, 3-sentence summary of Alex Rivers' career for a potential employer.",
    config: {
      systemInstruction: PORTFOLIO_CONTEXT,
    }
  });

  return response.text;
}
