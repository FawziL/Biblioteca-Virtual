import React, { useEffect, useState } from 'react';
import api from '../../services/Api';
import BookCard from '../../components/BookCard/BookCard';
import './FavoriteBooks.css';

const FavoriteBooks = () => {
    const [favoriteBooks, setFavoriteBooks] = useState([]);

    useEffect(() => {
        const fetchFavoriteBooks = async () => {
            try {
                const response = await api.get('/favoriteBooks/getFavoriteBooks');
                setFavoriteBooks(response.data)
                setLoading(false);
            } catch (error) {
                setError(error.response?.data || error.message);
                setLoading(false);
            }
        };

        fetchFavoriteBooks();
    }, []);

    return (
        <div className="favoriteBooks">
            <h1>Mis Libros Favoritos</h1>
            {favoriteBooks.length === 0 ? (
                <p>No has agregado libros a favoritos.</p>
            ) : (
                <div className="books-grid">
                    {favoriteBooks.map(favBook => (
                        <BookCard key={favBook.id} book={favBook.Book} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FavoriteBooks;
