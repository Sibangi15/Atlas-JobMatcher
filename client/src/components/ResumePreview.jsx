const ResumePreview = ({ data }) => {
    return (
        <div className="mt-12 w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 border border-gray-100">

            <div className="border-b pb-4 mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Resume Overview</h2>
                <p className="text-sm text-gray-400">Extracted candidate information</p>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <p className="text-sm text-gray-400">Full Name</p>
                    <p className="font-medium text-gray-800">{data.name}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Email Address</p>
                    <p className="font-medium text-gray-800">{data.email}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-400">Experience Summary</p>
                    <p className="font-medium text-gray-800">{data.experience}</p>
                </div>
            </div>

            {/* Skills */}
            <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {data.skills?.map((skill, index) => (
                        <span key={index} className="px-3 py-1 text-sm bg-gray-100 rounded-full border border-gray-200">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResumePreview;