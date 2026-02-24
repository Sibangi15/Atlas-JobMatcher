import axios from "axios";
import Job from "../models/Job.js";
import striptags from "striptags";
import { SKILL_KEYWORDS } from "../utils/skillList.js";

function extractSkills(description) {
    const foundSkills = [];
    for (const skill of SKILL_KEYWORDS) {
        const regex = new RegExp(`\\b${skill}\\b`, "i");
        if (regex.test(description)) {
            foundSkills.push(skill);
        }
    }
    return foundSkills;
}

export const fetchJobsFromAPI = async () => {
    try {
        const response = await axios.get(
            "https://remotive.com/api/remote-jobs",
            {
                params: { search: "developer" }
            }
        );

        const jobs = response.data.jobs;

        for (const job of jobs) {
            const skills = extractSkills(job.description);
            await Job.updateOne(
                { title: job.title, company: job.company_name },
                {
                    title: job.title,
                    description: striptags(job.description),
                    company: job.company_name,
                    skills: skills.length ? skills : job.tags,
                    location: job.candidate_required_location || "Remote",
                    source: "Remotive",
                },
                { upsert: true }
            );
        }
    } catch (error) {
        console.error("ERROR:", error.response?.data || error.message);
    }
};