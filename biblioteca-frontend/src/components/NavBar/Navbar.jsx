import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../services/AuthProvider';
import './Navbar.css';

const Navbar = () => {
    const { isLoggedIn, isAdmin, logout } = useContext(AuthContext);

    const [toggle, setToggle] = useState("off");
    function toggleMenu() {
      setToggle(toggle === 'on' ? 'off' : 'on');
    }

    return (
        <nav>
            <ul className='navbar-links'>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/search">Busqueda</Link>
                    </li>
                    <button id="buttonToggle" className='navbar-toggle' onClick={toggleMenu}>
                        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier"><path d="M64 192h896v76.8H64V192z m0 281.6h896v76.8H64V473.6z m0 281.6h896V832H64v-76.8z" fill="#ffffff"></path></g></svg>
                    </button>
                </ul>
            <ul className={toggle}>
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

