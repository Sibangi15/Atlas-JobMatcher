import { useEffect, useState } from "react";
import API from "../api/axios";
import ScoreMeter from "../components/ScoreMeter";
import SuggestionCard from "../components/SuggestionCard";

const ResumeScore = () => {
    const [score, setScore] = useState(null);
    const [suggestions, setSuggestions] = useState(null);
    const [resumeId, setResumeId] = useState(null);

    useEffect(() => {
        const fetchResume = async () => {
            const token = localStorage.getItem("token");

            const res = await API.get("/resume/getresume", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setResumeId(res.data._id);
        };

        fetchResume();
    }, []);

    const generateScore = async () => {
        const token = localStorage.getItem("token");

        const scoreRes = await API.post(
            `/resume/hybrid-score/${resumeId}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );

        setScore(scoreRes.data.score);

        const suggestionRes = await API.post(
            `/resume/suggest-keywords/${resumeId}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );

        setSuggestions(suggestionRes.data.data);
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">
                Resume Analysis
            </h1>

            {!score ? (
                <button
                    onClick={generateScore}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                    Generate Resume Score
                </button>
            ) : (
                <div className="grid md:grid-cols-2 gap-8">
                    <ScoreMeter score={score} />
                    <SuggestionCard suggestions={suggestions} />
                </div>
            )}
        </div>
    );
};

export default ResumeScore;