import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const ScoreBreakdownChart = ({ resume }) => {

    const data = [
        {
            name: "Gemini",
            score: resume.hybridBreakdown.geminiScore
        },
        {
            name: "Embedding",
            score: resume.hybridBreakdown.embeddingScore
        },
        {
            name: "Final",
            score: resume.finalHybridScore
        }
    ];

    return (
        <div className="bg-white p-5 rounded-xl shadow-sm border border-indigo-200">
            <h2 className="font-semibold mb-4 text-indigo-600">
                Score Breakdown
            </h2>
            <ResponsiveContainer width="100%" height={230}>
                <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#6366F1" radius={6} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ScoreBreakdownChart;