import { generateAIResponse } from "../services/aiParser.js";

export const testAI = async (req, res) => {
    try {
        const resumeText = req.body.resumeText;
        const prompt = `
Analyze this resume:

${resumeText}

Return ONLY valid JSON:

{
  "missingSkills": [],
  "industryKeywords": [],
  "atsImprovements": []
}
`;

        const aiRaw = await generateAIResponse(prompt);
        const cleaned = aiRaw
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
        const parsed = JSON.parse(cleaned);
        res.json({
            success: true,
            data: parsed
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};