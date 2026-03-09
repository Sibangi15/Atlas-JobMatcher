import { useEffect, useState } from "react";
import API from "../api/axios";

import StatsCards from "../components/analytics/StatsCards";
import ScoreBreakdownChart from "../components/analytics/ScoreBreakdownChart";
import SkillsChart from "../components/analytics/SkillsChart";
import SkillGapChart from "../components/analytics/SkillGapChart";
import ATSIssues from "../components/analytics/ATSIssues";
import SuggestionsPanel from "../components/analytics/SuggestionsPanel";

const Dashboard = () => {

    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResume = async () => {
            try {
                const res = await API.get("/resume/getresume");
                setResume(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchResume();
    }, []);

    if (loading) {
        return <div className="p-10">Loading dashboard...</div>;
    }
    if (!resume) {
        return <div className="p-10">No resume uploaded</div>;
    }

    return (

        <div className="p-6 bg-linear-to-br from-indigo-200 via-fuchsia-50 to-indigo-50 min-h-screen">

            <h1 className="text-4xl font-bold mb-6 bg-linear-to-r from-pink-700 via-fuchsia-500 to-indigo-500 bg-clip-text text-transparent">
                Dashboard
            </h1>

            <StatsCards resume={resume} />

            <div className="grid lg:grid-cols-2 gap-6 mt-6">
                <ScoreBreakdownChart resume={resume} />
                <SkillsChart resume={resume} />
                <SkillGapChart resume={resume} />
                <ATSIssues resume={resume} />
            </div>

            <SuggestionsPanel resume={resume} />

        </div>

    );
};

export default Dashboard;