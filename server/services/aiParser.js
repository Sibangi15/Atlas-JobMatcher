// import { GoogleGenAI } from "@google/genai";

// export const generateAIResponse = async (prompt) => {
//     try {
//         if (!process.env.GEMINI_API_KEY) {
//             throw new Error("GEMINI_API_KEY missing");
//         }

//         const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

//         const model = genAI.getGenerativeModel({
//             model: "gemini-1.5-flash-latest",
//         });

//         const result = await model.generateContent({
//             contents: [{ role: "user", parts: [{ text: prompt }] }],
//             generationConfig: {
//                 temperature: 0.3,
//                 maxOutputTokens: 800,
//             },
//         });

//         return result.response.text();
//     } catch (error) {
//         console.error("Gemini Error:", error.message);
//         throw error;
//     }
// };

import { GoogleGenAI } from "@google/genai";

export const generateAIResponse = async (prompt) => {
    try {
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Gemini Error:", error);
        throw error;
    }
};