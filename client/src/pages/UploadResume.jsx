import { useState } from "react";
import API from "../api/axios";
import ResumePreview from "../components/ResumePreview";

const UploadResume = () => {
    const [file, setFile] = useState(null);
    const [parsedData, setParsedData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setFile(e.dataTransfer.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return alert("Please select a file");

        const formData = new FormData();
        formData.append("resume", file);

        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const res = await API.post("/resume/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });
            localStorage.setItem("resumeId", res.data.resume._id);
            setParsedData(res.data.resume.parsedData);
        } catch (error) {
            console.error(error);
            alert("Upload failed");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-200 flex flex-col items-center px-6 py-12">

            <div className="w-full max-w-2xl">

                <h1 className="text-4xl font-semibold bg-linear-to-r from-orange-600 to-pink-400 bg-clip-text text-transparent">
                    Upload Your Resume
                </h1>
                <p className="text-gray-500 text-center mb-10">
                    Let Atlas intelligently analyze your profile.
                </p>

                {/* Drag & Drop Box */}
                <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="relative border-2 border-dashed border-gray-300 
                   bg-white rounded-2xl p-12 text-center 
                   transition-all duration-300 
                   hover:border-black hover:shadow-lg"
                >
                    {file ? (
                        <div className="space-y-2">
                            <p className="text-green-600 font-medium">{file.name}</p>
                            <p className="text-sm text-gray-400">Ready to upload</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <p className="text-gray-600 font-medium">
                                Drag & drop your resume here
                            </p>
                            <p className="text-sm text-gray-400">
                                PDF or DOCX • Max 5MB
                            </p>
                        </div>
                    )}
                </div>

                {/* Upload Button */}
                <button
                    onClick={handleUpload}
                    className="mt-8 w-full bg-black text-white py-3 rounded-xl 
                   font-medium tracking-wide
                   hover:bg-gray-800 hover:shadow-lg 
                   transition-all duration-300"
                >
                    {loading ? "Analyzing Resume..." : "Upload & Analyze"}
                </button>

                {/* Preview */}
                {parsedData && <ResumePreview data={parsedData} />}

            </div>
        </div>
    );
};

export default UploadResume;