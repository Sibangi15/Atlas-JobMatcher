import OpenAI from "openai";

export const aiParseResume = async (text) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
Extract structured JSON from this resume:

Return ONLY valid JSON with:
name, email, phone, skills (array), education (array), experience (array), summary.

Resume:
${text}
`;

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
    });

    return JSON.parse(response.choices[0].message.content);
};