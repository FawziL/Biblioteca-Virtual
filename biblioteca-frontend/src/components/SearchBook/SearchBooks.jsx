import React, { useState } from 'react';
import api from '../../services/Api';
import { Link } from 'react-router-dom';

const SearchBooks = () => {
  const [searchParams, setSearchParams] = useState({
    name: '',
    author: '',
    publicationYear: '',
    category: '',
  });
  const [books, setBooks] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get('/books/searchBook', { params: searchParams });
      setBooks(response.data);
    } catch (error) {
      console.error('Error searching for books', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Search Books</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input type="text" name="name" value={searchParams.name} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input type="text" name="author" value={searchParams.author} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Publication Year:
            <input type="number" name="publicationYear" value={searchParams.publicationYear} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Category:
            <input type="text" name="category" value={searchParams.category} onChange={handleChange} />
          </label>
        </div>
        <button type="submit">Search</button>
      </form>

      <div>
        <h3>Search Results</h3>
        {books.length > 0 ? (
          <ul>
            {books.map((book) => (
              <li key={book.id}>
                {book.name} - {book.author} ({book.publicationYear}) {book.id}
                <Link to={`/showBook/${encodeURIComponent(book.pdfLocation)}`}>
                  <button>Ver PDF</button>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBooks;
