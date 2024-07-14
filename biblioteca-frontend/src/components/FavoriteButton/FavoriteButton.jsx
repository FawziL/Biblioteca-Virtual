import React, { useState } from 'react';
import api from '../../services/Api';

const FavoriteButton = ({ bookId }) => {
    const [isFavorite, setIsFavorite] = useState(true);

    const handleFavoriteClick = async () => {
        try {
            if (isFavorite) {
                const response = await api.delete('/favoriteBooks/deleteFavoriteBook', {data: { bookId }});
                if (response.status === 200) {
                    setIsFavorite(false);
                    console.log("HAS BORRADO CON EXITO EL LIBRO")
                }
            } else {
                const response = await api.post('/favoriteBooks/add', { bookId });
                if (response.status === 201) {
                    setIsFavorite(true);
                    console.log("HAS AGREGADO CON EXITO EL LIBRO")
                }
            }
        } catch (error) {
            console.error('Error adding to favorites', error.response?.data || error.message);
        }
    };

    return (
        <button onClick={handleFavoriteClick}>
            {isFavorite ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'}
        </button>
    );
};

export default FavoriteButton;
