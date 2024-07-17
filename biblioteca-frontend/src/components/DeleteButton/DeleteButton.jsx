import React, { useState } from 'react';
import api from '../../services/Api';
import { toast } from 'react-toastify';

const DeleteButton = ({ id, onDelete }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        setIsDeleting(true);
        setError(null);

        try {
            await api.delete(`/books/delete/${encodeURIComponent(id)}`);
            onDelete(id); 
            toast.success('Se ha eliminado el libro!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            const errorMessage = error.response.data.error || 'Ha ocurrido un error al cargar el libro!';
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
            setError(error);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div>
            <button onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Eliminando...' : 'Eliminar PDF'}
            </button>
            {error && <p>Error al eliminar el PDF: {error.message}</p>}
        </div>
    );
};

export default DeleteButton;