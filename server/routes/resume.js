import express from 'express';
const router = express.Router();
import fetchuser from '../middleware/fetchuser.js';
import upload from '../middleware/uploadResume.js';
import { uploadResume } from '../controllers/resume.js';

router.post('/upload', fetchuser, upload.single("resume"), uploadResume);

export default router;