import React from 'react';
import { Link } from 'react-router-dom';
import './BookCard.css';

const BookCard = ({ book }) => {
  return (
    <div className='cardBook'>
      <h2>{book.name}</h2>
      <h4>Autor: {book.author}</h4>
      <h4>Año de publicación: {book.publicationYear}</h4>
      <div className='buttons'>
        <Link to={`/showBook/${encodeURIComponent(book.id)}`}>
          <button>Ver PDF</button>
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
