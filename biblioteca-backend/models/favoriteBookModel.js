import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';
import User from './authModel.js';
import Book from './bookModel.js';

sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

const FavoriteBook = sequelize.define('FavoriteBook', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'idCard'
        }
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Book,
            key: 'id'
        }
    }
}, {
    // Opciones adicionales del modelo
});

export default FavoriteBook;