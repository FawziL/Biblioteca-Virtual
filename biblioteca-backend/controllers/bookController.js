import Book from "../models/bookModel.js";
import fs from "fs";
import path from "path";
import sequelize from '../db/index.js'; 
import { Op } from 'sequelize';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDir = join(__dirname, '..', 'public');

const createBook = async (req, res) => {
    try {
        const { name, publicationYear, category, author } = req.body;

        const pdfLocation = req.file ? req.file.filename : null;

        if (!name || !publicationYear || !category || !author || !pdfLocation) {
            throw new Error('All fields are required.');
        }
        
        const existingBook = await Book.findOne({where: { name, publicationYear }});
          
        if (existingBook) {
            throw new Error('A book with the same name and year already exists.');
        }
        
        const existingPDF = await Book.findOne({where: { pdfLocation }});
          
        if (existingPDF) {
            throw new Error('A book with the same PDF location already exists.');
        }
            
        const newBook = new Book({
            name,
            publicationYear,
            category,
            author,
            pdfLocation
        });
        
        await newBook.save();

        res.status(200).json({
            name,
            publicationYear,
            category,
            author,
            pdfLocation
          });
      } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
  
        // Validar que el ID sea proporcionado
        if (!id) {
          throw new Error('ID is required.');
        }
  
        // Buscar el libro por ID
        const book = await Book.findByPk(id);
  
        // Verificar si el libro existe
        if (!book) {
          return res.status(404).json({ error: 'Book not found.' });
        }
  
        // Eliminar el libro
        await book.destroy();

        // Elimina el archivo
      
        const filePath = path.join(uploadDir,'/uploads', book.pdfLocation)
        if(filePath){
            fs.unlinkSync(filePath);
        }

        // Enviar respuesta de éxito
        res.status(200).json({ message: 'Book deleted successfully.' });

    } catch (error) {
        // Manejar errores
        res.status(500).json({ error: error.message });
    }
};

const findBookById = async (req, res) => {
    try {
        const { id } = req.params;
  
        // Validar que el ID sea proporcionado
        if (!id) {
          throw new Error('ID is required.');
        }
    
        // Buscar el libro por ID utilizando findByPk
        const book = await Book.findByPk(id);
    
        // Verificar si el libro existe
        if (!book) {
          return res.status(404).json({ error: 'Book not found.' });
        }
    
        // Enviar respuesta con el libro encontrado
        res.status(200).json(book);

    } catch (error) {
        // Manejar errores
        res.status(500).json({ error: error.message });
    }
};

const findBookByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        console.log(category)
    
        // Validar que la categoría sea proporcionada
        if (!category) {
            throw new Error('Category is required.');
        }
    
        // Buscar los libros por categoría utilizando findAll
        const books = await Book.findAll({
            where: {
                category: {
                    [Op.iLike]: category
                }
            }
        });
    
        // Enviar respuesta con los libros encontrados
        res.status(200).json(books);
    
    } catch (error) {
        // Manejar errores
        res.status(500).json({ error: error.message });
    }
};
  
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, publicationYear, category, author } = req.body;
        const pdfLocation = req.file ? `uploads/${req.file.filename}` : null;
      
        // Validar que el ID sea proporcionado
        if (!id) {
            throw new Error('ID is required.');
        }
      
        // Buscar el libro por ID
        const book = await Book.findByPk(id);
      
        // Verificar si el libro existe
        if (!book) {
            return res.status(404).json({ error: 'Book not found.' });
        }
        if(pdfLocation){
            const filePath = path.join(uploadDir, book.pdfLocation)
            fs.unlinkSync(filePath);
        }
  
        // Actualizar los detalles del libro
        book.name = name || book.name;
        book.publicationYear = publicationYear || book.publicationYear;
        book.category = category || book.category;
        book.author = author || book.author;
        book.pdfLocation = pdfLocation || book.pdfLocation;
  
        // Guardar los cambios
        await book.save();
      
        // Enviar respuesta con el libro actualizado
        res.status(200).json(book);
  
    } catch (error) {
        // Manejar errores
        res.status(500).json({ error: error.message });
    }
};

const searchBooks = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
          return res.status(400).json({ error: 'Query parameter is required.' });
        }
        // Buscar libros utilizando la cláusula where con múltiples condiciones OR
        const books = await Book.findAll({
          where: {
            [Op.or]: [
                { name: { [Op.iLike]: `%${query}%` } },
                { author: { [Op.iLike]: `%${query}%` } },
                // Convertir publicationYear a string antes de aplicar LIKE
                sequelize.where(sequelize.cast(sequelize.col('publicationYear'), 'TEXT'), {
                    [Op.like]: `%${query}%`
                })
            ]
          }
        });
        // Enviar respuesta con los libros encontrados
        res.status(200).json(books);

    } catch (error) {
        // Manejar errores
        res.status(500).json({ error: error.message });
    }
};

const searchBook = async (req, res) => {
    const { name, author, publicationYear, category } = req.query;
    let query = {};
    
    if (name) query.name = { [Op.iLike]: `%${name}%` };
    if (author) query.author = { [Op.iLike]: `%${author}%` };
    if (publicationYear) query.publicationYear = publicationYear;
    if (category) query.category = { [Op.iLike]: `%${category}%` };

    try {
        const books = await Book.findAll({ where: query });
        res.json(books);
        
    } catch (error) { 
        res.status(500).json({ error: 'Error searching for books' });
    }
};

const showBook = async (req, res) => {
    const { pdfLocation } = req.params;
    const filePath = path.join(uploadDir, '/uploads', pdfLocation);

    try {
        if (fs.existsSync(filePath)) {
            res.sendFile(filePath);
        } else {
            res.status(404).json({ error: 'File not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAll = async (req, res) => {
    try {
        // Obtener todos los libros de la base de datos
        const books = await Book.findAll();
    
        // Si no hay libros, enviar un mensaje correspondiente
        if (books.length === 0) {
            res.status(204).json({ message: 'No se encontraron libros.' });
            return;
        }
  
        // Transformar los libros en un formato adecuado para la respuesta
        const formattedBooks = books.map(book => {
            return {
                id: book.id,
                name: book.name,
                publicationYear: book.publicationYear,
                category: book.category,
                author: book.author,
                pdfLocation: book.pdfLocation,
            };
        });
  
        // Enviar la respuesta con la lista de libros formateados
        res.status(200).json({ books: formattedBooks });

    } catch (error) {
        console.error('Error al obtener libros:', error);
        res.status(500).json({ error: error.message });
    }
};

export { createBook, deleteBook, findBookById, findBookByCategory, updateBook, searchBooks, searchBook, showBook, getAll };