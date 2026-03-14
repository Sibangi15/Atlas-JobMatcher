// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import API from "../api/axios";
// import toast from "react-hot-toast";

// const Register = () => {
//     const navigate = useNavigate();

//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         password: "",
//     });

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             await API.post("/auth/register", form);
//             toast.success("Account created successfully");
//             navigate("/");
//         } catch (err) {
//             alert("Error registering user");
//         }
//     };

//     return (
//         <div className="h-screen grid md:grid-cols-2">

//             {/* Left Branding Section */}
//             <div className="bg-black text-white flex flex-col justify-center items-center p-10">
//                 <h1 className="text-4xl font-bold mb-4 tracking-wide bg-linear-to-r from-yellow-200 via-amber-300 to-yellow-400 bg-clip-text text-transparent">Atlas</h1>
//                 <p className="text-gray-400 text-center max-w-sm">
//                     Create your account and start matching your resume with the best jobs using AI.
//                 </p>
//             </div>

//             {/* Right Form Section */}
//             <div className="flex items-center justify-center bg-gray-50">
//                 <div className="bg-linear-to-r from-yellow-200 via-amber-300 to-yellow-400 p-10 rounded-2xl shadow-xl w-96">
//                     <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <input
//                             type="text"
//                             name="name"
//                             placeholder="Full Name"
//                             className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
//                             onChange={handleChange}
//                         />

//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Email"
//                             className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
//                             onChange={handleChange}
//                         />

//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
//                             onChange={handleChange}
//                         />

//                         <button className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition">
//                             Register
//                         </button>
//                     </form>

//                     <p className="mt-4 text-sm text-center">
//                         Already have an account?{" "}
//                         <Link to="/" className="text-blue-600">
//                             Login
//                         </Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Register;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post("/auth/register", form);

            toast.success("Account created successfully");
            navigate("/");
        } catch (err) {
            toast.error("Error registering user");
        }
    };

    return (
        <div className="h-screen flex flex-col md:grid md:grid-cols-2 bg-linear-to-br from-slate-50 via-purple-50 to-fuchsia-50">

            {/* Branding Section */}
            <div className="flex flex-col justify-center items-center bg-black text-center px-6 py-8 md:p-10">

                <h1 className="text-4xl font-bold mb-4 tracking-wide bg-linear-to-r from-yellow-200 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                    Atlas
                </h1>

                <p className="text-gray-400 max-w-sm">
                    Create your account and start matching your resume with the best jobs
                    using AI.
                </p>

            </div>

            {/* Form Section */}
            <div className="flex items-center justify-center px-6 py-8 md:p-10">

                <div className="bg-linear-to-r from-yellow-200 via-amber-300 to-yellow-400 p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-md">

                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Create Account
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                            onChange={handleChange}
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                            onChange={handleChange}
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none"
                            onChange={handleChange}
                        />

                        <button className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition">
                            Register
                        </button>

                    </form>

                    <p className="mt-4 text-sm text-center">
                        Already have an account?{" "}
                        <Link to="/" className="text-blue-600">
                            Login
                        </Link>
                    </p>

                </div>

            </div>

        </div>
    );
};

export default Register;