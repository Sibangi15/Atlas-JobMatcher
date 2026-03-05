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

    return (
        <div className="w-full bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">

            <div className="flex items-center gap-4">
                <button
                    onClick={() => setMobileOpen(true)}
                    className="md:hidden text-gray-600"
                >
                    <Menu />
                </button>

                <h2 className="text-lg font-medium text-gray-700">
                    Welcome back,{" "}
                    <span className="text-gray-900 font-semibold">
                        {userName}
                    </span>
                </h2>
            </div>

            <div className="text-sm text-gray-500">
                Intelligent Talent Platform
            </div>
        </div>
    );
};

export default Navbar;