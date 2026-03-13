import Resume from '../models/Resume.js';
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import fs from "fs";
import { basicParse } from "../services/resumeParser.js";
import { generateAIResponse } from "../services/aiParser.js";

export const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const dataBuffer = new Uint8Array(
            fs.readFileSync(req.file.path)
        );

        const pdf = await pdfjsLib.getDocument({ data: dataBuffer }).promise;

        let extractedText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const strings = content.items.map(item => item.str);
            extractedText += strings.join(" ") + "\n";
        }

        const parsedData = basicParse(extractedText);

        const resume = await Resume.create({
            user: req.user.id,
            filename: req.file.filename,
            filepath: req.file.path,
            filetype: "pdf",
            parsedData: parsedData
        });

        res.status(200).json({
            message: "Saved successfully",
            resume
        });

    } catch (error) {
        console.error("FULL ERROR:", error);
        res.status(500).json({
            message: "Error parsing resume",
            error: error.message
        });
    }
};

export const getResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) {
            return res.status(404).json({ message: "No resume found" });
        }
        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: "Error fetching resume" });
    }
};

export const getUserResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.user.id });
        res.json({
            success: true,
            data: resumes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch resumes"
        });
    }
};

export const analyzeResumeWithJob = async (req, res) => {
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

        const parsed = resume.parsedData || {};

        const resumeText = `
Name: ${parsed.name || ""}
Summary: ${parsed.summary || ""}

Skills: ${parsed.skills?.join(", ") || ""}
Education: ${parsed.education?.join(", ") || ""}
Experience: ${parsed.experience?.join(", ") || ""}
`;

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

Rules:
- score must be between 0 and 100
- missingSkills should be skills required in job but missing in resume
- industryKeywords are important keywords to add
- improvementSuggestions should improve resume quality
- atsIssues should mention ATS formatting problems
`;

        const aiRaw = await generateAIResponse(prompt);

        const cleaned = aiRaw
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const jsonMatch = cleaned.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            throw new Error("Invalid AI response format");
        }

        const aiParsed = JSON.parse(jsonMatch[0]);

        // Save analysis
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

        await resume.save();

        res.json({
            success: true,
            data: resume.matchAnalysis,
        });

    } catch (error) {
        console.error("AI Analysis Error:", error);

        res.status(500).json({
            success: false,
            message: "AI resume analysis failed",
        });
    }
};