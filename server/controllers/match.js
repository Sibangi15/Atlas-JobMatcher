import Resume from "../models/Resume.js";
import Job from "../models/Job.js";
import { calculateMatchScore } from "../services/match.js";

export const matchResumeWithJob = async (req, res) => {
    try {
        const { jobId } = req.params;

        const resume = await Resume.findOne({ user: req.user.id });
        const job = await Job.findById(jobId);

        if (!resume || !job) {
            return res.status(404).json({ message: "Resume or Job not found" });
        }

        const result = calculateMatchScore(
            resume.parsedData.skills,
            job.skills
        );

        res.json({
            jobId: job._id,
            jobTitle: job.title,
            matchScore: result.score,
            matchingSkills: result.matchingSkills,
            totalJobSkills: result.totalJobSkills,
            missingSkills: result.missingSkills,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};