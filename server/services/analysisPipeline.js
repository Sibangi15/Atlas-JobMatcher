import Resume from "../models/Resume.js";
import { generateEmbedding, cosineSimilarity } from "./embedding.js";
import crypto from "crypto";
import { generateAIResponse } from "./aiParser.js"; // same function you already use

export const runAnalysisPipeline = async (resumeId, jobDescription) => {

    const resume = await Resume.findById(resumeId);

    if (!resume) {
        throw new Error("Resume not found");
    }

    const parsed = resume.parsedData || {};

    const resumeText = `
Skills: ${parsed.skills?.join(", ") || ""}
Education: ${parsed.education?.join(", ") || ""}
Experience: ${parsed.experience?.join(", ") || ""}
Summary: ${parsed.summary || ""}
`;

    // 1 EMBEDDING MATCH

    let resumeEmbedding = resume.resumeEmbedding;

    if (!resumeEmbedding || resumeEmbedding.length === 0) {
        resumeEmbedding = await generateEmbedding(resumeText);
        resume.resumeEmbedding = resumeEmbedding;
    }

    const jobHash = crypto
        .createHash("md5")
        .update(jobDescription)
        .digest("hex");

    if (!resume.jobEmbeddings) {
        resume.jobEmbeddings = {};
    }

    let jobEmbedding;

    if (resume.jobEmbeddings[jobHash]) {
        jobEmbedding = resume.jobEmbeddings[jobHash];
    } else {
        jobEmbedding = await generateEmbedding(jobDescription);
        resume.jobEmbeddings[jobHash] = jobEmbedding;
    }

    const similarity = cosineSimilarity(resumeEmbedding, jobEmbedding);
    const embeddingScore = Number((similarity * 100).toFixed(2));

    resume.similarityScore = embeddingScore;

    //2 AI ANALYSIS

    const prompt = `
You are an ATS system and senior technical recruiter.

Compare the RESUME with the JOB DESCRIPTION and analyze ATS optimization.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Return ONLY valid JSON:

{
  "score": number,
  "matchingSkills": [],
  "missingSkills": [],
  "industryKeywords": [],
  "improvementSuggestions": [],
  "atsIssues": []
}
`;

    const aiRaw = await generateAIResponse(prompt);

    const cleaned = aiRaw
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);

    const aiParsed = JSON.parse(jsonMatch[0]);

    resume.matchAnalysis = {
        jobDescription,
        score: aiParsed.score,
        matchingSkills: aiParsed.matchingSkills,
        missingSkills: aiParsed.missingSkills,
        industryKeywords: aiParsed.industryKeywords,
        improvementSuggestions: aiParsed.improvementSuggestions,
        atsIssues: aiParsed.atsIssues,
        analyzedAt: new Date(),
    };

    //3 HYBRID SCORE

    const geminiScore = Math.min(Math.max(Number(aiParsed.score), 0), 100);
    const embeddingScoreNormalized = Math.min(Math.max(Number(embeddingScore), 0), 100);

    const finalScore =
        (0.6 * embeddingScoreNormalized) +
        (0.4 * geminiScore);

    const roundedScore = Number(finalScore.toFixed(2));

    resume.finalHybridScore = roundedScore;

    resume.hybridBreakdown = {
        geminiScore,
        embeddingScore: embeddingScoreNormalized,
        weightEmbedding: 0.6,
        weightGemini: 0.4,
        calculatedAt: new Date()
    };

    await resume.save();

    return resume;
};