import React, { useEffect, useState } from 'react';
import api from '../../services/Api';
import BookCard from '../../components/BookCard/BookCard';
import Pagination from '../../components/Pagination/Pagination';
import './FavoriteBooks.css';

const FavoriteBooks = () => {
    const [favoriteBooks, setFavoriteBooks] = useState([]);
    const [isFavorite, setisFavorite] = useState(true);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavoriteBooks = async () => {
            try {
                const response = await api.get('/favoriteBooks/getFavoriteBooks');
                if(response){
                    setFavoriteBooks(response.data)
                    setLoading(false);
                }
            } catch (error) {
                setError(error.response?.data || error.message);
                setLoading(false);
            }
        };

        fetchFavoriteBooks();
    }, []);


    const [currentPage, setCurrentPage] = useState(1);
    const resultsPerPage = 2; // Número de resultados por página

    // Calcular el índice de los resultados que se mostrarán en la página actual
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentResults = favoriteBooks.slice(indexOfFirstResult, indexOfLastResult);

    // Funciones para manejar la navegación de páginas
    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    };

    return (
        <div className="favoriteBooks">
            <h1>Mis Libros Favoritos</h1>
            {favoriteBooks.length === 0 ? (
                <p>No has agregado libros a favoritos.</p>
            ) : (
                <div className="books-grid">
                    {favoriteBooks.map(favBook => (
                        <BookCard key={favBook.id} book={favBook.Book} isFavorite={isFavorite}/>
                    ))}
                    <Pagination
                        currentPage={currentPage}
                        totalResults={favoriteBooks.length}
                        resultsPerPage={resultsPerPage}
                        nextPage={nextPage}
                        prevPage={prevPage}
                    />
                </div>
            )}
        </div>
    );
};

export default FavoriteBooks;
