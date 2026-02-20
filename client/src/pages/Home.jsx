import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
                Optimize Your Resume with <span className="text-blue-600">AI</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Get instant feedback, score your resume against job descriptions, and find the perfect role for you using our specific matching algorithm.
            </p>
            <div className="space-x-4">
                <Link to="/login" className="px-8 py-3 bg-blue-600 text-white text-lg rounded-lg shadow hover:bg-blue-700 transition">
                    Analyze Resume
                </Link>
                <Link to="/jobs" className="px-8 py-3 bg-white text-blue-600 border border-blue-600 text-lg rounded-lg shadow hover:bg-gray-50 transition">
                    Browse Jobs
                </Link>
            </div>
        </div>
    );
}

export default Home;