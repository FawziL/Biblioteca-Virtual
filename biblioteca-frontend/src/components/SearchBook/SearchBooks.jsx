import React, { useState } from 'react';
import api from '../../services/Api';
import './SearchBooks.css';

const SearchBooks = ({ onSearchResults, onCategoryChange, isVisible, toggleVisibility }) => {
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
        <div className={`searchSection ${isVisible ? 'visible' : 'hidden'}`}>
            <button className="toggleButton" onClick={toggleVisibility}>
                {isVisible ? 
                <svg viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <g fill="none" stroke="#000000" transform="translate(3 3)"> <path d="m.5 12.5v-10c0-1.1045695.8954305-2 2-2h10c1.1045695 0 2 .8954305 2 2v10c0 1.1045695-.8954305 2-2 2h-10c-1.1045695 0-2-.8954305-2-2z"></path> <path d="m2.5 12.5v-10c0-1.1045695.8954305-2 2-2h-2c-1 0-2 .8954305-2 2v10c0 1.1045695 1 2 2 2h2c-1.1045695 0-2-.8954305-2-2z" fill="#000000"></path> <path d="m7.5 10.5-3-3 3-3"></path> <path d="m12.5 7.5h-8"></path> </g> </g></svg> 
                :
                <svg viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier"></g><g id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <g fill="none" stroke="#000000" transform="translate(3 3)"> <path d="m.5 12.5v-10c0-1.1045695.8954305-2 2-2h10c1.1045695 0 2 .8954305 2 2v10c0 1.1045695-.8954305 2-2 2h-10c-1.1045695 0-2-.8954305-2-2z"></path> <path d="m12.5 12.5v-10c0-1.1045695-.8954305-2-2-2h2c1 0 2 .8954305 2 2v10c0 1.1045695-1 2-2 2h-2c1.1045695 0 2-.8954305 2-2z" fill="#000000"></path> <path d="m7.5 10.5 3-3-3-3"></path> <path d="m10.5 7.5h-8"></path> </g> </g></svg>
                } 
            </button>
            <div className='content'>
                <form onSubmit={handleSubmit} className='searchForm'>
                    <h3>Categorías</h3>
                    <div className='searchCategories'>
                        <a onClick={() => handleCategoryClick('Sátira')}>Sátira</a>
                        <a onClick={() => handleCategoryClick('Ciencia')}>Ciencia</a>
                        <a onClick={() => handleCategoryClick('Psicología')}>Psicología</a>
                        <a onClick={() => handleCategoryClick('Fantasía')}>Fantasía</a>
                        <a onClick={() => handleCategoryClick('Pasantías')}>Pasantías</a>
                        <a onClick={() => handleCategoryClick('Trabajo Especial de Grado')}>Trabajo Especial de Grado</a>
                    </div>
                    <h3>Busqueda Avanzada</h3>
                    <div>
                        <label>Nombre del libro:</label>
                        <input type="text" name="name" value={searchParams.name} onChange={handleChange} placeholder='Nombre del libro' />
                    </div>
                    <div>
                        <label>Autor del libro:</label>
                        <input type="text" name="author" value={searchParams.author} onChange={handleChange} placeholder='Autor del libro' />
                    </div>
                    <div>
                        <label>Año de Publicación:</label>
                        <input type="number" name="publicationYear" value={searchParams.publicationYear} onChange={handleChange} placeholder='Año de Publicación' />
                    </div>
                    <div>
                        <label>Categoría:</label>
                        <input type="text" name="category" value={searchParams.category} onChange={handleChange} placeholder='Categoría' />
                    </div>
                    <button className='buttonBlue' type="submit">Buscar</button>
                </form>
            </div>
        </div>
    );
};

export default SearchBooks;
