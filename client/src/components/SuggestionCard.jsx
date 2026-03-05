const SuggestionCard = ({ suggestions }) => {
    if (!suggestions) return null;

    return (
        <div className="bg-white p-8 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-6">
                Improvement Suggestions
            </h2>

            <div className="mb-4">
                <h3 className="font-semibold text-red-600">
                    Missing Skills
                </h3>
                <ul className="list-disc list-inside text-gray-700">
                    {suggestions.missingSkills?.map((skill, i) => (
                        <li key={i}>{skill}</li>
                    ))}
                </ul>
            </div>

            <div className="mb-4">
                <h3 className="font-semibold text-blue-600">
                    Industry Keywords
                </h3>
                <ul className="list-disc list-inside text-gray-700">
                    {suggestions.industryKeywords?.map((kw, i) => (
                        <li key={i}>{kw}</li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="font-semibold text-green-600">
                    ATS Improvements
                </h3>
                <ul className="list-disc list-inside text-gray-700">
                    {suggestions.atsImprovements?.map((tip, i) => (
                        <li key={i}>{tip}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SuggestionCard;