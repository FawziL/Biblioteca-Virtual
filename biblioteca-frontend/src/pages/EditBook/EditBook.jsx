import React, { useState } from 'react';
import api from '../../services/Api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditBook = () => {
    const [formData, setFormData] = useState({
        name: '',
        publicationYear: '',
        category: '',
        author: '',
        pdf: null,
    });
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Verify file extension
            if (selectedFile.name.endsWith('.pdf')) {
                setFormData({
                    ...formData,
                    pdf: selectedFile,
                });
                setErrorMessage('');
            } else {
                setFormData({
                    ...formData,
                    pdf: null,
                });
                setErrorMessage('Only PDF files are allowed');
                toast.error('Only PDF files are allowed', {
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.pdf && !formData.pdf.name.endsWith('.pdf')) {
            toast.error('Please select a valid PDF file.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return;
        }

        const form = new FormData();
        form.append('name', formData.name);
        form.append('publicationYear', formData.publicationYear);
        form.append('category', formData.category);
        form.append('author', formData.author);
        form.append('pdf', formData.pdf);

        try {
            await api.post(`/books/update/${encodeURIComponent(id)}`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Se ha modificado el libro con el ID: ' + id, {
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
        <div className='container'>
            <h2>Editar libro</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className='field'>
                    <p>Nombre del Libro:</p>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Name of book'/>
                </div>
                <div className='field'>
                    <p>Año de Publicación:</p>
                    <input type="number" name="publicationYear" value={formData.publicationYear} onChange={handleChange} placeholder='Publication Year'/>
                </div>
                <div className='field'>
                    <p>Categoría:</p>
                    <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder='Category'/>
                </div>
                <div className='field'>
                    <p>Autor:</p>
                    <input type="text" name="author" value={formData.author} onChange={handleChange} placeholder='Author of Book'/>
                </div>
                <div className='field'>
                    <p>Archivo PDF:</p>
                    <input type="file" name="pdf" onChange={handleFileChange} accept=".pdf" placeholder='Insert PDF'/>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </div>
                <button type="submit">Edit Book</button>
            </form>
        </div>
    );
};

export default EditBook;