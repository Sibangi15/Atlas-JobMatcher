import Resume from "../models/Resume.js";
import Job from "../models/Job.js";
import { calculateMatchScore } from "../services/match.js";

export const matchResumeWithAllJobs = async (req, res) => {
    if (!req.user || !req.user.id) {
        return res.status(400).json({
            success: false,
            message: "User not authenticated",
        });
    }
    const resume = await Resume.findOne({ user: req.user.id });
    const jobs = await Job.find();

    if (!resume) {
        return res.status(400).json({
            success: false,
            message: "Upload a resume first",
        });
    }

    const results = jobs.map(job => {
        const result = calculateMatchScore(
            resume.parsedData.skills,
            job.skills
        );

        return {
            jobId: job._id,
            title: job.title,
            company: job.company,
            score: result.score,
        };
    });

    // Sort highest score first
    results.sort((a, b) => b.score - a.score);

    res.json(results);
};