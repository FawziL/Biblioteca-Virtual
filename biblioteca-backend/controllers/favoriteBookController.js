import FavoriteBook from '../models/favoriteBookModel.js';
import Book from '../models/bookModel.js';

const addFavoriteBook = async (req, res) => {
    try {
        const { idCard } = req.user; // Extrae el userId del token
        const { bookId } = req.body;
        // Verificar si el libro ya está en los favoritos del usuario
        const existingFavorite = await FavoriteBook.findOne({ where: { userId: idCard, bookId } });
        if (existingFavorite) {
            return res.status(400).json({ error: 'Book is already in favorites.' });
        }

        // Agregar el libro a los favoritos
        const favoriteBook = await FavoriteBook.create({ userId: idCard, bookId });
        res.status(201).json(favoriteBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFavoriteBooks = async (req, res) => {
    try {
        const { idCard } = req.user; // Extrae el userId del token

        const favoriteBooks = await FavoriteBook.findAll({
            where: { userId: idCard },
            include: [
                {
                    model: Book,
                }
            ]
        });

        res.status(200).json(favoriteBooks);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const deleteFavoriteBook = async (req, res) => {
    try {
        const { idCard } = req.user; // Extrae el userId del token
        const { bookId } = req.body;
        console.log(req.body)

        // Verificar si el libro ya está en los favoritos del usuario
        const existingFavorite = await FavoriteBook.findOne({ where: { userId: idCard, bookId } });
        if (!existingFavorite) {
            return res.status(400).json({ error: 'El libro no está en los favoritos.' });
        }

        // Eliminar el libro de los favoritos
        await existingFavorite.destroy();
        res.status(200).json({ message: 'Libro eliminado de los favoritos.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export {addFavoriteBook, getFavoriteBooks, deleteFavoriteBook}