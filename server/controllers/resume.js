import Resume from '../models/Resume.js';
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import fs from "fs";
import { basicParse } from "../services/resumeParser.js";

export const uploadResume = async (req, res) => {
    try {
        console.log("UPLOAD CONTROLLER HIT");

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        console.log("User from token:", req.user);

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

        console.log("Parsed Data:", parsedData);

        const resume = await Resume.create({
            user: req.user.id,
            filename: req.file.filename,
            filepath: req.file.path,
            filetype: "pdf",
            parsedData: parsedData
        });

        console.log("Saved Resume:", resume);

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