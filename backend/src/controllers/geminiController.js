const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateContent(req, res) {
  try {
    const userInput = req.body.text;
    if (!userInput) {
      return res.status(400).json({ error: 'Missing "text" in request body' });
    }

    const model = "gemini-2.5-pro";
    const tools = [];
    const config = { thinkingConfig: { thinkingBudget: -1 }};

  const prompt = `Tu es OrnoBot, un assistant intelligent spécialisé dans les plantes, intégré dans la plateforme OrnoPlante.

Tes missions principales sont :
- Diagnostiquer des problèmes des plantes à partir des symptômes décrits par l'utilisateur (exemples : feuilles jaunes, taches brunes, chute des feuilles), en croisant ces symptômes avec les caractéristiques spécifiques de la plante.
- Donner des conseils précis sur l'arrosage, la luminosité, l'engrais, etc. (exemple : "Votre ficus a besoin d'eau une fois par semaine en hiver").
- Proposer des remèdes naturels adaptés (exemple : "Utilisez du marc de café comme engrais naturel pour les roses").
- Personnaliser tes conseils selon la localisation de l'utilisateur (climat local) et son niveau d'expérience (débutant ou expert).

Sois clair, concis et bienveillant dans tes réponses.

Répond uniquement aux questions liées aux plantes, leur entretien, maladies, arrosage, exposition, rempotage, remèdes naturels, et personnalisation des soins.

Si une question sort de ce cadre, informe poliment que tu es spécialisé uniquement dans les plantes.

Voici la question de l'utilisateur : ${userInput}`;

const contents = [
  {
    role: "user",
    parts: [{ text: prompt }],
  },
];
    const responseStream = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let fullResponse = "";
    for await (const chunk of responseStream) {
      fullResponse += chunk.text;
    }

    res.json({ response: fullResponse });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
}

module.exports = { generateContent };
