import {
    PieChart,
    Pie,
    Tooltip,
    Cell,
    ResponsiveContainer
} from "recharts";

const SkillsChart = ({ resume }) => {

    const data = [
        {
            name: "Existing Skills",
            value: resume.parsedData.skills.length
        },
        {
            name: "Missing Skills",
            value: resume.suggestions.missingSkills.length
        }
    ];

    const colors = ["#18ed6a", "#ed1842"];
    return (

        <div className="bg-white p-5 rounded-xl shadow-sm border border-green-100">

            <h2 className="font-semibold mb-4 text-blue-600">
                Skill Distribution
            </h2>

            <ResponsiveContainer width="100%" height={230}>

                <PieChart>
                    <Pie data={data} dataKey="value" outerRadius={85} label >
                        {data.map((entry, index) => (
                            <Cell key={index} fill={colors[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>

            </ResponsiveContainer>

        </div>
    );
};

export default SkillsChart;