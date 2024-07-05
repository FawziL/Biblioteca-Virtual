import React from 'react';
import { Link } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = ({ books }) => {
  return (
    <div className='resultsSection'>
      <h2>Search Results</h2>
      {books.length == 0 ? (
        <h3>No books found</h3>
      ) : (
        <>
          {books.map((book) => (
            <div key={book.id} className='cardBook'>
              <h2>{book.name}</h2>
              <h4>Autor: {book.author}</h4>
              <h4>Año de publicación: {book.publicationYear}</h4>
              <div className='buttons'>
                <Link to={`/showBook/${encodeURIComponent(book.id)}`}>
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
