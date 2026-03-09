import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const JobDetail = () => {

    const { id } = useParams();

    const [job, setJob] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);

    const resumeId = localStorage.getItem("resumeId");

    useEffect(() => {
        fetchJob();
    }, []);

    const fetchJob = async () => {
        const res = await API.get(`/job/${id}`);
        setJob(res.data);
    };

    const analyzeMatch = async () => {
        try {
            setLoading(true);
            if (!resumeId) {
                alert("Resume not found. Please upload resume first.");
                return;
            }
            const res = await API.post(
                `/resume/suggest-keywords/${resumeId}`,
                { jobDescription: job.description }
            );
            setAnalysis(res.data);
        } catch (error) {
            console.error("Analyze Match Error:", error);
            alert("Failed to analyze match");
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    if (!job) return <p>Loading...</p>;

    return (

        <div className="max-w-5xl mx-auto p-6">

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
                    className="mt-4 bg-linear-to-r from-indigo-600 to-blue-500 hover:opacity-90 text-white px-5 py-2 rounded-lg shadow cursor-pointer"
                >
                    {loading ? "Analyzing..." : "Analyze Resume Match"}
                </button>

            </div>


            {analysis && (

                <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5 mb-6">

                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        AI Resume Analysis
                    </h2>

                    {/* Skills + Keywords */}

                    <div className="grid md:grid-cols-2 gap-4 mb-4">

                        {/* Missing Skills */}

                        <div>
                            <h3 className="text-sm font-semibold text-red-600 mb-2">
                                Missing Skills
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {analysis.data.missingSkills?.map(skill => (
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
                                {analysis.data.industryKeywords?.map(skill => (
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

                    {/* ATS Improvements */}

                    <div>
                        <h3 className="text-sm font-semibold text-green-600 mb-1">
                            ATS Optimization Tip
                        </h3>

                        <ul className="space-y-1 text-gray-700 text-sm">
                            {analysis.data.atsImprovements?.map((tip, i) => (
                                <li key={i} className="flex gap-2 items-start">
                                    <span className="text-green-500 font-bold">•</span>
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

            )}


            {/* Job Description */}

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">

                <h3 className="text-lg font-semibold text-gray-800 mb-4">
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