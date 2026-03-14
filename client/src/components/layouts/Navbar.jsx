import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = ({ setMobileOpen }) => {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser?.name) {
            setUserName(storedUser.name);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.replace("/");
    };

    return (
        <div className="w-full bg-linear-to-r from-yellow-100 via-amber-200 to-yellow-400 border-b border-purple-100">

            <div className="w-full px-4 py-3 flex items-center justify-between">

                {/* LEFT SECTION */}
                <div className="flex items-center gap-3 min-w-0">

                    <button
                        onClick={() => setMobileOpen(true)}
                        className="md:hidden text-gray-700 shrink-0"
                    >
                        <Menu />
                    </button>

                    <p className="text-sm sm:text-base text-gray-700 truncate">
                        Welcome back{" "}
                        <span className="font-semibold bg-linear-to-r from-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
                            {userName}
                        </span>
                    </p>

                </div>

                {/* RIGHT SECTION */}
                <button
                    onClick={handleLogout}
                    className="shrink-0 bg-black text-white px-3 sm:px-4 py-2 rounded-lg shadow-md hover:bg-gray-800 transition text-sm sm:text-base"
                >
                    Logout
                </button>

            </div>

        </div>
    );
};

export default Navbar;