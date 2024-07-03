import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = ({ books }) => {
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
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SearchResults;
