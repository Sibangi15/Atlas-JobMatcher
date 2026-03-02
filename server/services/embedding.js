import { HfInference } from "@huggingface/inference";

export const generateEmbedding = async (text) => {
    try {
        const hf = new HfInference(process.env.HF_TOKEN);
        const embedding = await hf.featureExtraction({
            model: "sentence-transformers/all-MiniLM-L6-v2",
            inputs: text,
        });

        return embedding;
    } catch (error) {
        console.error("Embedding Error:", error);
        throw error;
    }
};

export const cosineSimilarity = (vecA, vecB) => {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);

    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));

    return dotProduct / (magnitudeA * magnitudeB);
};