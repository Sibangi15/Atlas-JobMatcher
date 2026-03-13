import { FileText, AlertTriangle, Target, Award } from "lucide-react";

const StatsCards = ({ resume }) => {

    const stats = [
        {
            title: "Resume Skills",
            value: resume.parsedData.skills.length,
            icon: <FileText size={20} />
        },
        {
            title: "Missing Skills",
            value: resume.matchAnalysis.missingSkills.length,
            icon: <AlertTriangle size={20} />
        },
        {
            title: "Match Score",
            value: resume.finalHybridScore + "%",
            icon: <Target size={20} />
        },
        {
            title: "ATS Issues",
            value: resume.matchAnalysis.atsIssues.length,
            icon: <Award size={20} />
        }
    ];

    return (

        <div className="grid md:grid-cols-4 gap-4">

            {stats.map((s, i) => (

                <div key={i} className="bg-linear-to-br from-white to-slate-50 p-4 rounded-xl shadow-sm border hover:shadow-md transition">
                    <div className="flex justify-between items-center">

                        <div>
                            <p className="text-xs text-gray-500">
                                {s.title}
                            </p>
                            <h2 className="text-xl font-bold text-gray-800">
                                {s.value}
                            </h2>
                        </div>

                        <div className="text-indigo-500 text-xl">
                            {s.icon}
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;