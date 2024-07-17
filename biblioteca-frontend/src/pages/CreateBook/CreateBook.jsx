import React, { useState } from 'react';
import api from '../../services/Api';
import { toast } from 'react-toastify';

const CreateBook = () => {
    const [formData, setFormData] = useState({
        name: '',
        publicationYear: '',
        category: '',
        author: '',
        pdf: null,
    });
    const [errorMessage, setErrorMessage] = useState('');

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

        if (!formData.pdf) {
            setErrorMessage('Please select a PDF file');
            return;
        }

        const form = new FormData();
        form.append('name', formData.name);
        form.append('publicationYear', formData.publicationYear);
        form.append('category', formData.category);
        form.append('author', formData.author);
        form.append('pdf', formData.pdf);

        try {
            const response = await api.post('/books/create', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                toast.success('Se ha agregado el libro!', {
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
            console.log(response)
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
        }
    };

    return (
        <div className='container'>
            <h2>Agregar Libro</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className='field'>
                    <p>Nombre del Libro:</p>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Name of book"/>
                </div>
                <div className='field'>
                    <p>Año de Publicación:</p>
                    <input type="number" name="publicationYear" value={formData.publicationYear} onChange={handleChange} required placeholder="Publication Year"/>
                </div>
                <div className='field'>
                    <p>Categoría:</p>
                    <input type="text" name="category" value={formData.category} onChange={handleChange} required placeholder="Category"/>
                </div>
                <div className='field'>
                    <p>Autor:</p>
                    <input type="text" name="author" value={formData.author} onChange={handleChange} required placeholder="Author Name"/>
                </div>
                <div className='field'>
                    <p>Archivo PDF:</p>
                    <input type="file" name="pdf" onChange={handleFileChange} accept=".pdf" required placeholder="INSERT PDF FILE"/>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </div>
                <button type="submit">Create Book</button>
            </form>
        </div>
    );
};

export default CreateBook;