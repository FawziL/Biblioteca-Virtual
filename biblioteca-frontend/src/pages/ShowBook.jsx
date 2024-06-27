import React, { useEffect, useState } from 'react';
import api from '../services/Api';
import { useParams } from 'react-router-dom';

const ShowBook = () => {
  const { pdfLocation } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get(`/books/pdf/${encodeURIComponent(pdfLocation)}`, {
          responseType: 'blob'
        });

        if (response.status !== 200) {
          throw new Error('Failed to fetch PDF');
        }

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setUrl(url);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching PDF:', error);
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [pdfLocation]);

  return (
    <div>
      {isLoading ? (
        <p>Cargando...</p>
      ) : url ? (
        <iframe src={url} title="PDF Preview" style={{ width: '100%', height: '500px' }} />
      ) : (
        <p>Error al cargar el PDF.</p>
      )}
    </div>
  );
};

export default ShowBook;
