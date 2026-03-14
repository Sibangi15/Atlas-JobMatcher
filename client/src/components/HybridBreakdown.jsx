const HybridBreakdown = ({ breakdown }) => {
    if (!breakdown) return null;
    return (
        <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-4 sm:p-6">

            <h2 className="text-lg font-semibold text-gray-800 mb-6">
                Score Breakdown
            </h2>

            <div className="space-y-6">

                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Embedding Similarity</span>
                        <span className="font-medium">{breakdown.embeddingScore}%</span>
                    </div>

                    <div className="bg-gray-200 h-2 rounded-full">
                        <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${breakdown.embeddingScore}%` }}
                        />
                    </div>

                    <p className="text-xs text-gray-400 mt-1">
                        Weight: {breakdown.weightEmbedding}
                    </p>
                </div>

                <div>
                    <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Gemini AI Match</span>
                        <span className="font-medium">{breakdown.geminiScore}%</span>
                    </div>

                    <div className="bg-gray-200 h-2 rounded-full">
                        <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${breakdown.geminiScore}%` }}
                        />
                    </div>

                    <p className="text-xs text-gray-400 mt-1">
                        Weight: {breakdown.weightGemini}
                    </p>
                </div>

            </div>

        </div>
    );
};

export default HybridBreakdown;