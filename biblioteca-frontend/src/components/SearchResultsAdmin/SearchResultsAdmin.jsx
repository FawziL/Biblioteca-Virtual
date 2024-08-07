import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchResultsAdmin.css';
import DeleteButton from '../DeleteButton/DeleteButton';
import Pagination from '../Pagination/Pagination';

const SearchResultsAdmin = ({ books, setBooks }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 3;

    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = books.slice(indexOfFirstResult, indexOfLastResult);

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    };

    const handleDelete = (deletedBookId) => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== deletedBookId));
    };

    return (
        <div className='resultsSection'>
            <h2>Resultados de la búsqueda</h2>
            <h3>Resultados Totales: {books.length}</h3>
            {books.length === 0 ? (
                <h3>No se han encontrado resultados.</h3>
            ) : (
                <>
                    {currentResults.map((book) => (
                        <div key={book.id} className='cardBook'>
                            <h2>{book.name}</h2>
                            <h4>Autor: {book.author}</h4>
                            <h4>Año de publicación: {book.publicationYear}</h4>
                            <div className='buttons'>
                                <Link to={`/showBook/${encodeURIComponent(book.id)}`}>
                                    <button>Ver PDF</button>
                                </Link>
                                <Link to={`/editBook/${encodeURIComponent(book.id)}`}>
                                    <button>Editar PDF</button>
                                </Link>
                                <DeleteButton id={book.id} onDelete={handleDelete} />
                            </div>
                        </div>
                    ))}
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

export default SearchResultsAdmin;

