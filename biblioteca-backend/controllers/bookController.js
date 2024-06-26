import Book from "../models/bookModel.js";
import fs from "fs";
import path from "path";
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

        const filePath = path.join(uploadDir, book.pdfLocation)
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
              { publicationYear: { [Op.like]: `%${query}%` } },
              { author: { [Op.iLike]: `%${query}%` } }
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
}

const PosibleBuscardor = async (req, res) => {
    try {
        let { query, page, limit } = req.query;
    
        // Recortar y validar el parámetro de consulta
        query = query ? query.trim() : null;
    
        if (!query) {
          return res.status(400).json({ error: 'Query parameter is required.' });
        }
    
        // Establecer valores por defecto para la paginación
        page = page ? parseInt(page) : 1;
        limit = limit ? parseInt(limit) : 10;
        const offset = (page - 1) * limit;
    
        // Dividir el parámetro de consulta en términos individuales
        const terms = query.split(' ').map(term => term.trim());
    
        // Construir la cláusula where con múltiples condiciones OR
        const where = {
          [Op.or]: [
            { name: { [Op.iLike]: `%${query}%` } },
            { publicationYear: { [Op.like]: `%${query}%` } },
            { author: { [Op.iLike]: `%${query}%` } }
          ]
        };
    
        // Buscar libros utilizando la cláusula where y paginación
        const books = await Book.findAndCountAll({
          where,
          limit,
          offset
        });
    
        // Calcular el total de páginas
        const totalPages = Math.ceil(books.count / limit);
    
        // Enviar respuesta con los libros encontrados y la paginación
        res.status(200).json({
          books: books.rows,
          currentPage: page,
          totalPages
        });
        
    } catch (error) {
      // Manejar errores
        res.status(500).json({ error: error.message });
    }
};

const getAll = async (req, res) => {
  try {
    console.log("HOLAAAAAAAAAAA")
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


export { createBook, deleteBook, findBookById, updateBook, searchBooks, showBook, getAll, PosibleBuscardor };