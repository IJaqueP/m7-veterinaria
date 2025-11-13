const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Accesorio = sequelize.define('accesorio', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    precio_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: {
                args: [0.01],
                msg: 'El precio unitario debe ser mayor que cero'
            },
            isDecimal: {
                msg: 'El precio unitario debe ser un número decimal válido'
            }
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: {
                args: [0],
                msg: 'El stock no puede ser negativo'
            },
            isInt: {
                msg: 'El stock debe ser un número entero'
            }
        }
    }
},{
    tableName: 'accesorios'
});

module.exports = Accesorio;