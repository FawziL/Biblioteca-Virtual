import React, { useState } from 'react';
import api from '../../services/Api';
import { toast } from 'react-toastify';

const FavoriteButton = ({ bookId, initialFavorite }) => {
    const [isFavorite, setIsFavorite] = useState(initialFavorite);

    const handleFavoriteClick = async () => {
        try {
            if (isFavorite) {
                const response = await api.delete('/favoriteBooks/deleteFavoriteBook', { data: { bookId } });
                if (response.status === 200) {
                    setIsFavorite(false);
                    const reqMessage = response.data.message || 'Has eleminado el libro!';
                    toast.success(reqMessage, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            } else {
                const response = await api.post('/favoriteBooks/add', { bookId });
                if (response.status === 201) {
                    setIsFavorite(true);
                    const reqMessage = response.data.message || 'Has agregado el libro a favoritos!';
                    toast.success(reqMessage, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            }
        } catch (error) {
            const errorMessage = error.response.data.error || 'Debes iniciar sesión para guardar tus libros en favoritos!';
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    return (
        <button onClick={handleFavoriteClick} className='heart'>
            {isFavorite ? 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="black"/>
            </svg> 
            : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="black" strokeWidth="2"/>
            </svg>}
        </button>
    );
};

export default FavoriteButton;
