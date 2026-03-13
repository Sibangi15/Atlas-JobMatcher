const SuggestionCard = ({ suggestions }) => {
    if (!suggestions) return null;
    return (
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-8">

            <h2 className="text-xl font-bold text-amber-950 mb-8">
                Resume Improvement Suggestions
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mb-8">

                {/* Matching Skills */}
                <div className="border border-green-100 bg-green-50/40 rounded-xl p-5">
                    <h3 className="font-semibold text-green-600 mb-4">
                        Matching Skills
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {suggestions.matchingSkills?.map((skill, i) => (
                            <span
                                key={i}
                                className="bg-white text-green-700 border border-green-200 
              px-3 py-1 rounded-full text-sm"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Missing Skills */}
                <div className="border border-red-100 bg-red-50/40 rounded-xl p-5">
                    <h3 className="font-semibold text-red-600 mb-4">
                        Missing Skills
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {suggestions.missingSkills?.map((skill, i) => (
                            <span
                                key={i}
                                className="bg-white text-red-700 border border-red-200 
              px-3 py-1 rounded-full text-sm"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Industry Keywords */}
                <div className="border border-blue-100 bg-blue-50/40 rounded-xl p-5">
                    <h3 className="font-semibold text-blue-600 mb-4">
                        Industry Keywords
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {suggestions.industryKeywords?.map((kw, i) => (
                            <span
                                key={i}
                                className="bg-white text-blue-700 border border-blue-200 
              px-3 py-1 rounded-full text-sm"
                            >
                                {kw}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-8">

                <div className="border border-lime-100 bg-lime-50/40 rounded-xl p-5">
                    <h3 className="font-semibold text-lime-600 mb-4">
                        Improvement Suggestions
                    </h3>

                    <ul className="space-y-3 text-gray-700">
                        {suggestions.improvementSuggestions?.map((tip, i) => (
                            <li key={i} className="flex gap-3 items-start">
                                <span className="text-lime-500 font-bold">✓</span>
                                <span>{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ATS Improvements */}
                <div className="border border-orange-100 bg-orange-50/40 rounded-xl p-5">
                    <h3 className="font-semibold text-orange-600 mb-4">
                        ATS Issues
                    </h3>

                    <ul className="space-y-3 text-gray-700">
                        {suggestions.atsIssues?.map((tip, i) => (
                            <li key={i} className="flex gap-3 items-start">
                                <span className="text-red-500 font-bold">•</span>
                                <span>{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default SuggestionCard;