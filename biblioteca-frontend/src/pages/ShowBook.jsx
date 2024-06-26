import React, { useEffect, useState } from 'react';
import api from '../services/Api';

const ShowBook = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState(null); // State to hold the object URL of the PDF
  const pdfLocation = "pdf&CV%20Fawzi%20Lutfallah%20VEN911.pdf"
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await api.get('/books/pdf/' + pdfLocation, {
          responseType: 'blob' // Request a Blob response
        });

        console.log(response); // Log the response for debugging

        // Check for successful response status (usually 200)
        if (response.status !== 200) {
          throw new Error('Failed to fetch PDF'); // Throw an error if status is not OK
        }

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setUrl(url); // Update state with the object URL

        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching PDF:', error);
        setIsLoading(false); // Set loading state to false even on error
      }
    };

    fetchBook();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Cargando...</p>
      ) : (
        url ? ( // Check if URL is available before rendering iframe
          <iframe src={url} title="PDF Preview" style={{ width: '100%', height: '500px' }} />
        ) : (
          <p>Error al cargar el PDF.</p> // Display error message if URL is not set (due to fetch error)
        )
      )}
    </div>
  );
};

export default ShowBook;
