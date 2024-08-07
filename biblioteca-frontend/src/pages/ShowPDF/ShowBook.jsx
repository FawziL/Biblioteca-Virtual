import React, { useEffect, useState } from 'react';
import api from '../../services/Api';
import { useParams } from 'react-router-dom';
import './ShowBook.css';

const ShowBook = () => {
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [url, setUrl] = useState(null);
    const [bookDetails, setBookDetails] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await api.get(`/books/find/${id}`);
                if (response.status !== 200) {
                    throw new Error('Failed to fetch book details');
                }
                setBookDetails(response.data);
                return response.data.pdfLocation;
            } catch (error) {
                console.error('Error fetching book details:', error);
                setIsLoading(false);
            }
        };

        const fetchBook = async (pdfLocation) => {
            try {
                const response = await api.get(`/books/showpdf/${encodeURIComponent(pdfLocation)}`, {
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

        const init = async () => {
            const pdfLocation = await fetchBookDetails();
            if (pdfLocation) {
                fetchBook(pdfLocation);
            }
        };

        init();
    }, [id]);

    const handlePrint = () => {
        if (url) {
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        iframe.contentWindow.print();
        }
    };

  return (
        <div>
            {isLoading ? (
                <p className='loading'>Cargando...</p>
            ) : url ? (
                <div className='showBookContainer'>
                    <div className='showBook'>
                        <h2>{bookDetails.name}</h2>
                        <h4>Autor: {bookDetails.author}</h4>
                        <h4>Año de publicación: {bookDetails.publicationYear}</h4>
                        <div className='showBookButtons'>
                        <a href={url} download={`${bookDetails.name}.pdf`} target="_blank" rel="noopener noreferrer">
                            <button className='buttonContent'>Descargar PDF</button>
                        </a>
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            <button className='buttonContent'>Ver en otra Pestaña</button>
                        </a>
                        <button className='buttonContent' onClick={handlePrint}>Imprimir</button>
                        </div>
                    </div>
                    <iframe src={url} title="PDF Preview" className='pdf' />
                </div>
            ) : (
                <p>Error al cargar el PDF.</p>
            )}
        </div>
    );
};

export default ShowBook;