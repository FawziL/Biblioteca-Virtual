import React, { useState } from 'react';
import BookCard from '../BookCard/BookCard';
import Pagination from '../Pagination/Pagination';
import './SearchResults.css';

const SearchResults = ({ books, favoriteBooks }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 2; // Número de resultados por página

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
            <h2 className='tileResultSection'>Resultados de la búsqueda</h2>
            <h3>Resultados Totales: {books.length}</h3>
            {books.length === 0 ? (
                <h3>No se han encontrado resultados.</h3>
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

