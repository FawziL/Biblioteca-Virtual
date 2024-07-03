import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResultsAdmin.css';
import DeleteButton from '../DeleteButton/DeleteButton'

const SearchResults = ({ books }) => {
  const handleDelete = (deletedPdfLocation) => {
    setBooks(books.filter(book => book.pdfLocation !== deletedPdfLocation));
  };
  return (
    <div className='resultsSection'>
      <h3>Search Results</h3>
      {books.length == 0 ? (
        <p>No books found</p>
      ) : (
        <>
          {books.map((book) => (
            <div key={book.id} className='cardBook'>
              <h3>{book.name}</h3>
              <h4>Autor: {book.author}</h4>
              <h4>Año de publicación: {book.publicationYear}</h4>
              <div className='buttons'>
                <Link to={`/showBook/${encodeURIComponent(book.pdfLocation)}`}>
                  <button>Ver PDF</button>
                </Link>
                <Link to={`/editBook/${encodeURIComponent(book.id)}`}>
                  <button>Editar PDF</button>
                </Link>
                <DeleteButton id={book.id} onDelete={handleDelete} />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SearchResults;
