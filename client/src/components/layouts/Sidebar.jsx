import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Upload,
    Briefcase,
    FileText,
    ChevronLeft,
} from "lucide-react";

const Sidebar = ({
    collapsed,
    setCollapsed,
    mobileOpen,
    setMobileOpen,
}) => {
    return (
        <>
            {/* Overlay for Mobile */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-40 md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}
            <aside
                className={`
    fixed md:sticky top-0
    bg-linear-to-b from-blue-400 via-blue-200 to-purple-100
    border-r border-indigo-100
    min-h-screen
    transition-all duration-300
    ${collapsed ? "w-20" : "w-64"}
    ${mobileOpen ? "left-0" : "-left-full"}
    md:left-0
  `}
            >
                <div className="flex items-center justify-between p-6">
                    {!collapsed && (
                        <h1 className="text-2xl font-bold tracking-wide bg-linear-to-r from-yellow-200 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                            Atlas
                        </h1>
                    )}

                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="hidden md:block text-amber-900 hover:text-white"
                    >
                        <ChevronLeft
                            className={`transition-transform ${collapsed ? "rotate-180" : ""
                                }`}
                        />
                    </button>
                </div>

                <nav className="flex flex-col gap-2 px-4">

                    <SidebarLink to="/dashboard" icon={<LayoutDashboard size={18} />} collapsed={collapsed}>
                        Dashboard
                    </SidebarLink>

                    <SidebarLink to="/upload" icon={<Upload size={18} />} collapsed={collapsed}>
                        Upload Resume
                    </SidebarLink>

                    <SidebarLink to="/jobs" icon={<Briefcase size={18} />} collapsed={collapsed}>
                        Jobs
                    </SidebarLink>

                    <SidebarLink to="/score" icon={<FileText size={18} />} collapsed={collapsed}>
                        My Resume
                    </SidebarLink>

                </nav>
            </aside>
        </>
    );
};

const SidebarLink = ({ to, icon, children, collapsed }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl transition-all text-amber-900 
      $${isActive
                ? "bg-linear-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                : "text-gray-600 hover:bg-purple-50 hover:text-yellow-400"}`
        }
    >
        {icon}
        {!collapsed && <span className="text-sm font-medium">{children}</span>}
    </NavLink>
);

export default Sidebar;