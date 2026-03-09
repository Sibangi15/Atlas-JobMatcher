import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const SkillGapChart = ({ resume }) => {

    const data = resume.matchAnalysis.missingSkills.map(skill => ({
        skill,
        value: 1
    }));

    return (

        <div className="bg-white p-5 rounded-xl shadow-sm border border-amber-100">

            <h2 className="font-semibold mb-4 text-amber-600">
                Skill Gaps
            </h2>

            <ResponsiveContainer width="100%" height={230}>
                <BarChart data={data}>
                    <XAxis dataKey="skill" />
                    <Tooltip />
                    <Bar dataKey="value" fill="#F59E0B" radius={6} />
                </BarChart>
            </ResponsiveContainer>

        </div>

    );
};

export default SkillGapChart;