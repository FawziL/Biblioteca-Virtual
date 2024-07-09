import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        const adminStatus = localStorage.getItem('isAdmin') === 'true';
        setIsAdmin(adminStatus);
    }, []);

    const login = (token, adminStatus) => {
        localStorage.setItem('token', token);
        localStorage.setItem('isAdmin', adminStatus);
        setIsLoggedIn(true);
        setIsAdmin(adminStatus);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        setIsLoggedIn(false);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };

