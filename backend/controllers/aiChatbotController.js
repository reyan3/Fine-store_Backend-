import {GoogleGenAI} from "@google/genai"

// Uses Gemini api

export const aiChatbot = async (req, res) => {
  const { prompt } = req.body;

  const systemInstruction = `
You are the official FineStore AI Assistant. 
Your goal is to provide high-level technical support and product information for FineStore customers.

RULES:
1. Tone: Professional, tech-forward, and concise.
2. Context: FineStore sells high-performance hardware (Laptops, Tabs, Gaming Consoles).
3. Constraints: If a user asks about something unrelated to tech or the store, politely redirect them.
4. Formatting: Use bullet points for lists and keep responses under 3 sentences unless complex.
`;

  const userContent = `
The following is a customer inquiry. Please respond according to your instructions.

Customer Inquiry: """${prompt}"""

Response:
`;


const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

try {

  const result = await genAI.models.generateContent({ 
    model: "gemini-3-flash-preview",
    config: {
        systemInstruction: systemInstruction, // System instruction goes inside config
        temperature: 0.7,
      },
    contents:userContent
  });
  const answer = result.text;
  res.json({ answer });

} catch (err) {
  console.error("Gemini API Error:", err.message);
  res.status(500).json({ msg: "AI Lab is currently offline." });
}
};

