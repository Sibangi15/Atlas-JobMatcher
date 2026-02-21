import express from 'express';
const router = express.Router();
import fetchuser from '../middleware/fetchuser.js';
import upload from '../middleware/uploadResume.js';
import { uploadResume, getResume } from '../controllers/resume.js';

router.post('/upload', fetchuser, upload.single("resume"), uploadResume);
router.get('/getresume', fetchuser, getResume);

export default router;