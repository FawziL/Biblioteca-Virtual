import './Home.css'
import imgCTA from '../../assets/callToAction.avif'
import Footer from '../../components/Footer/Footer';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from '../../components/Carousel/Carousel';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm) {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
        }
    };
    return (
        <>
            <section className='home'>
                <h1>Busca y encuentra información digital</h1>
                <p>Encontrarás libros con información relevante a tu carrera universitaria</p>
                <form onSubmit={handleSearch} className="search-form">
                    <div className="search-container">
                        <input 
                            type="text" 
                            className="search" 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)} 
                            placeholder="Buscar..."
                        />
                        <i className="fas fa-search search-icon"></i>
                    </div>
                </form>
                <a href="/search" className='advanceSearch'>Busqueda Avanzada</a>
            </section>
            
            <section className='categoriesHome'>
                <h2>Ver por Catogorías</h2>
                <Carousel />
            </section>

            <section className="content-section">
                <div className='card-content-section'>
                <div className="text-container">
                    <h2>Guarda tus libros favoritos</h2>
                    <p>Regístrate para poder guardar y acceder a tus libros favoritos en cualquier momento.</p>
                    <div>
                        <a href="/login">
                            <button className='buttonBlue'>Iniciar Sesión</button>
                        </a>
                        <a href="/signup">
                            <button className='buttonContent'>Registrarse</button>
                        </a>
                    </div>
                </div> 
                <img src={imgCTA} alt="Descripción de la imagen" />
                </div>
            </section>

            <section className='CallToAction'>
                <div>
                    <h2>Queremos brindar las mejores oportunidades para nuestros estudiantes</h2>
                    <p>Con este nuevo catálogo podrás encontrar libros académicos necesarios para tu carrera.</p>
                    <a href="/search">
                        <button className='buttonBlue'>Buscar libros</button>
                    </a>
                </div>
            </section>
            <Footer/>
        </>
    );
};

export default Home;