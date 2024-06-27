import React, { useEffect, useState } from 'react';
import api from '../services/Api';
import { Link } from 'react-router-dom';
import DeleteButton from '../components/DeleteButton/DeleteButton';
import SearchBooks from '../components/SearchBook/SearchBooks';

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
        setBooks(Array.isArray(response.data.books) ? response.data.books : []);
      } catch (error) {
        console.error('Error fetching books:', error);
        setError(error); 
      } finally {
        setIsLoading(false); 
      }
    };

    fetchBooks();
  }, []); 
  const handleDelete = (deletedPdfLocation) => {
    setBooks(books.filter(book => book.pdfLocation !== deletedPdfLocation));
  };
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
                {book.name} - {book.author} ({book.publicationYear}) {book.id}
                <Link to={`/showBook/${encodeURIComponent(book.pdfLocation)}`}>
                  <button>Ver PDF</button>
                </Link>
                <Link to={`/editBook/${encodeURIComponent(book.id)}`}>
                  <button>Editar PDF</button>
                </Link>
                <DeleteButton id={book.id} onDelete={handleDelete} />
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
