import React, { useState } from 'react';
import api from '../services/Api';

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
      console.log('Book created successfully:', response.data);
      // Add any additional logic here after successful book creation
    } catch (error) {
      console.error('Error creating book:', error.response?.data || error.message);
      // Handle book creation errors
    }
  };

  return (
    <div className='container'>
      <h2>Create Book</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Name of book"/>
        </div>
        <div>
            Publication Year:
            <input type="number" name="publicationYear" value={formData.publicationYear} onChange={handleChange} required placeholder="Publication Year"/>
        </div>
        <div>
            Category:
            <input type="text" name="category" value={formData.category} onChange={handleChange} required placeholder="Category"/>
        </div>
        <div>
            Author:
            <input type="text" name="author" value={formData.author} onChange={handleChange} required placeholder="Author Name"/>
        </div>
        <div>
            PDF:
            <input type="file" name="pdf" onChange={handleFileChange} accept=".pdf" required placeholder="INSERT PDF FILE"/>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
        <button type="submit">Create Book</button>
      </form>
    </div>
  );
};

export default CreateBook;