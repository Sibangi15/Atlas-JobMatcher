import axios from "axios";
import Job from "../models/Job.js";
import striptags from "striptags";

export const fetchJobsFromAPI = async () => {
    const options = {
        method: "GET",
        url: "https://www.arbeitnow.com/api/job-board-api",
        params: { query: "developer jobs in India", page: "1" },
        headers: {
            //  "X-RapidAPI-Key": process.env.RAPID_API_KEY,
            'Content-Type': 'application/json'
        },
    };

    const response = await axios.request(options);

    const jobs = response.data.data;

    for (const job of jobs) {
        await Job.updateOne(
            { title: job.job_title, company: job.employer_name },
            {
                title: job.title,
                description: striptags(job.description),
                company: job.company_name,
                skills: job.tags || [],
                location: job.location,
                source: "Arbeitnow",
            },
            { upsert: true }
        );
    }

    console.log("API jobs fetched");
};