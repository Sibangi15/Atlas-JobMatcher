import { validationResult } from 'express-validator';
import Resume from '../models/Resume.js';
import User from '../models/User.js';

// import { createRequire } from "module";
// const require = createRequire(import.meta.url);
// const pdfParse = require("pdf-parse");
import * as pdfParse from "pdf-parse";

import fs from "fs";

export const uploadResume = async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //check if the email already exists
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        //Read PDF file
        const dataBuffer = fs.readFileSync(req.file.path);

        //Extract text
        const extractedText = async (buffer) => {
            const pdfData = await pdfParse.default(buffer);
            return pdfData.text;
        };
        // const pdfData = await pdfParse(dataBuffer);
        // const extractedText = pdfData.text;

        //Save resume in db
        const resume = await Resume.create({
            user: req.user.id,
            filename: req.file.filename,
            filepath: req.file.path,
            filetype: req.file.mimetype.includes("pdf") ? "pdf" : "docx",
            text: extractedText,
        });
        await User.findByIdAndUpdate(req.user.id, {
            resume: resume._id,
        });
        //const authtoken = jwt.sign(data, JWT_SECRET);
        //res.json({ success, authtoken })
        res.status(201).json({
            success: true,
            message: "Resume uploaded successfully",
            resume,
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
}