import mongoose from 'mongoose';
const { Schema } = mongoose;

const JobSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        default: []
    },
    location: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Job', JobSchema);