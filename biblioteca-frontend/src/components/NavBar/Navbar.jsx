import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../services/AuthProvider';
import './Navbar.css';

const Navbar = () => {
  const { isLoggedIn, isAdmin, logout } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        {isAdmin && (
          <>
            <li>
              <Link to="/books">Books</Link>
            </li>
            <li>
              <Link to="/newBook">New Book</Link>
            </li>
          </>
        )}
        {isLoggedIn ? (
          <li>
            <Link onClick={logout}>Logout</Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

