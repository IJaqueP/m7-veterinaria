const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Tutor = sequelize.define('tutor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
            max: 9
        }
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'tutores'
});

module.exports = Tutor;