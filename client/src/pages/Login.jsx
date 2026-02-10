import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from "../context/AuthContext";

const Login = (props) => {
    // const [credentials, setCredentials] = useState({ email: "", password: "" })
    // const [showPassword, setShowPassword] = useState(false);
    // const navigate = useNavigate();
    // const { login } = useAuth();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await api.post('/api/auth/login', {
    //             email: credentials.email,
    //             password: credentials.password
    //         });

    //         const json = response.data;

    //         if (response.status === 200 && json.success) {
    //             login(json.authtoken);

    //         } else {
    //             console.log("showAlert:", props.showAlert);
    //             props.showAlert(json.error || "Invalid credentials", "danger");
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         if (error.response) {
    //             props.showAlert(error.response.data.error || "Invalid credentials", "danger");
    //         } else {
    //             props.showAlert("Server error. Please try again later.", "danger");
    //         }
    //     }
    // };

    // const onChange = (e) => {
    //     setCredentials({ ...credentials, [e.target.name]: e.target.value })
    // }
    return (
        // <div>
        //     <div className="min-h-screen flex items-center justify-center bg-[url('/bg.jpg')] bg-cover bg-center px-4">
        //         <div className="absolute inset-0 bg-black/60"></div>
        //         <div className="relative w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8">
        //             <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to Order</h2>
        //             <form onSubmit={handleSubmit} className="space-y-5">
        //                 <div>
        //                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
        //                         Email address
        //                     </label>
        //                     <input type="email" id="email" name="email" value={credentials.email} onChange={onChange} required
        //                         className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        //                         placeholder="you@example.com" />
        //                     <p className="text-xs text-gray-500 mt-1">We'll never share your email.</p>
        //                 </div>

        //                 <div className="relative">
        //                     <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
        //                         Password
        //                     </label>
        //                     <input type={showPassword ? "text" : "password"} id="password" name="password" value={credentials.password} onChange={onChange} required
        //                         className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-amber-700"
        //                         placeholder="••••••••"
        //                     />
        //                     <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="Toggle password visibility">
        //                         {showPassword ? (
        //                             /* Eye Off */
        //                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        //                                     d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-7-10-7 a19.77 19.77 0 014.318-4.94M9.88 9.88a3 3 0 104.24 4.24 M6.1 6.1L18 18"
        //                                 />
        //                             </svg>
        //                         ) : (
        //                             /* Eye */
        //                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        //                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        //                                     d="M2.458 12C3.732 7.943 7.523 5 12 5 c4.478 0 8.268 2.943 9.542 7 -1.274 4.057-5.064 7-9.542 7 -4.477 0-8.268-2.943-9.542-7z"
        //                                 />
        //                             </svg>
        //                         )}
        //                     </button>
        //                 </div>

        //                 <button type="submit" className="w-full bg-amber-900 hover:bg-amber-800 text-white font-semibold py-2.5 rounded-lg transition duration-300">
        //                     Login
        //                 </button>
        //             </form>

        //             <p className="text-center text-sm text-gray-600 mt-6">New here?{" "}
        //                 <span onClick={() => navigate("/register")} className="text-amber-900 font-semibold cursor-pointer hover:underline">
        //                     Create an account
        //                 </span>
        //             </p>
        //         </div>
        //     </div>
        // </div>
        <div>
            <form  className="space-y-5">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email address
                    </label>
                    <input type="email" id="email" name="email"  required
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        placeholder="you@example.com" />
                    <p className="text-xs text-gray-500 mt-1">We'll never share your email.</p>
                </div>
            </form>
        </div>
    )
}

export default Login
