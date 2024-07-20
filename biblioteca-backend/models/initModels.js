import sequelize from '../db/index.js';
import User from './authModel.js';
import Book from './bookModel.js';
import FavoriteBook from './favoriteBookModel.js';

// Definir asociaciones
User.hasMany(FavoriteBook, {
    foreignKey: 'userId',
    as: 'favoriteBooks'
});
  
FavoriteBook.belongsTo(User, {
    foreignKey: 'userId',
});
  
Book.hasMany(FavoriteBook, {
    foreignKey: 'bookId',
    as: 'favorites'
});
  
FavoriteBook.belongsTo(Book, {
    foreignKey: 'bookId',
});

export { User, Book, FavoriteBook };

sequelize.sync({ force: true }) // 'force: true' recrea las tablas cada vez que se ejecuta la sincronización
    .then(() => {
    console.log('Database & tables created!');
})
    .catch(err => {
    console.error('Error creating database tables:', err);
});