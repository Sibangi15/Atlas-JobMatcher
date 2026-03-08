// import { useEffect, useState } from "react";
// import API from "../api/axios";
// import JobCard from "../components/JobCard";

// const Jobs = () => {

//     const [jobs, setJobs] = useState([]);
//     const [matches, setMatches] = useState({});
//     const [location, setLocation] = useState("");
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         fetchJobs();
//     }, []);

//     const fetchJobs = async (loc = "") => {
//         try {

//             const res = await API.get("/job", {
//                 params: { location: loc }
//             });

//             setJobs(res.data);

//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const scrapeJobs = async () => {
//         setLoading(true);
//         try {
//             await API.get("/job/scrape-test");
//             await fetchJobs();

//         } catch (err) {
//             console.error(err);
//         }
//         setLoading(false);
//     };

//     const matchAllJobs = async () => {
//         try {
//             const res = await API.get("/job/match-all");

//             const matchMap = {};
//             res.data.forEach((m) => {
//                 matchMap[m.jobId] = m.score;
//             });
//             setMatches(matchMap);

//         } catch (err) {
//             console.error(err);
//         }
//     };

//     return (

//         <div>

//             <div className="flex justify-between items-center mb-6">

//                 <h1 className="text-2xl font-bold">
//                     Job Feed
//                 </h1>

//                 <button
//                     onClick={scrapeJobs}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-lg"
//                 >
//                     {loading ? "Scraping..." : "Scrape Latest Jobs"}
//                 </button>

//             </div>
//             <button
//                 onClick={matchAllJobs}
//                 className="bg-green-600 text-white px-4 py-2 rounded-lg"
//             >
//                 Check Resume Match
//             </button>

//             <div className="flex gap-3 mb-6">

//                 <input
//                     type="text"
//                     placeholder="Filter by location"
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                     className="border p-2 rounded-lg"
//                 />

//                 <button
//                     onClick={() => fetchJobs(location)}
//                     className="bg-black text-white px-4 py-2 rounded-lg"
//                 >
//                     Apply
//                 </button>

//             </div>

//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

//                 {jobs.map((job) => (
//                     <JobCard
//                         key={job._id}
//                         job={job}
//                         score={matches[job._id]}
//                     />
//                 ))}

//             </div>


//         </div>

//     );
// };

// export default Jobs;

import { useEffect, useState } from "react";
import API from "../api/axios";
import JobCard from "../components/JobCard";

const Jobs = () => {

    const [jobs, setJobs] = useState([]);
    const [matches, setMatches] = useState({});
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async (loc = "") => {
        try {

            const res = await API.get("/job", {
                params: { location: loc }
            });

            setJobs(res.data);

        } catch (err) {
            console.error(err);
        }
    };

    const scrapeJobs = async () => {
        setLoading(true);
        try {

            await API.get("/job/scrape-test");
            await fetchJobs();

        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const matchAllJobs = async () => {
        try {

            const res = await API.get("/job/match-all");

            const matchMap = {};
            res.data.forEach((m) => {
                matchMap[m.jobId] = m.score;
            });

            setMatches(matchMap);

            // SORT JOBS BY SCORE (DESCENDING)
            const sortedJobs = [...jobs].sort((a, b) => {
                const scoreA = matchMap[a._id] || 0;
                const scoreB = matchMap[b._id] || 0;
                return scoreB - scoreA;
            });

            setJobs(sortedJobs);

        } catch (err) {
            console.error(err);
        }
    };

    return (

        <div className="max-w-7xl mx-auto bg-slate-50 min-h-screen p-6 rounded-2xl">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">

                <h1 className="text-3xl font-bold bg-linear-to-r from-slate-800 via-indigo-600 to-blue-500 bg-clip-text text-transparent">
                    Job Opportunities
                </h1>

                <div className="flex gap-3">

                    <button
                        onClick={scrapeJobs}
                        className="bg-linear-to-r from-indigo-600 to-blue-500 hover:opacity-90 text-white px-5 py-2 rounded-lg shadow-md transition"
                    >
                        {loading ? "Scraping..." : "Scrape Latest Jobs"}
                    </button>

                    <button
                        onClick={matchAllJobs}
                        className="bg-linear-to-r from-emerald-600 to-green-500 hover:opacity-90 text-white px-5 py-2 rounded-lg shadow-md transition"
                    >
                        Check Resume Match
                    </button>

                </div>

            </div>


            {/* Filter Bar */}

            <div className="bg-linear-to-r from-indigo-50 to-blue-50 border border-indigo-100 rounded-xl p-4 flex flex-col md:flex-row gap-3 mb-8 shadow-sm">

                <input
                    type="text"
                    placeholder="Filter by location (e.g. Bangalore, Remote)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex-1 border border-gray-200 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />

                <button
                    onClick={() => fetchJobs(location)}
                    className="bg-linear-to-r from-gray-800 to-gray-700 text-white px-5 py-2 rounded-lg shadow-md"
                >
                    Apply Filter
                </button>

            </div>


            {/* Jobs Grid */}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {jobs.map((job) => (
                    <JobCard
                        key={job._id}
                        job={job}
                        score={matches[job._id]}
                    />
                ))}

            </div>

        </div>
    );
};

export default Jobs;