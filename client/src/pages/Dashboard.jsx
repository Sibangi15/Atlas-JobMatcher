const Dashboard = () => {
    return (
        <div>
            <h1 className="text-3xl font-semibold text-gray-800 mb-8">
                Dashboard Overview
            </h1>

            <div className="grid gap-6 md:grid-cols-3">

                <DashboardCard
                    title="Resume Status"
                    value="Uploaded"
                    accent="bg-green-100 text-green-700"
                />

                <DashboardCard
                    title="Job Matches"
                    value="12"
                    accent="bg-blue-100 text-blue-700"
                />

                <DashboardCard
                    title="ATS Score"
                    value="82%"
                    accent="bg-purple-100 text-purple-700"
                />

            </div>
        </div>
    );
};

const DashboardCard = ({ title, value, accent }) => (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all">
        <p className="text-sm text-gray-500">{title}</p>

        <div className="mt-4 flex items-center justify-between">
            <p className="text-2xl font-semibold text-gray-800">
                {value}
            </p>

            <span className={`text-xs px-3 py-1 rounded-full ${accent}`}>
                Updated
            </span>
        </div>
    </div>
);

export default Dashboard;