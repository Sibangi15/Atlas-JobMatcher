import Resume from "../models/Resume.js";
import { generateEmbedding, cosineSimilarity } from "../services/embedding.js";
import crypto from "crypto";

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

        let updated = false;

        // Resume embedding (cached)
        let resumeEmbedding = resume.resumeEmbedding;

        if (!resumeEmbedding || resumeEmbedding.length === 0) {
            console.log("Generating new resume embedding...");
            resumeEmbedding = await generateEmbedding(resumeText);
            resume.resumeEmbedding = resumeEmbedding;
            updated = true;
        } else {
            console.log("Using cached resume embedding");
        }

        // Job embedding
        const jobHash = crypto
            .createHash("md5")
            .update(jobDescription)
            .digest("hex");

        if (!resume.jobEmbeddings) {
            resume.jobEmbeddings = {};
        }

        let jobEmbedding;

        if (resume.jobEmbeddings?.[jobHash]) {
            console.log("Using cached job embedding");
            jobEmbedding = resume.jobEmbeddings[jobHash];
        } else {
            console.log("Generating new job embedding");
            jobEmbedding = await generateEmbedding(jobDescription);
            resume.jobEmbeddings[jobHash] = jobEmbedding;
            updated = true;
        }

        // Similarity
        const similarity = cosineSimilarity(resumeEmbedding, jobEmbedding);
        const embeddingScore = Number((similarity * 100).toFixed(2));
        resume.similarityScore = embeddingScore;
        if (updated) {
            await resume.save();
        }
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