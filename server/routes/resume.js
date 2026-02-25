import express from 'express';
const router = express.Router();
import fetchuser from '../middleware/fetchuser.js';
import upload from '../middleware/uploadResume.js';
import { uploadResume, getResume, suggestKeywords } from '../controllers/resume.js';
import { matchResumeWithJobDesc } from '../controllers/matchDesc.js';

router.post('/upload', fetchuser, upload.single("resume"), uploadResume);
router.get('/getresume', fetchuser, getResume);
router.post("/suggest-keywords/:id", suggestKeywords);
router.post("/match/:id", matchResumeWithJobDesc);

export default router;