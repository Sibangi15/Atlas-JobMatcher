import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                const userData = decoded.user || decoded;

                setUser(userData);
            } catch (error) {
                console.error("Invalid token", error);
                sessionStorage.removeItem("token");
                setUser(null);
            }
        }

        setLoading(false);
    }, []);

    const login = (token) => {
        sessionStorage.setItem("token", token);

        const decoded = jwtDecode(token);
        const userData = decoded.user || decoded;

        setUser(userData);
    };

    const logout = () => {
        sessionStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);