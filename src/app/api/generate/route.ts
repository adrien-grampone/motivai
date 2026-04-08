import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      console.error("Missing GEMINI_API_KEY");
      return new Response(JSON.stringify({ error: "Configuration error" }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const genAI = new GoogleGenerativeAI(geminiApiKey);

    const { jobDescription, userExperience, userName, targetCompany } = await req.json();

    if (!jobDescription || !userExperience) {
      return new Response("Missing required fields", { status: 400 });
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      }
    });

    const prompt = `
      Tu es un expert en recrutement avec 20 ans d'expérience dans les ressources humaines.
      Ta mission est de rédiger une lettre de motivation percutante, personnalisée et optimisée pour l'offre d'emploi suivante.

      INFORMATIONS CANDIDAT :
      Nom : ${userName || "Candidat"}
      Expérience et compétences : ${userExperience}

      OFFRE D'EMPLOI :
      Entreprise : ${targetCompany || "L'entreprise"}
      Description de l'offre : ${jobDescription}

      DIRECTIVES :
      1. Adopte un ton professionnel, enthousiaste et convaincant.
      2. Ne fais pas de remplissage. Chaque phrase doit apporter de la valeur.
      3. Structure la lettre en 3 parties : VOUS (l'entreprise), MOI (mes compétences en lien avec l'offre), NOUS (ce qu'on peut accomplir ensemble).
      4. Assure-toi que les mots-clés de l'offre sont intégrés pour passer les filtres ATS.
      5. La lettre doit être au format texte prêt à être copié.
      6. Ne mets pas de [Espaces à remplir], invente des transitions fluides basées sur le contexte si besoin, ou laisse le candidat compléter les informations personnelles s'il ne les a pas fournies.
      
      Rédige la lettre maintenant.
    `;

    const result = await model.generateContentStream(prompt);

    // Create a ReadableStream to stream the response
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const text = chunk.text();
          controller.enqueue(new TextEncoder().encode(text));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
