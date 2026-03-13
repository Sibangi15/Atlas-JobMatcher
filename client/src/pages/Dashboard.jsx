import { useEffect, useState } from "react";
import API from "../api/axios";

import StatsCards from "../components/analytics/StatsCards";
import ScoreBreakdownChart from "../components/analytics/ScoreBreakdownChart";
import SkillsChart from "../components/analytics/SkillsChart";
import SkillGapChart from "../components/analytics/SkillGapChart";
import ATSIssues from "../components/analytics/ATSIssues";
import SuggestionsPanel from "../components/analytics/SuggestionsPanel";

const Dashboard = () => {

    const [resumes, setResumes] = useState([]);
    const [selectedResume, setSelectedResume] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResumes = async () => {
            try {
                const res = await API.get("/resume/my-resumes");
                setResumes(res.data.data);
                if (res.data.data.length > 0) {
                    setSelectedResume(res.data.data[0]);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchResumes();
    }, []);

    if (loading) {
        return <div className="p-10">Loading dashboard...</div>;
    }
    if (resumes.length === 0) {
        return (
            <div className="p-10">
                <h2 className="text-xl font-semibold">No resume uploaded yet</h2>
                <p className="text-gray-500 mt-2">
                    Upload a resume to start analyzing job matches.
                </p>
            </div>
        );
    }

    return (

        <div className="p-8 bg-linear-to-br from-slate-50 via-purple-50 to-fuchsia-50 min-h-screen">

            <h1 className="text-4xl font-bold mb-8 bg-linear-to-r from-pink-700 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
                Dashboard
            </h1>

            <div className="bg-white/70 backdrop-blur-sm border border-purple-100 rounded-2xl p-5 mb-10 shadow-sm">

                <p className="text-sm font-medium text-gray-600 mb-4">
                    Select Resume
                </p>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {resumes.map((r) => (
                        <button
                            key={r._id}
                            onClick={() => setSelectedResume(r)}
                            className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-200 shadow-sm w-full
                ${selectedResume?._id === r._id
                                    ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-md scale-[1.02]"
                                    : "bg-white hover:bg-purple-50 hover:border-purple-200 text-gray-700"
                                }
                `}
                        >
                            <span className={`text-lg ${selectedResume?._id === r._id ? "text-white" : "text-purple-500"}`}>
                                📄
                            </span>

                            <span className="text-sm font-medium truncate">
                                {r.filename}
                            </span>

                        </button>
                    ))}

                </div>

            </div>

            {selectedResume?.hybridBreakdown ? (
                <>
                    <StatsCards resume={selectedResume} />

                    <div className="grid lg:grid-cols-2 gap-8 mt-8">
                        <ScoreBreakdownChart resume={selectedResume} />
                        <SkillsChart resume={selectedResume} />
                        <SkillGapChart resume={selectedResume} />
                        <ATSIssues resume={selectedResume} />
                    </div>

                    <div className="mt-10">
                        <SuggestionsPanel resume={selectedResume} />
                    </div>
                </>
            ) : (
                <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-gray-500">
                    This resume has not been analyzed yet.
                    Go to the Resume page and run an analysis to see analytics here.
                </div>
            )}

        </div>

    );
};

export default Dashboard;