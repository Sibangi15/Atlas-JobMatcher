import Resume from "../models/Resume.js";
import { generateEmbedding, cosineSimilarity } from "../services/embedding.js";

export const embeddingMatch = async (req, res) => {
    try {
        const { jobDescription } = req.body;

        if (!jobDescription) {
            return res.status(400).json({
                success: false,
                message: "Job description required",
            });
        }

        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found",
            });
        }

        if (!resume.parsedData) {
            return res.status(400).json({
                success: false,
                message: "Resume not parsed yet",
            });
        }

        const parsed = resume.parsedData;

        const resumeText = `
Skills: ${parsed.skills?.join(", ") || ""}
Education: ${parsed.education?.join(", ") || ""}
Experience: ${parsed.experience?.join(", ") || ""}
Summary: ${parsed.summary || ""}
`;

        // Resume embedding (cached)
        let resumeEmbedding = resume.resumeEmbedding;

        if (!resumeEmbedding || resumeEmbedding.length === 0) {
            console.log("Generating new resume embedding...");
            resumeEmbedding = await generateEmbedding(resumeText);
            resume.resumeEmbedding = resumeEmbedding;
        } else {
            console.log("Using cached resume embedding");
        }

        // Job embedding (always new)
        const jobEmbedding = await generateEmbedding(jobDescription);
        resume.jobEmbedding = jobEmbedding;

        // Similarity
        const similarity = cosineSimilarity(resumeEmbedding, jobEmbedding);

        const embeddingScore = Number((similarity * 100).toFixed(2));

        resume.similarityScore = embeddingScore;

        await resume.save();

        res.json({
            success: true,
            similarityScore: embeddingScore,
        });

    } catch (error) {
        console.error("Embedding Match Error:", error);
        res.status(500).json({
            success: false,
            message: "Embedding match failed",
        });
    }
};