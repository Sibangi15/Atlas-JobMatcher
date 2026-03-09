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
        <div className="w-full bg-linear-to-r from-yellow-100 via-amber-200 to-yellow-400 border-purple-100 px-6 py-4 flex justify-between items-center">

            <div className="flex items-center gap-4">
                <button onClick={() => setMobileOpen(true)} className="md:hidden text-gray-600">
                    <Menu />
                </button>

                <h2 className="text-lg font-medium text-gray-700">
                    Welcome back,{" "}
                    <span className="font-semibold bg-linear-to-r from-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
                        {userName}
                    </span>
                </h2>
            </div>

            <div className="flex justify-end">
                <button onClick={handleLogout} className="bg-black text-white px-4 py-2 rounded-lg shadow-md transition cursor-pointer">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Navbar;