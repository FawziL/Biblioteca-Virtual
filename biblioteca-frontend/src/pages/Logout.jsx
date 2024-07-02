import React from 'react';
import { Link } from 'react-router-dom';

const Logout = () => {

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
  };

  return (
    <Link onClick={handleLogout} to="/login">Logout</Link>
  );
};

export default Logout;