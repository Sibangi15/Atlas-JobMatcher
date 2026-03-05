import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../components/layouts/DashboardLayout";
import UploadResume from "../pages/UploadResume";
import ResumeScore from "../pages/ResumeScore";
import ProtectedRoute from "./ProtectedRoute";

// import Jobs from "../pages/Jobs";
// import MatchResult from "../pages/MatchResult";

// const AppRoutes = () => {
//     return (
//         <Routes>
//             <Route path="/jobs" element={<Jobs />} />
//             <Route path="/match/:jobId" element={<MatchResult />} />
//         </Routes>
//     );
// };

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/upload" element={<UploadResume />} />
                    <Route path="/score" element={<ResumeScore />} />
                </Route>
            </Route>

        </Routes>
    );
};

export default AppRoutes;