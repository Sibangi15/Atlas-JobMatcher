import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

const JobDetail = () => {

    const { id } = useParams();

    const [job, setJob] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);

    const resumeId = localStorage.getItem("resumeId");

    useEffect(() => {
        fetchJob();
    }, [id]);

    const fetchJob = async () => {
        try {
            const res = await API.get(`/job/${id}`);
            setJob(res.data);

            // clear previous analysis when switching jobs
            setAnalysis(null);

        } catch (error) {
            console.error(error);
            toast.error("Failed to load job");
        }
    };

    const analyzeMatch = async () => {

        if (!resumeId) {
            toast.error("Upload a resume first");
            return;
        }

        try {

            setLoading(true);

            const res = await API.post(
                `/resume/analyze/${resumeId}`,
                { jobDescription: job.description }
            );

            // store only the analysis payload (NOT full response)
            setAnalysis(res.data.data);

        } catch (error) {

            console.error("Analyze Match Error:", error);
            toast.error("Failed to analyze match");

        } finally {
            setLoading(false);
        }
    };

    if (!job) return <p className="p-6">Loading...</p>;

    return (

        <div className="max-w-5xl mx-auto p-6 space-y-6 bg-gray-50 min-h-screen">

            {/* Job Header */}

            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 mb-6">

                <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                    {job.title}
                </h1>

                <p className="text-gray-500 mt-2">
                    {job.company} • {job.location}
                </p>

                <button
                    onClick={analyzeMatch}
                    disabled={loading}
                    className="mt-4 bg-linear-to-r from-indigo-600 via-purple-500 to-blue-500 text-white px-6 py-2.5 rounded-lg shadow-md hover:scale-[1.02] transition cursor-pointer"
                >
                    {loading ? "Analyzing..." : "Analyze Resume Match"}
                </button>

            </div>


            {/* AI Analysis */}

            {analysis ? (

                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 mb-6">

                    <h2 className="text-lg font-semibold text-amber-950 mb-4">
                        AI Resume Analysis
                    </h2>

                    {/* Skills + Keywords */}

                    <div className="grid md:grid-cols-3 gap-4 mb-4">

                        {/* Matching Skills */}

                        <div>
                            <h3 className="text-sm font-semibold text-emerald-600 mb-2">
                                Matching Skills
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {analysis.matchingSkills?.map(skill => (
                                    <span
                                        key={skill}
                                        className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs border border-emerald-200"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>


                        {/* Missing Skills */}

                        <div>
                            <h3 className="text-sm font-semibold text-red-600 mb-2">
                                Missing Skills
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {analysis.missingSkills?.map(skill => (
                                    <span
                                        key={skill}
                                        className="bg-red-50 text-red-700 px-2.5 py-1 rounded-full text-xs border border-red-200"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>


                        {/* Suggested Keywords */}

                        <div>
                            <h3 className="text-sm font-semibold text-blue-600 mb-2">
                                Suggested Keywords
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {analysis.industryKeywords?.map(skill => (
                                    <span
                                        key={skill}
                                        className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs border border-blue-200"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>


                    <div className="grid md:grid-cols-2 gap-4 mb-4">

                        {/* Improvement Tips */}

                        <div>
                            <h3 className="text-sm font-semibold text-cyan-600 mb-1">
                                Optimization Tip
                            </h3>

                            <ul className="space-y-1 text-gray-700 text-sm">
                                {analysis.improvementSuggestions?.map((tip, i) => (
                                    <li key={i} className="flex gap-2 items-start">
                                        <span className="text-cyan-500 font-bold">✓</span>
                                        <span>{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        {/* ATS Issues */}

                        <div>
                            <h3 className="text-sm font-semibold text-pink-600 mb-1">
                                ATS Issues
                            </h3>

                            <ul className="space-y-1 text-gray-700 text-sm">
                                {analysis.atsIssues?.map((tip, i) => (
                                    <li key={i} className="flex gap-2 items-start">
                                        <span className="text-pink-500 font-bold">•</span>
                                        <span>{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                </div>

            ) : (

                <div className="text-gray-500 text-sm">
                    Click "Analyze Resume Match" to see AI insights for this job.
                </div>

            )}


            {/* Job Description */}

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">

                <h3 className="text-lg font-semibold text-amber-950 mb-4">
                    Job Description
                </h3>

                <div className="border-l-4 border-indigo-400 pl-4 max-h-112.5 overflow-y-auto">

                    <p className="text-gray-700 whitespace-pre-line leading-relaxed text-sm">
                        {job.description}
                    </p>

                </div>

            </div>

        </div>

    );
};

export default JobDetail;