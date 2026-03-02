import Resume from "../models/Resume.js";

export const hybridMatch = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found",
            });
        }

        const geminiScoreRaw = resume.matchAnalysis?.score;
        const embeddingScoreRaw = resume.similarityScore;

        if (geminiScoreRaw == null || embeddingScoreRaw == null) {
            return res.status(400).json({
                success: false,
                message: "Run Gemini and Embedding match first",
            });
        }

        // Normalize & validate
        const geminiScore = Math.min(Math.max(Number(geminiScoreRaw), 0), 100);
        const embeddingScore = Math.min(Math.max(Number(embeddingScoreRaw), 0), 100);

        // Weighted formula
        const finalScore =
            (0.6 * embeddingScore) +
            (0.4 * geminiScore);

        const roundedScore = Number(finalScore.toFixed(2));

        // Save structured breakdown
        resume.finalHybridScore = roundedScore;

        resume.hybridBreakdown = {
            geminiScore,
            embeddingScore,
            weightEmbedding: 0.6,
            weightGemini: 0.4,
            calculatedAt: new Date()
        };

        await resume.save();

        res.json({
            success: true,
            data: {
                finalHybridScore: roundedScore,
                breakdown: resume.hybridBreakdown
            }
        });

    } catch (error) {
        console.error("Hybrid Score Error:", error);
        res.status(500).json({
            success: false,
            message: "Hybrid score calculation failed",
        });
    }
};