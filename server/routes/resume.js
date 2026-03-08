import express from 'express';
const router = express.Router();

import fetchuser from '../middleware/fetchuser.js';
import upload from '../middleware/uploadResume.js';
import { uploadResume, getResume, suggestKeywords } from '../controllers/resume.js';
import { matchResumeWithJobDesc } from '../controllers/matchDesc.js';
import { embeddingMatch } from '../controllers/embedding.js';
import { hybridMatch } from '../controllers/hybridScrore.js';

router.post('/upload', fetchuser, upload.single("resume"), uploadResume);
router.get('/getresume', fetchuser, getResume);
router.post("/suggest-keywords/:id", suggestKeywords);
router.post("/gemini-match/:id", matchResumeWithJobDesc);
router.post("/embedding-match/:id", embeddingMatch);
router.post("/hybrid-score/:id", hybridMatch);

export default router;