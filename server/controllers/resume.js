import Resume from '../models/Resume.js';
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import fs from "fs";
import { basicParse } from "../services/resumeParser.js";
import { runAnalysisPipeline } from '../services/analysisPipeline.js';

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

        const result = await runAnalysisPipeline(
            req.params.id,
            jobDescription
        );

        res.json({
            success: true,
            data: {
                finalHybridScore: result.finalHybridScore,
                breakdown: result.hybridBreakdown,
                matchAnalysis: result.matchAnalysis,
                similarityScore: result.similarityScore
            }
        });

    } catch (error) {
        console.error("Full Analysis Error:", error);

        res.status(500).json({
            success: false,
            message: "Full analysis failed",
        });
    }
};