import express from 'express';
const router = express.Router();
import { body } from 'express-validator';
import { addJob, scrapeTest, getJobs } from '../controllers/job.js'
import fetchuser from '../middleware/fetchuser.js';
import { matchResumeWithJob } from '../controllers/match.js';
import { protect } from '../middleware/fetchuser.js';
import { matchResumeWithAllJobs } from '../controllers/matchAll.js';

router.post('/add', fetchuser, [
    body('title', 'Enter a valid title').notEmpty(),
    body('description', 'Enter a valid description').notEmpty(),
    body('company', 'Enter a valid company').notEmpty(),
    body('skills', 'Enter the required skills').notEmpty(),
    body('location', 'Enter the required location').notEmpty(),
    body('source', 'Enter a valid source').notEmpty()
],
    addJob
)

router.get("/scrape-test", scrapeTest);
router.get("/", getJobs);
router.get("/match/:jobId", protect, matchResumeWithJob);
router.get("/match-all", protect, matchResumeWithAllJobs);

export default router