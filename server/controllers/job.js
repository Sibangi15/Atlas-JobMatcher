import Job from '../models/Job.js'
import { validationResult } from "express-validator";
import { fetchJobsFromAPI } from "../services/jobScrapper.js";

export const addJob = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const job = await Job.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            company: req.body.company,
            skills: req.body.skills,
            location: req.body.location,
            source: req.body.source,
        })
        res.json({
            success: true,
            job
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
}

export const scrapeTest = async (req, res) => {
    try {
        const result = await fetchJobsFromAPI();
        res.json({
            message: "Scraping complete",
            fetched: result.totalFetched,
            inserted: result.inserted
        });
    } catch (error) {
        res.status(500).json({
            message: "Scraping failed"
        });

    }
};


export const getJobs = async (req, res) => {
    try {
        const { location } = req.query;
        let query = {};
        if (location && location.trim() !== "") {
            query.location = { $regex: location, $options: "i" };
        }
        const jobs = await Job.find(query).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        console.error("GET JOBS ERROR:", error);
        res.status(500).json({ message: "Server Error" });
    }
};