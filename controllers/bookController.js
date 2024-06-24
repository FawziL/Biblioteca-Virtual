import Book from "../models/bookModel.js";

export const createBook = async (req, res) => {
	try {
		const { name, publicationYear, category, author, pdfLocation } = req.body;

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
  
export const deleteBook = async (req, res) => {
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
  
      // Enviar respuesta de éxito
      res.status(200).json({ message: 'Book deleted successfully.' });
    } catch (error) {
      // Manejar errores
      res.status(500).json({ error: error.message });
    }
};

export const findBookById = async (req, res) => {
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

export const updateBook = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, publicationYear, category, author, pdfLocation } = req.body;
  
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

export const searchBooks = async (req, res) => {
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

export const PosibleBuscardor = async (req, res) => {
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