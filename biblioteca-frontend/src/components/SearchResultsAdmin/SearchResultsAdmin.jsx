import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SearchResultsAdmin.css';
import DeleteButton from '../DeleteButton/DeleteButton'
import Pagination from '../Pagination/Pagination';

const SearchResults = ({ books }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 3; // Número de resultados por página

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
  const handleDelete = (deletedPdfLocation) => {
    setBooks(books.filter(book => book.pdfLocation !== deletedPdfLocation));
  };
  return (
    <div className='resultsSection'>
      <h2>Search Results</h2>
      <h3>Total Results: {books.length}</h3>
      {books.length === 0 ? (
        <h3>No books found</h3>
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

export default SearchResults;
