import React, { useState } from 'react';
import api from '../../services/Api';

const DeleteButton = ({ id, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      await api.delete(`books/delete/${encodeURIComponent(id)}`);
      onDelete(id); // Notify parent component about deletion
    } catch (error) {
      console.error('Error deleting PDF:', error.response.data);
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
