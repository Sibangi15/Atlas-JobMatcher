const ScoreMeter = ({ score }) => {

    const radius = 70;
    const stroke = 10;
    const normalizedRadius = radius - stroke * 0.5;
    const circumference = normalizedRadius * 2 * Math.PI;

    const strokeDashoffset =
        circumference - (score / 100) * circumference;

    const getColor = () => {
        if (score >= 75) return "text-green-600";
        if (score >= 50) return "text-yellow-500";
        return "text-red-400";
    };

    return (
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8 flex flex-col items-center">

            <h2 className="text-lg font-semibold text-gray-700 mb-6">
                ATS Compatibility Score
            </h2>

            <div className="relative flex items-center justify-center">

                <svg
                    height={radius * 2}
                    width={radius * 2}
                    className="transform -rotate-90"
                >
                    {/* Background Circle */}
                    <circle
                        stroke="#E5E7EB"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />

                    {/* Progress Circle */}
                    <circle
                        stroke="currentColor"
                        fill="transparent"
                        strokeWidth={stroke}
                        strokeDasharray={circumference + " " + circumference}
                        style={{ strokeDashoffset }}
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        className={`transition-all duration-700 ${getColor()}`}
                    />
                </svg>

                {/* Score Text */}
                <div className="absolute text-3xl font-bold text-gray-800">
                    {score}%
                </div>

            </div>

            <p className="text-sm text-gray-500 mt-4 text-center">
                Based on semantic similarity and AI analysis
            </p>

        </div>
    );
};


export default ScoreMeter;