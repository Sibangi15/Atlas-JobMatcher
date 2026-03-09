const ATSIssues = ({ resume }) => {
    const issues = resume.matchAnalysis.atsIssues;

    return (

        <div className="bg-white p-5 rounded-xl shadow-sm border border-red-100">

            <h2 className="font-semibold mb-4 text-red-600">
                ATS Issues
            </h2>

            <ul className="space-y-2">

                {issues.length === 0 && (
                    <p className="text-green-600 text-sm">
                        ✓ No major ATS issues detected
                    </p>
                )}

                {issues.map((issue, i) => (
                    <li key={i} className="bg-red-50 border border-red-100 p-2 rounded text-sm">
                        {issue}
                    </li>
                ))}

            </ul>

        </div>

    );
};

export default ATSIssues;