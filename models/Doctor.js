const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Doctor = sequelize.define('doctor', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
    especialidad: {
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
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: 9
        }
    }
}, {
    tableName: 'doctores'
});

module.exports = Doctor;