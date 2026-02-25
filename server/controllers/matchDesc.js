import Resume from "../models/Resume.js";
import { generateAIResponse } from "../services/aiParser.js";

export const matchResumeWithJobDesc = async (req, res) => {
    try {
        const { jobDescription } = req.body;

        if (!jobDescription) {
            return res.status(400).json({
                success: false,
                message: "Job description is required",
            });
        }

        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found",
            });
        }

        const parsedData = resume.parsedData;

        const resumeText = `
Name: ${parsedData.name || ""}
Summary: ${parsedData.summary || ""}

Skills: ${parsedData.skills?.join(", ") || ""}
Education: ${parsedData.education?.join(", ") || ""}
Experience: ${parsedData.experience?.join(", ") || ""}
`;

        const prompt = `
You are an expert ATS and technical recruiter.

Compare the RESUME with the JOB DESCRIPTION.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}

Analyze and return ONLY valid JSON in this format:

{
  "score": number (0-100),
  "missingSkills": [],
  "improvementSuggestions": [],
  "atsIssues": []
}

Scoring Rules:
- 90-100: Excellent match
- 70-89: Good match
- 50-69: Moderate match
- Below 50: Weak match
`;

        const aiRaw = await generateAIResponse(prompt);

        const cleaned = aiRaw
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        let aiParsed;

        try {
            aiParsed = JSON.parse(cleaned);
        } catch (err) {
            console.error("Invalid AI JSON:", cleaned);
            return res.status(500).json({
                success: false,
                message: "AI returned invalid format",
            });
        }

        // Save result
        resume.matchAnalysis = {
            jobDescription,
            score: aiParsed.score,
            missingSkills: aiParsed.missingSkills,
            improvementSuggestions: aiParsed.improvementSuggestions,
            atsIssues: aiParsed.atsIssues,
            analyzedAt: new Date(),
        };

        await resume.save();

        res.json({
            success: true,
            data: resume.matchAnalysis,
        });

    } catch (error) {
        console.error("Match Engine Error:", error);
        res.status(500).json({
            success: false,
            message: "Resume matching failed",
        });
    }
};