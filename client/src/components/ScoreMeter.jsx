const ScoreMeter = ({ score }) => {
    const getColor = () => {
        if (score > 80) return "text-green-600";
        if (score > 60) return "text-yellow-500";
        return "text-red-500";
    };

    return (
        <div className="bg-white p-8 rounded-2xl shadow text-center">
            <h2 className="text-lg font-semibold mb-4">
                ATS Score
            </h2>

            <div className={`text-6xl font-bold ${getColor()}`}>
                {score}%
            </div>

            <div className="mt-4 bg-gray-200 rounded-full h-3">
                <div
                    className="bg-blue-600 h-3 rounded-full"
                    style={{ width: `${score}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ScoreMeter;