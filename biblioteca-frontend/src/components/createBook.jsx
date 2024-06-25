import React, { useState } from 'react';
import axios from 'axios';

const BookForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    publicationYear: '',
    category: '',
    author: '',
    pdf: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      pdf: e.target.files[0],
    });
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
      const response = await axios.post('http://localhost:8080/api/books/create', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Book created successfully:', response.data);
    } catch (error) {
      console.error('Error creating book:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Publication Year:
          <input type="number" name="publicationYear" value={formData.publicationYear} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Category:
          <input type="text" name="category" value={formData.category} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Author:
          <input type="text" name="author" value={formData.author} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          PDF:
          <input type="file" name="pdf" onChange={handleFileChange} required />
        </label>
      </div>
      <button type="submit">Create Book</button>
    </form>
  );
};

export default BookForm;

