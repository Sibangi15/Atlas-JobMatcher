import express from 'express';
const router = express.Router();

import fetchuser from '../middleware/fetchuser.js';
import upload from '../middleware/uploadResume.js';
import { uploadResume, getResume, getUserResumes, analyzeResumeWithJob } from '../controllers/resume.js';
import { embeddingMatch } from '../controllers/embedding.js';
import { hybridMatch } from '../controllers/hybridScrore.js';

router.post('/upload', fetchuser, upload.single("resume"), uploadResume);
router.get('/my-resumes', fetchuser, getUserResumes);
router.get('/:id', getResume);
router.post("/embedding-match/:id", embeddingMatch);
router.post("/hybrid-score/:id", hybridMatch);
router.post("/analyze/:id", analyzeResumeWithJob); //important

export default router;