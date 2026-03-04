import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/login", form);

            const token = res.data.token;

            localStorage.setItem("token", token);

            setUser({ email: form.email });

            navigate("/dashboard");
        } catch (err) {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-2">
            {/* Left Section */}
            <div className="bg-black text-white flex flex-col justify-center items-center p-10">
                <h1 className="text-4xl font-bold mb-4">Atlas</h1>
                <p className="text-gray-400 text-center">
                    Find your dream job with AI-powered resume matching.
                </p>
            </div>

            {/* Right Section */}
            <div className="flex items-center justify-center bg-gray-50">
                <div className="bg-white p-10 rounded-2xl shadow-xl w-96">
                    <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black"
                            onChange={handleChange}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black"
                            onChange={handleChange}
                        />

                        <button className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition">
                            Login
                        </button>
                    </form>
                    <p className="mt-4 text-sm text-center"> Don’t have an account?{" "} <Link to="/register" className="text-blue-600"> Register </Link> </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
