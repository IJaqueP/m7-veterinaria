const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const OrdenExamen = sequelize.define('ordenes_examenes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orden_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ordenes_medicas',
            key: 'id'
        }
    },
    examen_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'examenes',
            key: 'id'
        }
    },
    resultado: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: {
                args: [0.01],
                msg: 'El subtotal de los exámenes debe ser mayor a cero'
            },
            isDecimal: {
            msg: 'El subtotal debe ser un número decimal válido'
            }
        }
    }
}, {
    tableName: 'ordenes_examenes'
});

module.exports = OrdenExamen;