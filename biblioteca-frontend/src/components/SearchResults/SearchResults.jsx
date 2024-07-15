import React, { useState, useEffect } from 'react';
import BookCard from '../BookCard/BookCard';
import Pagination from '../Pagination/Pagination';
import api from '../../services/Api';
import './SearchResults.css';

const SearchResults = ({ books }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [favoriteBooks, setFavoriteBooks] = useState([]);
    const resultsPerPage = 2; // Número de resultados por página

    useEffect(() => {
        const fetchFavoriteBooks = async () => {
            try {
                const response = await api.get('/favoriteBooks/getFavoriteBooks');
                setFavoriteBooks(response.data);
                console.log('Favorite Books:', response.data); // Verifica la estructura aquí
            } catch (error) {
                console.error('Error fetching favorite books', error.response?.data || error.message);
            }
        };
        fetchFavoriteBooks();
    }, []);

    // Calcular el índice de los resultados que se mostrarán en la página actual
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = books.slice(indexOfFirstResult, indexOfLastResult);

    // Funciones para manejar la navegación de páginas
    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    };

    return (
        <div className='resultsSection'>
            <h2>Search Results</h2>
            <h3>Total Results: {books.length}</h3>
            {books.length === 0 ? (
                <h3>No books found</h3>
            ) : (
                <>
                    {currentResults.map((book) => {
                        const isFavorite = favoriteBooks.some(fav => {
                            return fav.bookId === book.id;
                        });
                        return <BookCard key={book.id} book={book} isFavorite={isFavorite} />;
                    })}
                    <Pagination
                        currentPage={currentPage}
                        totalResults={books.length}
                        resultsPerPage={resultsPerPage}
                        nextPage={nextPage}
                        prevPage={prevPage}
                    />
                </>
            )}
        </div>
    );
};

export default SearchResults;

