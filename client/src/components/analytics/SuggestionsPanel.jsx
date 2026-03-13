const SuggestionsPanel = ({ resume }) => {
    const suggestions = resume.matchAnalysis.improvementSuggestions;

    return (

        <div className="bg-white p-5 rounded-xl shadow-sm border border-blue-100 mt-6">

            <h2 className="font-semibold mb-4 text-blue-600">
                Improvement Suggestions
            </h2>

            <div className="grid md:grid-cols-2 gap-3">
                {suggestions.map((s, i) => (
                    <div key={i} className="bg-blue-100 border border-blue-100 p-3 rounded-lg text-sm">
                        {s}
                    </div>
                ))}
            </div>

        </div>

    );
};

export default SuggestionsPanel;