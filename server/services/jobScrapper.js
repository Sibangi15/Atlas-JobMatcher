import axios from "axios";
import Job from "../models/Job.js";
import striptags from "striptags";
import { SKILL_KEYWORDS } from "../utils/skillList.js";

// extract skills from job description
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

        const searches = [
            "developer",
            "software",
            "engineer",
            "backend",
            "frontend",
            "full stack",
            "node",
            "react",
            "javascript"
        ];

        let totalFetched = 0;
        let inserted = 0;

        for (const keyword of searches) {

            const response = await axios.get(
                "https://remotive.com/api/remote-jobs",
                {
                    params: { search: keyword }
                }
            );

            const jobs = response.data.jobs;
            totalFetched += jobs.length;

            for (const job of jobs) {

                const skills = extractSkills(job.description);

                const result = await Job.updateOne(
                    { sourceId: job.id },
                    {
                        sourceId: job.id,
                        title: job.title,
                        description: striptags(job.description),
                        company: job.company_name,
                        skills: skills.length ? skills : job.tags,
                        location: job.candidate_required_location || "Remote",
                        source: "Remotive",
                        url: job.url
                    },
                    { upsert: true }
                );

                if (result.upsertedCount > 0) {
                    inserted++;
                }

            }
        }

        return {
            totalFetched,
            inserted
        };

    } catch (error) {

        console.error(
            "SCRAPER ERROR:",
            error.response?.data || error.message
        );

        throw error;
    }

};