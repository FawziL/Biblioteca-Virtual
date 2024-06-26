import React, { useEffect, useState } from 'react';
import api from '../services/Api';
import { Link } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true); 
      setError(null);

      try {
        const response = await api.get('/books/allBooks');
        setBooks(response.data.books); 
      } catch (error) {
        console.error('Error fetching books:', error);
        setError(error); 
      } finally {
        setIsLoading(false); 
      }
    };

    fetchBooks();
  }, []); 
  return (
    <div>
      <h2>Todos los libros</h2>
      {isLoading ? ( 
        <p>Cargando libros...</p>
      ) : error ? ( 
        <p>Error al obtener libros: {error.message}</p>
      ) : books.length > 0 ? ( 
          <ul>
            {books.map((book) => (
              <li key={book.id}>
                {book.name} - {book.author} ({book.publicationYear}) <Link to={book.publicationYear + "Hola"}>Ver</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No se encontraron libros.</p>
        )}
    </div>
  );
};

export default BookList;
