import Job from '../models/Job.js'
import { validationResult } from "express-validator";

export const addJob = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //check if the email already exists
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