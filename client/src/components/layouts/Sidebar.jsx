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
          fixed md:static z-50
          bg-white border-r border-gray-200
          h-screen transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "left-0" : "-left-full"}
          md:left-0
        `}
            >
                <div className="flex items-center justify-between p-6">
                    {!collapsed && (
                        <h1 className="text-xl font-bold tracking-wide text-gray-800">
                            Atlas
                        </h1>
                    )}

                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="hidden md:block text-gray-500 hover:text-black"
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

                    <SidebarLink to="/resume" icon={<FileText size={18} />} collapsed={collapsed}>
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
            `flex items-center gap-3 p-3 rounded-xl transition-all
      ${isActive
                ? "bg-black text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`
        }
    >
        {icon}
        {!collapsed && <span className="text-sm font-medium">{children}</span>}
    </NavLink>
);

export default Sidebar;