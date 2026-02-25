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
        const resume = await Resume.findOne({ user: req.user.id });
        if (!resume) {
            return res.status(404).json({ message: "No resume found" });
        }
        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: "Error fetching resume" });
    }
};


export const suggestKeywords = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);

        if (!resume) {
            return res.status(404).json({ success: false, message: "Resume not found" });
        }

        // Build readable text from parsedData
        const parsed = resume.parsedData;

        const resumeText = `
Name: ${parsed.name || ""}
Email: ${parsed.email || ""}
Phone: ${parsed.phone || ""}

Summary:
${parsed.summary || ""}

Skills:
${parsed.skills?.join(", ") || ""}

Education:
${parsed.education?.join(", ") || ""}

Experience:
${parsed.experience?.join(", ") || ""}
`;

        const prompt = `
You are an ATS optimization expert.

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

        // Clean markdown wrapper
        const cleaned = aiRaw
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const parsedData = JSON.parse(cleaned);

        // Save to DB
        resume.suggestions = parsedData;
        resume.aiLastUpdated = new Date();

        await resume.save();

        res.json({
            success: true,
            data: parsedData,
        });

    } catch (error) {
        console.error("Keyword Engine Error:", error);

        res.status(500).json({
            success: false,
            message: "AI keyword suggestion failed",
        });
    }
};