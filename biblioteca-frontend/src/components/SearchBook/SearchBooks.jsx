import React, { useState } from 'react';
import api from '../../services/Api';
import './SearchBooks.css';

const SearchBooks = ({ onSearchResults, onCategoryChange }) => {
    const [searchParams, setSearchParams] = useState({
        name: '',
        author: '',
        publicationYear: '',
        category: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({
            ...searchParams,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.get('/books/searchBook', { params: searchParams });
            onSearchResults(response.data);
        } catch (error) {
            console.error('Error searching for books', error.response?.data || error.message);
        }
    };

    const handleCategoryClick = (category) => {
        onCategoryChange(category);
    };

    return (
        <div className='searchSection'>
            <h2>Buscar Libros</h2>
            <form onSubmit={handleSubmit} className='searchForm'>
                <h3>Categorías</h3>
                <div className='searchCategories'>
                    <a onClick={() => handleCategoryClick('Sátira')}>Sátira</a>
                    <a onClick={() => handleCategoryClick('Ciencia')}>Ciencia</a>
                    <a onClick={() => handleCategoryClick('psicologia')}>Psicología</a>
                    <a onClick={() => handleCategoryClick('Fantasía')}>Fantasía</a>
                    <a onClick={() => handleCategoryClick('Pasantías')}>Pasantías</a>
                    <a onClick={() => handleCategoryClick('TEG')}>Trabajo Especial de Grado</a>
                    {/* Agrega más botones según tus categorías */}
                </div>
                <h3>Busqueda Avanzada</h3>
                <div>
                    <label>Nombre del libro:</label>
                    <input type="text" name="name" value={searchParams.name} onChange={handleChange} placeholder='Name of the book' />
                </div>
                <div>
                    <label>Autor del libro:</label>
                    <input type="text" name="author" value={searchParams.author} onChange={handleChange} placeholder='Author of the book' />
                </div>
                <div>
                    <label>Año de Publicación:</label>
                    <input type="number" name="publicationYear" value={searchParams.publicationYear} onChange={handleChange} placeholder='Publication Year' />
                </div>
                <div>
                    <label>Categoría:</label>
                    <input type="text" name="category" value={searchParams.category} onChange={handleChange} placeholder='Category of the book' />
                </div>
                <button className='buttonBlue' type="submit">Buscar</button>
              </form>
        </div>
    );
};

export default SearchBooks;
