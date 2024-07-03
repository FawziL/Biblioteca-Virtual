import './Home.css'
import imgCTA from '../../assets/callToAction.avif'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      <div className='home'>
        <h1>Busca y encuentra información digital</h1>
        <h2>Encontrarás libros con información relevante a tu carrera universitaria</h2>
        <form onSubmit={handleSearch}>
        <input 
          type="text" 
          className='search'
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder="Buscar..."
        />
      </form>
        <a href="/search" className='advanceSearch'>Busqueda Avanzada</a>
      </div>

      <h3>Categotias</h3>

      <section className="content-section">
        <img src={imgCTA} alt="Descripción de la imagen" />
        <div className="text-container">
          <h2>Queremos brindar las mejores oportunidades para nuestros estudiantes</h2>
          <p>Con este nuevo catálogo podrás encontrar libros académicos necesarios para tu carrera.</p>
          <button href="/search" className='advanceSearch'>Buscar libros</button>
        </div>
      </section>
    </>
  );
};

export default Home;