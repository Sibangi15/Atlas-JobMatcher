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
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('resume', ResumeSchema);