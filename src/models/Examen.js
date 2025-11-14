const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Examen = sequelize.define('examen', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    tiempo_resultado: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: {
                args: /^\d+\s(horas?|dias?|minutos?)$/i,
                msg: 'Formato inválido. Usar "24 horas", "2 días", etc'
            }
        }
    },
    costo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: {
                args: [0.01],
                msg: 'El costo debe ser mayor que cero'
            },
            isDecimal: {
                msg: 'El costo unitario debe ser un número decimal válido'
            }
        }
    }
}, {
    tableName: 'examenes'
});

module.exports = Examen;