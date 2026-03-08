import { useState } from "react";
import API from "../api/axios";
import ScoreMeter from "../components/ScoreMeter";
import SuggestionCard from "../components/SuggestionCard";
import HybridBreakdown from "../components/HybridBreakdown";

const ResumeScore = () => {
    const [jobDesc, setJobDesc] = useState("");
    const [score, setScore] = useState(null);
    const [breakdown, setBreakdown] = useState(null);
    const [suggestions, setSuggestions] = useState(null);
    const [loading, setLoading] = useState(false);

    const resumeId = localStorage.getItem("resumeId");

    const analyzeResume = async () => {
        if (!jobDesc) return alert("Please enter job description");

        try {
            setLoading(true);

            const payload = {
                jobDescription: jobDesc
            };

            // 1 Embedding Match
            await API.post(`/resume/embedding-match/${resumeId}`, payload);

            // 2 Gemini Match
            await API.post(`/resume/gemini-match/${resumeId}`, payload);

            // 3 Hybrid Score
            const hybridRes = await API.post(`/resume/hybrid-score/${resumeId}`, payload);

            setScore(hybridRes.data.data.finalHybridScore);
            setBreakdown(hybridRes.data.data.breakdown);

            // 4 Keyword Suggestions
            const suggestionRes = await API.post(`/resume/suggest-keywords/${resumeId}`);
            setSuggestions(suggestionRes.data.data);

        } catch (error) {
            console.error(error);
            alert("Analysis failed");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="max-w-6xl mx-auto space-y-10">

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
                        onClick={analyzeResume}
                        className="bg-black text-white px-6 py-2.5 rounded-xl 
          hover:bg-gray-800 transition shadow-sm"
                    >
                        {loading ? "Analyzing..." : "Analyze Resume"}
                    </button>
                </div>

            </div>

            {/* Results */}
            {(score !== null || breakdown || suggestions) && (
                <div className="grid lg:grid-cols-2 gap-6">

                    {score !== null && <ScoreMeter score={score} />}
                    {breakdown && <HybridBreakdown breakdown={breakdown} />}
                    {suggestions && (
                        <div className="lg:col-span-3">
                            <SuggestionCard suggestions={suggestions} />
                        </div>
                    )}

                </div>
            )}

        </div>
    );
};

export default ResumeScore;