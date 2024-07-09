import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../services/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);
    return isLoggedIn ? children : <Navigate to="/" />;
};

const PrivateRouteAdmin = ({ children }) => {
    const { isLoggedIn, isAdmin } = useContext(AuthContext);
    return isLoggedIn && isAdmin ? children : <Navigate to="/" />;
};

export { PrivateRoute, PrivateRouteAdmin };
