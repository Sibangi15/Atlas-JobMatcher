import { useState, useEffect } from "react";
import API from "../api/axios";
import ScoreMeter from "../components/ScoreMeter";
import SuggestionCard from "../components/SuggestionCard";
import HybridBreakdown from "../components/HybridBreakdown";
import toast from "react-hot-toast";

const ResumeScore = () => {
    const [jobDesc, setJobDesc] = useState("");
    const [score, setScore] = useState(null);
    const [breakdown, setBreakdown] = useState(null);
    const [suggestions, setSuggestions] = useState(null);
    const [loading, setLoading] = useState(false);

    const resumeId = localStorage.getItem("resumeId");

    useEffect(() => {
        if (!resumeId) return;
        const fetchResume = async () => {
            try {
                const res = await API.get(`/resume/${resumeId}`);
                const resume = res.data;

                if (resume.finalHybridScore) {
                    setScore(resume.finalHybridScore);
                }

                if (resume.hybridBreakdown) {
                    setBreakdown(resume.hybridBreakdown);
                }

                if (resume.matchAnalysis) {
                    setSuggestions(resume.matchAnalysis);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchResume();
    }, [resumeId]);

    const analyzeResume = async () => {
        if (!resumeId) {
            toast.error("Upload a resume first");
            return;
        }
        if (!jobDesc) {
            toast.error("Please enter job description");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                jobDescription: jobDesc
            };

            const res = await API.post(`/resume/analyze/${resumeId}`, payload);

            setScore(res.data.data.finalHybridScore);
            setBreakdown(res.data.data.breakdown);
            setSuggestions(res.data.data.matchAnalysis);

        } catch (error) {
            console.error(error);
            alert("Analysis failed");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="w-full p-4 md:p-6">
            <div className="w-full max-w-6xl mx-auto space-y-8 px-1 sm:px-0">

                {/* Header */}
                <div>
                    <h1 className="text-3xl font-semibold bg-linear-to-r from-emerald-600 to-cyan-500 bg-clip-text text-transparent">
                        Resume vs Job Analysis
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Compare your resume against a job description using AI.
                    </p>
                </div>

                {/* Job Description Input */}
                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">

                    <h2 className="font-semibold text-gray-800 mb-4">
                        Job Description
                    </h2>

                    <textarea
                        value={jobDesc}
                        onChange={(e) => setJobDesc(e.target.value)}
                        placeholder="Paste the job description here..."
                        className="w-full h-44 p-4 border border-gray-200 rounded-xl 
        focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                    />

                    <div className="flex justify-end mt-4">
                        <button
                            onClick={analyzeResume} disabled={loading}
                            className="bg-linear-to-r from-emerald-600 to-cyan-500 hover:opacity-90 text-white px-5 py-2 rounded-lg shadow-md transition cursor-pointer"
                        >
                            {loading ? "Analyzing..." : "Analyze Resume"}
                        </button>
                    </div>

                </div>

                {/* Results */}
                {/* Results */}
                {(score !== null || breakdown || suggestions) && (
                    <div className="grid md:grid-cols-2 gap-6 w-full">

                        {score !== null && (
                            <div className="min-w-0">
                                <ScoreMeter score={score} />
                            </div>
                        )}

                        {breakdown && (
                            <div className="min-w-0">
                                <HybridBreakdown breakdown={breakdown} />
                            </div>
                        )}

                        {suggestions && (
                            <div className="md:col-span-2 min-w-0">
                                <SuggestionCard suggestions={suggestions} />
                            </div>
                        )}

                    </div>
                )}

            </div>
        </div>
    );
};

export default ResumeScore;