import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="flex bg-gray-50 min-h-screen w-full overflow-hidden relative">

            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />
            <div className={`flex flex-col flex-1 min-w-0 ${collapsed ? "md:ml-20" : "md:ml-64"}`} >

                <Navbar setMobileOpen={setMobileOpen} />

                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default DashboardLayout;