import React, { useState } from 'react';
import api from '../services/Api';
import { useParams } from 'react-router-dom';

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
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
    form.append('publicationYear', formData.publicationYear);
    form.append('category', formData.category);
    form.append('author', formData.author);
    form.append('pdf', formData.pdf);

    try {
      const response = await api.post(`/books/update/${encodeURIComponent(id)}`, form, {
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
    <div>
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange}/>
          </label>
        </div>
        <div>
          <label>
            Publication Year:
            <input type="number" name="publicationYear" value={formData.publicationYear} onChange={handleChange}/>
          </label>
        </div>
        <div>
          <label>
            Category:
            <input type="text" name="category" value={formData.category} onChange={handleChange}/>
          </label>
        </div>
        <div>
          <label>
            Author:
            <input type="text" name="author" value={formData.author} onChange={handleChange}/>
          </label>
        </div>
        <div>
          <label>
            PDF:
            <input type="file" name="pdf" onChange={handleFileChange} accept=".pdf"/>
          </label>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
        <button type="submit">Edit Book</button>
      </form>
    </div>
  );
};

export default EditBook;
