import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

/*
sequelize.sync({ force: true }) // 'force: true' recrea las tablas cada vez que se ejecuta la sincronización
    .then(() => {
    console.log('Database & tables created!');
})
    .catch(err => {
    console.error('Error creating database tables:', err);
});
*/

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Name is required'
            }
        }
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Category is required'
            }
        }
    },
    publicationYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: 'Publication year must be an integer'
            },
            notEmpty: {
                msg: 'Publication year is required'
            }
        }
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Author is required'
            }
        }
    },
    pdfLocation: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'PDF location is required'
            }
        }
    }
}, {
  // Opciones adicionales del modelo
});

export default Book;

