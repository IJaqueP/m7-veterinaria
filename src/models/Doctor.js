const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Doctor = sequelize.define('doctor', {
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
            len: {
                args: [9, 15],
                msg: 'El teléfono debe tener 9 números (912345678)'
            },
            isNumeric: {
                msg: 'El teléfono solo debe contener números'
            }
        }
    }
}, {
    tableName: 'doctores'
});

module.exports = Doctor;