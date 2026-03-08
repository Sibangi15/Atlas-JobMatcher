// const JobCard = ({ job, score }) => {

//     return (

//         <div className="bg-white shadow rounded-xl p-5 flex flex-col justify-between">

//             <div>

//                 <h2 className="text-lg font-semibold">
//                     {job.title}
//                 </h2>

//                 <p className="text-gray-500 text-sm">
//                     {job.company}
//                 </p>

//                 <p className="text-gray-400 text-sm">
//                     {job.location}
//                 </p>

//             </div>

//             {score !== undefined && (
//                 <div className="mt-3 bg-green-100 text-green-700 px-3 py-1 rounded w-fit">
//                     {score.toFixed(1)}% Match
//                 </div>
//             )}


//         </div>

//     );
// };

// export default JobCard;

const JobCard = ({ job, score }) => {

    return (

        <div className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition duration-200">

            <div>

                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {job.title}
                </h2>

                <p className="text-gray-600 text-sm">
                    {job.company}
                </p>

                <p className="text-gray-400 text-sm mt-1">
                    {job.location}
                </p>

            </div>

            {score !== undefined && (

                <div className="mt-5 flex items-center justify-between">

                    <div className="text-xs text-gray-500 font-medium">
                        Resume Match
                    </div>

                    <div className="bg-linear-to-r from-emerald-500 to-green-400 text-white font-semibold px-3 py-1 rounded-full text-sm shadow-sm">
                        {score.toFixed(1)}%
                    </div>

                </div>

            )}

        </div>

    );
};

export default JobCard;