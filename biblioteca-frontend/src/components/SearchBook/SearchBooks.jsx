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
            <h2>Search Books</h2>
            <form onSubmit={handleSubmit} className='searchForm'>
                <h3>Categories</h3>
                <div className='searchCategories'>
                    <a onClick={() => handleCategoryClick('Sátira')}>Sátira</a>
                    <a onClick={() => handleCategoryClick('Cuento de hadas')}>Cuento de hadas</a>
                    <a onClick={() => handleCategoryClick('psicologia')}>Psicología</a>
                    {/* Agrega más botones según tus categorías */}
                </div>
                <h3>Busqueda Avanzada</h3>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={searchParams.name} onChange={handleChange} placeholder='Name of the book' />
                </div>
                <div>
                    <label>Author:</label>
                    <input type="text" name="author" value={searchParams.author} onChange={handleChange} placeholder='Author of the book' />
                </div>
                <div>
                    <label>Publication Year:</label>
                    <input type="number" name="publicationYear" value={searchParams.publicationYear} onChange={handleChange} placeholder='Publication Year' />
                </div>
                <div>
                    <label>Category:</label>
                    <input type="text" name="category" value={searchParams.category} onChange={handleChange} placeholder='Category of the book' />
                </div>
                <button type="submit">Search</button>
              </form>
        </div>
    );
};

export default SearchBooks;
