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
                    <Link to="/search">Busqueda</Link>
                </li>
                {isAdmin && (
                  <>
                      <li>
                          <Link to="/books">Libros</Link>
                      </li>
                      <li>
                          <Link to="/newBook">Libro Nuevo</Link>
                      </li>
                  </>
                )}
                {isLoggedIn ? (
                    <>
                        <li>
                            <Link to="/favoriteBooks">Libros Favoritos</Link>
                        </li>
                        <li>
                            <Link onClick={logout}>Cerrar Sesión</Link>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link to="/login">Iniciar Sesión</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

