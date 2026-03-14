import { Link } from "react-router-dom";
const JobCard = ({ job, score }) => {
    const getMatchColor = (score) => {
        if (score >= 80) return "bg-emerald-100 text-emerald-700";
        if (score >= 50) return "bg-yellow-100 text-yellow-700";
        return "bg-red-100 text-red-700";
    };
    return (

        <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition duration-200">

            <div>

                <Link to={`/jobs/${job._id}`} state={{ matchScore: score }}>
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">
                        {job.title}
                    </h2>
                </Link>

                <p className="text-gray-600 text-sm">
                    {job.company}
                </p>

                <p className="text-amber-950 text-sm mt-1">
                    {job.location}
                </p>

            </div>

            {score !== undefined && (

                <div className="mt-5 flex items-center justify-between">

                    <div className="text-xs text-gray-500 font-medium">
                        Resume Match
                    </div>

                    <div className={`${getMatchColor(score)} font-semibold px-3 py-1 rounded-full text-sm shadow-sm`}>
                        {score.toFixed(1)}%
                    </div>

                </div>

            )}

        </div>

    );
};

export default JobCard;