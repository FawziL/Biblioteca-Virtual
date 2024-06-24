import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

const User = sequelize.define('User', {
    idCard: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'ID is required'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
        len: {
            args: [6],
            msg: 'Password must be at least 6 characters long'
        }
        }
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Full name is required'
            }
        }
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            isIn: {
                args: [[false, true]],
                msg: 'Invalid admin value. Must be false or true'
            }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'Email is required'
            },
            isEmail: {
                msg: 'Must be a valid email address'
            }
        }
    }
}, {
  // Opciones adicionales
});

export default User;

