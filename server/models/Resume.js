import mongoose from 'mongoose';
const { Schema } = mongoose;

const ResumeSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    filepath: {
        type: String,
        required: true,
    },
    filetype: {
        type: String,
        enum: ["pdf", "docx"],
        required: true,
    },
    parsedData: {
        name: String,
        email: String,
        phone: String,
        skills: [String],
        education: [String],
        experience: [String],
        summary: String,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
    suggestions: {
        missingSkills: [String],
        industryKeywords: [String],
        atsImprovements: [String],
    },
    matchAnalysis: {
        jobDescription: String,
        score: Number,
        missingSkills: [String],
        improvementSuggestions: [String],
        atsIssues: [String],
        analyzedAt: Date,
    },
    aiLastUpdated: {
        type: Date,
    },
}, { timestamps: true });

export default mongoose.model('Resume', ResumeSchema);