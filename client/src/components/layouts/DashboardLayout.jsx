import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex bg-gray-50 min-h-screen relative">

            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            <div className="flex flex-col flex-1">

                <Navbar setMobileOpen={setMobileOpen} />

                <main className="p-6 md:p-8">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default DashboardLayout;